import {getDocument, GlobalWorkerOptions} from './vendor/package/build/pdf.mjs';
import {countText,pageText} from './count.js';
GlobalWorkerOptions.workerSrc = new URL('./vendor/package/build/pdf.worker.mjs', import.meta.url).href;
const $=id=>document.getElementById(id);
let generation=0, task=null;
async function clear(){generation++;const previous=task;task=null;$('file').value='';$('result').hidden=true;$('rows').replaceChildren();$('extracted').value='';$('filename').textContent='';$('warning').textContent='';$('progress').hidden=true;$('status').textContent='PDF 파일을 선택해 주세요.';if(previous)await previous.destroy().catch(()=>{});}
async function analyze(file){
  const clearing=clear();const token=generation;await clearing;if(!file||token!==generation)return;
  if(file.size>100*1024*1024){$('status').textContent='100MB 이하의 PDF를 선택해 주세요.';return;}
  if(!/\.pdf$/i.test(file.name)&&file.type!=='application/pdf'){$('status').textContent='PDF 파일만 선택할 수 있어요.';return;}
  let current;
  try{
    $('status').textContent='파일을 읽고 있어요…';const data=new Uint8Array(await file.arrayBuffer());if(token!==generation)return;
    current=getDocument({data,cMapUrl:new URL('./vendor/package/cmaps/',import.meta.url).href,cMapPacked:true,standardFontDataUrl:new URL('./vendor/package/standard_fonts/',import.meta.url).href,wasmUrl:new URL('./vendor/package/wasm/',import.meta.url).href,isEvalSupported:false,enableXfa:false,stopAtErrors:true});task=current;
    const pdf=await current.promise;if(token!==generation)return;
    $('progress').max=pdf.numPages;$('progress').value=0;$('progress').hidden=false;
    const texts=[],counts=[];let empty=0;
    for(let i=1;i<=pdf.numPages;i++){
      if(token!==generation)return;$('status').textContent=`${pdf.numPages}쪽 중 ${i}쪽 분석 중…`;
      const page=await pdf.getPage(i),content=await page.getTextContent();const value=pageText(content.items),count=countText(value);texts.push(value);counts.push(count);if(!count.withoutSpaces)empty++;page.cleanup();$('progress').value=i;
    }
    if(token!==generation)return;
    const total=counts.reduce((a,b)=>({withSpaces:a.withSpaces+b.withSpaces,withoutSpaces:a.withoutSpaces+b.withoutSpaces}),{withSpaces:0,withoutSpaces:0});
    $('filename').textContent=file.name;for(const key of ['withSpaces','withoutSpaces'])$(key).textContent=total[key].toLocaleString('ko-KR');$('pages').textContent=pdf.numPages;
    const fragment=document.createDocumentFragment();counts.forEach((count,i)=>{const row=document.createElement('tr');for(const value of [i+1,count.withSpaces,count.withoutSpaces]){const cell=document.createElement('td');cell.textContent=value.toLocaleString('ko-KR');row.append(cell);}fragment.append(row);});$('rows').append(fragment);
    $('extracted').value=texts.join('\n\n');$('warning').textContent=empty===pdf.numPages?'추출할 글자를 찾지 못했어요. 스캔 PDF라면 별도의 문자 인식(OCR)이 필요합니다.':empty?`${empty}쪽에서 글자가 추출되지 않았어요. 빈 페이지 또는 스캔 페이지인지 확인해 주세요.`:'';
    $('result').hidden=false;$('status').textContent='계산을 마쳤습니다. 결과는 이 브라우저에만 있습니다.';
  }catch(error){if(token===generation){$('result').hidden=true;$('status').textContent=error.name==='PasswordException'?'암호가 걸린 PDF입니다. 컴퓨터에서 암호를 해제한 사본을 선택해 주세요.':'PDF를 읽지 못했어요. 손상되지 않은 PDF인지 확인하고 다시 선택해 주세요.';}}
  finally{if(current)await current.destroy().catch(()=>{});if(token===generation){task=null;$('progress').hidden=true;}}
}
$('file').addEventListener('change',event=>analyze(event.target.files[0]));$('clear').addEventListener('click',clear);
const zone=document.querySelector('.upload');for(const event of ['dragover','dragenter'])zone.addEventListener(event,e=>{e.preventDefault();zone.classList.add('drag');});zone.addEventListener('dragleave',()=>zone.classList.remove('drag'));zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag');if(e.dataTransfer.files.length!==1){clear().then(()=>$('status').textContent='PDF를 한 개씩 선택해 주세요.');return;}analyze(e.dataTransfer.files[0]);});


$('file').disabled=false;$('status').textContent='PDF 파일을 선택해 주세요.';

import {topics,difficulties} from './data.js';
const topicIds=new Set(topics.map(t=>t.id)), levelIds=new Set(difficulties.map(d=>d.id));
export function safeSource(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:null;}catch{return null;}}
export function validateBooks(items){
 const valid=[],errors=[],counts=new Map();
 if(!Array.isArray(items)) return {valid,errors:['도서 목록은 배열이어야 합니다.']};
 for(const b of items) if(b && typeof b.id==='string') counts.set(b.id,(counts.get(b.id)||0)+1);
 for(const [index,b] of items.entries()){
  const strings=['id','title','author','publisher','sourceLabel'];
  const ok=b && strings.every(k=>typeof b[k]==='string'&&b[k].trim()) && counts.get(b.id)===1 && Array.isArray(b.grades)&&b.grades.length>0&&b.grades.every(g=>Number.isInteger(g)&&g>=3&&g<=6) && Array.isArray(b.topics)&&b.topics.length>0&&b.topics.every(t=>topicIds.has(t)) && levelIds.has(b.difficulty) && ['pending','approved'].includes(b.reviewStatus) && (b.demo===true ? b.sourceUrl==='' : safeSource(b.sourceUrl));
  if(ok)valid.push(b);else errors.push(`도서 항목 ${index+1}: 필수 필드, 고유 ID 또는 허용값을 확인하세요.`);
 }return {valid,errors};
}
export function recommend(items,{grade=5,topic,difficulty}={}){
 if(!Number.isInteger(grade)||grade<3||grade>6||!topicIds.has(topic)||!levelIds.has(difficulty)) return {books:[],error:'관심 주제와 읽기 난이도를 선택해 주세요.'};
 const {valid,errors}=validateBooks(items);
 return {books:valid.filter(b=>b.reviewStatus==='approved'&&b.grades.includes(grade)&&b.topics.includes(topic)&&b.difficulty===difficulty).sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0).slice(0,3),errors};
}

import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const base=fileURLToPath(new URL('./',import.meta.url)), root=path.join(base,'dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.wasm':'application/wasm','.css':'text/css; charset=utf-8'};
http.createServer(async(req,res)=>{try{
 const host=req.headers.host;
 if(!host||!/^127\.0\.0\.1:\d+$/.test(host)){res.writeHead(403);res.end();return;}
 const url=new URL(req.url,`http://${host}`);
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 const file=path.resolve(root,'.'+decodeURIComponent(url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 const content=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:content);
}catch{if(!res.headersSent){res.writeHead(404);res.end('Not found');}else res.end();}}).listen(Number(process.env.BOOKSTAR_PORT||4173),'127.0.0.1',()=>console.log('책별: http://127.0.0.1:'+(process.env.BOOKSTAR_PORT||4173)));

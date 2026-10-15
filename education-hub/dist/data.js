export const topics = [{id:'friendship',name:'친구 · 마음',icon:'♡',color:'lavender'},{id:'adventure',name:'모험 · 이야기',icon:'✦',color:'yellow'},{id:'science',name:'과학 · 기술',icon:'⚛',color:'blue'},{id:'nature',name:'환경 · 자연',icon:'♧',color:'mint'},{id:'society',name:'사회 · 경제',icon:'◎',color:'orange'},{id:'history',name:'역사 · 문화',icon:'⌂',color:'violet'}];
export const difficulties = [{id:'easy',name:'가볍게 읽기',description:'부담 없이 책과 친해지고 싶어요.'},{id:'standard',name:'차근차근 읽기',description:'이야기를 따라 천천히 읽고 싶어요.'},{id:'challenge',name:'도전하며 읽기',description:'새로운 생각을 깊이 만나고 싶어요.'}];
export const apps = [{id:'librarian',name:'나의 책 친구',description:'지금의 관심과 읽기 취향에 맞는 책을 찾아요.',route:'#librarian',status:'ready',category:'독서',icon:'book'},{id:'pdf-counter',name:'PDF 글자 수 세기',description:'내 컴퓨터에서 PDF의 글자를 세어요. 파일과 결과는 외부로 보내지 않아요.',route:'./pdf-counter/',status:'ready',category:'문서 도구',icon:'text',action:'글자 수 세러 가기 ↗'},{id:'next',name:'다음 배움을 기다려요',description:'새로운 교육 프로그램이 이곳에 모일 거예요.',route:'',status:'planned',category:'준비 중',icon:'star'}];
const sourceUrl='https://namdonges.icees.kr/boardCnts/fileDown.do?fileSeq=9f6e4c5786799a360e80435ae995cc0f';
export const books = [
 ['b01','미지의 파랑','차율이','고릴라박스','adventure'],
 ['b02','기소영의 친구들','정은주','사계절','friendship'],
 ['b03','윤초옥 실종 사건','전여울','사계절','adventure'],
 ['b04','쓰레기는 쓰레기가 아니다','게르다 라이트','위즈덤하우스','nature'],
 ['b05','독립만세버스','정연숙','논장','history'],
 ['b06','(어린이를 위한)비폭력 대화','김미경','우리학교','friendship'],
 ['b07','(옥효진 선생님의)경제 개념 사전','옥효진','다산어린이','society'],
 ['b08','대화형 인공지능 천재가 되다','빅아이 인공지능 연구소','올드스테어즈','science']
].map(([id,title,author,publisher,topic])=>({id,title,author,publisher,grades:[5],topics:[topic],difficulty:'standard',sourceUrl,sourceLabel:'인천해송초 2024 겨울방학 5학년 권장도서 · 6쪽',reviewStatus:'pending',teacherNote:'주제·난이도는 구현용 초안입니다. 교사가 판본과 분류를 검토한 뒤 승인하세요.'}));
// 데모는 별도 화면에서만 사용합니다. 실제 도서나 교사 승인 자료가 아닙니다.
export const demoBooks = topics.flatMap(topic=>difficulties.flatMap(level=>[1,2,3].map(n=>({id:`SYN-${topic.id}-${level.id}-${n}`,title:`가상의 ${topic.name.split(' · ')[0]} 탐험 ${n}`,author:'가상 작가',publisher:'데모 출판사',grades:[5],topics:[topic.id],difficulty:level.id,sourceUrl:'',sourceLabel:'기능 확인용 합성 데이터 · 실제 도서 아님',reviewStatus:'approved',demo:true}))));


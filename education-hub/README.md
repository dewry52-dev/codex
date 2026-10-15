# 책별 교육 허브

설치 없이 HTML/CSS/JavaScript로 작동하는 5학년 도서 추천 프로토타입입니다. 최종 확장 대상은 3~6학년입니다.

## 실행
Node.js가 있는 환경에서 이 폴더를 터미널로 열고 `npm start` 또는 `node server.mjs`를 실행합니다. 브라우저에서 http://127.0.0.1:4173 으로 접속하세요. `node --test tests/*.test.mjs`로 추천 로직을 검증합니다. 모듈을 사용하므로 index.html을 더블 클릭하는 대신 정적 서버로 실행하세요.

이 PC에서는 PowerShell에서 `./Start.ps1`을 실행해도 됩니다. 이 스크립트는 설치된 Node.js 또는 Codex 번들 Node.js를 찾아 서버를 실행합니다. 터미널의 Ctrl+C로 서버를 종료합니다. 이미 서버가 실행 중이면 같은 주소를 사용하세요.

## 도서 검토
`dist/data.js`의 books 배열은 출처에서 확인한 8권의 후보입니다. 주제와 난이도는 초안으로, 전부 pending입니다. 교사가 개별 판본·분류를 확인하고 `reviewStatus: 'approved'`로 변경한 도서만 추천됩니다. 잘못된 필드나 중복 ID는 제외됩니다. 출처는 인천해송초 2024 겨울방학 권장도서 PDF 6쪽이며 전국 공통 필독 목록이 아닙니다. 일부 후보만 수록했고 목록 전체나 교사 검토 완료로 표시하지 않습니다.

`#demo`는 별도 합성 데이터 화면입니다. 실제 도서와 섞이지 않으며 모든 카드에 가상 도서임을 표시합니다. 데모 데이터는 실제 운영 승인 도서로 옮기지 마세요.

## 새 프로그램·학년 추가
`dist/data.js`의 apps 배열에 id/name/description/route/status/category를 추가하고 `dist/app.js`의 route 함수에 화면을 연결하세요. 단순 카드 추가는 레지스트리 수정만 필요하고 새로운 화면 동작은 별도 구현이 필요합니다. 학년은 books의 grades 배열로 관리합니다. 3~6학년 데이터 검토 후 학년 선택 UI를 추가하세요. 현재는 5학년만 선택 가능합니다.

## 구성
- dist/index.html: 페이지 골격
- dist/styles.css: 디자인 토큰·반응형
- dist/app.js: 허브·선택·결과 화면
- dist/data.js: 앱 목록·후보 및 데모 도서
- dist/recommend.js: 입력 검증·추천 함수
- tests/: 합성 데이터 기반 검증

학생 이름·학번·추천 이력은 수집하거나 저장하지 않습니다. 외부 AI/API·로그인·분석 추적·DB가 없습니다. 도서 출처 링크는 직접 눌렀을 때만 외부 페이지를 엽니다. `dist/`를 정적 호스팅에 올릴 수 있으나 이번 작업은 로컬 구현이며 배포하지 않습니다. 실사용 전 학교 태블릿·PC와 네트워크 환경을 확인하세요.

## PDF 글자 수 도구
허브에서 `PDF 글자 수 세기`를 선택합니다. `/pdf-counter/`에서 PDF 1개(최대 100MB)를 선택하거나 끌어다 놓으면 공백 포함·제외 글자 수와 페이지별 결과를 확인할 수 있습니다. 스캔 문서의 OCR은 지원하지 않습니다. 추출 텍스트에 포함된 문자만 계산하며 줄바꿈은 제외합니다.

PDF.js 6.4.299와 CMap/폰트/WASM 리소스를 `dist/pdf-counter/vendor/package/`에 함께 보관했습니다. Apache-2.0 라이선스는 해당 폴더의 LICENSE에 있습니다. PDF는 File.arrayBuffer로 읽어 PDF.js worker에 메모리로 전달합니다. 결과는 DOM과 메모리에만 있고 서버에 보내거나 브라우저 저장소에 기록하지 않습니다. 이 서버는 GET/HEAD만 허용하며 외부 서비스 없이 127.0.0.1에서 작동합니다. PDF.js API 참고: https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html

이미 실행 중인 서버는 수정된 server.mjs가 반영되도록 다시 시작하세요. 다른 포트로 실행하려면 `$env:BOOKSTAR_PORT='4175'; ./Start.ps1`을 사용합니다.


이 저장소는 공개용 교육 허브입니다. 개인 일기장과 실제 사용자 데이터는 포함하지 않습니다.

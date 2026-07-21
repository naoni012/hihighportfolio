VISUAL DIRECTOR PORTFOLIO
업데이트: Summer, Again 캐릭터·공간·키비주얼 시트 추가 / 2026-07-21

────────────────────────────────
1. GitHub에 올릴 구조
────────────────────────────────
index.html
styles.css
script.js
ui.js
README.txt
assets/
  images/
  models/hamon_sculpt_master_WEB.glb

ZIP 자체가 아니라 압축을 푼 위 파일과 폴더를 기존 GitHub 저장소 최상단에 올립니다.
기존 저장소: naoni012/hihighportfolio
Vercel 주소: https://hihighportfolio.vercel.app/

────────────────────────────────
2. 이번 업데이트
────────────────────────────────
[전체]
· 긴 프로젝트 제목을 프로젝트명 / 설명 두 줄로 분리해 줄바꿈을 정리했습니다.
· 한글 단어가 글자 단위로 잘리지 않도록 줄바꿈 규칙을 보강했습니다.
· 고정 헤더에 반투명 흰 배경을 적용해 이미지 위에서도 메뉴가 읽히게 했습니다.
· Three.js CDN 로딩이 실패해도 본문·문서 토글·이미지 확대가 작동하도록 ui.js를 분리했습니다.
· 문서·캐릭터·공간 이미지는 클릭하면 확대해서 볼 수 있습니다.
· 이전에 삭제 요청한 하몽 합성 테스트 이미지(hamon-comp.jpg)는 HTML과 assets에서 제거했습니다.
· 하몽 제작 문서 하단의 중복 태그 목록을 제거했습니다.

[Summer, Again]
· 영상이 프로젝트 상단에서 먼저 보이도록 이동했습니다.
· KEY VISUAL: summer-key-visual.jpg
· NARRATIVE KEYFRAMES: summer-keyframe-butterfly.jpg / summer-keyframe-light.jpg
· CHARACTER SYSTEM: summer-character-sheet.jpg / summer-face-sheet.jpg
· SPACE SYSTEM: summer-space-room.jpg / summer-space-hall.jpg
· STORY OBJECT: summer-story-object.jpg
· 기존 러닝타임·화면비 문서는 마지막 PRODUCTION BIBLE 섹션으로 이동했습니다.

────────────────────────────────
3. 영상 매핑
────────────────────────────────
단조: https://youtu.be/L3py_5rTnaA
하몽: https://youtu.be/Bpn1hvm-twk
Summer, Again: https://youtu.be/c-QibHWwHbk

배포 전 시크릿 창에서 세 영상이 올바른 프로젝트에 표시되는지 확인하세요.

────────────────────────────────
4. 배포 방법
────────────────────────────────
1) 이 폴더 전체를 ZIP으로 받은 경우 먼저 압축을 풉니다.
2) GitHub hihighportfolio 저장소에서 Add file → Upload files를 누릅니다.
3) index.html, styles.css, script.js, ui.js, README.txt, assets 폴더를 모두 드래그합니다.
4) Commit directly to the main branch를 선택하고 Commit changes를 누릅니다.
5) Vercel → hihighportfolio → Deployments에서 최신 배포가 Ready인지 확인합니다.
6) https://hihighportfolio.vercel.app/ 에서 강력 새로고침합니다.
   Mac: Command + Shift + R / Windows: Ctrl + F5

────────────────────────────────
5. 로컬 확인
────────────────────────────────
GLB는 file:// 방식에서 차단될 수 있으므로 로컬 서버로 확인합니다.

python3 -m http.server 8000
http://localhost:8000

Three.js는 jsDelivr CDN을 사용하므로 3D 인터랙션에는 인터넷 연결이 필요합니다.
본문과 이미지 갤러리는 CDN이 실패해도 표시됩니다.

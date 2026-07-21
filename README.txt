VISUAL DIRECTOR PORTFOLIO
업데이트: UX/UI 가독성 개편 + 프로젝트 3줄 요약 + 정보 수정 / 2026-07-21

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
2. 이번 업데이트 핵심
────────────────────────────────
[콘텐츠 정보]
· 하몽 제작 기간: 2026.05 – 2026.08
· Summer, Again 공개 분량: 20초
· 하몽 라벤더 벨벳 재질의 굿즈/봉제 인형 확장 의도 추가

[UX/UI]
· 각 프로젝트 제목 아래에 목표 / 담당 / 결과 3줄 요약을 추가했습니다.
· 프로젝트 흐름을 3줄 요약 → 영상 → 개요 → 과정/판단 → 결과 순서로 통일했습니다.
· 프로젝트별로 은은한 배경색과 카드 경계를 적용해 섹션 구분을 명확히 했습니다.
· 본문 폭, 글자 크기, 행간, 대비를 조정해 긴 문장이 한눈에 읽히도록 했습니다.
· 메타 정보는 2열 카드형 개요로, 제작 문서는 큰 이미지+설명 행으로 바꿨습니다.
· 보조 문서는 더보기 안에 유지해 정보 과밀을 줄였습니다.
· 모바일에서는 모든 요약/문서/이미지 그리드가 1열로 전환됩니다.
· 키보드 포커스, 건너뛰기 링크, 이미지 확대, reduced-motion 대응을 유지했습니다.
· 우측 도트 내비게이션은 시각적 잡음을 줄이기 위해 제거했습니다.

[HI HIGH 제안]
· 긴 문단을 MAIN FILM / SHORT FORM / VISUAL BIBLE / HYBRID PIPELINE 4개 산출물로 재구성했습니다.

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
1) ZIP을 먼저 압축 해제합니다.
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

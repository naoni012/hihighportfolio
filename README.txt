VISUAL CONTENT PORTFOLIO — DESKTOP UI REWORK

[배포]
1. 이 ZIP을 컴퓨터에서 압축 해제합니다.
2. GitHub의 기존 hihighportfolio 저장소에서 Add file → Upload files를 누릅니다.
3. 압축 해제한 내부 파일과 assets 폴더 전체를 저장소 최상단에 올립니다.
4. Commit directly to the main branch → Commit changes를 누릅니다.
5. Vercel Deployments에서 최신 배포가 Ready인지 확인합니다.
6. 기존 주소 https://hihighportfolio.vercel.app/ 를 강력 새로고침합니다.

[필수 구조]
index.html
styles.css
ui.js
script.js
assets/
  images/
  models/hamon_sculpt_master_WEB.glb

[이번 개편]
- 데스크톱/창 UI를 활용한 원페이지 디자인
- 모든 유튜브 영상 16:9, 동일한 최대 폭과 중앙 정렬
- 단조: 이미지 없는 CSS 배경 + 불씨 모션
- 하몽: 제공한 언리얼 초원/집 이미지를 배경과 월드빌드 창에 적용
- Summer, Again: 키비주얼과 캐릭터/공간/오브젝트를 탭으로 정리
- 중복 통계, 긴 Overview, 읽기 어려운 보조 문서, 불필요한 Skills 설명 삭제
- 하몽 기간 2026.05–08, Summer 공개 분량 20초 반영
- 하몽 라벤더 벨벳 재질의 굿즈/호감도 설계 의도 반영

[주의]
- ZIP 파일 자체를 GitHub에 올리지 말고 압축을 푼 내부 파일을 올립니다.
- ui.js와 script.js를 빠뜨리면 탭/확대 보기/3D 모델이 동작하지 않습니다.
- Three.js와 유튜브 임베드는 인터넷 연결이 필요합니다. 3D 로딩 실패 시 캐릭터 시트가 대체 이미지로 표시됩니다.

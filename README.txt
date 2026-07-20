HONG — VISUAL DIRECTOR PORTFOLIO (2026 리뉴얼)

[실행]
1. index.html을 브라우저에서 열면 실행됩니다.
2. 3D 인터랙션은 Three.js CDN을 사용하므로 인터넷 연결이 필요합니다.
3. 배포: Vercel + GitHub 자동배포 / https://hihighportfolio.vercel.app/

[구조]
hero → #danjo(鍛造) → #summer(Summer, Again) → #hamon(하몽) → #about → #skills → #proposal → #contact
※ 히어로의 3D 오브젝트와 하단 프로젝트 레일(data-project)은 기존 로직 그대로 유지됩니다.
※ 섹션 id "resummer"는 "summer"로 변경되었고, script.js의 projectData.resummer.target도 '#summer'로 함께 수정했습니다.
   레일 버튼의 data-project 값(hamon / resummer / danjo)은 3D 연동 키이므로 변경하지 않았습니다.

[채워야 할 플레이스홀더]
- [YOUTUBE_UNLISTED_URL_단조]  → #danjo 영상 자리. HTML 주석의 iframe 스니펫으로 교체
- [YOUTUBE_UNLISTED_URL_summer] → #summer 영상 자리. 동일 방식
- [비교 스틸 언리얼 vs AI] / [비주얼 개발 …] / [현장 스틸 이미지] / [문서 이미지 1~4] / [초기 스케치·시안 발전·수정안·최종 캐릭터 시트]
  → .img-placeholder div를 <img src="assets/images/파일명.jpg" alt="설명"> 으로 교체
- [EMAIL] / [NOTION_URL] / [SHOWREEL_URL] → #contact의 dd 내용 교체

[유튜브 임베드 방법]
placeholder-embed 블록을 아래로 교체 (Unlisted 전제, 자동재생 없음):
<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/영상ID?rel=0" title="제목"
    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
</div>

[체크]
- 시크릿창에서 Unlisted 영상 재생 확인
- 콘솔 에러 0 확인 (3D / 도트 네비 / 리빌)

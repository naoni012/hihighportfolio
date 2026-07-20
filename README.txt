HONG — VISUAL DIRECTOR PORTFOLIO
최종 업데이트: 4차 (실제 이미지 전량 반영 + 가독성 개선)

────────────────────────────────
1. 폴더 구조 (이 구조 그대로 업로드)
────────────────────────────────
index.html
styles.css
script.js
assets/models/hamon_sculpt_master_WEB.glb
assets/images/*.jpg   (19장)

────────────────────────────────
2. 실행 / 배포
────────────────────────────────
· 로컬 확인은 반드시 로컬 서버로: 폴더에서  python3 -m http.server 8000  → http://localhost:8000
  (index.html 더블클릭 시 file:// 에서 GLB가 CORS로 차단되어 3D 캐릭터가 안 보입니다)
· Three.js는 CDN(jsdelivr) 사용 → 인터넷 연결 필요
· 배포: Vercel + GitHub 자동배포 / https://hihighportfolio.vercel.app/

────────────────────────────────
3. 구조
────────────────────────────────
hero → #danjo(鍛造) → #summer(Summer, Again) → #hamon(하몽) → #about → #skills → #proposal → #contact
· 히어로 3D: 하몽 캐릭터는 GLB 실물 모델, 나머지 2개는 절차적 조형
· 레일 버튼 data-project 값(hamon/resummer/danjo)은 3D 연동 키 — 변경 금지
· 섹션 id "resummer" → "summer"로 변경, script.js의 projectData.resummer.target도 '#summer'로 동기화됨

────────────────────────────────
4. 영상 (전부 rel=0, 자동재생 없음)
────────────────────────────────
#danjo  youtu.be/L3py_5rTnaA
#summer youtu.be/c-QibHWwHbk
#hamon  youtu.be/Bpn1hvm-twk   ← 러프컷으로 표기
※ 시크릿창에서 재생 테스트 필수 (Unlisted 여부 확인)

────────────────────────────────
5. 이미지 출처 및 마스킹 내역
────────────────────────────────
[鍛造]
 danjo-unreal.jpg / danjo-ai.jpg  ← 업로드 스틸 2종, A/B 라벨만 부여(어느 쪽이 AI인지 미표기)

[Summer, Again]
 summer-runtime.jpg  ← 샷리스트 PDF p3 (러닝타임 설계표)
 summer-cutlist.jpg  ← 샷리스트 PDF p5 (컷 리스트)
 summer-ratio.jpg    ← 샷리스트 PDF p21 (화면비율 전환표)

[하몽]
 hamon-set-vp.jpg / hamon-set-led.jpg  ← 현장 사진 2종
 hamon-comp.jpg                        ← 합성 적용 화면
 char-1-sketch → char-2-dev → char-3-sheet → char-4-final  ← 캐릭터 디벨롭 4단계
 doc-staff-timeline / doc-vp-timeline / doc-callsheet / doc-chromakey-rules
 doc-storyboard-1 / doc-storyboard-2   ← 콘티 Ver2.3 PDF p1, p3
 doc-props.jpg                         ← 소품 조달 트래커 p1

 마스킹 처리:
  · doc-callsheet.jpg — 배우 프로필 링크(plfil.com) 1건 검게 처리
  · doc-props.jpg     — 팀원 실명 3건 검게 처리
  · 그 외 문서는 개인정보 없음

 ⚠ 사이트에 넣지 않은 자료:
  · 하몽_배우섭외현황 PDF — 실명 12명 + 휴대폰번호 2건 + 개인 프로필/인스타 링크 다수.
    마스킹해도 "누가 거절했는지"가 남아 제3자에게 불리하므로 공개 포트폴리오에서 제외했습니다.
  · 하몽_배우용/배우미팅 참고자료 — 배우 개인 대상 문서라 제외.

────────────────────────────────
6. 이미지 교체 방법
────────────────────────────────
더 좋은 소스가 생기면 같은 파일명으로 assets/images/에 덮어쓰면 됩니다(HTML 수정 불필요).
권장 규격: 문서·캐릭터 4:3, 스틸 16:9, 가로 1100~1400px, JPG 85~90%.

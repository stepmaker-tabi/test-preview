const form = document.querySelector("#applyForm");
const applySection = document.querySelector("#apply");

if (applySection) {
  const syncStickyState = () => {
    const applyTop = applySection.getBoundingClientRect().top;
    document.body.classList.toggle("sticky-ready", window.scrollY > 520);
    document.body.classList.toggle("apply-visible", applyTop < window.innerHeight * 0.9);
  };

  syncStickyState();
  window.addEventListener("scroll", syncStickyState, { passive: true });
  window.addEventListener("resize", syncStickyState);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const applicantName = formData.get("name")?.toString().trim() || "신청자";

  window.localStorage.setItem(
    "lodgingMarketingLectureApplicant",
    JSON.stringify({
      name: applicantName,
      phone: formData.get("phone"),
      stage: formData.get("stage"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
    }),
  );

  alert(`${applicantName}님, 신청 정보가 임시 저장되었습니다. 실제 접수 연동 시 담당자에게 전달됩니다.`);
  form.reset();
});

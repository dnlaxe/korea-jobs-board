const filterBtn = document.getElementById("applyButton");
const resetBtn = document.getElementById("resetButton");
const emailCheckBtn = document.getElementById("checkEmail");
const startJobForm = document.getElementById("startJobForm");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    loading(filterBtn, "Searching");
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    loading(resetBtn, "Resetting");
  });
}

if (startJobForm && emailCheckBtn) {
  startJobForm.addEventListener("submit", () => {
    loading(emailCheckBtn, "Checking");
  });
}

function loading(target, message) {
  target.textContent = message;
  target.disabled = true;
}

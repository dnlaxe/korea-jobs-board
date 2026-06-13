const filterBtn = document.getElementById("applyButton");
const resetBtn = document.getElementById("resetButton");
const emailCheckBtn = document.getElementById("checkEmail");

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

if (emailCheckBtn) {
  emailCheckBtn.addEventListener("click", () => {
    loading(emailCheckBtn, "Checking");
  });
}

function loading(target, message) {
  target.textContent = message;
}

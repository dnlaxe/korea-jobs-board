const modal = document.querySelector("[data-confirm-modal]");
const confirmButton = document.querySelector("[data-confirm-accept]");
const cancelButton = document.querySelector("[data-confirm-cancel]");
const triggers = document.querySelectorAll("[data-delete-trigger]");

if (!modal || !confirmButton || !cancelButton || !triggers.length) {
  // Nothing to wire on this page.
} else {
  let activeForm = null;

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");
    activeForm = null;
  }

  function openModal(form) {
    activeForm = form;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    confirmButton.focus();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const form = trigger.closest("form");

      if (!form) return;
      openModal(form);
    });
  });

  confirmButton.addEventListener("click", () => {
    if (!activeForm) return;
    activeForm.submit();
  });

  cancelButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

const button = document.getElementById("back-to-top");

if (button) {
  const toggle = () => {
    const isVisible = window.scrollY > 20;

    button.classList.toggle("opacity-0", !isVisible);
    button.classList.toggle("translate-y-4", !isVisible);
    button.classList.toggle("pointer-events-none", !isVisible);

    button.classList.toggle("opacity-100", isVisible);
    button.classList.toggle("translate-y-0", isVisible);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

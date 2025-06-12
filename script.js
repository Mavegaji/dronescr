
document.addEventListener("DOMContentLoaded", () => {
    // Fade-in efecto al cargar
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transition = "opacity 1s ease-out";
    });
    let delay = 500;
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = 1;
        }, delay * (index + 1));
    });

    // Suavidad al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});

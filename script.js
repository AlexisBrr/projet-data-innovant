document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".part");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
                history.pushState(null, null, this.getAttribute("href")); // Ajoute le hash à l’URL
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".part");
    let currentIndex = 0;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: "smooth" });
            currentIndex = index;
        }
    }

    // Création du bouton de navigation
    const navButton = document.createElement("button");
    navButton.textContent = "↓";
    navButton.style.position = "fixed";
    navButton.style.bottom = "20px";
    navButton.style.right = "20px";
    navButton.style.padding = "10px 15px";
    navButton.style.fontSize = "18px";
    navButton.style.border = "none";
    navButton.style.background = "#000";
    navButton.style.color = "#fff";
    navButton.style.cursor = "pointer";
    navButton.style.borderRadius = "5px";
    navButton.style.zIndex = "1000";
    document.body.appendChild(navButton);

    // Gestion du clic sur le bouton
    navButton.addEventListener("click", function() {
        if (currentIndex < sections.length - 1) {
            scrollToSection(currentIndex + 1);
        } else {
            scrollToSection(0); // Retour au début si dernière section
        }
    });

    // Mise à jour de l'index actuel en fonction du scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentIndex = Array.from(sections).indexOf(entry.target);
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => {
        observer.observe(section);
    });
});


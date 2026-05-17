// Función para cambiar el tema (compatible con Tailwind)
function cambiarTema() {
    const html = document.documentElement;
    const icon = document.getElementById("d1-icon");

    // Alternar entre modo oscuro y claro
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
        localStorage.setItem("theme", "light");
    } else {
        html.classList.add("dark");
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
        localStorage.setItem("theme", "dark");
    }
}

// Aplicar el tema guardado al recargar la página
function aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem("theme") || "light";
    const html = document.documentElement;
    const icon = document.getElementById("d1-icon");

    if (temaGuardado === "dark") {
        html.classList.add("dark");
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
    } else {
        html.classList.remove("dark");
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
    }
}

// Llamar a la función al cargar la página
window.addEventListener("DOMContentLoaded", aplicarTemaGuardado);
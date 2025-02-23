// Función para cambiar el tema
function cambiarTema() {
    const body = document.body;
    const icon = document.getElementById("d1-icon");

    // Alternar entre modo oscuro y claro
    if (body.getAttribute("data-bs-theme") === "light") {
        body.setAttribute("data-bs-theme", "dark");
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
        localStorage.setItem("theme", "dark"); // Guardar preferencia en localStorage
    } else {
        body.setAttribute("data-bs-theme", "light");
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
        localStorage.setItem("theme", "light"); // Guardar preferencia en localStorage
    }
}

// Aplicar el tema guardado al recargar la página
function aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem("theme");
    const body = document.body;
    const icon = document.getElementById("d1-icon");

    if (temaGuardado === "dark") {
        body.setAttribute("data-bs-theme", "dark");
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
    } else {
        body.setAttribute("data-bs-theme", "light");
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
    }
}

// Llamar a la función al cargar la página
window.onload = aplicarTemaGuardado;
// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        const errorCorreo = document.getElementById("errorCorreo");
        const errorContrasena = document.getElementById("errorContrasena");
        const mensajeLogin = document.getElementById("mensajeLogin");

        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        mensajeLogin.textContent = "";

        const usuarioGuardado = localStorage.getItem("usuarioGameZone");
        
        if (usuarioGuardado === null) {
            mensajeLogin.textContent = "No existe una cuenta registrada.";
            return;
        }

        const usuario = JSON.parse(usuarioGuardado);
        
        if (correo !== usuario.correo) {
            mensajeLogin.textContent = "El correo electrónico es incorrecto.";
        } else if (contrasena !== usuario.contrasena) {
            mensajeLogin.textContent = "La contraseña es incorrecta.";
        } else {
            mensajeLogin.textContent = "Inicio de sesión exitoso.";
            window.location.href = "perfil.html"; 
        }
    });
}
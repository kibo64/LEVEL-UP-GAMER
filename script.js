// LOGIN

const loginForm = document.getElementById("loginForm");

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

        let hayError = false;

        const usuarioGuardado = localStorage.getItem("usuarioGameZone");
        if (usuarioGuardado === null) {
            mensajeLogin.textContent = "No existe una cuenta registrada.";
        }
        const usuario = JSON.parse(usuarioGuardado);
        if (correo !== usuario.correo) {
            mensajeLogin.textContent = "El correo electrónico es incorrecto.";
        } else if (contrasena !== usuario.contrasena) {
            mensajeLogin.textContent = "La contraseña es incorrecta.";
        } else {
            mensajeLogin.textContent = "Inicio de sesión exitoso.";
        }

    });

// REGISTRO

const registroForm = document.getElementById("registroForm");

if (registroForm) {

    registroForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;
        const telefono = document.getElementById("telefono").value.trim();

        const generos = document.querySelectorAll(
            'input[name="genero"]:checked'
        );

        const errorNombre = document.getElementById("errorNombre");
        const errorCorreo = document.getElementById("errorCorreo");
        const errorContrasena = document.getElementById("errorContrasena");
        const errorConfirmar = document.getElementById("errorConfirmar");
        const errorTelefono = document.getElementById("errorTelefono");
        const errorGenero = document.getElementById("errorGenero");
        const mensajeRegistro = document.getElementById("mensajeRegistro");

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        errorConfirmar.textContent = "";
        errorTelefono.textContent = "";
        errorGenero.textContent = "";
        mensajeRegistro.textContent = "";

        let hayError = false;


        const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
        if (nombre === "") {
            errorNombre.textContent =
                "Ingrese su nombre completo.";
            hayError = true;
        } else if (!nombreValido.test(nombre)) {
            errorNombre.textContent =
                "El nombre solo puede contener letras y espacios.";
            hayError = true;
        } else if (nombre.length > 100) {
            errorNombre.textContent =
                "El nombre no puede superar los 100 caracteres.";
            hayError = true;
        }

        const correoValido = /^[^\s@]+@duoc\.cl$/;

        if (correo === "") {
            errorCorreo.textContent =
                "Ingrese su correo electrónico.";
            hayError = true;
        } else if (correo.length > 60) {
            errorCorreo.textContent =
                "El correo no puede superar los 60 caracteres.";
            hayError = true;
        } else if (!correoValido.test(correo)) {
            errorCorreo.textContent =
                "El correo debe tener el formato usuario@duoc.cl.";
            hayError = true;
        }

        const usuarioAnterior = localStorage.getItem("usuarioGameZone");

        if (usuarioAnterior !== null) {
            const usuarioGuardado =
                JSON.parse(usuarioAnterior);
            if (correo === usuarioGuardado.correo) {
                errorCorreo.textContent =
                    "Este correo ya está registrado.";
                hayError = true;
            }
        }

        if (contrasena.length < 10) {
            errorContrasena.textContent =
                "La contraseña debe tener al menos 10 caracteres.";
            hayError = true;
        } else if (!/[A-Z]/.test(contrasena)) {
            errorContrasena.textContent =
                "Debe incluir al menos una letra mayúscula.";
            hayError = true;
        } else if (!/[a-z]/.test(contrasena)) {
            errorContrasena.textContent =
                "Debe incluir al menos una letra minúscula.";
            hayError = true;
        } else if (!/[0-9]/.test(contrasena)) {
            errorContrasena.textContent =
                "Debe incluir al menos un número.";
            hayError = true;
        } else if (!/[^A-Za-z0-9]/.test(contrasena)) {
            errorContrasena.textContent =
                "Debe incluir al menos un carácter especial.";
            hayError = true;
        }

        if (confirmarContrasena === "") {
            errorConfirmar.textContent =
                "Confirme su contraseña.";
            hayError = true;
        } else if (contrasena !== confirmarContrasena) {
            errorConfirmar.textContent =
                "Las contraseñas no coinciden.";
            hayError = true;
        }

        if (telefono !== "" && !/^[0-9+ ]+$/.test(telefono)) {
            errorTelefono.textContent =
                "Ingrese un número de teléfono válido.";
            hayError = true;
        }

        if (generos.length === 0) {
            errorGenero.textContent =
                "Seleccione al menos un género favorito.";
            hayError = true;
        }

        if (hayError) {
            return;
        }
        
        const usuario = {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            telefono: telefono,

            generos: Array.from(generos).map(
                genero => genero.value
            )
        };
        localStorage.setItem(
            "usuarioGameZone",
            JSON.stringify(usuario)
        );
        alert("Cuenta creada correctamente.");
        window.location.href = "ingreso.html";
    });
}
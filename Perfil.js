// PERFIL

const perfilForm = document.getElementById("perfilForm");

if (perfilForm) {

    const usuarioGuardado =
        localStorage.getItem("usuarioGameZone");

    if (usuarioGuardado === null) {
        window.location.href = "index.html";
    } else {
        const usuario = JSON.parse(usuarioGuardado);

        const nombre =
            document.getElementById("nombre");

        const fechaNacimiento =
            document.getElementById("fechaNacimiento");

        const correo =
            document.getElementById("correo");

        const telefono =
            document.getElementById("telefono");

        const descuento =
            document.getElementById("descuento");

        const mensajePerfil =
            document.getElementById("mensajePerfil");

        
        nombre.value = usuario.nombre;

        fechaNacimiento.value =
            usuario.fechaNacimiento;

        correo.value =
            usuario.correo;

        telefono.value =
            usuario.telefono;

        if (usuario.descuentoDuoc === 20) {
            descuento.textContent =
                "Tienes un 20% de descuento de por vida por utilizar un correo Duoc.";
        } else {
            descuento.textContent =
                "No tienes descuento Duoc.";
        }

        const generos =
            document.querySelectorAll(
                'input[name="genero"]'
            );
        generos.forEach(function(genero) {
            if (
                usuario.generos.includes(
                    genero.value
                )
            ) {
                genero.checked = true;
            }
        });

        perfilForm.addEventListener(
            "submit",
            function(event) {
                event.preventDefault();
                const nuevoNombre =
                    nombre.value.trim();

                const nuevoTelefono =
                    telefono.value.trim();

                const generosSeleccionados =
                    document.querySelectorAll(
                        'input[name="genero"]:checked'
                    );

                const errorNombre =
                    document.getElementById(
                        "errorNombre"
                    );

                const errorTelefono =
                    document.getElementById(
                        "errorTelefono"
                    );

                const errorGenero =
                    document.getElementById(
                        "errorGenero"
                    );

                errorNombre.textContent = "";
                errorTelefono.textContent = "";
                errorGenero.textContent = "";
                mensajePerfil.textContent = "";

                let hayError = false;

                const nombreValido =
                    /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

                if (nuevoNombre === "") {
                    errorNombre.textContent =
                        "Ingrese su nombre completo.";
                    hayError = true;

                } else if (
                    !nombreValido.test(nuevoNombre)
                ) {
                    errorNombre.textContent =
                        "El nombre solo puede contener letras y espacios.";
                    hayError = true;

                } else if (
                    nuevoNombre.length > 100
                ) {
                    errorNombre.textContent =
                        "El nombre no puede superar los 100 caracteres.";
                    hayError = true;
                }

                if (
                    nuevoTelefono !== "" &&
                    !/^[0-9+ ]+$/.test(nuevoTelefono)
                ) {
                    errorTelefono.textContent =
                        "Ingrese un número de teléfono válido.";
                    hayError = true;
                }

                if (
                    generosSeleccionados.length === 0
                ) {
                    errorGenero.textContent =
                        "Seleccione al menos un género favorito.";
                    hayError = true;
                }

                if (hayError) {
                    return;
                }

                usuario.nombre =
                    nuevoNombre;

                usuario.telefono =
                    nuevoTelefono;
                
                usuario.generos =
                    Array.from(
                        generosSeleccionados
                    ).map(
                        genero => genero.value
                    );
                localStorage.setItem(
                    "usuarioGameZone",
                    JSON.stringify(usuario)
                );

                mensajePerfil.textContent =
                    "Los cambios se guardaron correctamente.";
            }
        );
    }
}
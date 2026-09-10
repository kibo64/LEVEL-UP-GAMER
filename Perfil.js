// PERFIL

const perfilForm = document.getElementById("perfilForm");

if (perfilForm) {
    const usuarioGuardado = localStorage.getItem("usuarioGameZone");

    if (usuarioGuardado === null) {
        // window.location.href = "login.html"; 
        
        console.warn("No hay sesión iniciada, pero la redirección está pausada por desarrollo.");
    } else {
        const usuario = JSON.parse(usuarioGuardado);

        const nombre = document.getElementById("nombre");
        const fechaNacimiento = document.getElementById("fechaNacimiento");
        const correo = document.getElementById("correo");
        const telefono = document.getElementById("telefono");
        const descuento = document.getElementById("descuento");
        const mensajePerfil = document.getElementById("mensajePerfil");

        if(nombre) nombre.value = usuario.nombre;
        if(fechaNacimiento) fechaNacimiento.value = usuario.fechaNacimiento;
        if(correo) correo.value = usuario.correo;
        if(telefono) telefono.value = usuario.telefono;

        if (descuento) {
            if (usuario.descuentoDuoc === 20) {
                descuento.textContent = "Tienes un 20% de descuento de por vida por usar correo Duoc.";
                descuento.classList.add("text-[#F72585]"); // Le damos color al premio
            } else {
                descuento.textContent = "No tienes descuento activo.";
                descuento.classList.remove("text-[#4CC9F0]");
                descuento.classList.add("text-white/50"); // Apagado si no hay descuento
            }
        }

        const generos = document.querySelectorAll('input[name="genero"]');
        generos.forEach(function(genero) {
            if (usuario.generos && usuario.generos.includes(genero.value)) {
                genero.checked = true;
            }
        });

        perfilForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const nuevoNombre = nombre.value.trim();
            const nuevoTelefono = telefono.value.trim();
            const generosSeleccionados = document.querySelectorAll('input[name="genero"]:checked');

            const errorNombre = document.getElementById("errorNombre");
            const errorTelefono = document.getElementById("errorTelefono");
            const errorGenero = document.getElementById("errorGenero");

            errorNombre.textContent = "";
            errorTelefono.textContent = "";
            errorGenero.textContent = "";
            mensajePerfil.textContent = "";
            mensajePerfil.className = "text-center text-sm min-h-[20px]"; // Resetear clases

            let hayError = false;
            const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

            if (nuevoNombre === "") {
                errorNombre.textContent = "Ingrese su nombre completo.";
                hayError = true;
            } else if (!nombreValido.test(nuevoNombre)) {
                errorNombre.textContent = "El nombre solo puede contener letras y espacios.";
                hayError = true;
            } else if (nuevoNombre.length > 100) {
                errorNombre.textContent = "El nombre no puede superar los 100 caracteres.";
                hayError = true;
            }

            if (nuevoTelefono !== "" && !/^[0-9+ ]+$/.test(nuevoTelefono)) {
                errorTelefono.textContent = "Ingrese un número de teléfono válido.";
                hayError = true;
            }

            if (generosSeleccionados.length === 0) {
                errorGenero.textContent = "Seleccione al menos un género favorito.";
                hayError = true;
            }

            if (hayError) {
                return;
            }

            usuario.nombre = nuevoNombre;
            usuario.telefono = nuevoTelefono;
            usuario.generos = Array.from(generosSeleccionados).map(genero => genero.value);
            
            localStorage.setItem("usuarioGameZone", JSON.stringify(usuario));

            mensajePerfil.textContent = "Los cambios se guardaron correctamente.";
            mensajePerfil.classList.add("text-[#4CC9F0]", "font-bold");
        });
    }
}
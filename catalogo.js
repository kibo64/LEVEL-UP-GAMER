document.addEventListener('DOMContentLoaded', () => {
    actualizarBurbujaCarrito();

    const botones = document.querySelectorAll('.btn-agregar');
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const productos = document.querySelectorAll('.articulo-producto');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const categoriaElegida = evento.target.getAttribute('data-filtro');

            productos.forEach(producto => {
                const categoriaProducto = producto.getAttribute('data-categoria');

                if (categoriaElegida === 'Todos' || categoriaElegida === categoriaProducto) {
                    producto.classList.remove('hidden'); 
                    producto.classList.add('flex');
                } else {
                    producto.classList.remove('flex');
                    producto.classList.add('hidden');
                }
            });

            botonesFiltro.forEach(b => {
                b.classList.remove('bg-[#F72585]/70', 'text-white');
                b.classList.add('bg-[#240046]', 'text-[#4CC9F0]');
            });
            evento.target.classList.remove('bg-[#240046]', 'text-[#4CC9F0]');
            evento.target.classList.add('bg-[#F72585]/70', 'text-white');
        });
    });

    botones.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const botonClickeado = evento.target;
            
            const producto = {
                id: botonClickeado.getAttribute('data-id'),
                nombre: botonClickeado.getAttribute('data-nombre'),
                precio: parseInt(botonClickeado.getAttribute('data-precio')),
                imagen: botonClickeado.getAttribute('data-imagen'),
                cantidad: 1
            };

            guardarEnCarrito(producto);

            const textoOriginal = botonClickeado.innerText;
            
            botonClickeado.innerText = '¡Añadido! ✓';
            botonClickeado.classList.remove('bg-[#F72585]/80', 'hover:bg-[#F72585]');
            botonClickeado.classList.add('bg-emerald-500', 'hover:bg-emerald-400');

            setTimeout(() => {
                botonClickeado.innerText = textoOriginal;
                botonClickeado.classList.remove('bg-emerald-500', 'hover:bg-emerald-400');
                botonClickeado.classList.add('bg-[#F72585]/80', 'hover:bg-[#F72585]');
            }, 1500);
        });
    });
});

function guardarEnCarrito(productoNuevo) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    const productoExistente = carrito.find(item => item.id === productoNuevo.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push(productoNuevo);
    }

    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
    
    actualizarBurbujaCarrito();
}

function actualizarBurbujaCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    const burbuja = document.getElementById('contador-carrito');
    
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);

    if (totalProductos > 0) {
        burbuja.innerText = totalProductos;
        burbuja.classList.remove('hidden'); 
        
        burbuja.classList.add('animate-bounce');
        setTimeout(() => burbuja.classList.remove('animate-bounce'), 1000);
    } else {
        burbuja.classList.add('hidden');
    }
}
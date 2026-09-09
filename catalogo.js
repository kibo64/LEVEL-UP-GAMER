document.addEventListener('DOMContentLoaded', () => {
    
    const botones = document.querySelectorAll('.btn-agregar');

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
}
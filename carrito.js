document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});

function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    const precioTotal = document.getElementById('precio-total');
    
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    let total = 0;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-white/70 py-8">Tu carrito está vacío. ¡Ve al catálogo a buscar algo genial! 🎮</p>';
        precioTotal.innerText = '$0';
        return;
    }

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const articulo = document.createElement('article');
        articulo.className = "flex items-center justify-between bg-[#240046] p-4 rounded-lg border border-[#4CC9F0]/20";
        articulo.innerHTML = `
            <div class="flex items-center gap-4 w-1/2">
                <div class="w-16 h-16 bg-[#3C096C] rounded overflow-hidden flex-shrink-0">
                    <img src="${producto.imagen}" class="w-full h-full object-cover" alt="${producto.nombre}">
                </div>
                <div>
                    <h4 class="text-white font-bold text-sm">${producto.nombre}</h4>
                    <p class="text-[#4CC9F0] font-press text-[10px] mt-1">$${producto.precio.toLocaleString('es-CL')}</p>
                </div>
            </div>
            
            <div class="flex items-center gap-3">
                <button onclick="modificarCantidad('${producto.id}', -1)" class="bg-[#F72585]/70 hover:bg-[#F72585] text-white w-8 h-8 rounded font-bold">-</button>
                <span class="text-white w-4 text-center">${producto.cantidad}</span>
                <button onclick="modificarCantidad('${producto.id}', 1)" class="bg-[#F72585]/70 hover:bg-[#F72585] text-white w-8 h-8 rounded font-bold">+</button>
            </div>

            <button onclick="eliminarProducto('${producto.id}')" class="text-xs text-red-400 hover:text-red-300 underline">Eliminar</button>
        `;
        contenedor.appendChild(articulo);
    });

    precioTotal.innerText = `$${total.toLocaleString('es-CL')}`;
}

function modificarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    const producto = carrito.find(item => item.id === id);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(id);
            return;
        }
        localStorage.setItem('carritoGamer', JSON.stringify(carrito));
        renderizarCarrito(); 
    }
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    carrito = carrito.filter(item => item.id !== id);
    
    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
    renderizarCarrito();
}
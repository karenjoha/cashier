// Definición de usuarios
const usuarios = [
    { nombre: 'Admin', documento: 'admin', contraseña: 'admin123', tipo: 1 },
    { nombre: 'Cliente1', documento: 'cliente1', contraseña: 'cliente123', tipo: 2 },
    { nombre: 'Cliente2', documento: 'cliente2', contraseña: 'cliente123', tipo: 2 }
];

// Solicitar credenciales
function solicitarCredenciales() {
    let documento = prompt("Ingrese su número de documento:");
    let contraseña = prompt("Ingrese su contraseña:");
    let usuario = usuarios.find(u => u.documento === documento && u.contraseña === contraseña);

    if (!usuario) {
        console.log("Usuario no existe. Intente nuevamente.");
        return solicitarCredenciales();
    }

    return usuario;
}

// Definición del cajero
let cajero = [
    { denominacion: 100000, cantidad: 0 },
    { denominacion: 50000, cantidad: 0 },
    { denominacion: 20000, cantidad: 0 },
    { denominacion: 10000, cantidad: 0 },
    { denominacion: 5000, cantidad: 0 }
];

// Función para cargar el cajero
function cargarCajero() {
    cajero.forEach(billete => {
        let cantidad = parseInt(prompt(`Ingrese la cantidad de billetes de ${billete.denominacion} COP:`));
        billete.cantidad += cantidad;
    });

    mostrarEstadoCajero();
}

// Función para mostrar el estado del cajero
function mostrarEstadoCajero() {
    let total = 0;
    console.log("Estado del cajero:");
    cajero.forEach(billete => {
        let subtotal = billete.denominacion * billete.cantidad;
        console.log(`Billetes de ${billete.denominacion} COP: ${billete.cantidad}, Total: ${subtotal}`);
        total += subtotal;
    });
    console.log(`Total general en el cajero: ${total} COP`);
}

// Función para retirar dinero
function retirarDinero() {
    let cantidadRetirar = parseInt(prompt("Ingrese la cantidad que desea retirar:"));
    let cantidadRestante = cantidadRetirar;
    let billetesEntregados = [];
    let estadoInicialCajero = JSON.parse(JSON.stringify(cajero)); // Guardar el estado inicial del cajero

    cajero.forEach(billete => {
        let billetesNecesarios = Math.floor(cantidadRestante / billete.denominacion);
        let billetesADar = Math.min(billetesNecesarios, billete.cantidad);

        if (billetesADar > 0) {
            billete.cantidad -= billetesADar;
            cantidadRestante -= billetesADar * billete.denominacion;
            billetesEntregados.push({ denominacion: billete.denominacion, cantidad: billetesADar });
        }
    });

    if (cantidadRestante > 0) {
        console.log("Cajero en mantenimiento, vuelva pronto.");
        cajero = estadoInicialCajero; // Restaurar el estado inicial del cajero
    } else {
        console.log("Billetes entregados:");
        billetesEntregados.forEach(billete => {
        console.log(`${billete.cantidad} billetes de ${billete.denominacion} COP`);
        });
        mostrarEstadoCajero();
    }
}

let cajeroAbierto = false;

// Lógica principal
function iniciarCajero() {
    cajeroAbierto = true;
    while (cajeroAbierto) {
        let usuario = solicitarCredenciales();
        if (usuario.tipo === 1) {
        cargarCajero();
        } else if (usuario.tipo === 2) {
        if (cajero.every(billete => billete.cantidad === 0)) {
            console.log("Cajero en mantenimiento, vuelva pronto.");
// Volver a solicitar credenciales
        continue;
        } else {
            retirarDinero();
        }
    }
    }
}

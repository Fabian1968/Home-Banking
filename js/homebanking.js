//DECLARACIÓN DE VARIABLES.

/* GUÍA 1 - PASO 2.
Variable para nombre de usuario. Se inicializa como una cadena vacía,
para que no se muestre el nombre antes de iniciar la sesión.*/

var nombreUsuario = "";

/* GUÍA 1 - PASO 3.
Variable Saldo de Cuenta, conversión a número decimal de 2 posiciones.*/

var saldoCuenta = 5000;
saldoCuenta = parseFloat(saldoCuenta);
saldoCuenta = saldoCuenta.toFixed(2);
saldoCuenta = Number(saldoCuenta);


// Inicializar variables de funciones.

var deposito = 0;
importeASumar = 0;

// Variables Múltiplos permitidos de Extracción/Depósitos y Límite de Extracción/Extracción Máximo Permitidos.

var multiploPermitidoExtraccion = 100;
var multiploPermitidoDeposito = 10;
// GUÍA 1 - PASO 4.
var limiteExtraccion = 1500;

// Variables para Transferencias.

var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var nuevaCuentaHabilitada = ""; // Tendría que ser igual a 0. Es para que no se muestre 0 entre las cuentas amigas al inicio.
var cuentaAmigaATransferir = "";
var transferencia = 0;

// Variables de Sesión.

var inicioSesion = false;
var codigoDeVerificacion = 2019;
var accesoDenegado = false;

// Variables para Pagos de Servicios.

var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var estadoAgua = ""; // Estas variable mostrarán "PAGADO" si el servicio ya fue abonado por el usuario.
var estadoTelefono = "";
var estadoLuz = "";
var estadoInternet = "";

//Variables para Pagos de Tarjetas VISA y MASTERCARD.

var estadoVisa = "";
var estadoMastercard = "";
var totalAPagarVisa = 2000;
totalAPagarVisa = parseFloat(totalAPagarVisa).toFixed(2);
totalAPagarVisa = Number(totalAPagarVisa);
var liquidacionVisa = 2000;
liquidacionVisa = parseFloat(liquidacionVisa).toFixed(2);
liquidacionVisa = Number(liquidacionVisa);
var pagoMinimoVisa = 750;
var totalAPagarMastercard = 1000;
totalAPagarMastercard = parseFloat(totalAPagarMastercard).toFixed(2);
totalAPagarMastercard = Number(totalAPagarMastercard);
var liquidacionMastercard = 1000;
liquidacionMastercard = parseFloat(liquidacionMastercard).toFixed(2);
liquidacionMastercard = Number(liquidacionMastercard);
var pagoMinimoMastercard = 350;
var totalizadorPagadoVisa = 0;
var totalizadorPagadoMastercard = 0;
var totalizadorPagado = 0;
var servicio = "";
var tarjeta = "";

//Variables para "automatizar" mensajes brindados al usuario.

var mensajeLogin = "***** LOGIN *****"
var mensajeBanco = "***** VILLA MITRE HOME BANKING *****";
var mensajeError = "***** ERROR *****";
var mensajeOperacionExitosa = "***** OPERACIÓN EXITOSA *****";
var mensajeAtencion = "***** ATENCIÓN *****";
var mensajeImporte = "***** IMPORTE *****";
var mensajeDeposito = "***** DEPÓSITO *****";
var mensajeExtraccion = "***** EXTRACCIÓN *****";
var mensajeTransferencias = "***** TRANSFERENCIAS *****";
var mensajeTarjetas = "***** PAGAR TARJETAS *****";
var mensajeNuevaCuenta = "***** HABILITAR NUEVA CUENTA *****";
var mensajeCuentas = "***** NÚMERO DE CUENTA *****";
var mensajePagoDeServicios = "***** PAGO DE SERVICIOS *****";
var mensajeReintento = ">>>>> INTÉNTALO NUEVAMENTE <<<<<";


//FUNCIONES QUE ACTUALIZAN LOS VALORES DE LAS VARIABLES EN EL HTML.

window.onload = function() {
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    cargarNombreEnPantalla("");
};


/* GUÍA 2 - PASO 1.
Función que  suma dinero a la cuenta.*/

function sumarDinero(importeASumar) {
    saldoCuenta += importeASumar;
    saldoCuenta = parseFloat(saldoCuenta);
    saldoCuenta = saldoCuenta.toFixed(2);
    saldoCuenta = Number(saldoCuenta);
}

/* GUÍA 2 - PASO 2.
Función que resta dinero a la cuenta.*/

function restarDinero(importeARestar) {
    saldoCuenta -= importeARestar;
    saldoCuenta = parseFloat(saldoCuenta);
    saldoCuenta = saldoCuenta.toFixed(2);
    saldoCuenta = Number(saldoCuenta);
}

/* GUÍA 2 - PASO 3.
Función para Depositar Dinero en la Cuenta.*/

function depositarDinero() {
    comprobarInicioDeSesion();
    deposito = prompt(mensajeDeposito + "\n\nIngresa el importe que deseas depositar.\nDebe ser múltiplo de $ " + multiploPermitidoDeposito + "\n");
    // Se realizan las verificacions correspondientes, para evitar entradas incorrectas.
    if (verificarValorNumerico(deposito) &&
        verificarIngresoCero(deposito) &&
        verificarEntero(deposito) &&
        verificarMultiploDe10(deposito) // Se limita el ingreso a múltiplos de 10.
    ) {
        deposito = parseFloat(deposito);
        deposito = deposito.toFixed(2);
        deposito = Number(deposito);
        var saldoAnterior = saldoCuenta;
        sumarDinero(deposito);
        actualizarSaldoEnPantalla();
        alert(mensajeOperacionExitosa + "\n\nHas depositado: $ " + deposito + "\nSaldo Anterior: $ " + saldoAnterior + "\nSaldo Actual: $ " + saldoCuenta);
    }
}

/* GUÍA 2 - PASO 3. AGREGADO.
Función que verifica que el importe a depositar sea múltiplo de 10.*/

function verificarMultiploDe10(importeIngresado) {
    if (importeIngresado % 10 === 0) {
        return true;
    } else {
        alert(mensajeError + "\n\nÚnicamente puedes ingresar múltiplos de $ " + multiploPermitidoDeposito + "\n\n" + mensajeReintento);
        return false;
    }
}

/* GUÍA 2 - PASO 4.
Función para Extracción de Dinero de la Cuenta. */

function extraerDinero() {
    comprobarInicioDeSesion();
    extraccion = prompt(mensajeExtraccion + "\n\nIngresa el importe que deseas retirar.\nDebe ser múltiplo de $ " + multiploPermitidoExtraccion);
    // Se realizan las verificacions correspondientes, para evitar entradas incorrectas.
    if (verificarValorNumerico(extraccion) &&
        verificarIngresoCero(extraccion) &&
        verificarEntero(extraccion) &&
        verificarMultiploDe100(extraccion) &&
        verificarLimiteDeExtraccion(extraccion) &&
        verificarSaldoSuficiente(extraccion)
    ) {
        extraccion = parseFloat(extraccion);
        extraccion = extraccion.toFixed(2);
        extraccion = Number(extraccion);
        var saldoAnterior = saldoCuenta;
        restarDinero(extraccion);
        actualizarSaldoEnPantalla();
        alert(mensajeOperacionExitosa + "\n\nHas retirado: $ " + extraccion + "\nSaldo Anterior: $ " + saldoAnterior + "\nSaldo Actual: $ " + saldoCuenta);
    }
}

/* GUÍA 2 - PASO 5.
Función que permite cambiar el Límite de Extracción permitido.
Aceptando sólo importes que sean múltiplos de $100. */

function cambiarLimiteDeExtraccion() {
    comprobarInicioDeSesion();
    nuevoLimiteDeExtraccion = parseInt(prompt("***** LÍMITE DE EXTRACCIÓN *****\n\nIngresa tu nuevo Límite de Extracción"));
    if (verificarValorNumerico(nuevoLimiteDeExtraccion) &&
        verificarMultiploDe100(nuevoLimiteDeExtraccion)
    ) {
        limiteExtraccion = nuevoLimiteDeExtraccion;
        actualizarLimiteEnPantalla(limiteExtraccion);
        alert(mensajeOperacionExitosa + "\n\nTu nuevo Límite de Extracción diario es: $ " + limiteExtraccion);
    }
}

/* GUÍA 3 - PASO 1 - A
Función que verifica que el saldo de la cuenta sea suficiente.
Se usará en cada operación de erogación de dinero.*/

function verificarSaldoSuficiente(importeIngresado) {
    if (importeIngresado <= saldoCuenta) {
        return true;
    } else {
        alert(mensajeAtencion + "\n\nEl saldo de tu Cuenta es insuficiente para esta operación.\nSaldo Actual: $ " + saldoCuenta);
        return false;
    }
}

/* GUÍA 3 - PASO 1 - B
Función que verifica que el importe ingresado para
extracción sea múltiplo de 100.*/

function verificarMultiploDe100(importeIngresado) {
    if (importeIngresado % 100 === 0) {
        return true;
    } else {
        alert(mensajeError + "\n\nÚnicamente puedes ingresar múltiplos de $ " + multiploPermitidoExtraccion + "\n\n" + mensajeReintento);
        return false;
    }
}

/* GUÍA 3 - PASO 1 - C
Función que verifica que el importe ingresado para
extracción no supere el Límite de Extracción.*/

function verificarLimiteDeExtraccion(importeIngresado) {
    if (importeIngresado <= limiteExtraccion) {
        return true;
    } else {
        alert(mensajeAtencion + "\n\nTu límite de extracción es $ " + limiteExtraccion + "\n\n" + mensajeReintento);
        return false;
    }
}

/* GUÍA 3 - PASO 2.
Funciones para Pago de Servicios.

Si el Servicio no está pago se llama a la función verificarPagoDeServicios(servicio). 
Si ya fue pagado se llama a la función mensajeServicioPagado(servicio) que se lo informa al usuario.*/

function pagarServicio() {
    comprobarInicioDeSesion();
    pagaServicio = prompt(mensajePagoDeServicios + "\n\nIngresa el número del Servicio a Pagar:\n\n1. | AGUA          | $ " + agua + " | Vcto. 10/05/19 | Factura 12345 | " + estadoAgua + "\n2. | TELÉFONO  | $ " + telefono + " | Vcto. 01/05/19 | Factura 54321 | " + estadoTelefono + "\n3. | LUZ             | $ " + luz + " | Vcto. 30/04/19 | Factura 67890 | " + estadoLuz + " \n4. | INTERNET   | $ " + internet + " | Vcto. 04/05/19 | Factura 98765 | " + estadoInternet + "\n");
    pagaServicio = parseInt(pagaServicio);
    switch (pagaServicio) {
        case 1:
            servicio = "AGUA";
            if (estadoAgua != "PAGADO") {
                valorADescontar = agua;
                verificarPagoDeServicios(servicio);
            } else {
                mensajeServicioPagado(servicio);
            }
            break;
        case 2:
            servicio = "TELEFONO";
            if (estadoTelefono != "PAGADO") {
                valorADescontar = telefono;
                verificarPagoDeServicios(servicio);
            } else {
                mensajeServicioPagado(servicio);
            }
            break;
        case 3:
            servicio = "LUZ";
            if (estadoLuz != "PAGADO") {
                valorADescontar = luz;
                verificarPagoDeServicios(servicio);
            } else {
                mensajeServicioPagado(servicio);
            }
            break;
        case 4:
            servicio = "INTERNET";
            if (estadoInternet != "PAGADO") {
                valorADescontar = internet;
                verificarPagoDeServicios(servicio);
            } else {
                mensajeServicioPagado(servicio);
            }
            break;
        default:
            servicio = "default";
            alert(mensajeAtencion + "\n\nDebes ingresar el número de opción del Servicio a pagar.\nPor ejemplo: '1' para pagar  AGUA /// '4' para pagar INTERNET.\n\n" + mensajeReintento);
            break;
    }
}

/* GUÍA 3 - PASO 2.
Si el saldo es suficiente se efectiviza el pago y se asigna al Estado del Servicio 
el valor "PAGADO", que evitará pagos repetidos y además será mostrado en el alert incial.*/

function verificarPagoDeServicios(servicio) {
    if (verificarSaldoSuficiente(valorADescontar)) {
        var saldoAnterior = saldoCuenta;
        restarDinero(valorADescontar);
        actualizarSaldoEnPantalla();
        alert(mensajeOperacionExitosa + "\n\nHas pagado " + servicio + ": $ " + valorADescontar + "\nSaldo Anterior: $ " + saldoAnterior + "\nSaldo Actual: $ " + saldoCuenta);
        switch (servicio) {
            case "AGUA":
                estadoAgua = "PAGADO";
                break;
            case "TELEFONO":
                estadoTelefono = "PAGADO";
                break;
            case "LUZ":
                estadoLuz = "PAGADO";
                break;
            case "INTERNET":
                estadoInternet = "PAGADO";
                break;
            default:
                break;
        }
    } else if (servicio !== "default") {
        verificarSaldoSuficiente(valorADescontar);
    }
}

/* GUÍA 3 - PASO 2. 
Mensaje que avisa al usuario que ¡ESTÁ PAGO ESE SERVICIO!
que está intentanto abonar.*/

function mensajeServicioPagado(servicioAPagar) {
    alert(mensajeAtencion + "\n\nLa Factura de " + servicioAPagar + " ya fue pagada.");
}

/* GUÍA 3 - PASO 3.
Funciones para Transferencias de Dinero.

El usuario puede elegir transferir o Agregar una Nueva Cuenta Amiga.
En el primer caso se llama a la función transferir().
Si elige agregar una cuenta, se llama a la función agregarNuevaCuentaAmiga(),
no sin antes verificar que esta no exista ya. 
*/

function transferencias() {
    comprobarInicioDeSesion();
    opcion = parseInt(prompt(mensajeTransferencias + "\n\nElige la Operación a realizar:\n\n1 <-- Transferir.\n2 <-- Habilitar Nueva Cuenta.\n"))
    switch (opcion) {
        case 1:
            transferir();
            break;
        case 2:
            if (nuevaCuentaHabilitada) {
                alert(mensajeAtencion + "\n\nDentro de las últimas 24 horas ingresaste la cuenta: " + nuevaCuentaHabilitada + "\n\nPor tu seguridad puedes ingresar únicamente una Nueva Cuenta cada 24 horas.\n\nSi deseas modificar este parámetro debes comunicarte con el Banco .\n0800-999-3232 - Opción '4'. De 10:00 hs. a 18:00 hs.")
            } else {
                agregarNuevaCuentaAmiga();
            }
            break;
        default:
            alert(mensajeError + "\n\nDebes ingresar:\n'1' Para Transferir.\n'2' Para Habilitar Nueva Cuenta.\n\n" + mensajeReintento)
            break;
    }
}

/* GUÍA 3 - PASO 3.
Si el usuario elige transferir se le pide cuenta e importe, verificando que la cuenta
sea una cuenta habilitada y que el importe sea correcto respecto a saldo suficiente y formato.*/

function transferir() {
    cuentaAmigaATransferir = parseInt(prompt(mensajeCuentas + "\n\nCuentas Habilitadas:\n1234567\n7654321\n" + nuevaCuentaHabilitada));
    if (cuentaAmigaATransferir === 1234567 || cuentaAmigaATransferir === 7654321 || cuentaAmigaATransferir === nuevaCuentaHabilitada) {
        cuentaAmigaDestino = cuentaAmigaATransferir;
        transferencia = prompt(mensajeImporte + "\n\nIngresa el importe a transferir:\n");
        if (verificarValorNumerico(transferencia) &&
            verificarIngresoCero(transferencia) &&
            verificarSaldoSuficiente(transferencia)
        ) {
            transferencia = parseFloat(transferencia);
            transferencia = transferencia.toFixed(2);
            transferencia = Number(transferencia);
            var saldoAnterior = saldoCuenta;
            restarDinero(transferencia);
            actualizarSaldoEnPantalla();
            alert(mensajeOperacionExitosa + "\n\nHas transferido: $ " + transferencia + "\nCuenta de Destino: " + cuentaAmigaDestino + "\n Saldo Anterior: $ " + saldoAnterior + "\nSaldo Actual: $ " + saldoCuenta);
        }
    } else { alert(mensajeError + "\n\nLa cuenta ingresada no corresponde a una cuenta habilitada para transferencias.\n\n" + mensajeReintento) }
}

/* GUÍA 3 - PASO 3. AGREGADO.
Esta función permite Agregar una Cuenta Amiga para trasnferir.
Se verifica que el formato ingresado sean sólo 7 números
y que sea diferente a los números de las 2 cuentas existentes.*/

function agregarNuevaCuentaAmiga() {
    nuevaCuentaAmiga = prompt(mensajeNuevaCuenta + "\n\nIngresa los 7 dígitos de la Cuenta Nueva.\nSólo números, sin puntos ni espacios.");
    if ((verificarQueSonSoloNumeros(nuevaCuentaAmiga) === undefined) && (nuevaCuentaAmiga.length === 7) && (nuevaCuentaAmiga != cuentaAmiga1) && (nuevaCuentaAmiga != cuentaAmiga2)) {
        alert(mensajeOperacionExitosa + "\n\nHabilitaste la Nueva Cuenta: " + nuevaCuentaAmiga);
        nuevaCuentaHabilitada = parseInt(nuevaCuentaAmiga);
    } else {
        alert(mensajeError + "\n\nEl número de Cuenta es incorrecto o ya existe.\n\n" + mensajeReintento);
    }
}

/* GUÍA 3 - PASO 4.
Funciones de Inicio de Sesión.

Se  inicia sesión con el primer botón del menú de opciones y se cierra la sesión
con el "botón" cerrar.
Se permiten mediante un bucle for 3 intentos fallidos de inicio de sesión.
Se verifica si la sesión ya está iniciada y de ser así se le avisa al usuario.
*/
function iniciarSesion() {
    denegarAccesoALaCuenta();
    if (inicioSesion == true) {
        alert(mensajeAtencion + "\n\nLa Sesión ya está iniciada.");
    }
    if (accesoDenegado == false) {
        for (i = 0; i < 3 && inicioSesion == false; i++) {
            codigoDeSesionIngresado = prompt(mensajeLogin + "\n\nIngresa tu clave para iniciar la sesión:\nPara este Ejercicio la clave es --> 2019\n");
            if (codigoDeSesionIngresado == codigoDeVerificacion && codigoDeSesionIngresado.length === 4) {
                nombreUsuario = "INVITADO PRUEBA";
                cargarNombreEnPantalla(nombreUsuario);
                alert(mensajeBanco + "\n\nBienvenido: " + nombreUsuario + "\n\nPuedes operar con tu Cuenta.");
                inicioSesion = true;
                actualizarSaldoEnPantalla();
            } else {
                alert(mensajeAtencion + "\n\nLa clave ingresada es incorrecta.\n\nInténtalo nuevamente, se permiten hasta 3 intentos fallidos.");
                if (i === 2) { accesoDenegado = true };
            }
        }
    }
}

/* GUÍA 3 - PASO 4.
Se le avisa al usuario que se bloquea la cuenta y el saldo se coloca en 0.
*/
function denegarAccesoALaCuenta() {
    if (accesoDenegado == true) {
        saldoCuenta = 0; //SE COLOCA SALDO CERO COMO PIDE EL EJERCICIO.
        actualizarSaldoEnPantalla(); // SE MUESTRA LA PANTALLA DE INICIO.
        alert(mensajeAtencion + "\n\nPor seguridad tu Cuenta ha sido bloqueada.\nDebes comunicarte con el Banco para volver a operar.\n 0800-999-3232 - Opción '1'. De 08:00 hs. a 20:00 hs.");
    }
}

/* GUÍA 3 - PASO 4. AGREGADO.
Función que permite al usuario finalizar su sesión.*/
function cerrarSesion() {
    if (inicioSesion == true) {
        var cierreDeSesion = confirm(mensajeAtencion + "\n\n¿Deseas abandonar la Sesión actual?\n");
        if (cierreDeSesion == true) {
            inicioSesion = false;
            cargarNombreEnPantalla("");
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();
            alert("\n***** SESIÓN FINALIZADA CON ÉXITO ****\n\nGracias por operar con VILLA MITRE HOME BANKING");
        }
    }
}

/* GUÍA 3 - PASO 4. AGREGADO.
Esta función exige al usuario inciar la sesión para poder operar con el HB.*/

function comprobarInicioDeSesion() {
    if (inicioSesion == false) {
        alert(mensajeAtencion + "\n\nDebes 'Iniciar Sesión' con tu clave para acceder a tu Cuenta.");
        exit;
    }
}

/* GUÍA 3 - VERIFICAR INGRESOS NULOS, VACÍOS Y NUMÉRICOS.

Las funciones a continuación evitan que se produzcan entradas incorrectas
de datos por parte del usuario, informándole respecto del error.
*/

function verificarValorNumerico(entrada) {
    if (isNaN(entrada) || (entrada === null) || (entrada === undefined)) {
        alert(mensajeError + "\n\nEl importe que ingresaste es incorrecto.\nVerifica que sea un valor numérico.\n\n" + mensajeReintento);
        return false;
    } else {
        return true;
    }
}

function verificarIngresoCero(importeIngresado) {
    if (importeIngresado == 0) {
        alert(mensajeError + "\n\nOmitiste ingresar importe o has ingresado 0 (cero).\n\n La operación no se ejecuta.\n\n" + mensajeReintento)
        return false;
    } else {
        return true;
    }
}

function verificarEntero(cadena) {
    for (var i = 0; i < cadena.length; i++) {
        var c = cadena.charCodeAt(i) - 0x30
        if (c < 0 || c > 9) {
            alert(mensajeError + "\n\nÚnicamente puedes ingresar números.\n\n" + mensajeReintento);
            i = cadena.length;
            return false;
        } else {
            return true;
        }
    }
}

/*Esta función se usa particularmente al agregar una nueva cuenta para transferir.
Impide que se ingresen caracteres que no sean números.*/

function verificarQueSonSoloNumeros(cadena) {
    for (var i = 0; i < cadena.length; i++) {
        var c = cadena.charCodeAt(i) - 0x30
        if (c == -2 || c < 0 || c > 9) {
            i = cadena.length;
            return false;
        }
    }
}

/* GUÍA 3 - AGREGA NUEVAS FUNCIONALIDADES AL HB.
Funcionalidad para el pago de las Tarjetas VISA y MASTERCARD.

Se presenta un total a pagar y un pago mínimo de la liquidación actual.
No se permite un pago inicial menor al mínimo, pero luego de efectuado este,
si se pueden realizar pagos parciales de cualquier importe, hasta llegar al total
de la liquidación.
No se permiten pagos a cuenta de futuras liquidaciones.
*/

function pagarTarjetas() {
    comprobarInicioDeSesion();
    tarjeta = parseInt(prompt(mensajeTarjetas + "\n\n1 <-- VISA * Vcto. 20/05/19\nTotal a Pagar: $ " + totalAPagarVisa + "\nPago Mínimo:  $" + pagoMinimoVisa + "\n\n2 <-- MASTERCARD * Vcto. 15/05/19\nTotal a Pagar: $ " + totalAPagarMastercard + "\nPago Mínimo:  $" + pagoMinimoMastercard));
    switch (tarjeta) {
        case 1:
            if (totalizadorPagadoVisa === liquidacionVisa || totalAPagarVisa === 0) {
                estadoVisa = "PAGADO";
                alert(mensajeAtencion + "\n\n¡Ya pagaste el total de tu tarjeta VISA!");
            } else {
                tarjeta = "VISA";
                montoAPagar = prompt(mensajeImporte + "\n\nIngresa el importe a pagar de tu Tarjeta VISA:\n");
                verificarPagoDeTarjeta(tarjeta);
            }
            break;
        case 2:
            if (totalizadorPagadoMastercard === liquidacionMastercard || totalAPagarMastercard === 0) {
                estadoMastercard = "PAGADO";
                alert(mensajeAtencion + "\n\n¡Ya pagaste el total de tu tarjeta MASTERCARD!");
            } else {
                tarjeta = "MASTERCARD";
                montoAPagar = prompt(mensajeImporte + "\n\nIngresa el importe a pagar de tu Tarjeta MASTERCARD:\n");
                verificarPagoDeTarjeta(tarjeta);
            }
            break;
        default:
            alert(mensajeAtencion + "\n\nDebes ingresar:\n\n1 para pagar VISA\n\n2 para pagar MASTERCARD.\n\n" + mensajeReintento);
            break;
    }
}

/* GUÍA 3 - AGREGA NUEVAS FUNCIONALIDADES AL HB.
Funcionalidad para el pago de las Tarjetas VISA y MASTERCARD.

Función que verifica formato correcto del importe ingresado y saldo suficiente en cuenta,
modifica importe pago mínimo a mostrar al cliente y saldo restante a pagar. 
*/

function verificarPagoDeTarjeta(tarjeta) {

    switch (tarjeta) {
        case "VISA":
            minimo = pagoMinimoVisa;
            total = totalAPagarVisa;
            break;
        case "MASTERCARD":
            minimo = pagoMinimoMastercard;
            total = totalAPagarMastercard;
            break;
    }
    if (verificarValorNumerico(montoAPagar) &&
        verificarSaldoSuficiente(montoAPagar) &&
        verificarIngresoCero(montoAPagar) &&
        verificarMinimoAPagarTarjeta(montoAPagar) &&
        verificarTotalAPagarTarjeta(montoAPagar)
    ) {
        montoAPagar = Number(montoAPagar);
        montoAPagar = parseFloat(montoAPagar);
        montoAPagar = montoAPagar.toFixed(2);
        var saldoAnterior = saldoCuenta;
        restarDinero(montoAPagar);
        if (tarjeta === "VISA") {
            totalizadorPagadoVisa += montoAPagar;
            totalizadorPagadoVisa = parseFloat(totalizadorPagadoVisa).toFixed(2);
            totalizadorPagadoVisa = Number(totalizadorPagadoVisa);
            totalAPagarVisa -= montoAPagar;
            totalAPagarVisa = parseFloat(totalAPagarVisa).toFixed(2);
            totalAPagarVisa = Number(totalAPagarVisa);
            if (totalizadorPagadoVisa >= pagoMinimoVisa) {
                pagoMinimoVisa = 0;
            }
        } else {
            totalizadorPagadoMastercard += montoAPagar;
            totalizadorPagadoMastercard = parseFloat(totalizadorPagadoMastercard).toFixed(2);
            totalizadorPagadoMastercard = Number(totalizadorPagadoMastercard);
            totalAPagarMastercard -= montoAPagar;
            totalAPagarMastercard = parseFloat(totalAPagarMastercard).toFixed(2);
            totalAPagarMastercard = Number(totalAPagarMastercard);
            if (totalizadorPagadoMastercard >= pagoMinimoMastercard) {
                pagoMinimoMastercard = 0;
            }
        }
        actualizarSaldoEnPantalla();
        alert(mensajeOperacionExitosa + "\n\nPago Tarjeta " + tarjeta + ": $ " + montoAPagar + "\n\n Saldo Anterior: $ " + saldoAnterior + "\nSaldo Actual: $ " + saldoCuenta);
        return true;
    } else {
        return false;
    }
}

/* GUÍA 3 - AGREGA NUEVAS FUNCIONALIDADES AL HB.
Funcionalidad para el pago de las Tarjetas VISA y MASTERCARD.

Esta función verifica que el pago inicial sea igual o mayor al pago mínimo.
*/

function verificarMinimoAPagarTarjeta(importeIngresado) {
    if (importeIngresado < minimo && totalizadorPagado < minimo) {
        alert(mensajeAtencion + "\n\nEl importe ingresado es menor al pago mínimo para esta liquidación.\n\nPago mínimo: $ " + minimo)
        return false;
    } else {
        return true
    }
}

/* GUÍA 3 - AGREGA NUEVAS FUNCIONALIDADES AL HB.
Funcionalidad para el pago de las Tarjetas VISA y MASTERCARD.

Esta función verifica que el pago no supere el total de la liquidación
e informa el saldo actual a pagar.
*/

function verificarTotalAPagarTarjeta(importeIngresado) {
    if (importeIngresado > total) {
        alert(mensajeAtencion + "\n\nNo puedes realizar pagos a cuenta.\n\nSaldo actual a pagar: $ " + total)
        return false;
    } else {
        return true;
    }
}

//Funciones que actualizan el valor de las variables en el HTML

function cargarNombreEnPantalla(nombreUsuario) {
    document.getElementById("nombre").innerHTML = "Bienvenido: " + nombreUsuario;
}

// Se presenta información de Saldo Actual ¡SÓLO! si se inicia la sesión correctamente.

function actualizarSaldoEnPantalla() {
    if (inicioSesion == false) {
        document.getElementById("titulo").innerHTML = "MEJORAR ES SABER ADÓNDE VAMOS";
        document.getElementById("saldo-cuenta").innerHTML = "BANCO CIUDAD";
        document.getElementById("limite-extraccion").innerHTML = "SIN OLVIDAR DE DÓNDE VENIMOS";
    } else {
        document.getElementById("titulo").innerHTML = "Saldo en tu Cuenta:";
        document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
        document.getElementById("limite-extraccion").innerHTML = "Límite de Extracción:  $" + limiteExtraccion;
    };
}

// Se presenta información de Límite de Extracción ¡SÓLO! si se inicia la sesión correctamente.

function actualizarLimiteEnPantalla() {
    if (inicioSesion == false) {
        document.getElementById("limite-extraccion").innerHTML = "SIN OLVIDAR DE DÓNDE VENIMOS";
    } else {
        document.getElementById("limite-extraccion").innerHTML = "Límite de Extracción:  $" + limiteExtraccion;
    };
}
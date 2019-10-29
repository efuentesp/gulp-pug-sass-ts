const generaTabDinamico = (idGenerado) => {
    let divPrincipal: string = "<div id='tabs-" + idGenerado + "'>";
    let tableGeneradas: string = divPrincipal +
        "<!--Inicia Tablas de llenado-->" +
        "<div class='column w-full overflow-auto' id='tablas_" + idGenerado + "'>" +
        "<table id='table_" + idGenerado + "'><tr><td></td></tr></table>" +
        "<div id='pager_contado'></div>" +
        "<table id='table_totales_" + idGenerado + "'><tr><td></td></tr></table>" +
        "<div id='pager_totales'></div>" +
        "</div>" +
        "<!--Termina Tablas de llenado-->";
    let divPortafolio: string = tableGeneradas +
        "<div class='row' id='graficaPortafolio_" + idGenerado + "'>" +
        "<div class='field-group items-center opcionesGraficaA'>";
    return divPortafolio;
};

const generaTabDinamicoD = (listaTipos, listaTotales) => {
    let trRentaFija: string = "";
    let tablaOperacion: string = "<!--Inicia Tabla de Operaciones -->" +
        "<table class='bg-gray-200 tblOpciones'>";
    for (var i = 0; i < listaTipos.length; i++) {
        var tipo = (listaTipos[i].tipoPos == 1 ? "RF" : listaTipos[i].tipoPos == 2 ? "RV" : "NE");
        var total = (listaTipos[i].tipoPos == 1 ? listaTotales.rf : listaTipos[i].tipoPos == 2 ? listaTotales.rv : listaTotales.ne);
        trRentaFija += "<tr class='border-solid border border-gray-500' id='titulo" + tipo + "'>" +
            "<td class='font-bold'>" + listaTipos[i].descrTipoPos + "</td>" +
            "<td class='cursor-pointer text-right' id='total" + tipo + "'> $ " + total + "</td>" +
            "</tr>";
    }
    tablaOperacion += trRentaFija;

    let trTotal: string = "<tr class='border-solid border border-gray-500'>" +
        "<td class='font-bold' id='tituloTotalCom'>Total</td>" +
        "<td class='cursor-pointer text-right' id='totalComp'> $ " + listaTotales.inver + "</td>" +
        "<tr class='border-solid border border-gray-500'>" +
        "<td class='font-bold'>Efectivo</td>" +
        "<td class='cursor-pointer text-right' id='totalEfec'></td></tr>" +
        "<tr class='border-solid border border-gray-500'>" +
        "<td class='cursor-pointer text-right' id='total'></td>" +
        "</tr></table>" +
        "<!--Termina Tabla de Operaciones -->";
    return tablaOperacion.concat(trTotal);
};

const graficasTabDinamico = (idGenerado) => {
    let emision: string = "<!--Inicia Select Emision-->" +
        "<div class='field is_vertical field_opcionesRenta' id='field_opcionesRenta_" + idGenerado + "'>" +
        "<div class='field-label flex'>" +
        "<label for='opcionesRenta'><span class='pr-3'></span></label>" +
        "</div>" +
        "<div class='field-control'>" +
        "<select class='select2' id='opcionesRenta' name='opcionesRenta' style='width: 15em;' data-parsley-trigger='change' data-parsley-errors-container='#field_error_block_opcionesRenta'>" +
        "<option></option>" +
        "</select>" +
        "<div class='field-error'>" +
        "<div id='field_error_block_opcionesRenta'>" +
        "</div></div></div></div>" +
        "<!--Termina Select Emision-->" +
        "<!-- Inicia Grafica pie -->" +
        "<div style='max-width: 800px;max-height: 800px; padding: 30px;'><canvas id='pieChart" + idGenerado + "'></canvas></div>" +
        "<!-- Termina Grafica pie --> </div>" +
        "<!--IniciaBloqueDos-->" +
        "<div class='field-group items-center' id='opcionesGraficaB'>" +
        "<div class='row'><p>Liquidez</p></div>" +
        "<div class='row'><div style='max-width: 600px;max-height: 150px; padding: 30px;'><canvas id='stackChartHijo" + idGenerado + "'></canvas></div></div>" +
        "<div class='row' id='rowDetalle'>" +
        "<table id='table_portafolio_" + idGenerado + "'><tr><td></td></tr></table>" +
        "<div id='pager_portafolio'></div>" +
        "</div></div>" +
        "<!--TerminaBloqueDos-->" +
        "</div></div>";
    return emision;
};
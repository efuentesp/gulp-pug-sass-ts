console.log("02-movimientos-por-contrato");
$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);
$("#input_fecha_inicial").datepicker(ui_datepicker_settings);
$("#input_fecha_final").datepicker(ui_datepicker_settings);
$("#movimientos_por_contrato_tab_group").tabs();
$("#datos_contrato_movimientos_tab_group").tabs();
$("#table_movimientos_contrato").jqGrid({
    url: "http://localhost:3000/fideicomiso",
    datatype: "json",
    mtype: "GET",
    colNames: [
        "Contrato",
        "Libro",
        "Cliente",
        "Digito",
        "TV",
        "Descr TV",
        "Emisora",
        "Serie",
        "Cantidad",
        "Precio",
        "Valuación",
        "Promotor",
        "Folio"
    ],
    colModel: [
        { name: "generalesnumero", width: 55 },
        { name: "generalesnombre", width: 90 },
        { name: "generalesadministrador", width: 80, align: "right" },
        { name: "generalespromotor", width: 80, align: "right" },
        { name: "caracteristicasformamanejo", width: 80, align: "right" },
        { name: "caracteristicastiponegocio", width: 150, sortable: false },
        { name: "caracteristicasproducto", width: 90 },
        { name: "caracteristicasmontoapertura", width: 90 },
        { name: "adicionalesnoescritura", width: 90 },
        { name: "caracteristicasfechaalta", width: 90 },
        { name: "adicionalesfechainscripcion", width: 90 },
        { name: "adicionalesnombrenotario", width: 90 },
        { name: "adicionalesnonotario", width: 90 }
    ],
    pager: "#pager_movimientos_contrato",
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "generalesnumero",
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});

//# sourceMappingURL=../../maps/accimarket/02-movimientos-por-contrato.js.map

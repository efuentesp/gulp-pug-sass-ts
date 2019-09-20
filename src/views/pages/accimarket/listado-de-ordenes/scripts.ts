$("#criterios_busqueda_ordenes").accordion(ui_accordion_settings);

$("#table_busquedaOrdenes").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Tipo",
        "Folio",
        "Contrato",
        "Emisora",
        "Digito",
        "Cliente",
        "Importe/Cantidad",
        "Perfil del Cliente al mometo de la Operacion",
        "Perfil del Producto al momento de la Operacion"

    ],
    colModel: [
        { name: "tipo", width: 55 },
        { name: "folio", width: 55 },
        { name: "contrato", width: 70 },
        { name: "emisora", width: 80 },
        { name: "digito", width: 50 },
        { name: "cliente", width: 100 },
        { name: "importeCantidad", width: 120 },
        { name: "perfCliente", width: 200 },
        { name: "perfProducto", width: 200 }
    ],
    pager: "#pager_busquedaOrdenes",
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "tipo",
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});
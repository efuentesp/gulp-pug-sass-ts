$("#busqueda").accordion(ui_accordion_settings);
$("#fechaInicial").datepicker(ui_datepicker_settings);
$("#fechaFinal").datepicker(ui_datepicker_settings);
$("#lineaNegocio").select2({
    minimumResultsForSearch: Infinity
});
$("#table_ventas").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Folio Trans",
        "Fecha Concertacion",
        "Fecha Liquidacion",
        "Operacion",
        "Hr. Captura",
        "Fec. Ult. Mov Compra",
        "Emisora",
        "Serie",
        "Cupon",
        "Tipo Valor",
        "ISIN"
    ],
    colModel: [
        { name: "contrato" },
        { name: "libro" },
        { name: "cliente" },
        { name: "digito", width: 80 },
        { name: "tv", width: 80 },
        { name: "descr_tv", width: 150 },
        { name: "emisora", width: 90 },
        { name: "serie", width: 80 },
        { name: "fecha", width: 90 },
        { name: "fechaFinal", width: 90 },
        { name: "negocio", width: 90 }
    ],
    pager: "#pager_ventas",
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "ventas",
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});
var ventas_params = {};
http_findAll("contratos", ventas_params, function (payload) {
    $("#totalreg").val(payload.length);
    fillJqGrid("#table_ventas", payload);
});
var formu = $("#criterios-busqueda")
    .parsley()
    .on("field:validated", function () {
    var ok = $(".parsley-error").length === 0;
})
    .on("form:submit", function () {
    console.log("form:submit");
    ventas_params = {};
    var fechaInicial = $("#fechaInicial").val();
    var fechaFinal = $("#fechaFinal").val();
    var lineaNegocio = $("#lineaNegocio").val();
    if (fechaInicial) {
        ventas_params.fecha = fechaInicial;
    }
    if (fechaFinal) {
        ventas_params.fechaFinal = fechaFinal;
    }
    if (lineaNegocio) {
        ventas_params.negocio = lineaNegocio;
    }
    http_findAll("contratos", ventas_params, function (payload) {
        $("#totalreg").val(payload.length);
        fillJqGrid("#table_ventas", payload);
    });
    return false;
});

//# sourceMappingURL=../../../maps/accimarket/ejemplo/scripts.js.map

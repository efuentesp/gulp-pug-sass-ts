console.log("01-caucion-bursatil");
$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);
$("#fecha").datepicker(ui_datepicker_settings);
var rest_url = REST_URL + "/fideicomiso";
$("#btn_plus_contrato").click(function () {
    var text_to_add = $("#contrato").val();
    console.log(text_to_add);
    $("ul#tag_list_contrato").append($("<li>").text(text_to_add));
    $("#contrato").val("");
});
$("ul#tag_list_contrato li").click(function () {
    console.log("li clicked!");
});
$("#table_contratos").jqGrid({
    datatype: "local",
    height: 250,
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
        "Folio",
        "Fecha",
        "Negocio"
    ],
    colModel: [
        { name: "contrato", width: 55 },
        { name: "libro", width: 90 },
        { name: "cliente", width: 80, align: "right" },
        { name: "digito", width: 80, align: "right" },
        { name: "tv", width: 80, align: "right" },
        { name: "descr_tv", width: 150, sortable: false },
        { name: "emisora", width: 90 },
        { name: "serie", width: 90 },
        { name: "cantidad", width: 90 },
        { name: "precio", width: 90 },
        { name: "valuacion", width: 90 },
        { name: "promotor", width: 90 },
        { name: "folio", width: 90 },
        { name: "fecha", width: 90 },
        { name: "negocio", width: 90 }
    ],
    pager: "#pager_contratos",
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "contrato",
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});
var contratos_params = {};
http_findAll("contratos", contratos_params, function (payload) {
    fillJqGrid("#table_contratos", payload);
});
var form = $("#criterios-busqueda")
    .parsley()
    .on("field:validated", function () {
    var ok = $(".parsley-error").length === 0;
})
    .on("form:submit", function () {
    console.log("form:submit");
    contratos_params = {};
    var fecha = $("#fecha").val();
    var contrato = $("#contrato").val();
    var digito = $("#digito").val();
    var negocio = $("input[name='negocio']:checked").val();
    if (fecha) {
        contratos_params.fecha = fecha;
    }
    if (contrato) {
        contratos_params.contrato = contrato;
    }
    if (digito) {
        contratos_params.digito = digito;
    }
    if (negocio) {
        contratos_params.negocio = negocio;
    }
    http_findAll("contratos", contratos_params, function (payload) {
        fillJqGrid("#table_contratos", payload);
    });
    return false;
});

//# sourceMappingURL=../../../maps/accimarket/01-caucion-bursatil/scripts.js.map

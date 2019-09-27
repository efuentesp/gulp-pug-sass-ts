/// <reference path="../../typings/index.d.ts" />

// $("#busqueda").accordion(ui_accordion_settings);

$("#fechaInicial").datepicker(ui_datepicker_settings);

$("#fechaFinal").datepicker(ui_datepicker_settings);

($("#lineaNegocio") as any).select2({
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

// Form validations
let ventas_params: UrlParams = {};

http_findAll("contratos", ventas_params, payload => {
  $("#totalreg").val(payload.length);
  fillJqGrid("#table_ventas", payload);
});

const formu = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
  })
  .on("form:submit", () => {
    console.log("form:submit");

    ventas_params = {};

    const fechaInicial = $("#fechaInicial").val();
    const fechaFinal = $("#fechaFinal").val();
    const lineaNegocio = $("#lineaNegocio").val();

    if (fechaInicial) {
      ventas_params.fecha = fechaInicial;
    }
    if (fechaFinal) {
      ventas_params.fechaFinal = fechaFinal;
    }
    if (lineaNegocio) {
      ventas_params.negocio = lineaNegocio;
    }

    http_findAll("contratos", ventas_params, payload => {
      $("#totalreg").val(payload.length);
      fillJqGrid("#table_ventas", payload);
    });

    return false;
  });

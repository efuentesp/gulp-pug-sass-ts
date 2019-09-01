/// <reference path="../../typings/index.d.ts" />

console.log("01-caucion-bursatil");

$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);

$("#fecha").datepicker(ui_datepicker_settings);

const rest_url = `${REST_URL}/fideicomiso`;

$("#btn_plus_contrato").click(() => {
  const text_to_add = $("#contrato").val() as string;
  console.log(text_to_add);
  $("ul#tag_list_contrato").append($("<li>").text(text_to_add));
  $("#contrato").val("");
});

$("ul#tag_list_contrato li").click(() => {
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

// Form validations
let contratos_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

http_findAll("contratos", contratos_params, payload => {
  fillJqGrid("#table_contratos", payload);
});

const form = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", () => {
    console.log("form:submit");

    contratos_params = {};

    const fecha = $("#fecha").val();
    const contrato = $("#contrato").val();
    const digito = $("#digito").val();
    const negocio = $("input[name='negocio']:checked").val();

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

    http_findAll("contratos", contratos_params, payload => {
      fillJqGrid("#table_contratos", payload);
    });

    return false;
  });

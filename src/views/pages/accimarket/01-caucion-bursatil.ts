console.log("01-caucion-bursatil");

$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);

$("#date").datepicker(ui_datepicker_settings);

const rest_url = `${REST_URL}/fideicomiso`;

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
    "Folio"
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
    { name: "folio", width: 90 }
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
const form = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    console.log("Errores de validación")
    $(".callout-info").toggleClass("hidden", !ok);
    $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", () => {
    console.log("form:submit");

    const $inputs = $('#myForm :input');

    let values = {};
    $inputs.each(() => {
        values[this.id] = $(this).val();
    });

    alert("Form ready to be sent!");
    return false;
  });

const contratos_params = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

http_findAll("contratos", contratos_params, payload => {
  fillJqGrid("#table_contratos", payload)
});

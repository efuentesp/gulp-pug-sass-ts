// const today = new Date();
// const dd = String(today.getDate()).padStart(2, '0');
// const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// const yyyy = today.getFullYear();

// const fecha_actual = dd + '-' + mm + '-' + yyyy;
// $("#fecha_banda").val(fecha_actual);


($("#grupo") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});

($("#instrumento") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});

let cotizacion_reporto_params: UrlParams = {};

http_findAll("cotizacion_reporto", cotizacion_reporto_params, payload => {
  llenaGridCotizacionReporto(payload);
});

const llenaGridCotizacionReporto = (cotizacion_reporto: any) => {
  const gridWidth = $("#div-spreads-grid")
  .parent()
  .width();

  $("#table_grid_cotizacion_reportos").jqGrid({
    data: cotizacion_reporto,
    datatype: "local",
    toppager: true,
    pgtext: "P\u00E1gina {0} de {1}",
    viewrecords: true,
    autoWidth: true,
    forceFit: true,
    // width: gridWidth,
    height: "auto",
    shrinkToFit: false,
    rowList: [10, 20, 30],
    colNames: [
      "Grupo",
      "Instrumento",
      "Plazo",
      "Rango",
      "Tasa"
    ],
    colModel: [
      {
        name: "grupo",
        index: "grupo",
        align: "center",
        width: 100,
        sortable: true
      },
      { name: "instrumento", index: "instrumento", align: "center", width: 150, sortable: true },
      { name: "plazo", index: "plazo", align: "center", width: 150, sortable: true },
      { name: "rango", index: "rango", align: "center", width: 200, sortable: true },
      { name: "tasa", index: "tasa", align: "center", width: 150, sortable: true }
    ]
  });
};

$(window).on("resize", function() {
  const gridWidth = $("#div-spreads-grid")
    .parent()
    .width();
  $("#table_grid_cotizacion_reportos").jqGrid("setGridWidth", gridWidth, true);
});

($("#criterios-busqueda") as any)
  .parsley()
  .on("field:success", (e) => {
    console.log(e);
    removeErrorsInAttrTitle(e);
  })
  .on("field:error", (e) => {
    // console.log(e);
    putErrorsInAttrTitle(e);
  })
  .on("form:submit", e => {
    console.log("form:submit", e);

    // contratos_params = {};

    // const fecha = $("#fecha").val();
    // const negocio = getOptionSelected("negocio");

    // let listContrato = getList("contrato");
    // let listDigito = getList("digito");
    // console.log(listDigito);

    // let productTypes = getChecked("products3");

    // if (fecha) {
    //   contratos_params.fecha = fecha;
    // }

    // if (listContrato.length > 0) {
    //   contratos_params.contrato = listContrato;
    // }

    // if (listDigito.length > 0) {
    //   contratos_params.digito = listDigito;
    // }

    // if (negocio) {
    //   contratos_params.negocio = negocio;
    // }

    // if (productTypes.length > 0) {
    //   contratos_params.product = productTypes;
    // }

    // http_findAll("contratos", contratos_params, payload => {
    //   // console.log(payload);
    //   console.log("INGRESA A LA FUNCION  FINDALL CONTRATOS 2");
    //   $("#table_contratos").jqGrid("clearGridData");
    //   $("#table_contratos").jqGrid("setGridParam", { data: payload });
    //   $("#table_contratos").trigger("reloadGrid");
    //   const rec_count = payload.length;
    //   $("#count_contratos").html(rec_count);
    //   // console.log(rec_count);
    // });

    return false;
  });
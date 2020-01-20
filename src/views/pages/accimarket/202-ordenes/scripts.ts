$('.amSidebarCollapsibleButton').on('click', function() {
  $('#divSidebarWrapperAside .amSidebar').toggleClass('amIsClosed');
});


fieldPlusMinus("contrato", {});
fieldPlusMinus("digito", { maxsize: 5 }); // Max number of elements
fieldSelectPlusAutocomplete("ejemplo", {});


($("#cmbEmisora") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});


($("#cmbSerie") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});


($("#cmbTipoValor") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});


($("#cmbOperacion") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});

$("#dtgContratosDirectos").jqGrid({
  datatype: "local",
  colNames: [
      "Stat Envio",
      "Contrato",
      "Dígito",
      "Perfil del Contrato",
      "Saldo",
      "Posición",
      "Monto a Invertir",
      "Títulos",
      "Fecha Valor",
      "Orden",
      "Emisora/serie",
      "Tipo valor",
      "Precio Banda",
      "Precio Pactado",
      "Spread",
      "Servicio de Inversión",
      "Medio de cierre",
      "Red",
      "Prioridad",
      "Medio de Liquidación"
  ],
  colModel: [
      { name: "stat_envio", index: "stat_envio", align: "center", width: 100, sortable: true },
      { name: "contrato", index: "contrato", align: "center", width: 100, sortable: true },
      { name: "digito", index: "digito", align: "center", width: 200, sortable: true },
      { name: "perfil_del_contrato", index: "perfil_del_contrato", align: "center", width: 50, sortable: true },
      { name: "saldo", index: "saldo", align: "center", width: 100, sortable: true },
      { name: "posicion", index: "posicion", align: "center", width: 100, sortable: true },
      { name: "monto_a_invertir", index: "monto_a_invertir", align: "center", width: 200, sortable: true },
      { name: "titulos", index: "titulos", align: "center", width: 50, sortable: true },
      { name: "fecha_valor", index: "fecha_valor", align: "center", width: 100, sortable: true },
      { name: "orden", index: "orden", align: "center", width: 100, sortable: true },
      { name: "emisora_serie", index: "emisora_serie", align: "center", width: 200, sortable: true },
      { name: "tipo_valor", index: "tipo_valor", align: "center", width: 50, sortable: true },
      { name: "precio_banda", index: "precio_banda", align: "center", width: 100, sortable: true },
      { name: "precio_pactado", index: "precio_pactado", align: "center", width: 100, sortable: true },
      { name: "spread", index: "spread", align: "center", width: 200, sortable: true },
      { name: "servicio_de_inversion", index: "servicio_de_inversion", align: "center", width: 50, sortable: true },
      { name: "medio_de_cierre", index: "medio_de_cierre", align: "center", width: 100, sortable: true },
      { name: "red", index: "red", align: "center", width: 100, sortable: true },
      { name: "prioridad", index: "prioridad", align: "center", width: 200, sortable: true },
      { name: "medio_de_liquidacion", index: "medio_de_liquidacion", align: "center", width: 50, sortable: true }
  ],
  toppager: true,
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
});


$("#dtgEnviosDirectos").jqGrid({
  datatype: "local",
  colNames: [
      "Envíos",
      "Folío operación",
      "Contrato",
      "Nombre",
      "Dígito",
      "Monto",
      "Títulos",
      "Precio Pactado",
      "Spread",
      "Servicio de Inversión",
      "Medio de cierre",
      "Red",
      "Prioridad",
      "Medio de Liquidación",
      "Sts",
      "Fuera de precio",
      "Observación",
      "Flujo"
  ],
  colModel: [
      { name: "envios", index: "envios", align: "center", width: 100, sortable: true },
      { name: "folio_de_operacion", index: "folio_de_operacion", align: "center", width: 100, sortable: true },
      { name: "contrato", index: "contrato", align: "center", width: 100, sortable: true },
      { name: "nombre", index: "nombre", align: "center", width: 100, sortable: true },
      { name: "digito", index: "digito", align: "center", width: 200, sortable: true },
      { name: "monto", index: "monto", align: "center", width: 50, sortable: true },
      { name: "titulos", index: "titulos", align: "center", width: 50, sortable: true },
      { name: "precio_pactado", index: "precio_pactado", align: "center", width: 100, sortable: true },
      { name: "spread", index: "spread", align: "center", width: 200, sortable: true },
      { name: "servicio_de_inversion", index: "servicio_de_inversion", align: "center", width: 50, sortable: true },
      { name: "medio_de_cierre", index: "medio_de_cierre", align: "center", width: 100, sortable: true },
      { name: "red", index: "red", align: "center", width: 100, sortable: true },
      { name: "prioridad", index: "prioridad", align: "center", width: 200, sortable: true },
      { name: "medio_de_liquidacion", index: "medio_de_liquidacion", align: "center", width: 50, sortable: true },
      { name: "sts", index: "sts", align: "center", width: 100, sortable: true },
      { name: "fuera_de_precio", index: "fuera_de_precio", align: "center", width: 100, sortable: true },
      { name: "observacion", index: "observacion", align: "center", width: 200, sortable: true },
      { name: "flujo", index: "flujo", align: "center", width: 100, sortable: true }
  ],
  toppager: true,
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
});

$("#dtgErroresDirectos").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
      "Observación",
      "Contrato",
      "Nombre",
      "Dígito",
      "Perfil del contrato",
      "Monto",
      "Títulos",
      "Precio pactado",
      "Spread",
      "Servicio de inversión",
      "Medio de cierre",
      "Red",
      "Prioridad",
      "Medio de liquidación"
  ],
  colModel: [
      { name: "observacion", index: "observacion", align: "center", width: 100, sortable: true },
      { name: "contrato", index: "contrato", align: "center", width: 100, sortable: true },
      { name: "nombre", index: "nombre", align: "center", width: 200, sortable: true },
      { name: "digito", index: "digito", align: "center", width: 50, sortable: true },
      { name: "perfil_del_contrato", index: "perfil_del_contrato", align: "center", width: 100, sortable: true },
      { name: "monto", index: "monto", align: "center", width: 100, sortable: true },
      { name: "titulos", index: "titulos", align: "center", width: 50, sortable: true },
      { name: "precio_pactado", index: "precio_pactado", align: "center", width: 100, sortable: true },
      { name: "spread", index: "spread", align: "center", width: 200, sortable: true },
      { name: "servicio_de_inversion", index: "servicio de_inversion", align: "center", width: 50, sortable: true },
      { name: "medio_de_cierre", index: "medio_de_cierre", align: "center", width: 100, sortable: true },
      { name: "red", index: "red", align: "center", width: 100, sortable: true },
      { name: "prioridad", index: "prioridad", align: "center", width: 200, sortable: true },
      { name: "medio_de_liquidacion", index: "medio_de_liquidacion", align: "center", width: 50, sortable: true }
    ],
    toppager: true,
    rowNum: 10,
    rowList: [10, 20, 30],
    sortorder: "desc",
    viewrecords: true
});

($("#criteriosBusqueda") as any)
  .parsley()
  .on("field:success", (e) => {
    removeErrorsInAttrTitle(e);
  })
  .on("field:error", (e) => {
    putErrorsInAttrTitle(e);
  })
  .on("form:submit", e => {
    // console.log("form:submit", e);
    // console.log("INGRESA A LA FUNCION  DE FORMM SUBMIT");
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

    // httpFindAll("contratos", contratos_params, payload => {
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

  
($("#criteriosDatos") as any)
.parsley()
.on("field:success", (e) => {
  removeErrorsInAttrTitle(e);
})
.on("field:error", (e) => {
  putErrorsInAttrTitle(e);
})
.on("form:submit", e => {
  
    // console.log("form:submit", e);
    // console.log("INGRESA A LA FUNCION  DE FORMM SUBMIT");
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

    // httpFindAll("contratos", contratos_params, payload => {
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

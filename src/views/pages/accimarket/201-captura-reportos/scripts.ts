// const todayCapReport = new Date();
// const ddCapReport = String(today.getDate());
// const mmCapReport = String(today.getMonth() + 1); //January is 0!
// const yyyyCapReport = today.getFullYear();

// const fecha_actualCapReport = ddCapReport + '-' + mmCapReport + '-' + yyyyCapReport;
// $("#fecha_banda").val(fecha_actualCapReport);

$('.sidebar-collapsible-button').on('click', function() {
  $('#sidebar_wrapper_aside .sidebar').toggleClass('isClosed');
});

($("#cboGrupo") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});

($("#cboInstrumento") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});

fieldPlusMinus("contrato", {});
fieldPlusMinus("digito", {});

http_findAll("grupos", {}, payload => {
  ($("#cboGrupo") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

let capReportsideBar:boolean = $(".sidebar").attr("expand") == "true";
if( capReportsideBar ){
  $(".sidebar_content").parent().attr("style", "width: 250px !important;");

  $(".sidebar_content").addClass("is_open");
  $(".sidebar_button").addClass("is_open");
  $(".content").addClass("is_sidebar_open");
}

http_findAll("instrumentos", {}, payload => {
  ($("#cboInstrumento") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});


let captura_reportos_params: UrlParams = {};


//NOTA: GRID DE BANDAS
const llenaGridCapturaReporto = (captura_reportos: any) => {
  console.log("ENTRA A LLAMADA")
  $("#table_gridBandas").jqGrid({
    data: captura_reportos,
    datatype: "local",
    shrinkToFit: false,
    toppager: true,
    gridview: true,
    pgtext: "P\u00E1gina {0} de {1}",
    recordtext: "Mostrando {0} - {1} de {2}",
    pagerpos: "center",
    viewrecords: true,
    forceFit: true,
    rowNum: 20,
    rowList: [10, 20, 30],
    colNames: [
      "Grupo",
      "Instrumento",
      "Plazo",
      "Tasa"
    ],
    colModel: [
      { name: "grupo", index: "grupo", align: "center", width: 170, sortable: true },
      { name: "instrumento", index: "instrumento", align: "center", width: 100, sortable: true },
      { name: "plazo", index: "plazo", align: "center", width: 100, sortable: true },
      { name: "tasa", index: "tasa", align: "center", width: 150, sortable: true }
    ]
  });
  console.log("TERMINA LLAMADA")
};

let contratos_reportos_params: UrlParams = {};

//GRID LLENAR CONTRATOS
const llenaGridContratosReportos = (contratos_reportos: any) => {
  console.log("ENTRA A CONTRATOS")
  $("#table_gridContratos").jqGrid({
    data: contratos_reportos,
    datatype: "local",
    shrinkToFit: false,
    toppager: true,
    gridview: true,
    pgtext: "P\u00E1gina {0} de {1}",
    recordtext: "Mostrando {0} - {1} de {2}",
    pagerpos: "center",
    viewrecords: true,
    forceFit: true,
    rowNum: 20,
    rowList: [10, 20, 30],
    colNames: [
      "id_Renglon",
      "status Envio",
      "contrato",
      "nombre",
      "digito",
      "perfil_del_Contrato",
      "saldo_Disponible",
      "fecha_Banda",
      "grupo",
      "instrumento",
      "fecha_Vencimiento",
      "monto_a_Invertir",
      "tasa_Pactada",
      "plazo_Operacion",
      "servicio_de_Inversion",
      "tasa_Maxima",
      "spread",
      "prioridad",
      "medio_de_Liquidacion_Inicio(Cargos)",
      "medio_de_Liquidacion_Inicio(Abonos)",
      "art.194",
      "fechaLiq",
      "idClasif",
      "idDescParamTipoTasa",
      "idUsrGpo",
      "isGpoUser",
      "plazo_Ini",
      "plazo_Fin",
      "saldo_Banda",
      "arrayServicioInversion",
      "idBanda",
      "descripCortaLinea",
      "recomend"
    ],
    colModel: [
      {
        name: "grupo",
        index: "grupo",
        align: "center",
        width: 100,
        sortable: true
      },
      { name: "id_Renglon", index: "id_Renglon", align: "center", width: 100, sortable: true },
      { name: "status_Envio", index: "status Envio", align: "center", width: 100, sortable: true },
      { name: "contrato", index: "contrato", align: "center", width: 50, sortable: true },
      { name: "nombre", index: "nombre", align: "center", width: 50, sortable: true },
      { name: "Digito", index: "Digito", align: "center", width: 50, sortable: true },
      { name: "Perfil_Contrato", index: "Perfil_Contrato", align: "center", width: 50, sortable: true },
      { name: "saldo_Disponible", index: "saldo_Disponible", align: "center", width: 50, sortable: true },
      { name: "fecha_Banda", index: "fecha_Banda", align: "center", width: 50, sortable: true },
      { name: "grupo", index: "grupo", align: "center", width: 50, sortable: true },
      { name: "instrumento", index: "instrumento", align: "center", width: 50, sortable: true },
      { name: "fecha_Vencimiento", index: "fecha_Vencimiento", align: "center", width: 50, sortable: true },
      { name: "monto_a_Invertir", index: "monto_a_Invertir", align: "center", width: 50, sortable: true },
      { name: "tasa_Pactada", index: "tasa_Pactada", align: "center", width: 50, sortable: true },
      { name: "plazo_Operacion", index: "plazo_Operacion", align: "center", width: 50, sortable: true },
      { name: "servicio_de_Inversion", index: "servicio_de_Inversion", align: "center", width: 50, sortable: true },
      { name: "tasa_Maxima", index: "tasa_Maxima", align: "center", width: 50, sortable: true },
      { name: "spread", index: "spread", align: "center", width: 50, sortable: true },
      { name: "prioridad", index: "prioridad", align: "center", width: 50, sortable: true },
      { name: "liquidacion(Cargos)", index: "liquidacion(Cargos)", align: "center", width: 50, sortable: true },
      { name: "liquidacion(Abonos)", index: "liquidacion(Abonos)", align: "center", width: 50, sortable: true },
      { name: "art.194", index: "art.194", align: "center", width: 50, sortable: true },
      { name: "fechaLiq", index: "fechaLiq", align: "center", width: 50, sortable: true },
      { name: "idClasif", index: "idClasif", align: "center", width: 50, sortable: true },
      { name: "idDescParamTipoTasa", index: "idDescParamTipoTasa", align: "center", width: 50, sortable: true },
      { name: "idUsrGpo", index: "idUsrGpo", align: "center", width: 50, sortable: true },
      { name: "plazo_Ini", index: "plazo_Ini", align: "center", width: 50, sortable: true },
      { name: "plazo_Fin", index: "plazo_Fin", align: "center", width: 50, sortable: true },
      { name: "saldo_Banda", index: "saldo_Banda", align: "center", width: 50, sortable: true },
      { name: "arrayServicioInversion", index: "arrayServicioInversion", align: "center", width: 50, sortable: true },
      { name: "idBanda", index: "idBanda", align: "center", width: 50, sortable: true },
      { name: "descripCortaLinea", index: "descripCortaLinea", align: "center", width: 50, sortable: true },
      { name: "recomend", index: "recomend", align: "center", width: 50, sortable: true },
    ]
  });
  console.log("TERMINA CONTRATOS")
};

let envios_reportos_params: UrlParams = {};

//GRID LLENAR CONTRATOS
const llenaGridEnviosReportos = (envios_reportos: any) => {
  console.log("ENTRA A Envios")
  $("#table_gridEnviados").jqGrid({
    data: envios_reportos,
    datatype: "local",
    shrinkToFit: false,
    toppager: true,
    gridview: true,
    pgtext: "P\u00E1gina {0} de {1}",
    recordtext: "Mostrando {0} - {1} de {2}",
    pagerpos: "center",
    viewrecords: true,
    forceFit: true,
    rowNum: 20,
    rowList: [10, 20, 30],
    colNames: [
      "id_Renglon",
      "status Envio",
      "contrato",
      "nombre",
      "digito",
      "perfil_del_Contrato",
      "saldo_Disponible",
      "fecha_Banda",
      "grupo",
      "instrumento",
      "fecha_Vencimiento",
      "monto_a_Invertir",
      "tasa_Pactada",
      "plazo_Operacion",
      "servicio_de_Inversion",
      "tasa_Maxima",
      "spread",
      "prioridad",
      "medio_de_Liquidacion_Inicio(Cargos)",
      "medio_de_Liquidacion_Inicio(Abonos)",
      "art.194",
      "fechaLiq",
      "idClasif",
      "idDescParamTipoTasa",
      "idUsrGpo",
      "isGpoUser",
      "plazo_Ini",
      "plazo_Fin",
      "saldo_Banda",
      "arrayServicioInversion",
      "idBanda",
      "descripCortaLinea",
      "recomend"
    ],
    colModel: [
      { name: "grupo", index: "grupo", align: "center", width: 100, sortable: true },
      { name: "id_Renglon", index: "id_Renglon", align: "center", width: 100, sortable: true },
      { name: "status_Envio", index: "status Envio", align: "center", width: 100, sortable: true },
      { name: "contrato", index: "contrato", align: "center", width: 50, sortable: true },
      { name: "nombre", index: "nombre", align: "center", width: 50, sortable: true },
      { name: "Digito", index: "Digito", align: "center", width: 50, sortable: true },
      { name: "Perfil_Contrato", index: "Perfil_Contrato", align: "center", width: 50, sortable: true },
      { name: "saldo_Disponible", index: "saldo_Disponible", align: "center", width: 50, sortable: true },
      { name: "fecha_Banda", index: "fecha_Banda", align: "center", width: 50, sortable: true },
      { name: "grupo", index: "grupo", align: "center", width: 50, sortable: true },
      { name: "instrumento", index: "instrumento", align: "center", width: 50, sortable: true },
      { name: "fecha_Vencimiento", index: "fecha_Vencimiento", align: "center", width: 50, sortable: true },
      { name: "monto_a_Invertir", index: "monto_a_Invertir", align: "center", width: 50, sortable: true },
      { name: "tasa_Pactada", index: "tasa_Pactada", align: "center", width: 50, sortable: true },
      { name: "plazo_Operacion", index: "plazo_Operacion", align: "center", width: 50, sortable: true },
      { name: "servicio_de_Inversion", index: "servicio_de_Inversion", align: "center", width: 50, sortable: true },
      { name: "tasa_Maxima", index: "tasa_Maxima", align: "center", width: 50, sortable: true },
      { name: "spread", index: "spread", align: "center", width: 50, sortable: true },
      { name: "prioridad", index: "prioridad", align: "center", width: 50, sortable: true },
      { name: "liquidacion(Cargos)", index: "liquidacion(Cargos)", align: "center", width: 50, sortable: true },
      { name: "liquidacion(Abonos)", index: "liquidacion(Abonos)", align: "center", width: 50, sortable: true },
      { name: "art.194", index: "art.194", align: "center", width: 50, sortable: true },
      { name: "fechaLiq", index: "fechaLiq", align: "center", width: 50, sortable: true },
      { name: "idClasif", index: "idClasif", align: "center", width: 50, sortable: true },
      { name: "idDescParamTipoTasa", index: "idDescParamTipoTasa", align: "center", width: 50, sortable: true },
      { name: "idUsrGpo", index: "idUsrGpo", align: "center", width: 50, sortable: true },
      { name: "plazo_Ini", index: "plazo_Ini", align: "center", width: 50, sortable: true },
      { name: "plazo_Fin", index: "plazo_Fin", align: "center", width: 50, sortable: true },
      { name: "saldo_Banda", index: "saldo_Banda", align: "center", width: 50, sortable: true },
      { name: "arrayServicioInversion", index: "arrayServicioInversion", align: "center", width: 50, sortable: true },
      { name: "idBanda", index: "idBanda", align: "center", width: 50, sortable: true },
      { name: "descripCortaLinea", index: "descripCortaLinea", align: "center", width: 50, sortable: true },
      { name: "recomend", index: "recomend", align: "center", width: 50, sortable: true },
    ]
  });
  console.log("TERMINA Envios")
};

//GRID LLENAR CONTRATOS
const llenaGridErroresReportos = (envios_reportos: any) => {
  console.log("ENTRA A Errores")
  $("#table_gridErrores").jqGrid({
    data: envios_reportos,
    datatype: "local",
    shrinkToFit: false,
    toppager: true,
    gridview: true,
    pgtext: "P\u00E1gina {0} de {1}",
    recordtext: "Mostrando {0} - {1} de {2}",
    pagerpos: "center",
    viewrecords: true,
    forceFit: true,
    rowNum: 20,
    rowList: [10, 20, 30],
    colNames: [
      "id_Renglon",
      "status Envio",
      "contrato",
      "nombre",
      "digito",
      "perfil_del_Contrato",
      "saldo_Disponible",
      "fecha_Banda",
      "grupo",
      "instrumento",
      "fecha_Vencimiento",
      "monto_a_Invertir",
      "tasa_Pactada",
      "plazo_Operacion",
      "servicio_de_Inversion",
      "tasa_Maxima",
      "spread",
      "prioridad",
      "medio_de_Liquidacion_Inicio(Cargos)",
      "medio_de_Liquidacion_Inicio(Abonos)",
      "art.194",
      "fechaLiq",
      "idClasif",
      "idDescParamTipoTasa",
      "idUsrGpo",
      "isGpoUser",
      "plazo_Ini",
      "plazo_Fin",
      "saldo_Banda",
      "arrayServicioInversion",
      "idBanda",
      "descripCortaLinea",
      "recomend"
    ],
    colModel: [
      {
        name: "grupo",
        index: "grupo",
        align: "center",
        width: 100,
        sortable: true
      },
      { name: "id_Renglon", index: "id_Renglon", align: "center", width: 100, sortable: true },
      { name: "status_Envio", index: "status Envio", align: "center", width: 100, sortable: true },
      { name: "contrato", index: "contrato", align: "center", width: 50, sortable: true },
      { name: "nombre", index: "nombre", align: "center", width: 50, sortable: true },
      { name: "Digito", index: "Digito", align: "center", width: 50, sortable: true },
      { name: "Perfil_Contrato", index: "Perfil_Contrato", align: "center", width: 50, sortable: true },
      { name: "saldo_Disponible", index: "saldo_Disponible", align: "center", width: 50, sortable: true },
      { name: "fecha_Banda", index: "fecha_Banda", align: "center", width: 50, sortable: true },
      { name: "grupo", index: "grupo", align: "center", width: 50, sortable: true },
      { name: "instrumento", index: "instrumento", align: "center", width: 50, sortable: true },
      { name: "fecha_Vencimiento", index: "fecha_Vencimiento", align: "center", width: 50, sortable: true },
      { name: "monto_a_Invertir", index: "monto_a_Invertir", align: "center", width: 50, sortable: true },
      { name: "tasa_Pactada", index: "tasa_Pactada", align: "center", width: 50, sortable: true },
      { name: "plazo_Operacion", index: "plazo_Operacion", align: "center", width: 50, sortable: true },
      { name: "servicio_de_Inversion", index: "servicio_de_Inversion", align: "center", width: 50, sortable: true },
      { name: "tasa_Maxima", index: "tasa_Maxima", align: "center", width: 50, sortable: true },
      { name: "spread", index: "spread", align: "center", width: 50, sortable: true },
      { name: "prioridad", index: "prioridad", align: "center", width: 50, sortable: true },
      { name: "liquidacion(Cargos)", index: "liquidacion(Cargos)", align: "center", width: 50, sortable: true },
      { name: "liquidacion(Abonos)", index: "liquidacion(Abonos)", align: "center", width: 50, sortable: true },
      { name: "art.194", index: "art.194", align: "center", width: 50, sortable: true },
      { name: "fechaLiq", index: "fechaLiq", align: "center", width: 50, sortable: true },
      { name: "idClasif", index: "idClasif", align: "center", width: 50, sortable: true },
      { name: "idDescParamTipoTasa", index: "idDescParamTipoTasa", align: "center", width: 50, sortable: true },
      { name: "idUsrGpo", index: "idUsrGpo", align: "center", width: 50, sortable: true },
      { name: "plazo_Ini", index: "plazo_Ini", align: "center", width: 50, sortable: true },
      { name: "plazo_Fin", index: "plazo_Fin", align: "center", width: 50, sortable: true },
      { name: "saldo_Banda", index: "saldo_Banda", align: "center", width: 50, sortable: true },
      { name: "arrayServicioInversion", index: "arrayServicioInversion", align: "center", width: 50, sortable: true },
      { name: "idBanda", index: "idBanda", align: "center", width: 50, sortable: true },
      { name: "descripCortaLinea", index: "descripCortaLinea", align: "center", width: 50, sortable: true },
      { name: "recomend", index: "recomend", align: "center", width: 50, sortable: true },
    ]
  });
  console.log("TERMINA Errores")
};

// NOTA: REESCALADO DE GRID CAPTURA
const resizeCapReportGrid = (div: string, grid: string) => {
  div = "#" + div;
  const gridWidth: number = $(div)
  .parent()
  .width();
  console.log(gridWidth);
  grid = "#" + grid;
  $(grid).jqGrid("setGridWidth", gridWidth, true);
}

$(window).on("resize", function() {
  // resizeGrid("div-cotizacion-reportos-grid", "table_grid_cotizacion_reportos");
});


//NOTA: CRITERIOS DE BUSQUEDA
($("#criterios-busqueda") as any)
  .parsley()
  .on("field:success", (e) => {
    removeErrorsInAttrTitle(e);
  })
  .on("field:error", (e) => {
    putErrorsInAttrTitle(e);
  })
  .on("form:submit", e => {
    console.log("form:submit", e);

    captura_reportos_params = {};

    const fecha_banda = $("#fecha_banda").val();
    if (fecha_banda) {
      captura_reportos_params.fecha_banda = fecha_banda;
    }

    const grupo = $("#cbogrupo :selected").text();
    if (grupo) {
      if (grupo !== "Todos") {
        captura_reportos_params.grupo = grupo;
      }
    }

    const instrumento = $("#cboinstrumento :selected").text();
    if (instrumento) {
      if (instrumento !== "Todos") {
        captura_reportos_params.instrumento = instrumento;
      }
    }

    http_findAll("captura_reportos", captura_reportos_params, payload => {
      $("#table_gridBandas").jqGrid("clearGridData");
      $("#table_gridBandas").jqGrid("setGridParam", { data: payload });
      $("#table_gridBandas").trigger("reloadGrid");

      const last_page = $('#table_gridBandas').jqGrid('getGridParam','lastpage');
      $("#sp_1__toppager").text(last_page);
      const rec_count = payload.length;
      $("#count_captura_reportos").html(rec_count);
    });

    return false;
  });


$(".sidebar_button").on("click", function() {
  // resizeGrid("div-cotizacion-reportos-grid", "table_grid_cotizacion_reportos");
});

//LLEGA EL GRID
llenaGridCapturaReporto([]);
llenaGridContratosReportos([]);
llenaGridEnviosReportos([]);
llenaGridErroresReportos([]);

//mensajje valiacion error


($("#Criterios-Datos") as any)
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
// const todayCapReport = new Date();
// const ddCapReport = String(today.getDate());
// const mmCapReport = String(today.getMonth() + 1); //January is 0!
// const yyyyCapReport = today.getFullYear();

// const fecha_actualCapReport = ddCapReport + '-' + mmCapReport + '-' + yyyyCapReport;
// $("#fecha_banda").val(fecha_actualCapReport);

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
    toppager: true,
    gridview: true,
    pgtext: "P\u00E1gina {0} de {1}",
      recordtext: "Mostrando {0} - {1} de {2}",
      pagerpos: "center",
    viewrecords: true,
    autowidth: true,
      forceFit: true,
    height: "auto",
      shrinkToFit: false,
    rowNum: 20,
      rowList: [10, 20, 30],
    colNames: [
      "Grupo",
      "Instrumento",
      "Plazo",
      "Tasa"
    ],
    colModel: [
      {
        name: "grupo",
        index: "grupo",
        align: "center",
        width: 700,
        sortable: true
      },
      { name: "instrumento", index: "instrumento", align: "center", width: 100, sortable: true },
      { name: "plazo", index: "plazo", align: "center", width: 100, sortable: true },
      { name: "tasa", index: "tasa", align: "center", width: 50, sortable: true }
    ]
  });
  
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

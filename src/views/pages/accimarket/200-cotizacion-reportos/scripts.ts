const today = new Date();
const dd = String(today.getDate());
const mm = String(today.getMonth() + 1); //January is 0!
const yyyy = today.getFullYear();

const fecha_actual = dd + '-' + mm + '-' + yyyy;
$("#fecha_banda").val(fecha_actual);

$('.sidebar-collapsible-button').on('click', function() {
  $('#sidebar_wrapper_aside .sidebar').toggleClass('isClosed');
});

http_findAll("grupos", {}, payload => {
  ($("#grupo") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

let expandSideBar:boolean = $(".sidebar").attr("expand") == "true";
if( expandSideBar ){
  $(".sidebar_content").parent().attr("style", "width: 250px !important;");

  $(".sidebar_content").addClass("is_open");
  $(".sidebar_button").addClass("is_open");
  $(".content").addClass("is_sidebar_open");
}

http_findAll("instrumentos", {}, payload => {
  ($("#instrumento") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});


let cotizacion_reporto_params: UrlParams = {};

// http_findAll("cotizacion_reporto", cotizacion_reporto_params, payload => {
//   llenaGridCotizacionReporto(payload);
//   $("#table_grid_cotizacion_reportos").jqGrid("clearGridData");
//   $("#table_grid_cotizacion_reportos").trigger("reloadGrid");
// });

$("#btn_reset").click(() =>
  $("#dialogo_xls").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Confirmación",
    width: 400
    // buttons: [
    //   {
    //     text: "Aceptar",
    //     // icon: "ui-icon-check",
    //     click: function() {
    //       $(this).dialog("close");
    //     }
    //   },
    //   {
    //     text: "Cancelar",
    //     // icon: "ui-icon-check",
    //     click: function() {
    //       $(this).dialog("close");
    //     }
    //   }
    // ]
  })
);

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

const llenaGridCotizacionReporto = (cotizacion_reporto: any) => {
  $("#table_gridCotizacion").jqGrid({
    data: cotizacion_reporto,
    datatype: "local",
    toppager: true,
    gridview: true,
    pgtext: "P\u00E1gina {0} de {1}",
    // recordtext: "Mostrando {0} - {1} de {2}",
    // pagerpos: "center",
    viewrecords: true,
    autowidth: true,
    // forceFit: true,
    height: 600,
    // shrinkToFit: false,
    rowNum: 20,
    // rowList: [10, 20, 30],
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
      { name: "instrumento", index: "instrumento", align: "center", width: 100, sortable: true },
      { name: "plazo", index: "plazo", align: "center", width: 100, sortable: true },
      { name: "rango", index: "rango", align: "center", width: 200, sortable: true },
      { name: "tasa", index: "tasa", align: "center", width: 50, sortable: true }
    ]
  });

  // resizeGrid("div-cotizacion-reportos-grid", "table_grid_cotizacion_reportos");
};


const resizeGrid = (div: string, grid: string) => {
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

    cotizacion_reporto_params = {};

    const fecha_banda = $("#fecha_banda").val();
    if (fecha_banda) {
      cotizacion_reporto_params.fecha_banda = fecha_banda;
    }

    const grupo = $("#grupo :selected").text();
    if (grupo) {
      if (grupo !== "Todos") {
        cotizacion_reporto_params.grupo = grupo;
      }
    }

    const instrumento = $("#instrumento :selected").text();
    if (instrumento) {
      if (instrumento !== "Todos") {
        cotizacion_reporto_params.instrumento = instrumento;
      }
    }

    http_findAll("cotizacion_reporto", cotizacion_reporto_params, payload => {
      $("#table_grid_cotizacion_reportos").jqGrid("clearGridData");
      $("#table_grid_cotizacion_reportos").jqGrid("setGridParam", { data: payload });
      $("#table_grid_cotizacion_reportos").trigger("reloadGrid");

      const last_page = $('#table_grid_cotizacion_reportos').jqGrid('getGridParam','lastpage');
      $("#sp_1__toppager").text(last_page);
      const rec_count = payload.length;
      $("#count_cotizacion_reportos").html(rec_count);
    });

    return false;
  });

$(".sidebar_button").on("click", function() {
  // resizeGrid("div-cotizacion-reportos-grid", "table_grid_cotizacion_reportos");
});

llenaGridCotizacionReporto([]);


($("#Criterios-busqueda") as any)
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
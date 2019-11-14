/// <reference path="../../typings/index.d.ts" />

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

let average_params: UrlParams = {};

http_findAll("averages", average_params, payload => {
  fillAverage(payload);
});

http_findAll("averages", average_params, payload => {
  fillAverage1(payload);
});

const fillAverage = (average: any) => {
  var dataSetY = [];
  var dataSetX = [];

  for (var i = 0; i < average.length; i++) {
    var data = average[i];
    dataSetX.push(data.dataA);
    dataSetY.push(data.dataB);
  }

  var ctxBar: any = document.getElementById("averageChart");
  var contextBar = ctxBar.getContext("2d");

  var gradientFill = contextBar.createLinearGradient(400, 0, 350, 0);
  gradientFill.addColorStop(0, "rgba(10, 10, 180, 1)");
  gradientFill.addColorStop(1, "rgba(55, 55, 255, 1)");

  gradientBarChart({
    id: "averageChart",
    titleX: "Período",
    titleY: "Portafolio",
    labels: dataSetX,
    tickMaxY: 1.0,
    tickMinY: 0,
    tickStepY: 0.2,
    width: "500px",
    height: "300px",
    contexto: contextBar,
    dataSet: [
      {
        type: "bar",
        label: "Real",
        backgroundColor: gradientFill,
        data: dataSetY
      }
    ]
  });
};

const fillAverage1 = (average: any) => {
  var dataSetY = [];
  var dataSetX = [];

  for (var i = 0; i < average.length; i++) {
    var data = average[i];
    dataSetX.push(data.dataA);
    dataSetY.push(data.dataB);
  }

  simpleBarChart({
    id: "average1Chart",
    titleX: "Período",
    titleY: "Portafolio",
    labels: dataSetX,
    tickMaxY: 1.0,
    tickMinY: 0,
    tickStepY: 0.2,
    width: "500px",
    height: "300px",
    dataSet: [
      {
        type: "bar",
        label: "Real",
        backgroundColor: "#2b6cb0",
        data: dataSetY
      }
    ]
  });
};

// Form validations
let contratos1_params: UrlParams = {};

// const r$ = http_findAll$("contratos", contratos_params)
//   .map(v => v["data"])
//   .subscribe(data => llenaGridContratos(data));

http_findAll("contratos", contratos1_params, payload => {
  // fillJqGrid("#table_contratos", payload);
  llenaGridContratos1(payload);
  const rec_count = payload.length;
  $("#count_contratos").html(rec_count);
  // console.log(rec_count);
});

const llenaGridContratos1 = (contratos: any) => {
  // console.log(contratos);
  $("#table_contratos").jqGrid({
    data: contratos,
    datatype: "local",
    height: "auto",
    rowList: [10, 20, 30],
    colNames: [
      "Contrato",
      // "Imagen",
      // "Icono",
      "ID Emisión",
      "Cantidad",
      "Emision",
      "Serie",
      "Cupon",
      "Dígito",
      "T.V.",
      "Precio",
      "Importe",
      "Descripción",
      "Fecha",
      "Descripción T.V.",
      "Lista Contrato",
      "Lista Dígito",
      "Usuario",
      "Reporte",
      "Lista libro",
      "ID Libro",
      "Cliente",
      "Promotor",
      "Folio",
      "Moneda",
      "Credito MX",
      "Aforo",
      "Tipo Moneda",
      "Fecha Producción",
      "I Libro",
      "Libro",
      "% Real",
      "Diferencia",
      "Fecha Antigua"
    ],
    colModel: [
      {
        name: "contrato",
        index: "contrato",
        width: 100,
        sortable: true,
        sorttype: "number"
      },
      // {
      //   name: "imagen",
      //   index: "imagen",
      //   width: 50,
      //   sortable: false,
      //   formatter: (cellvalue, options, rowobject) => {
      //     return "<img src='../../assets/images/btn-calendario_32x32.png' width='12px'>";
      //   }
      // },
      // {
      //   name: "icono",
      //   index: "icono",
      //   width: 50,
      //   sortable: false,
      //   formatter: (cellvalue, options, rowobject) => {
      //     return "<i class='fa fa-plus-circle fa-lg text-red-600'></i>";
      //   }
      // },
      { name: "emisora", index: "emisora", width: 100, sortable: false },
      { name: "cantidad", index: "cantidad", width: 100, sortable: false },
      { name: "emision", index: "emision", width: 100, sortable: false },
      { name: "serie", index: "serie", width: 100, sortable: false },
      { name: "cupon", index: "cupon", width: 100, sortable: false },
      { name: "digito", index: "digito", width: 100, sortable: false },
      { name: "tv", index: "tv", width: 100, sortable: false },
      {
        name: "precioMdo",
        index: "precioMdo",
        width: 90,
        formatter: "currency",
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          prefix: "$",
          thousandsSeparator: ","
        }
      },
      {
        name: "importeValua",
        index: "importeValua",
        width: 90,
        formatter: "currency",
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          prefix: "$",
          thousandsSeparator: ","
        }
      },
      { name: "descripcion", index: "descripcion", width: 90, sortable: false },
      {
        name: "fecha",
        index: "fecha",
        width: 90,
        formatter: "date",
        sortable: false
      },
      { name: "descrTV", index: "descrTV", width: 90, sortable: false },
      {
        name: "listaContrato",
        index: "listaContrato",
        width: 90,
        sortable: false
      },
      { name: "listaDigito", index: "listaDigito", width: 90, sortable: false },
      { name: "usuario", index: "usuario", width: 90, sortable: false },
      { name: "reporte", index: "reporte", width: 90, sortable: false },
      { name: "listaLibro", index: "listaLibro", width: 90, sortable: false },
      { name: "idLibro", index: "idLibro", width: 90, sortable: false },
      { name: "cliente", index: "cliente", width: 90, sortable: false },
      { name: "promotor", index: "promotor", width: 90, sortable: false },
      { name: "folio", index: "folio", width: 90, sortable: false },
      { name: "moneda", index: "moneda", width: 90, sortable: false },
      { name: "creditoMX", index: "creditoMX", width: 90, sortable: false },
      { name: "aforo", index: "aforo", width: 90, sortable: false },
      { name: "monedaTipo", index: "monedaTipo", width: 90, sortable: false },
      {
        name: "fechaProducción",
        index: "fechaProducción",
        width: 90,
        sortable: false
      },
      { name: "iLibro", index: "iLibro", width: 90, sortable: false },
      { name: "libro", index: "libro", width: 90, sortable: false },
      { name: "porcentReal", index: "porcentReal", width: 90, sortable: false },
      { name: "diferencia", index: "diferencia", width: 90, sortable: false },
      {
        name: "fechaMasAntiua",
        index: "fechaMasAntiua",
        width: 90,
        formatter: "date",
        sortable: false
      }
    ]
    // pager: "#pager_contratos"
  });
};

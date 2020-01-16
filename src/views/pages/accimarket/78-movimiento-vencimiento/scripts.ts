/// <reference path="../../typings/index.d.ts" />

console.log("78-mercado-vencido");

// const rest_url = `${REST_URL}/fideicomiso`;

($("#payment") as any).select2({
  placeholder: "",
  minimumResultsForSearch: Infinity
});

$("#montoInv,#montoVen").val("-$1,000,000.00");

validateDateRage("dateRangeVencimiento");
fieldBeginDateRangeClear("dateRangeVencimiento");
fieldEndDateRangeClear("dateRangeVencimiento");

$("#dateRangeVencimiento_begin_date").datepicker("setDate", "today");
$("#dateRangeVencimiento_end_date").datepicker("setDate", "today");

// Form validations
let mercado_vencido_params: UrlParams = {};

httpFindAll("vencidos", mercado_vencido_params, payload => {
  console.log("INGRESA A LA FUNCION  FINDALL vencidos");
  llenaGridMercadoVencido(payload);
  const rec_count = payload.length;
  $("#count_vencidos").html(rec_count);
  //Hablita los pdf y xls
  disableButton(rec_count);
});

// // Llamado a servicios via POST
// const rpc_url2 = "/appserver/mvcpt/movimientosPorContrato/consultaCon";
// const rpc_parms = {
//   contrato: "12345",
//   rol: "TIT"
// };
// rpc(rpc_url2, rpc_parms, (data, textStatus, jQxhr) => {
//   console.log("INGRESA A LA FUNCION  RPC");
//   console.log(data, textStatus, jQxhr);
//   llenaGridContratos(data);
//   const rec_count = data.length;
//   $("#count_contratos").html(rec_count);
// });

const formMercadoVencido = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", e => {
    console.log("form:submit", e);

    mercado_vencido_params = {};

    const montoInv = $("#montoInv").val();
    const montoVen = $("#montoVen").val();
    const contratoVen = $("#contratoVen").val();
    const fechaIni = $("#dateRangeVencimiento_begin_date").val();
    const fechaFin = $("#dateRangeVencimiento_end_date").val();

    console.log("-- montoInv ", montoInv);
    console.log("-- montoVen ", montoVen);

    if (montoInv) {
      mercado_vencido_params.montoInv = montoInv;
    }

    if (montoVen) {
      mercado_vencido_params.montoVen = montoVen;
    }

    if (contratoVen) {
      mercado_vencido_params.contratoVen = contratoVen;
    }

    if (fechaIni) {
      mercado_vencido_params.fechaIni = fechaIni;
    }

    if (fechaFin) {
      mercado_vencido_params.fechaFin = fechaFin;
    }

    httpFindAll("vencidos", mercado_vencido_params, payload => {
      // console.log(payload);
      $("#table_vencidos").jqGrid("clearGridData");
      $("#table_vencidos").jqGrid("setGridParam", { data: payload });
      $("#table_vencidos").trigger("reloadGrid");
      const rec_count = payload.length;
      $("#count_vencidos").html(rec_count);
      disableButton(rec_count);
    });

    return false;
  });

const llenaGridMercadoVencido = (vencidos: any) => {
  // console.log(vencidos);
  console.log("INGRESA A LA FUNCION  LLENA GRID");
  $("#table_vencidos").jqGrid({
    data: vencidos,
    datatype: "local",
    height: "auto",
    shrinkToFit: false,
    rowList: [10, 20, 30],
    colNames: [
      "Grupo",
      "Contrato",
      "Digito",
      "Cliente",
      "Monto Invertir",
      "Monto Venc Bruto",
      "Monto Venc Neto",
      "Saldo Actual",
      "Plazo",
      "Num Emi",
      "Consec",
      "Emision",
      "Tasa Asig",
      "Monto Asig",
      "Monto Impuesto",
      "Fec. Compra",
      "Fec. Venta",
      "Tipo",
      "Tipo Val"
    ],
    colModel: [
      { name: "grupo", index: "grupo", width: 100, sortable: false },
      { name: "contrato", index: "contrato", width: 100, sortable: false },
      { name: "digito", index: "digito", width: 100, sortable: false },
      { name: "cliente", index: "cliente", width: 100, sortable: false },
      {
        name: "montoInvr",
        index: "montoInv",
        width: 100,
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          thousandsSeparator: ","
        }
      },
      {
        name: "montoVenBr",
        index: "montoVenBr",
        width: 100,
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          thousandsSeparator: ","
        }
      },

      {
        name: "montoVenNt",
        index: "montoVenNt",
        width: 100,
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          thousandsSeparator: ","
        }
      },
      { name: "saldo", index: "saldo", width: 100, sortable: false },
      { name: "plazo", index: "plazo", width: 100, sortable: false },
      { name: "numeroEmi", index: "numeroEmi", width: 100, sortable: false },
      {
        name: "consecutivo",
        index: "consecutivo",
        width: 100,
        sortable: false
      },
      { name: "emision", index: "emision", width: 100, sortable: false },
      { name: "tasaAsig", index: "tasaAsig", width: 100, sortable: false },
      {
        name: "montoAsig",
        index: "montoAsig",
        width: 100,
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          thousandsSeparator: ","
        }
      },
      {
        name: "montoImp",
        index: "montoImp",
        width: 100,
        sortable: false,
        summaryType: "sum",
        formatoptions: {
          decimalPlaces: 2,
          thousandsSeparator: ","
        }
      },

      {
        name: "fechaCom",
        index: "fechaCom",
        width: 90,
        formatter: "date",
        sortable: false
      },
      {
        name: "fechaVen",
        index: "fechaVen",
        width: 90,
        formatter: "date",
        sortable: false
      },
      { name: "tipo", index: "tipo", width: 90, sortable: false },
      { name: "tipoVal", index: "tipoVal", width: 90, sortable: false }
    ]
  });
};

function disableButton(numVen) {
  if (numVen == 0) {
    $("#btn_pdf").prop("disabled", true);
    $("#btn_xls").prop("disabled", true);
    console.log("vacio");
  } else {
    $("#btn_pdf").prop("disabled", false);
    $("#btn_xls").prop("disabled", false);
    console.log("Lleno");
  }
}

// // $("#table_vencidos").jqGrid("setFrozenColumns");

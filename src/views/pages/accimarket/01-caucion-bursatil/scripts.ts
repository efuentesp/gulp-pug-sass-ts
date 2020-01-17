/// <reference path="../../typings/index.d.ts" />

console.log("01-caucion-bursatil");

validateDateRage("rango");
fieldDateClear("fecha");
fieldBeginDateRangeClear("rango");
fieldEndDateRangeClear("rango");
fieldPlusMinus("contrato", {});
fieldPlusMinus("digito", { maxsize: 5 }); // Max number of elements
fieldSelectPlusMinus("testSelectPlusMinusContrato", {});

($("#cmbPayment") as any).select2({
  language: "es",
  placeholder: "",
  minimumResultsForSearch: Infinity
});

const llenaSelectContratos = (contratos: any) => {
  fieldSelectPlusAutocomplete("TestSelecPlusMinusAutocomplete", {
    id: "id",
    text: "contrato",
    payload: contratos
  });
};

// // Form validations
let contratosParams: UrlParams = {};

// // const r$ = httpFindAll$("contratos", contratos_params)
// //   .map(v => v["data"])
// //   .subscribe(data => llenaGridContratos(data));

httpFindAll("contratos", contratosParams, payload => {
  llenaGridContratos(payload);
  llenaSelectContratos(payload);
  const recCount = payload.length;
  $("#countContratos").html(recCount);
});

// // Llamado a servicios via POST
const rpcUrl = "/appserver/mvcpt/movimientosPorContrato/consultaCon";
const rpcParms = {
  contrato: "12345",
  rol: "TIT"
};
rpc(rpcUrl, rpcParms, (data, textStatus, jQxhr) => {
  // console.log(data, textStatus, jQxhr);
  llenaGridContratos(data);
  const recCount = data.length;
  $("#countContratos").html(recCount);
});

const form = ($("#criteriosBusqueda") as any)
  .parsley()
  .on("field:success", (e) => {
    removeErrorsInAttrTitle(e);
  })
  .on("field:error", (e) => {
    putErrorsInAttrTitle(e);
  })
  .on("form:submit", e => {
    // console.log("form:submit", e);
    contratosParams = {};

    console.log("-----+> Fecha: ", $("#fecha").val());
    console.log("-----+> Fecha inicial: ", $("#rangoBeginDate").val());
    console.log("-----+> Fecha final: ", $("#rangoEndDate").val());
    console.log("-----+> Contrato +-: ", getList("contrato"));
    console.log("-----+> Digito +-: ", getList("digito"));
    console.log("-----+> Negocio radio: ", getOptionSelected("negocio"));
    console.log("-----+> Contrato select +-: ", getList("testSelectPlusMinusContrato"));
    console.log("-----+> Product: ", getChecked("products"));
    console.log("-----+> Payment: ", $("#cmbPayment").val());
    console.log("-----+> Contrato +- autocomplete: ", getList("testSelecPlusMinusAutocomplete"));


    const fecha = $("#fecha").val();
    const negocio = getOptionSelected("negocio");

    let listContrato = getList("contrato");
    let listDigito = getList("digito");

    let productTypes = getChecked("products");

    if (fecha) {
      contratosParams.fecha = fecha;
    }

    if (listContrato.length > 0) {
      contratosParams.contrato = listContrato;
    }

    if (listDigito.length > 0) {
      contratosParams.digito = listDigito;
    }

    if (negocio) {
      contratosParams.negocio = negocio;
    }

    if (productTypes.length > 0) {
      contratosParams.product = productTypes;
    }

    httpFindAll("contratos", contratosParams, payload => {
      // console.log(payload);
      $("#dtgContratos").jqGrid("clearGridData");
      $("#dtgContratos").jqGrid("setGridParam", { data: payload });
      $("#dtgContratos").trigger("reloadGrid");
      const recCount = payload.length;
      $("#countContratos").html(recCount);
    });

    return false;
  });

const llenaGridContratos = (contratos: any) => {
  $("#dtgContratos").jqGrid({
    data: contratos,
    datatype: "local",
    height: "auto",
    shrinkToFit: false,
    rowList: [10, 20, 30],
    colNames: [
      "Contrato",
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
        sorttype: "number",
        frozen: true
      },
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
  });
};

$("#dtgContratos").jqGrid("setFrozenColumns");

$("#btnPdf").click(() =>
  $("#divDialogoPdf").dialog({
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

$("#btnXls").click(() =>
  $("#divDialogoAviso").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Aviso",
    width: 400
  })
);



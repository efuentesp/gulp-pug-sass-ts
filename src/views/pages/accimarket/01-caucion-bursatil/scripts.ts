/// <reference path="../../typings/index.d.ts" />

console.log("01-caucion-bursatil");

const rest_url = `${REST_URL}/fideicomiso`;

fieldPlusMinus("contrato");
fieldPlusMinus("digito");
fieldSelectPlusMinus("contrato1");

($("#payment") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

// Form validations
let contratos_params: UrlParams = {};

// const r$ = http_findAll$("contratos", contratos_params)
//   .map(v => v["data"])
//   .subscribe(data => llenaGridContratos(data));

http_findAll("contratos", contratos_params, payload => {
  // fillJqGrid("#table_contratos", payload);
  llenaGridContratos(payload);
  const rec_count = payload.length;
  $("#count_contratos").html(rec_count);
  // console.log(rec_count);
});

// Llamado a servicios via POST
const rpc_url = "/appserver/mvcpt/movimientosPorContrato/consultaCon";
const rpc_parms = {
  contrato: "12345",
  rol: "TIT"
};
rpc(rpc_url, rpc_parms, (data, textStatus, jQxhr) => {
  console.log(data, textStatus, jQxhr);
  llenaGridContratos(data);
  const rec_count = data.length;
  $("#count_contratos").html(rec_count);
});

const form = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", e => {
    console.log("form:submit", e);

    contratos_params = {};

    const fecha = $("#fecha").val();
    const negocio = $("input[name='negocio']:checked").val();

    var listContrato = getList("contrato");
    var listDigito = getList("digito");

    if (fecha) {
      contratos_params.fecha = fecha;
    }

    if (listContrato.length > 0) {
      contratos_params.contrato = listContrato;
    }

    if (listDigito.length > 0) {
      contratos_params.digito = listDigito;
    }

    if (negocio) {
      contratos_params.negocio = negocio;
    }

    http_findAll("contratos", contratos_params, payload => {
      // console.log(payload);
      $("#table_contratos").jqGrid("clearGridData");
      $("#table_contratos").jqGrid("setGridParam", { data: payload });
      $("#table_contratos").trigger("reloadGrid");
      const rec_count = payload.length;
      $("#count_contratos").html(rec_count);
      // console.log(rec_count);
    });

    return false;
  });

const llenaGridContratos = (contratos: any) => {
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
        sorttype: "number",
        frozen: true
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

$("#btn_pdf").click(() =>
  $("#dialogo_pdf").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Generar PDF",
    buttons: [
      {
        text: "Aceptar",
        icon: "ui-icon-check",
        click: function() {
          $(this).dialog("close");
        }

        // Uncommenting the following line would hide the text,
        // resulting in the label being used as a tooltip
        //showText: false
      }
    ]
  })
);
$("#btn_xls").click(() =>
  $("#dialogo_xls").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Generar XLS"
  })
);

validateDateRage("rango");

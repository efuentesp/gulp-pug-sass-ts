let movc_params: UrlParams = {};

$("#btn_search").click(() => {
  const formMov = ($("#criterios-busqueda") as any)
    .parsley()
    .on("field:validated", () => {
      const ok = $(".parsley-error").length === 0;
    })
    .on("form:submit", () => {
      console.log("form:submit");

      movc_params = {};

      const contrato = $("#contrato").val();
      if (contrato) {
        movc_params.contrato = contrato;
      }

      const fechaI = $("#fechaI").val();
      if (fechaI) {
        movc_params.fechaIni = fechaI;
      }

      const fechaF = $("#fechaF").val();
      if (fechaF) {
        movc_params.fechaFin = fechaF;
      }

      const operaciones = $("#operaciones").val();
      if (operaciones) {
        movc_params.precioMayorStr = operaciones;
      }

      const plazo = $("#plazo").val();
      if (plazo) {
        movc_params.plazoStr = plazo;
      }

      http_findAll("consultaCon", movc_params, payload => {
        if (payload !== null) {
          llenarContrato(payload);
          movimientosGrid(payload);
        }
      });

      return false;
    });
});

const llenarContrato = (payload: any) => {
  document.getElementById("tituloContrato").innerHTML = "Contrato " + payload.contrato + " - " + payload.nomCliente;
  $('#cliente').val(payload.nomCliente);
  $('#digito').val(payload.digito);
  $('#digitoVer').val(payload.digitoVerif);
  $('#perfil').val(payload.stsPerfil);
  $('#libro').val(payload.libro);
  $('#status').val(payload.stsContrato);
  $('#area').val("N/A");
  $('#division').val("N/A");
  $('#direccion').val("N/A");
  $('#region').val(payload.digito);
  $('#sucursal').val(payload.digito);
  $('#zona').val(payload.digito);
  $('#gerencia').val(payload.digito);
};

const movimientosGrid = (payload: any) => {
  $("#totalreg").val(payload.movimientosLst.length);
  fillJqGrid("#table_grid_mov_contrato", payload.movimientosLst);
};

$("#table_grid_mov_contrato").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Fecha Operación",
    "Fecha Liquidación",
    "Operación",
    "Emisora",
    "Perfil del Producto al momento de la Operación",
    "TV",
    "Cantidad",
    "Precio",
    "Imp.Bruto",
    "Comisión",
    "IVA",
    "Impuesto",
    "Imp.Neto",
    "Tasa",
    "Plazo",
    "Tipo Portafolio",
    "Rompe",
    "Serv. Inversión",
    "Perfil del Cliente al momento de la Operación",
    "Medio Cierre",
    "Número de Red/Teléfono",
    "Clasificación ETF",
    "Oper. Art. 194"
  ],
  colModel: [
    { name: "fecOper", width: 90 },
    { name: "fecLiq", width: 90 },
    { name: "descrOper", width: 120 },
    { name: "emiSerie", width: 120 },
    { name: "descrPerfilContrato", width: 80 },
    { name: "tipovalor", width: 50 },
    { name: "cantidad", width: 90, sortable: false, align: "right" },
    { name: "prec", width: 90, align: "right" },
    { name: "importeBruto", width: 90, align: "right" },
    { name: "importeComis", width: 90, align: "right" },
    { name: "importeIVA", width: 90, align: "right" },
    { name: "importeImpuesto", width: 90, align: "right" },
    { name: "importeFinal", width: 90, align: "right" },
    { name: "tasaRetno", width: 90, align: "right" },
    { name: "pzo", width: 90, align: "right" },
    { name: "descrSTipoPortf", width: 90 },
    { name: "rompe", width: 90, align: "center" },
    { name: "recomend", width: 90, align: "center" },
    { name: "descrPerfilEmisora", width: 90 },
    { name: "descrMedioCierre", width: 90 },
    { name: "red", width: 90, align: "center" },
    { name: "descrTipoETF", width: 90 },
    { name: "operArt194", width: 90, align: "center" }
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

$(document).ready(function () {
  http_findOne("movPorContratos", "", payload => {
    $("#fechaI").val(payload.fecServicio.fechaInicial);
    $("#fechaF").val(payload.fecServicio.fechaFinal);
  });
});

$("#idDetalle").click(function () {
  var gridDetalle = $("#table_grid_mov_contrato");
  var rowId = gridDetalle.jqGrid('getGridParam', 'selrow');
  var rowData = gridDetalle.jqGrid('getRowData', rowId);
  llenaMovimiento(rowData);
  window.open("/accimarket/22-movimientos-por-contrato/detalleMovimiento/index.html", "nombre de la ventana", "width=500, height=500")
});

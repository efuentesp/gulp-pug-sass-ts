/// <reference path="../../typings/index.d.ts" />

console.log("80-ventas asesoradas");

// const rest_url = `${REST_URL}/fideicomiso`;

($("#negocios") as any).select2({
  placeholder: "",
  minimumResultsForSearch: Infinity
});

$("#totalreg").val("1,000,000.00");

validateDateRage("dateRangeVencimiento");
fieldBeginDateRangeClear("dateRangeVencimiento");
fieldEndDateRangeClear("dateRangeVencimiento");

$("#dateRangeVencimiento_begin_date").datepicker("setDate", "today");
$("#dateRangeVencimiento_end_date").datepicker("setDate", "today");

// Form validations
let ventas_asesoradas_params: UrlParams = {};

http_findAll("ventas", ventas_asesoradas_params, payload => {
  console.log("INGRESA A LA FUNCION  FINDALL VENTAS ASESORADAS");
  llenaGridVentaAsesorada(payload);
  const rec_count = payload.length;
  $("#count_ventas").html(rec_count);
  $("#totalreg").val(rec_count);
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

const formVentasAsesoradas = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", e => {
    console.log("form:submit", e);

    ventas_asesoradas_params = {};
    const negocios = $("#negocios").val();
    const fechaIni = $("#dateRangeVencimiento_begin_date").val();
    const fechaFin = $("#dateRangeVencimiento_end_date").val();

    if (fechaIni) {
      ventas_asesoradas_params.fechaIni = fechaIni;
    }

    if (fechaFin) {
      ventas_asesoradas_params.fechaFin = fechaFin;
    }

    if (negocios) {
      ventas_asesoradas_params.negocios = negocios;
    }

    http_findAll("ventas", ventas_asesoradas_params, payload => {
      // console.log(payload);
      $("#table_ventas").jqGrid("clearGridData");
      $("#table_ventas").jqGrid("setGridParam", { data: payload });
      $("#table_ventas").trigger("reloadGrid");
      const rec_count = payload.length;
      $("#count_ventas").html(rec_count);
      $("#totalreg").val(rec_count);
    });

    return false;
  });

const llenaGridVentaAsesorada = (ventas: any) => {
  // console.log(vencidos);
  console.log("INGRESA A LA FUNCION  LLENA GRID");
  console.log(ventas);
  $("#table_ventas").jqGrid({
    data: ventas,
    datatype: "local",
    height: "auto",
    colNames: [
      "Folio Trans",
      "Fecha Concentracion",
      "Fecha Liquidación",
      "Operación",
      "Hr. Captura",
      "Fec. Ult. Mov. Compra",
      "Emisora",
      "Serie",
      "Cupón",
      "Tipo Valor",
      "ISIN",
      "Títulos",
      "Precio",
      "Importe Neto",
      "Descr. Perfil Producto",
      "Días Ret. Pos.",
      "Días Min. Ret.",
      "Diferencia",
      "Contrato",
      "Descr.Perfil Contrato",
      "Serv.Inversión.",
      "Usuario",
      "Nombre",
      "Responsable",
      "Nombre Responsable",
      "Dígito",
      "Linea Negocio",
      "Motivo Registro"
    ],
    colModel: [
      {
        name: "folio",
        index: "folio",
        width: 100,
        sortable: true,
        sorttype: "text"
      },
      {
        name: "fechaCon",
        index: "fechaCon",
        width: 90,
        formatter: "date",
        sortable: true
      },
      {
        name: "fechaLiq",
        index: "fechaLiq",
        width: 90,
        formatter: "date",
        sortable: true
      },
      {
        name: "operacion",
        index: "operacion",
        width: 100,
        sortable: true,
        sorttype: "text"
      },
      { name: "hora", index: "hora", width: 100, sortable: false },
      {
        name: "fechaUlt",
        index: "fechaUlt",
        width: 90,
        formatter: "date",
        sortable: true
      },
      { name: "emisora", index: "emisora", width: 100, sortable: true },
      { name: "serie", index: "serie", width: 100, sortable: true },
      { name: "cupon", index: "cupon", width: 100, sortable: true },
      { name: "tipoVal", index: "tipoVal", width: 100, sortable: false },
      { name: "isin", index: "isin", width: 100, sortable: false },
      { name: "titulo", index: "titulo", width: 100, sortable: false },
      { name: "precio", index: "precio", width: 100, sortable: false },
      { name: "impNet", index: "impNet", width: 100, sortable: false },
      {
        name: "descripcionPer",
        index: "descripcionPer",
        width: 100,
        sortable: false
      },
      { name: "diasRet", index: "diasRet", width: 100, sortable: false },
      { name: "diasMin", index: "diasMin", width: 100, sortable: false },
      { name: "diferencia", index: "diferencia", width: 100, sortable: false },
      { name: "contrato", index: "contrato", width: 100, sortable: false },
      {
        name: "descripcionCont",
        index: "descripcionCont",
        width: 100,
        sortable: false
      },
      { name: "servInver", index: "serInver", width: 100, sortable: false },
      { name: "usuario", index: "usuario", width: 100, sortable: false },
      { name: "nombre", index: "nombre", width: 100, sortable: false },
      {
        name: "responsable",
        index: "responsable",
        width: 100,
        sortable: false
      },
      { name: "nombreResp", index: "nombreResp", width: 100, sortable: false },
      { name: "digito", index: "digito", width: 100, sortable: false },
      { name: "lineaNeg", index: "lineaNeg", width: 100, sortable: false },
      { name: "motivoReg", index: "motivoReg", width: 100, sortable: false }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "folio",
    sortorder: "desc",
    shrinkToFit: false
  });
};
// $("#table_vencidos").jqGrid("setFrozenColumns");

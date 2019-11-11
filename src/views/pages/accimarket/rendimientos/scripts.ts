/// <reference path="../../typings/index.d.ts" />

console.log("Rendimientos");

($("#cmbRenta") as any).select2({
  placeholder: "",
  minimumResultsForSearch: Infinity
});
$("#cmbRenta").val("3");
$("#cmbRenta").trigger("change");

($("#cmbModelosCalculoCombo") as any).select2({
  placeholder: "",
  minimumResultsForSearch: Infinity
});
$("#cmbModelosCalculoCombo").val("TI");
$("#cmbModelosCalculoCombo").trigger("change");

$("#cmbModelosCalculoCombo").change(function() {
  var valor = $("#cmbModelosCalculoCombo").val();
  if (valor == "T") {
    $("#cmbRenta").prop("disabled", true);
  } else {
    $("#cmbRenta").prop("disabled", false);
  }
});
/*$( "#btn_edit" ).click(function() {

            //const txtContrato: string = String($("#txtContrato").val());

           // http_findOne("contratos", txtContrato, payload => {
                infoContratoRendimiento(payload);

                fillJqGrid("#table_resultadosfuente", payload.listatabla_fuente);
        });
        $("#dialogo_xls").dialog({
            modal: true,
            closeText: "",
            show: true,
            width: 650,
            height: 650,
            title: "Table Fuente"
            })
      });
*/

var test = true;
var fecha = new Date();
var dia = fecha.getDate() - 1;
var mes = fecha.getMonth() + 1;
var anio = fecha.getFullYear() - 1;

var fechafi = new Date();
var diafi = fechafi.getDate() - 1;
var mesfi = fechafi.getMonth() + 1;
var aniofi = fechafi.getFullYear();
//alert(fechafi.toString('dd/mm/yyyy'));
//var fec=fechafi.toString('dd/mm/yyyy');
$("#dtFecha").val(dia + "-" + mes + "-" + anio);
$("#dtFechaFinal").val(diafi + "-" + mesfi + "-" + aniofi);

$("#dtFecha").on("change", function(event) {
  validaFechaInicial();
});

$("#dtFechaFinal").on("change", function(event) {
  validaFechaInicial();
});

$("#dtFecha").datepicker("option", "minDate", "fechafi-3y");
$("#dtFecha").datepicker("option", "maxDate", "fechafi");
$("#dtFechaFinal").datepicker("option", "minDate", "fechafi-3y");
$("#dtFechaFinal").datepicker("option", "maxDate", "fechafi");
$("#dtFecha").val(dia + "-" + mes + "-" + anio);
$("#dtFechaFinal").val(diafi + "-" + mesfi + "-" + aniofi);

var validaFechaInicial = function() {
  var dtFecha = $("#dtFecha")
    .val()
    .toString();
  var dtFechaFinal = $("#dtFechaFinal")
    .val()
    .toString();

  if (dtFecha != "" && dtFechaFinal != "") {
    var fechaSplit = [];
    var fechaSplitD = [];
    fechaSplit = dtFecha.split("-");
    fechaSplitD = dtFechaFinal.split("-");
    var fechaI = new Date(fechaSplit[2], fechaSplit[1], fechaSplit[0]);
    var fechaF = new Date(fechaSplitD[2], fechaSplitD[1], fechaSplitD[0]);
    if (fechaI.getTime() > fechaF.getTime()) {
      alert("La fecha Inicial es MAYOR");
      test = false;
    } else {
      var rangoAnio = Number(fechaSplitD[2] - fechaSplit[2]);
      if (rangoAnio == 0 || rangoAnio == 1) {
        test = true;
      } else {
        alert("selecciona rango menor a un año");
        test = false;
      }
    }
  } else {
    alert("Falta una fecha por elegir");
    test = false;
  }
};

$('input[name="chk_cmbOpcionesRendi"]').change(function() {
  console.log(
    "Checkbox ejemplo " + $(this).is(":checked") + " " + $(this).val()
  );
  if ($(this).is(":checked")) {
    $("#table_resultadosMensuales").jqGrid("showCol", $(this).val());
    $("#table_resultadosAcumulados").jqGrid("showCol", $(this).val());
    $("#table_resultadosMensualesTWP").jqGrid("showCol", $(this).val());
    $("#table_resultadosAcumuladosTWP").jqGrid("showCol", $(this).val());
  } else {
    $("#table_resultadosMensuales").jqGrid("hideCol", $(this).val());
    $("#table_resultadosAcumulados").jqGrid("hideCol", $(this).val());
    $("#table_resultadosMensualesTWP").jqGrid("hideCol", $(this).val());
    $("#table_resultadosAcumuladosTWP").jqGrid("hideCol", $(this).val());
  }
});
$("#btn_search").click(function() {
  if (test == true) {
    if ($("#cmbModelosCalculoCombo").val() == "T") {
      const formListOrdenes = ($("#criterios-busqueda-rendimientos") as any)
        .parsley()
        .on("field:validated", () => {
          const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
          console.log("form:submit");

          const txtContrato: string = String($("#txtContrato").val());

          http_findOne("contratos", txtContrato, payload => {
            infoContratoRendimiento(payload);

            $("#gbox_table_resultadosMensuales").hide();
            $("#graficaMensual").hide();
            $("#gbox_table_resultadosAcumulados").hide();
            $("#graficaAcumulados").hide();
            $("#gbox_table_resultadosMensualesTWP").show();
            $("#graficaMensualTWP").show();
            $("#gbox_table_resultadosAcumuladosTWP").show();
            $("#graficaAcumuladosTWP").show();

            $("#gbox_table_resultadosMensualesTWP").css({
              top: 10,
              left: 10,
              position: "absolute"
            });
            $("#gbox_table_resultadosAcumuladosTWP").css({
              top: 10,
              left: 10,
              position: "absolute"
            });
            $("#graficaMensualTWP")
              .parent()
              .css({ position: "relative" });
            $("#graficaAcumuladosTWP")
              .parent()
              .css({ position: "relative" });

            fillJqGrid(
              "#table_resultadosMensualesTWP",
              payload.listaMensualesTWP
            );
            graficaMensuales("graficaMensualTWP", payload.listaMensualesTWP);

            fillJqGrid(
              "#table_resultadosAcumuladosTWP",
              payload.listaAcumuladosTWP
            );
            graficaMensuales(
              "graficaAcumuladosTWP",
              payload.listaAcumuladosTWP
            );
          });
          return false;
        });
    } else {
      const formListOrdenes = ($("#criterios-busqueda-rendimientos") as any)
        .parsley()
        .on("field:validated", () => {
          const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
          console.log("form:submit");

          const txtContrato: string = String($("#txtContrato").val());

          http_findOne("contratos", txtContrato, payload => {
            infoContratoRendimiento(payload);

            $("#gbox_table_resultadosMensualesTWP").hide();
            $("#graficaMensualTWP").hide();
            $("#gbox_table_resultadosAcumuladosTWP").hide();
            $("#graficaAcumuladosTWP").hide();
            $("#gbox_table_resultadosMensuales").show();
            $("#graficaMensual").show();
            $("#gbox_table_resultadosAcumulados").show();
            $("#graficaAcumulados").show();

            fillJqGrid("#table_resultadosMensuales", payload.listaMensuales);
            graficaMensuales("graficaMensual", payload.listaMensuales);

            fillJqGrid("#table_resultadosAcumulados", payload.listaAcumulados);
            graficaMensuales("graficaAcumulados", payload.listaAcumulados);
            $("#table_resultadosMensuales").jqGrid("setColProp", "amount", {
              width: 800
            });
          });
          return false;
        });
    }
  } else {
    alert("ingresa fecha valida");
    return false;
  }
});

$("#table_resultadosMensuales").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  width: 600,
  colNames: [
    "Periodo",
    "Portafolio %",
    "Inflacion %",
    "IPC %",
    "Cetes 28 %",
    "Deval %",
    "Soc Inv RF-PM %",
    "Cetes 91 %",
    "Soc Inv RV %",
    "INMEX %"
  ],
  colModel: [
    { name: "periodo", width: 60, align: "center", frozen: true },
    { name: "portafolio", width: 60, align: "center", frozen: true },
    { name: "S01", width: 60, hidden: true, align: "center" },
    { name: "S02", width: 60, hidden: true, align: "center" },
    { name: "S03", width: 60, hidden: true, align: "center" },
    { name: "S04", width: 60, hidden: true, align: "center" },
    { name: "S05", width: 60, hidden: true, align: "center" },
    { name: "S06", width: 60, hidden: true, align: "center" },
    { name: "S07", width: 60, hidden: true, align: "center" },
    { name: "S08", width: 60, hidden: true, align: "center" }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_resultadosfuente").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  colNames: [
    "Fecha",
    "Pos RV",
    "Porc Pos RV",
    "Porc Pos RV Ayer",
    "Porc Pos RV2",
    "Pos RF",
    "Porc Pos RF",
    "Pos RF Ayer",
    "Porc Pos RF Ayer",
    "Pos RF2",
    "Porc RF2",
    "Efectivo",
    "Pos Total",
    "Pos Total Ayer",
    "Pos Total 2",
    "Flujo RV",
    "Flujo RF",
    "Flujo Efectivo",
    "Flujo Total",
    "Pos RVSIC",
    "Pos RVBV",
    "Pos RF Privados",
    "Pos RF Gubernamental",
    "Pos Cobertura Cambiaria",
    "Pos Notas Estructuradas",
    "Flujo RVSIC",
    "FRlujo RVBMV",
    "Flujo RF Privados",
    "Flujo RF Gubernamental",
    "Flujo Cobertura",
    "Flujo Notas Estructuradas"
  ],
  colModel: [
    { name: "Fecha", width: 300, align: "center" },
    { name: "Pos RV", width: 300, align: "center" },
    { name: "Porc Pos RV", width: 300, align: "center" },
    { name: "Porc Pos RV Ayer", width: 300, align: "center" },
    { name: "Porc Pos RV2", width: 300, align: "center" },
    { name: "Pos RF", width: 300, align: "center" },
    { name: "Porc Pos RF", width: 300, align: "center" },
    { name: "Pos RF Ayer", width: 300, align: "center" },
    { name: "Porc Pos RF Ayer", width: 300, align: "center" },
    { name: "Pos RF2", width: 300, align: "center" },
    { name: "Porc RF2", width: 300, align: "center" },
    { name: "Efectivo", width: 300, align: "center" },
    { name: "Pos Total", width: 300, align: "center" },
    { name: "Pos Total Ayer", width: 300, align: "center" },
    { name: "Pos Total 2", width: 300, align: "center" },
    { name: "Flujo RV", width: 300, align: "center" },
    { name: "Flujo RF", width: 300, align: "center" },
    { name: "Flujo Efectivo", width: 300, align: "center" },
    { name: "Flujo Total", width: 300, align: "center" },
    { name: "Pos RVSIC", width: 300, align: "center" },
    { name: "Pos RVBV", width: 300, align: "center" },
    { name: "Pos RF Privados", width: 300, align: "center" },
    { name: "Pos RF Gubernamental", width: 300, align: "center" },
    { name: "Pos Cobertura Cambiaria", width: 300, align: "center" },
    { name: "Pos Notas Estructuradas", width: 300, align: "center" },
    { name: "Flujo RVSIC", width: 300, align: "center" },
    { name: "FRlujo RVBMV", width: 300, align: "center" },
    { name: "Flujo RF Privados", width: 300, align: "center" },
    { name: "Flujo RF Gubernamental", width: 300, align: "center" },
    { name: "Flujo Cobertura", width: 300, align: "center" },
    { name: "Flujo Notas Estructuradas", width: 300, align: "center" }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_resultadosAcumulados").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  colNames: [
    "Periodo",
    "Portafolio %",
    "Inflacion %",
    "IPC %",
    "Cetes 28 %",
    "Deval %",
    "Soc Inv RF-PM %",
    "Cetes 91 %",
    "Soc Inv RV %",
    "INMEX %"
  ],
  colModel: [
    { name: "periodo", width: 300 },
    { name: "portafolio", width: 300 },
    { name: "S01", width: 300, hidden: true, align: "center" },
    { name: "S02", width: 300, hidden: true, align: "center" },
    { name: "S03", width: 300, hidden: true, align: "center" },
    { name: "S04", width: 300, hidden: true, align: "center" },
    { name: "S05", width: 300, hidden: true, align: "center" },
    { name: "S06", width: 300, hidden: true, align: "center" },
    { name: "S07", width: 300, hidden: true, align: "center" },
    { name: "S08", width: 300, hidden: true, align: "center" }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});
$("#table_resultadosMensualesTWP").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  colNames: [
    "periodo",
    "Valor_Mercado",
    "Aportaciones",
    "Retiros",
    "Cambio_de_valores",
    "crecimiento_%_Portafolio Periodo",
    "Inflacion %",
    "IPC %",
    "Cetes 28 %",
    "Deval %",
    "Soc Inv RF-PM %",
    "Cetes 91 %",
    "Soc Inv RV %",
    "INMEX %"
  ],
  colModel: [
    { name: "periodo", width: 300, align: "center" },
    { name: "Valor_Mercado", width: 300, align: "center" },
    { name: "Aportaciones", width: 300, align: "center" },
    { name: "Retiros", width: 300, align: "center" },
    { name: "Cambio_de_valores", width: 300, align: "center" },
    { name: "crecimiento_%_Portafolio Periodo", width: 300, align: "center" },
    { name: "S01", width: 300, hidden: true, align: "center" },
    { name: "S02", width: 300, hidden: true, align: "center" },
    { name: "S03", width: 300, hidden: true, align: "center" },
    { name: "S04", width: 300, hidden: true, align: "center" },
    { name: "S05", width: 300, hidden: true, align: "center" },
    { name: "S06", width: 300, hidden: true, align: "center" },
    { name: "S07", width: 300, hidden: true, align: "center" },
    { name: "S08", width: 300, hidden: true, align: "center" }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_resultadosAcumuladosTWP").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  colNames: [
    "periodo",
    "Valor Mercado",
    "crecimiento_%_Portafolio Periodo",
    "Inflacion %",
    "IPC %",
    "Cetes 28 %",
    "Deval %",
    "Soc Inv RF-PM %",
    "Cetes 91 %",
    "Soc Inv RV %",
    "INMEX %"
  ],
  colModel: [
    { name: "periodo", width: 300 },
    { name: "Valor Mercado", width: 300 },
    { name: "crecimiento_%_Portafolio Periodo", width: 300 },
    { name: "S01", width: 300, hidden: true, align: "center" },
    { name: "S02", width: 300, hidden: true, align: "center" },
    { name: "S03", width: 300, hidden: true, align: "center" },
    { name: "S04", width: 300, hidden: true, align: "center" },
    { name: "S05", width: 300, hidden: true, align: "center" },
    { name: "S06", width: 300, hidden: true, align: "center" },
    { name: "S07", width: 300, hidden: true, align: "center" },
    { name: "S08", width: 300, hidden: true, align: "center" }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});
const infoContratoRendimiento = (payload: any) => {
  $("#txtDigito").val(payload.digito);
  $("#txtDigitoVerificador").val(payload.dv);
  $("#txtEstatus").val(payload.estatus);
  $("#txtPerfilContrato").val(payload.perfil);
  $("#libro").val(payload.libro);
  $("#txtNombreContrato").val(payload.portafolio_uuid);
  $("#txtClabe").val(payload.clabe);
};
const graficaMensuales = (tipoGrafica: string, lista: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetY3 = [];
  var dataSetY4 = [];
  var dataSetY5 = [];
  var dataSetY6 = [];
  var dataSetY7 = [];
  var dataSetY8 = [];
  var dataSetY9 = [];
  var dataSetX = [];

  for (var i = 0; i < lista.length; i++) {
    var data = lista[i];
    dataSetX.push(data.periodo);
    dataSetY1.push(data.portafolio);
    dataSetY2.push(data.S01);
    dataSetY3.push(data.S02);
    dataSetY4.push(data.S03);
    dataSetY5.push(data.S04);
    dataSetY6.push(data.S05);
    dataSetY7.push(data.S06);
    dataSetY8.push(data.S07);
    dataSetY9.push(data.S08);
  }

  simpleBarChart({
    id: tipoGrafica,
    titleX: "Período",
    titleY: "Portafolio",
    labels: dataSetX,
    tickMaxY: 15.0,
    tickMinY: -15 /*0*/,
    tickStepY: 1,
    width: "400px",
    height: "200px",
    dataSet: [
      {
        type: "bar",
        label: "Real",
        backgroundColor: "#2b6cb0",
        data: dataSetY1
      },
      {
        type: "bar",
        label: "Real",
        backgroundColor: "#2b6cb0",
        data: dataSetY2
      },
      {
        type: "bar",
        label: "Real2",
        backgroundColor: "#ffb3b3",
        data: dataSetY3
      },
      {
        type: "bar",
        label: "Real3",
        backgroundColor: "#b3ffb3",
        data: dataSetY4
      },
      {
        type: "bar",
        label: "Real4",
        backgroundColor: "#ffff66",
        data: dataSetY5
      },
      {
        type: "bar",
        label: "Real4",
        backgroundColor: "#ffff66",
        data: dataSetY6
      },
      {
        type: "bar",
        label: "Real4",
        backgroundColor: "#ffff66",
        data: dataSetY7
      },
      {
        type: "bar",
        label: "Real4",
        backgroundColor: "#ffff66",
        data: dataSetY8
      },
      {
        type: "bar",
        label: "Real4",
        backgroundColor: "#ffff66",
        data: dataSetY9
      }
    ]
  });
};

$("#gbox_table_resultadosMensualesTWP").hide();
$("#graficaMensualTWP").hide();
$("#gbox_table_resultadosAcumuladosTWP").hide();
$("#graficaAcumuladosTWP").hide();

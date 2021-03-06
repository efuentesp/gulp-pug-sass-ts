/// <reference path="../../typings/index.d.ts" />
let numColumnsBase = 2;
let widthTable = 678;
let widthColumns = widthTable / numColumnsBase;

let nameGraphMovimientos = null;
let nameGraphAcumulados = null;
let nameGraphMovimientosTWP = null;
let nameGraphAcumuladosTWP = null;

console.log("Rendimientos");
var selected;
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

$("#btn_pdf").click(function() {
  alert(selected);
});

$("#cmbModelosCalculoCombo").change(function() {
  var valor = $("#cmbModelosCalculoCombo").val();
  if (valor == "T") {
    $("#cmbRenta").prop("disabled", true);
  } else {
    $("#cmbRenta").prop("disabled", false);
  }
});

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

  let selectedColumns = verificaSeleccionados();
  responsiveEffect(widthTable, numColumnsBase, selectedColumns, "table_resultadosMensuales", "splitter-container");
  responsiveEffect(widthTable, numColumnsBase, selectedColumns, "table_resultadosAcumulados", "splitter-container");
});

$(window).on("resize", function() {
  windowResize(widthTable, "table_resultadosMensuales", "splitter-container");
  windowResize(widthTable, "table_resultadosAcumulados", "splitter-container");
});


const verificaSeleccionados = () => {
  let selected: any = [];

  $('input[name="chk_cmbOpcionesRendi"]').each(function() {
    if ($(this).is(":checked")) {
      selected.push($(this).val());
    }
  });

  return selected;
};

const activaTIR = (selected: any[]) => {
  
  const txtContrato: string = String($("#txtContrato").val());

  http_findOne("contratos", txtContrato, payload => {
    infoContratoRendimiento(payload);

    fillJqGrid("#table_resultadosMensuales", payload.listaMensuales);
    graficaMensuales("graficaMensual", selected, payload.listaMensuales);

    fillJqGrid("#table_resultadosAcumulados", payload.listaAcumulados);
    graficaAcumulados("graficaAcumulados", selected, payload.listaAcumulados);

  });
};

const activaTWP = (selected: any[]) => {

  const txtContrato: string = String($("#txtContrato").val());

  http_findOne("contratos", txtContrato, payload => {
    infoContratoRendimiento(payload);

    fillJqGrid("#table_resultadosMensualesTWP", payload.listaMensualesTWP);
    graficaMensualesTWP("graficaMensualTWP", selected, payload.listaMensualesTWP);

    fillJqGrid("#table_resultadosAcumuladosTWP", payload.listaAcumuladosTWP);
    graficaAcumuladosTWP("graficaAcumuladosTWP", selected, payload.listaAcumuladosTWP);
  });
};

const openWindow = () => {
  $("#gbox_table_resultadosMensualesTWP").hide();
  $("#graficaMensualTWP").hide();
  $("#gbox_table_resultadosAcumuladosTWP").hide();
  $("#graficaAcumuladosTWP").hide();
  $("#gbox_table_resultadosMensuales").show();
  $("#graficaMensual").show();
  $("#gbox_table_resultadosAcumulados").show();
  $("#graficaAcumulados").show();

  $("#table_resultadosMensuales").jqGrid("setColProp", "amount", {
    width: 800
  });

  $("canvas #graficaMensualTWP").hide();
  $("canvas #graficaAcumuladosTWP").hide();
 
};  

const closeWindow = () => {
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

  $("canvas #graficaMensual").hide();
  $("canvas #graficaAcumulados").hide();

}; 

// Boton search
$("#btn_search").click(function() {
  
  let selected = [];
  selected = verificaSeleccionados();

  if (selected.length > 0) {

    if (test == true) {
      if ($("#cmbModelosCalculoCombo").val() == "T") {
        closeWindow();
        activaTWP(selected);
    }else{
        openWindow();
        activaTIR(selected);
    }
    }else{
      alert("Fecha invalida");
    }  

    return false;
  } else {
    
    if (test == true) {
    if ($("#cmbModelosCalculoCombo").val() == "T") {
      closeWindow();
      activaTWP(null);
    }else{
      openWindow();
      activaTIR(null);
    }
  }else{
    alert("Fecha invalida");
  }
    return false;
  }
});

//$(window).on("resize", function() {
  //var gridWidth = $("#splitter-container").parent().width();

  //if( gridWidth > widthTable ){
    //gridWidth = widthTable;
  //}  

  //console.log("******************************* gridWidth: " + gridWidth);  
  //$("#table_resultadosMensuales").jqGrid("setGridWidth", gridWidth, true);
  //$("#table_resultadosAcumulados").jqGrid("setGridWidth", gridWidth, true);
  
  //responsiveEffect(gridWidth, widthTable, 2, selectedColumns, "table_resultadosMensuales");
//});

$("#table_resultadosMensuales").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  width: widthTable,

  colNames: [
             "Periodo", "Portafolio %", "Inflacion %", "IPC %", "Cetes 28 %", 
             "Deval %", "Soc Inv RF-PM %", "Cetes 91 %", "Soc Inv RV %", "INMEX %"
  ],
  colModel: [
    { name: "periodo", width: widthColumns, align: "center" },
    { name: "portafolio", width: widthColumns, align: "center" },
    { name: "S01", width: widthColumns, hidden: true, align: "center" },
    { name: "S02", width: widthColumns, hidden: true, align: "center" },
    { name: "S03", width: widthColumns, hidden: true, align: "center" },
    { name: "S04", width: widthColumns, hidden: true, align: "center" },
    { name: "S05", width: widthColumns, hidden: true, align: "center" },
    { name: "S06", width: widthColumns, hidden: true, align: "center" },
    { name: "S07", width: widthColumns, hidden: true, align: "center" },
    { name: "S08", width: widthColumns, hidden: true, align: "center" }
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
  caption: "",
  loadComplete: function() {
    $("#gbox_table_resultadosfuente").contextMenu("menu-excel", {
      bindings: {
        "obtener-excel": function(event) {
          console.log("copiar excel");
        }
      },
      onContexMenu: function(event, menu) {}
    });
  }
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
  caption: "",
  loadComplete: function() {
    $("#gbox_table_resultadosMensualesTWP").contextMenu("menu-pdf", {
      bindings: {
        "obtener-fuente": function(event) {
          const txtContrato: string = String($("#txtContrato").val());

          http_findOne("contratos", txtContrato, payload => {
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
          });
        }
      },
      onContexMenu: function(event, menu) {}
    });
  }
});
$("#table_resultadosAcumuladosTWP").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  colNames: [
    "periodo",
    "Valor_Mercado",
    "crecimiento_Portafolio_Periodo",
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
    { name: "Valor_Mercado", width: 300 },
    { name: "crecimiento_Portafolio_Periodo", width: 300 },
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

$('input[name="chk_cmbOpcionesRendi"]').change(function() {
  let selected = [];
  selected = verificaSeleccionados();

  if (selected.length > 0) {

    if (test == true) {
      if ($("#cmbModelosCalculoCombo").val() == "T") {
        closeWindow();
        activaTWP(selected);
    }else{
        openWindow();
        activaTIR(selected);
    }
    }else{
      alert("Fecha invalida");
    }  

    return false;
  } else {
    
    if (test == true) {
    if ($("#cmbModelosCalculoCombo").val() == "T") {
      closeWindow();
      activaTWP(null);
    }else{
      openWindow();
      activaTIR(null);
    }
  }else{
    alert("Fecha invalida");
  }
    return false;
  }
});

const graficaMensuales = (GraficaM: string, arrayCkeck:any[], listaMensuales: any) => {
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

  for (var i = 0; i < listaMensuales.length; i++) {
    var data = listaMensuales[i];
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

    let array = [];
  
    if (arrayCkeck == undefined) {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY1
        }
      ];
    } else {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY1
        }
      ];
      arrayCkeck.forEach(element => {
        if (element == "S01") {
          array.push({
            type: "bar",
            label: "Real4",
            backgroundColor: "#ffff66",
            data: dataSetY2
          });
        }
  
        if (element == "S02") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY3
          });
        }
  
        if (element == "S03") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY4
          });
        }
  
        if (element == "S04") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY5
          });
        }
        if (element == "S05") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY6
          });
        }
        if (element == "S06") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY7
          });
        }
        if (element == "S07") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY8
          });
        }
        if (element == "S08") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY9
          });
        }
      });
    }

    if (nameGraphMovimientos != null){
      nameGraphMovimientos.destroy();
    }

  var chartData = {
    labels: dataSetX,
    datasets: array
  };

  var ctxBar: any = document.getElementById(GraficaM);
  var contextBar = ctxBar.getContext("2d");
  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = false;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  nameGraphMovimientos = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function(nameGraph) {
          var ctx = nameGraphMovimientos.ctx;

          ctx.canvas.style.width = "400px";
          ctx.canvas.style.height = "200px";

          nameGraphMovimientos.data.datasets.forEach(function(dataset, i) {
            var meta = nameGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            },
            stacked: false,
            ticks: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: "periodo",
              fontColor: "#000"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            stacked: false,
            scaleLabel: {
              display: true,
              labelString: "portafolio",
              fontColor: "#000"
            },
            ticks: {
              display: true,
              callback: function(value) {
                return value + "";
              }
            }
          }
        ]
      }
    }
  });
};

const graficaAcumulados = (GraficaA: string, arrayCkeck:any[], listaAcumulados: any) => {
  var dataSetY10 = [];
  var dataSetY11 = [];
  var dataSetY12 = [];
  var dataSetY13 = [];
  var dataSetY14 = [];
  var dataSetY15 = [];
  var dataSetY16 = [];
  var dataSetY17 = [];
  var dataSetY18 = [];
  var dataSetX1 = [];

  for (var i = 0; i < listaAcumulados.length; i++) {
    var data = listaAcumulados[i];
    dataSetX1.push(data.periodo);
    dataSetY10.push(data.portafolio);
    dataSetY11.push(data.S01);
    dataSetY12.push(data.S02);
    dataSetY13.push(data.S03);
    dataSetY14.push(data.S04);
    dataSetY15.push(data.S05);
    dataSetY16.push(data.S06);
    dataSetY17.push(data.S07);
    dataSetY18.push(data.S08);
  }

    let array = [];
  
    if (arrayCkeck == undefined) {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY10
        }
      ];
    } else {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY10
        }
      ];
      arrayCkeck.forEach(element => {
        if (element == "S01") {
          array.push({
            type: "bar",
            label: "Real4",
            backgroundColor: "#ffff66",
            data: dataSetY11
          });
        }
  
        if (element == "S02") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY12
          });
        }
  
        if (element == "S03") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY13
          });
        }
  
        if (element == "S04") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY14
          });
        }
        if (element == "S05") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY15
          });
        }
        if (element == "S06") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY16
          });
        }
        if (element == "S07") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY17
          });
        }
        if (element == "S08") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY18
          });
        }
      });
    }
  
    if (nameGraphAcumulados != null){
      nameGraphAcumulados.destroy();
    }

    var chartData = {
      labels: dataSetX1,
      datasets: array
    };
  
    var ctxBar: any = document.getElementById(GraficaA);
    var contextBar = ctxBar.getContext("2d");
    // Style legends
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.legend.labels.fontSize = 9;
    Chart.defaults.global.legend.labels.boxWidth = 9;
    Chart.defaults.global.legend.position = "bottom";
    Chart.defaults.global.legend.display = false;
    // Style tittle graph
    Chart.defaults.global.title.display = false;
    Chart.defaults.global.title.text = "";
    // Graph responsive
    Chart.defaults.global.responsive = true;
    // Data point
    Chart.defaults.global.elements.point.radius = 0;
  
    nameGraphAcumulados = new Chart(contextBar, {
      plugins: [
        {
          afterDatasetsDraw: function(nameGraphAcumulados) {
            var ctx = nameGraphAcumulados.ctx;
  
            ctx.canvas.style.width = "400px";
            ctx.canvas.style.height = "200px";
  
            nameGraphAcumulados.data.datasets.forEach(function(dataset, i) {
              var meta = nameGraphAcumulados.getDatasetMeta(i);
              if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                  ctx.fillStyle = "#000";
                  var fontSize = 12;
                  var fontStyle = "normal";
                  var fontFamily = "Arial";
  
                  ctx.font = Chart.helpers.fontString(
                    fontSize,
                    fontStyle,
                    fontFamily
                  );
                });
              }
            });
          }
        }
      ],
      type: "bar",
      data: chartData,
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              stacked: false,
              ticks: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: "periodo",
                fontColor: "#000"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: "portafolio",
                fontColor: "#000"
              },
              ticks: {
                display: true,
                callback: function(value) {
                  return value + "";
                }
              }
            }
          ]
        }
      }
    });
  
  
};

const graficaMensualesTWP = (GraficaMTWP: string, arrayCkeck:any[], listaMensualesTWP: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetY3 = [];
  var dataSetY4 = [];
  var dataSetY5 = [];
  var dataSetY6 = [];
  var dataSetY7 = [];
  var dataSetY8 = [];
  var dataSetY9 = [];
  var dataSetY10 = [];
  var dataSetY11 = [];
  var dataSetY12 = [];
  var dataSetY13 = [];
  var dataSetX = [];

  for (var i = 0; i < listaMensualesTWP.length; i++) {
    var data = listaMensualesTWP[i];
    dataSetX.push(data.periodo);
    dataSetY1.push(data.Valor_Mercado);
    dataSetY2.push(data.Aportaciones);
    dataSetY3.push(data.Retiros);
    dataSetY4.push(data.Cambio_de_valores);
    dataSetY5.push(data.crecimiento_Portafolio_Periodo);
    dataSetY6.push(data.S01);
    dataSetY7.push(data.S02);
    dataSetY8.push(data.S03);
    dataSetY9.push(data.S04);
    dataSetY10.push(data.S05);
    dataSetY11.push(data.S06);
    dataSetY12.push(data.S07);
    dataSetY13.push(data.S08);
  }
    let array = [];
  
    if (arrayCkeck == undefined) {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY1
        },
        {
          type: "bar",
          label: "Real2",
          backgroundColor: "#2b6cb0",
          data: dataSetY2
        },
        {
          type: "bar",
          label: "Real3",
          backgroundColor: "#2b6cb0",
          data: dataSetY3
        },
        {
          type: "bar",
          label: "Real4",
          backgroundColor: "#2b6cb0",
          data: dataSetY4
        },
        {
          type: "bar",
          label: "Real5",
          backgroundColor: "#2b6cb0",
          data: dataSetY5
        }
      ];
    } else {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY1
        },
        {
          type: "bar",
          label: "Real2",
          backgroundColor: "#2b6cb0",
          data: dataSetY2
        },
        {
          type: "bar",
          label: "Real3",
          backgroundColor: "#2b6cb0",
          data: dataSetY3
        },
        {
          type: "bar",
          label: "Real4",
          backgroundColor: "#2b6cb0",
          data: dataSetY4
        },
        {
          type: "bar",
          label: "Real5",
          backgroundColor: "#2b6cb0",
          data: dataSetY5
        }
      ];
      arrayCkeck.forEach(element => {
        if (element == "S01") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY6
          });
        }
        if (element == "S02") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY7
          });
        }
        if (element == "S03") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY8
          });
        }
        if (element == "S04") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY9
          });
        }
        if (element == "S05") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY10
          });
        }
        if (element == "S06") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY11
          });
        }
        if (element == "S07") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY12
          });
        }
        if (element == "S08") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY13
          });
        }
      });
    }

    if (nameGraphMovimientosTWP != null){
      nameGraphMovimientosTWP.destroy();
    }

    var chartData = {
      labels: dataSetX,
      datasets: array
    };
  
    var ctxBar: any = document.getElementById(GraficaMTWP);
    var contextBar = ctxBar.getContext("2d");
    // Style legends
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.legend.labels.fontSize = 9;
    Chart.defaults.global.legend.labels.boxWidth = 9;
    Chart.defaults.global.legend.position = "bottom";
    Chart.defaults.global.legend.display = false;
    // Style tittle graph
    Chart.defaults.global.title.display = false;
    Chart.defaults.global.title.text = "";
    // Graph responsive
    Chart.defaults.global.responsive = true;
    // Data point
    Chart.defaults.global.elements.point.radius = 0;
  
    nameGraphMovimientosTWP = new Chart(contextBar, {
      plugins: [
        {
          afterDatasetsDraw: function(nameGraphMovimientosTWP) {
            var ctx = nameGraphMovimientosTWP.ctx;
  
            ctx.canvas.style.width = "400px";
            ctx.canvas.style.height = "200px";
  
            nameGraphMovimientosTWP.data.datasets.forEach(function(dataset, i) {
              var meta = nameGraphMovimientosTWP.getDatasetMeta(i);
              if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                  ctx.fillStyle = "#000";
                  var fontSize = 12;
                  var fontStyle = "normal";
                  var fontFamily = "Arial";
  
                  ctx.font = Chart.helpers.fontString(
                    fontSize,
                    fontStyle,
                    fontFamily
                  );
                });
              }
            });
          }
        }
      ],
      type: "bar",
      data: chartData,
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              stacked: false,
              ticks: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: "periodo",
                fontColor: "#000"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: "portafolio",
                fontColor: "#000"
              },
              ticks: {
                display: true,
                callback: function(value) {
                  return value + "";
                }
              }
            }
          ]
        }
      }
    });
};

const graficaAcumuladosTWP = (
  GraficaATWP: string,arrayCkeck:any[],
  listaAcumuladosTWP: any
) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetY3 = [];
  var dataSetY4 = [];
  var dataSetY5 = [];
  var dataSetY6 = [];
  var dataSetY7 = [];
  var dataSetY8 = [];
  var dataSetY9 = [];
  var dataSetY10 = [];
  var dataSetX = [];

  for (var i = 0; i < listaAcumuladosTWP.length; i++) {
    var data = listaAcumuladosTWP[i];
    dataSetX.push(data.periodo);
    dataSetY1.push(data.Valor_Mercado);
    dataSetY2.push(data.crecimiento_Portafolio_Periodo);
    dataSetY3.push(data.S01);
    dataSetY4.push(data.S02);
    dataSetY5.push(data.S03);
    dataSetY6.push(data.S04);
    dataSetY7.push(data.S05);
    dataSetY8.push(data.S06);
    dataSetY9.push(data.S07);
    dataSetY10.push(data.S08);
  }

    let array = [];
  
    if (arrayCkeck == undefined) {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY1
        },
        {
          type: "bar",
          label: "Real2",
          backgroundColor: "#2b6cb0",
          data: dataSetY2
        }
      ];
    } else {
      array = [
        {
          type: "bar",
          label: "Real",
          backgroundColor: "#2b6cb0",
          data: dataSetY1
        },
        {
          type: "bar",
          label: "Real2",
          backgroundColor: "#2b6cb0",
          data: dataSetY2
        }
      ];
      arrayCkeck.forEach(element => {
        if (element == "S01") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY3
          });
        }
        if (element == "S02") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY4
          });
        }
        if (element == "S03") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY5
          });
        }
        if (element == "S04") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY6
          });
        }
        if (element == "S05") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY7
          });
        }
        if (element == "S06") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY8
          });
        }
        if (element == "S07") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY9
          });
        }
        if (element == "S08") {
          array.push({
            type: "bar",
            label: "Real5",
            backgroundColor: "#ffff66",
            data: dataSetY10
          });
        }
      });
    }
  
    if (nameGraphAcumuladosTWP != null){
      nameGraphAcumuladosTWP.destroy();
    }

    var chartData = {
      labels: dataSetX,
      datasets: array
    };
  
    var ctxBar: any = document.getElementById(GraficaATWP);
    var contextBar = ctxBar.getContext("2d");
    // Style legends
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.legend.labels.fontSize = 9;
    Chart.defaults.global.legend.labels.boxWidth = 9;
    Chart.defaults.global.legend.position = "bottom";
    Chart.defaults.global.legend.display = false;
    // Style tittle graph
    Chart.defaults.global.title.display = false;
    Chart.defaults.global.title.text = "";
    // Graph responsive
    Chart.defaults.global.responsive = true;
    // Data point
    Chart.defaults.global.elements.point.radius = 0;
  
    nameGraphAcumuladosTWP = new Chart(contextBar, {
      plugins: [
        {
          afterDatasetsDraw: function(nameGraphAcumuladosTWP) {
            var ctx = nameGraphAcumuladosTWP.ctx;
  
            ctx.canvas.style.width = "400px";
            ctx.canvas.style.height = "200px";
  
            nameGraphAcumuladosTWP.data.datasets.forEach(function(dataset, i) {
              var meta = nameGraphAcumuladosTWP.getDatasetMeta(i);
              if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                  ctx.fillStyle = "#000";
                  var fontSize = 12;
                  var fontStyle = "normal";
                  var fontFamily = "Arial";
  
                  ctx.font = Chart.helpers.fontString(
                    fontSize,
                    fontStyle,
                    fontFamily
                  );
                });
              }
            });
          }
        }
      ],
      type: "bar",
      data: chartData,
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              stacked: false,
              ticks: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: "periodo",
                fontColor: "#000"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: "portafolio",
                fontColor: "#000"
              },
              ticks: {
                display: true,
                callback: function(value) {
                  return value + "";
                }
              }
            }
          ]
        }
      }
    });

};

$("#gbox_table_resultadosMensualesTWP").hide();
$("#graficaMensualTWP").hide();
$("#gbox_table_resultadosAcumuladosTWP").hide();
$("#graficaAcumuladosTWP").hide();

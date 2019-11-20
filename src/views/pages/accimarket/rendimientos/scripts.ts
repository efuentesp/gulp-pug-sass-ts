/// <reference path="../../typings/index.d.ts" />
let numColumns = 2;
let widthTableResultadosMensuales = 678;
let widthColumnsResultadosMensuales = widthTableResultadosMensuales / numColumns;

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

const isSelectedColumn = (columnName:String, selectedColumns: any) => {
  let isSelected: boolean = false;

  for( var i=0; i<selectedColumns.length; i++ ){
    if( selectedColumns[i] == columnName ){
      isSelected = true;
      break;
    }
  }

  return isSelected;
};

$('input[name="chk_cmbOpcionesRendi"]').change(function() {
  if( $(this).is(":checked") ){
    numColumns = numColumns + 1;
  }else{
    numColumns = numColumns - 1;
  }
  
  var gridWidth = $("#splitter-container").parent().width();
  if( gridWidth > widthTableResultadosMensuales ){
    gridWidth = widthTableResultadosMensuales;
  }  
  widthColumnsResultadosMensuales = gridWidth / numColumns;
  
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

  let selectedColumns: any = verificaSeleccionados();

  //-------------------------------------------------------------------------------------------
  var colModel = $("#table_resultadosMensuales").jqGrid('getGridParam', 'colModel');

  $("#table_resultadosMensuales").jqGrid("setGridWidth", gridWidth, true);    

  for( var j = 0; j<colModel.length; j++ ) {
    $("#table_resultadosMensuales").jqGrid('resizeColumn', colModel[j].name, 0);  

    if( j < 2 || isSelectedColumn(colModel[j].name, selectedColumns) ){  
      $("#table_resultadosMensuales").jqGrid('resizeColumn', colModel[j].name, widthColumnsResultadosMensuales); 
     }
  }

  $("#gbox_table_resultadosMensuales").attr("style", "width: " + gridWidth + "px;");
  $("#gview_table_resultadosMensuales").attr("style", "width: " + gridWidth + "px;");
  //-------------------------------------------------------------------------------------------
  var colModel = $("#table_resultadosAcumulados").jqGrid('getGridParam', 'colModel');

  $("#table_resultadosAcumulados").jqGrid("setGridWidth", gridWidth, true);    

  for( var j = 0; j<colModel.length; j++ ) {
    $("#table_resultadosAcumulados").jqGrid('resizeColumn', colModel[j].name, 0);  

    if( j < 2 || isSelectedColumn(colModel[j].name, selectedColumns) ){  
      $("#table_resultadosAcumulados").jqGrid('resizeColumn', colModel[j].name, widthColumnsResultadosMensuales); 
     }
  }

  $("#gbox_table_resultadosAcumulados").attr("style", "width: " + gridWidth + "px;");
  $("#gview_table_resultadosAcumulados").attr("style", "width: " + gridWidth + "px;");

});

const verificaSeleccionados = () => {
  console.log("Search");

  let selected: any = [];

  $('input[name="chk_cmbOpcionesRendi"]').each(function() {
    if ($(this).is(":checked")) {
      selected.push($(this).val());
    }
  });

  console.log("Los seleccionados: " + selected);

  return selected;
};

const activaTIR = () => {
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
    graficaAcumulados("graficaAcumulados", payload.listaAcumulados);
    $("#table_resultadosMensuales").jqGrid("setColProp", "amount", {
      width: 800
    });
  });
};

const activaTWP = () => {
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

    fillJqGrid("#table_resultadosMensualesTWP", payload.listaMensualesTWP);
    graficaMensualesTWP("graficaMensualTWP", payload.listaMensualesTWP);

    fillJqGrid("#table_resultadosAcumuladosTWP", payload.listaAcumuladosTWP);
    graficaAcumuladosTWP("graficaAcumuladosTWP", payload.listaAcumuladosTWP);
  });
};

const activaSeleccionados = () => {
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

    fillJqGrid("#table_resultadosMensualesTWP", payload.listaMensualesTWP);
    graficaMensualesTWP("graficaMensualTWP", payload.listaMensualesTWP);

    fillJqGrid("#table_resultadosAcumuladosTWP", payload.listaAcumuladosTWP);
    graficaAcumuladosTWP("graficaAcumuladosTWP", payload.listaAcumuladosTWP);
  });
};

// Boton search
$("#btn_search").click(function() {
  let selected = [];

  selected = verificaSeleccionados();

  if (selected.length > 0) {
    return false;
  } else {
    
    if ($("#cmbModelosCalculoCombo").val() == "T") {
      activaTWP();
    }else{
      activaTIR();
    }

    return false;
  }
});

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_
$(window).on("resize", function() {
  var gridWidth = $("#splitter-container")
    .parent()
    .width();

  if( gridWidth > widthTableResultadosMensuales ){
    gridWidth = widthTableResultadosMensuales;
  }  

  console.log("******************************* gridWidth: " + gridWidth);  
  $("#table_resultadosMensuales").jqGrid("setGridWidth", gridWidth, true);
  $("#table_resultadosAcumulados").jqGrid("setGridWidth", gridWidth, true);
});
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_

$("#table_resultadosMensuales").jqGrid({
  datatype: "local",
  height: "70",
  sortable: true,
  width: widthTableResultadosMensuales,
  colNames: [
             "Periodo", "Portafolio %", "Inflacion %", "IPC %", "Cetes 28 %", 
             "Deval %", "Soc Inv RF-PM %", "Cetes 91 %", "Soc Inv RV %", "INMEX %"
  ],
  colModel: [
    { name: "periodo", width: widthColumnsResultadosMensuales, align: "center" },
    { name: "portafolio", width: widthColumnsResultadosMensuales, align: "center" },
    { name: "S01", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S02", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S03", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S04", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S05", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S06", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S07", width: widthColumnsResultadosMensuales, hidden: true, align: "center" },
    { name: "S08", width: widthColumnsResultadosMensuales, hidden: true, align: "center" }
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

const graficaMensuales = (tipoGrafica: string, listaMensuales: any) => {
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
  $('input[name="chk_cmbOpcionesRendi"]').change(function() {
    //selected = "";
    let selected2: any = [];

    $('input[name="chk_cmbOpcionesRendi"]').each(function() {
      if ($(this).is(":checked")) {
        //selected += $(this).val() + ", ";
        selected2.push($(this).val());
      }
    });

    // if (selected != "") alert("Has seleccionado: " + selected);
    // else alert("Debes seleccionar al menos una opción.");
    // return false;

    pintaGrafica(selected2, "graficaMensual");
  });
  const pintaGrafica = (arrayCkeck: [], id: string) => {
    let array = [];

    console.log("Check Pinta:" + arrayCkeck);

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

    simpleBarChart({
      id: id,
      titleX: "Período",
      titleY: "Portafolio",
      labels: dataSetX,
      tickMaxY: 15.0,
      tickMinY: -15 /*0*/,
      tickStepY: 1,
      width: "400px",
      height: "200px",
      dataSet: array
    });
  };
  pintaGrafica(null, tipoGrafica);
};

const graficaAcumulados = (tipoGrafica2: string, listaAcumulados: any) => {
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
  $('input[name="chk_cmbOpcionesRendi"]').change(function() {
    //selected = "";
    let selected3: any = [];

    $('input[name="chk_cmbOpcionesRendi"]').each(function() {
      if ($(this).is(":checked")) {
        //selected += $(this).val() + ", ";
        selected3.push($(this).val());
      }
    });

    // if (selected != "") alert("Has seleccionado: " + selected);
    // else alert("Debes seleccionar al menos una opción.");
    // return false;

    pintaGrafica2(selected3, "graficaAcumulados");
  });
  const pintaGrafica2 = (arrayCkeck: [], id: string) => {
    let array = [];

    console.log("Check Pinta:" + arrayCkeck);

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

    simpleBarAuxChart({
      id: id,
      titleX: "Período",
      titleY: "Portafolio",
      labels: dataSetX1,
      tickMaxY: 15.0,
      tickMinY: -15 /*0*/,
      tickStepY: 1,
      width: "400px",
      height: "200px",
      dataSet: array
    });
  };
  pintaGrafica2(null, tipoGrafica2);
};
const graficaMensualesTWP = (tipoGrafica3: string, listaMensualesTWP: any) => {
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
  $('input[name="chk_cmbOpcionesRendi"]').change(function() {
    //selected = "";
    let selected4: any = [];

    $('input[name="chk_cmbOpcionesRendi"]').each(function() {
      if ($(this).is(":checked")) {
        //selected += $(this).val() + ", ";
        selected4.push($(this).val());
      }
    });

    // if (selected != "") alert("Has seleccionado: " + selected);
    // else alert("Debes seleccionar al menos una opción.");
    // return false;
    pintaGrafica3(selected4, "graficaMensualTWP");
  });
  const pintaGrafica3 = (arrayCkeck: [], id: string) => {
    let array = [];

    console.log("Check Pinta:" + arrayCkeck);

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

    simpleBarAux1Chart({
      id: id,
      titleX: "Período",
      titleY: "Portafolio",
      labels: dataSetX,
      tickMaxY: 15.0,
      tickMinY: -15 /*0*/,
      tickStepY: 1,
      width: "400px",
      height: "200px",
      dataSet: array
    });
  };
  pintaGrafica3(null, tipoGrafica3);
};
const graficaAcumuladosTWP = (
  tipoGrafica3: string,
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

  $('input[name="chk_cmbOpcionesRendi"]').change(function() {
    //selected = "";
    let selected4: any = [];

    $('input[name="chk_cmbOpcionesRendi"]').each(function() {
      if ($(this).is(":checked")) {
        //selected += $(this).val() + ", ";
        selected4.push($(this).val());
      }
    });

    // if (selected != "") alert("Has seleccionado: " + selected);
    // else alert("Debes seleccionar al menos una opción.");
    // return false;

    pintaGrafica4(selected4, "graficaAcumuladosTWP");
  });
  const pintaGrafica4 = (arrayCkeck: [], id: string) => {
    let array = [];

    console.log("Check Pinta:" + arrayCkeck);

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

    simpleBarAux2Chart({
      id: id,
      titleX: "Período",
      titleY: "Portafolio",
      labels: dataSetX,
      tickMaxY: 15.0,
      tickMinY: -15 /*0*/,
      tickStepY: 1,
      width: "400px",
      height: "200px",
      dataSet: array
    });
  };
  pintaGrafica4(null, tipoGrafica3);
};

$("#gbox_table_resultadosMensualesTWP").hide();
$("#graficaMensualTWP").hide();
$("#gbox_table_resultadosAcumuladosTWP").hide();
$("#graficaAcumuladosTWP").hide();


// $( "#resizable" ).resizable({
//   // alsoResize: "#also"
//   maxWidth:100,
//   maxHeight:100
// });

// $("#splitter-container").resizable({ handles: "e" });
// $("#simple").resizable({ handles: "e" });
// $("#resultadosMensuales").resizable({ handles: "e" });
// $("#resultadosAcumulados").resizable({ handles: "e" });
// $(window).resize(function() { alert("Window resized"); });

// $( "#also" ).resizable();
// $(window).on("resize", function() {
//   const gridRMWidth = $("#div-resultadosMensuales-grid")
//     .parent()
//     .width();
//   $("#table_resultadosMensuales").jqGrid("setGridWidth", gridRMWidth, true);
// });

/// <reference path="../../typings/index.d.ts" />

// _field-plus-minus-variantes
// fieldPlusMinus("contrato", {maxsize:4});
// fieldPlusMinus("testopcional", {});
// fieldPlusMinus("testrequerido", {});
// fieldPlusMinus("testhorizontal", {});
// fieldPlusMinus("testvertical", {});

// fieldDateClear("fecha3");

// _field-date-range-variantes.pug

// validateDateRage("fecha");
// fieldDateClear("fecha");
// fieldBeginDateRangeClear("fecha");
// fieldEndDateRangeClear("fecha");


// validateDateRage("testClearReq");
// fieldBeginDateRangeClear("testClearReq");
// fieldEndDateRangeClear("testClearReq");
// fieldDateClear("testClearReq");

// validateDateRage("testClearOptl");
// fieldBeginDateRangeClear("testClearOptl");
// fieldEndDateRangeClear("testClearOptl");
// fieldDateClear("testClearOptl");

// validateDateRage("testOptional");
// fieldBeginDateRangeClear("testOptional");
// fieldEndDateRangeClear("testOptional");
// fieldDateClear("testOptional");

// validateDateRage("testRequired");
// fieldBeginDateRangeClear("testRequired");
// fieldEndDateRangeClear("testRequired");
// fieldDateClear("testRequired");

// _canvas-variantes.pug
// let canvas_test_params: UrlParams = {};

// http_findAll("averages", canvas_test_params, payload => {
//     canvasTest(payload);
//   });

// const canvasTest = (average: any) => {
//     var dataSetY = [];
//     var dataSetX = [];
  
//     for (var i = 0; i < average.length; i++) {
//       var data = average[i];
//       dataSetX.push(data.dataA);
//       dataSetY.push(data.dataB);
//     }
  
//     simpleBarChart({
//       id: "testCanvas",
//       titleX: "Período",
//       titleY: "Portafolio",
//       labels: dataSetX,
//       tickMaxY: 1.0,
//       tickMinY: 0,
//       tickStepY: 0.2,
//       width: "500px",
//       height: "300px",
//       dataSet: [
//         {
//           type: "bar",
//           label: "Real",
//           backgroundColor: "#2b6cb0",
//           data: dataSetY
//         }
//       ]
//     });
//   };

// _field-select-variantes.pug
// ($("#testSelectHorizontal") as any).select2({
//     language: "es",
//     placeholder: "",
//     minimumResultsForSearch: Infinity
//   });

//   ($("#testSelectVertical") as any).select2({
//     language: "es",
//     placeholder: "",
//     minimumResultsForSearch: Infinity
//   });

//   ($("#testSelectOptional") as any).select2({
//     language: "es",
//     placeholder: "",
//     minimumResultsForSearch: Infinity
//   });

//   ($("#testSelectRequired") as any).select2({
//     language: "es",
//     placeholder: "",
//     minimumResultsForSearch: Infinity
//   });

// _grid-variantes.pug
// let test_grid_params: UrlParams = {};

// http_findAll("contratos", test_grid_params, payload => {
  
//     llenaGridTestGridVariantess(payload);    
//     const rec_count = payload.length;
//     $("#count_testGridVariantes").html(rec_count);    
//   });

//   const llenaGridTestGridVariantess = (contratos: any) => {
//     // console.log(contratos);
//     console.log("INGRESA A LA FUNCION  LLENA GRID");
//     $("#table_testGridVariantes").jqGrid({
//       data: contratos,
//       datatype: "local",
//       height: "auto",
//       shrinkToFit: false,
//       rowList: [10, 20, 30],
//       colNames: [
//         "Contrato",
//         // "Imagen",
//         // "Icono",
//         "ID Emisión",
//         "Cantidad",
//         "Emision",
//         "Serie",
//         "Cupon",
//         "Dígito",
//         "T.V.",
//         "Precio",
//         "Importe",
//         "Descripción",
//         "Fecha",
//         "Descripción T.V.",
//         "Lista Contrato",
//         "Lista Dígito",
//         "Usuario",
//         "Reporte",
//         "Lista libro",
//         "ID Libro",
//         "Cliente",
//         "Promotor",
//         "Folio",
//         "Moneda",
//         "Credito MX",
//         "Aforo",
//         "Tipo Moneda",
//         "Fecha Producción",
//         "I Libro",
//         "Libro",
//         "% Real",
//         "Diferencia",
//         "Fecha Antigua"
//       ],
//       colModel: [
//         {
//           name: "contrato",
//           index: "contrato",
//           width: 100,
//           sortable: true,
//           sorttype: "number",
//           frozen: true
//         },
//         // {
//         //   name: "imagen",
//         //   index: "imagen",
//         //   width: 50,
//         //   sortable: false,
//         //   formatter: (cellvalue, options, rowobject) => {
//         //     return "<img src='../../assets/images/btn-calendario_32x32.png' width='12px'>";
//         //   }
//         // },
//         // {
//         //   name: "icono",
//         //   index: "icono",
//         //   width: 50,
//         //   sortable: false,
//         //   formatter: (cellvalue, options, rowobject) => {
//         //     return "<i class='fa fa-plus-circle fa-lg text-red-600'></i>";
//         //   }
//         // },
//         { name: "emisora", index: "emisora", width: 100, sortable: false },
//         { name: "cantidad", index: "cantidad", width: 100, sortable: false },
//         { name: "emision", index: "emision", width: 100, sortable: false },
//         { name: "serie", index: "serie", width: 100, sortable: false },
//         { name: "cupon", index: "cupon", width: 100, sortable: false },
//         { name: "digito", index: "digito", width: 100, sortable: false },
//         { name: "tv", index: "tv", width: 100, sortable: false },
//         {
//           name: "precioMdo",
//           index: "precioMdo",
//           width: 90,
//           formatter: "currency",
//           sortable: false,
//           summaryType: "sum",
//           formatoptions: {
//             decimalPlaces: 2,
//             prefix: "$",
//             thousandsSeparator: ","
//           }
//         },
//         {
//           name: "importeValua",
//           index: "importeValua",
//           width: 90,
//           formatter: "currency",
//           sortable: false,
//           summaryType: "sum",
//           formatoptions: {
//             decimalPlaces: 2,
//             prefix: "$",
//             thousandsSeparator: ","
//           }
//         },
//         { name: "descripcion", index: "descripcion", width: 90, sortable: false },
//         {
//           name: "fecha",
//           index: "fecha",
//           width: 90,
//           formatter: "date",
//           sortable: false
//         },
//         { name: "descrTV", index: "descrTV", width: 90, sortable: false },
//         {
//           name: "listaContrato",
//           index: "listaContrato",
//           width: 90,
//           sortable: false
//         },
//         { name: "listaDigito", index: "listaDigito", width: 90, sortable: false },
//         { name: "usuario", index: "usuario", width: 90, sortable: false },
//         { name: "reporte", index: "reporte", width: 90, sortable: false },
//         { name: "listaLibro", index: "listaLibro", width: 90, sortable: false },
//         { name: "idLibro", index: "idLibro", width: 90, sortable: false },
//         { name: "cliente", index: "cliente", width: 90, sortable: false },
//         { name: "promotor", index: "promotor", width: 90, sortable: false },
//         { name: "folio", index: "folio", width: 90, sortable: false },
//         { name: "moneda", index: "moneda", width: 90, sortable: false },
//         { name: "creditoMX", index: "creditoMX", width: 90, sortable: false },
//         { name: "aforo", index: "aforo", width: 90, sortable: false },
//         { name: "monedaTipo", index: "monedaTipo", width: 90, sortable: false },
//         {
//           name: "fechaProducción",
//           index: "fechaProducción",
//           width: 90,
//           sortable: false
//         },
//         { name: "iLibro", index: "iLibro", width: 90, sortable: false },
//         { name: "libro", index: "libro", width: 90, sortable: false },
//         { name: "porcentReal", index: "porcentReal", width: 90, sortable: false },
//         { name: "diferencia", index: "diferencia", width: 90, sortable: false },
//         {
//           name: "fechaMasAntiua",
//           index: "fechaMasAntiua",
//           width: 90,
//           formatter: "date",
//           sortable: false
//         }
//       ]
//     });
//   };
  
//   $("#table_contratos").jqGrid("setFrozenColumns");
  
//   $("#btn_pdf").click(() =>
//     $("#dialogo_pdf").dialog({
//       modal: true,
//       closeText: "",
//       show: true,
//       title: "Confirmación",
//       width: 400
//       // buttons: [
//       //   {
//       //     text: "Aceptar",
//       //     // icon: "ui-icon-check",
//       //     click: function() {
//       //       $(this).dialog("close");
//       //     }
//       //   },
//       //   {
//       //     text: "Cancelar",
//       //     // icon: "ui-icon-check",
//       //     click: function() {
//       //       $(this).dialog("close");
//       //     }
//       //   }
//       // ]
//     })
//   );

//_tabs-variantes.pug

// $("#test_variantes_tab_group")
//   .tabs()
//   .addClass("ui-tabs-vertical ui-helper-clearfix");
// $("#test_variantes_tab_group > ul > li")
//   .removeClass("ui-corner-top")
//   .addClass("ui-corner-left");





// _field-timepicker-variantes.pug
// const opcionesTestTimepickerHorizontal = {
//   now: "16:00", //hh:mm 24 hour format only, defaults to current time
//   // twentyFour: true, //Display 24 hour format, defaults to false
//   upArrow: "wickedpicker__controls__control-up", //The up arrow class selector to use, for custom CSS
//   downArrow: "wickedpicker__controls__control-down", //The down arrow class selector to use, for custom CSS
//   close: "wickedpicker__close", //The close class selector to use, for custom CSS
//   hoverState: "hover-state", //The hover state class to use, for custom CSS
//   title: "Horario SACID", //The Wickedpicker's title,
//   showSeconds: false, //Whether or not to show seconds,
//   secondsInterval: 1, //Change interval for seconds, defaults to 1 ,
//   minutesInterval: 1, //Change interval for minutes, defaults to 1
//   beforeShow: null, //A function to be called before the Wickedpicker is shown
//   show: null, //A function to be called when the Wickedpicker is shown
//   clearable: false //Make the picker's input clearable (has clickable "x")
// };

// ($("#testTimepickerHorizontal") as any).wickedpicker(opcionesTestTimepickerHorizontal);


// const opcionesTestTimepickerVertical = {
//     now: "16:00", //hh:mm 24 hour format only, defaults to current time
//     // twentyFour: true, //Display 24 hour format, defaults to false
//     upArrow: "wickedpicker__controls__control-up", //The up arrow class selector to use, for custom CSS
//     downArrow: "wickedpicker__controls__control-down", //The down arrow class selector to use, for custom CSS
//     close: "wickedpicker__close", //The close class selector to use, for custom CSS
//     hoverState: "hover-state", //The hover state class to use, for custom CSS
//     title: "Horario SACID", //The Wickedpicker's title,
//     showSeconds: false, //Whether or not to show seconds,
//     secondsInterval: 1, //Change interval for seconds, defaults to 1 ,
//     minutesInterval: 1, //Change interval for minutes, defaults to 1
//     beforeShow: null, //A function to be called before the Wickedpicker is shown
//     show: null, //A function to be called when the Wickedpicker is shown
//     clearable: false //Make the picker's input clearable (has clickable "x")
//   };
  
//   ($("#testTimepickerVertical") as any).wickedpicker(opcionesTestTimepickerVertical);
  


//   const opcionesTestTimepickerRequired = {
//     now: "16:00", //hh:mm 24 hour format only, defaults to current time
//     // twentyFour: true, //Display 24 hour format, defaults to false
//     upArrow: "wickedpicker__controls__control-up", //The up arrow class selector to use, for custom CSS
//     downArrow: "wickedpicker__controls__control-down", //The down arrow class selector to use, for custom CSS
//     close: "wickedpicker__close", //The close class selector to use, for custom CSS
//     hoverState: "hover-state", //The hover state class to use, for custom CSS
//     title: "Horario SACID", //The Wickedpicker's title,
//     showSeconds: false, //Whether or not to show seconds,
//     secondsInterval: 1, //Change interval for seconds, defaults to 1 ,
//     minutesInterval: 1, //Change interval for minutes, defaults to 1
//     beforeShow: null, //A function to be called before the Wickedpicker is shown
//     show: null, //A function to be called when the Wickedpicker is shown
//     clearable: false //Make the picker's input clearable (has clickable "x")
//   };
  
//   ($("#testTimepickerRequired") as any).wickedpicker(opcionesTestTimepickerRequired);

  const timepicker_ejemplo = {
    now: "16:00", //hh:mm 24 hour format only, defaults to current time
    // twentyFour: true, //Display 24 hour format, defaults to false
    upArrow: "wickedpicker__controls__control-up", //The up arrow class selector to use, for custom CSS
    downArrow: "wickedpicker__controls__control-down", //The down arrow class selector to use, for custom CSS
    close: "wickedpicker__close", //The close class selector to use, for custom CSS
    hoverState: "hover-state", //The hover state class to use, for custom CSS
    title: "Hora", //The Wickedpicker's title,
    showSeconds: false, //Whether or not to show seconds,
    secondsInterval: 1, //Change interval for seconds, defaults to 1 ,
    minutesInterval: 1, //Change interval for minutes, defaults to 1
    beforeShow: null, //A function to be called before the Wickedpicker is shown
    show: null, //A function to be called when the Wickedpicker is shown
    clearable: false //Make the picker's input clearable (has clickable "x")
  };
  
  ($("#ejemplo") as any).wickedpicker(timepicker_ejemplo);





// _spinner-variantes.pug
// jQuery(function($){
// 	$(document).ajaxSend(function() {
// 		$("#overlay").fadeIn(300);　
// 	});
		
// 	$('#button').click(function(){
// 		$.ajax({
// 			type: 'GET',
// 			success: function(data){
// 				console.log(data);
// 			}
// 		}).done(function() {
// 			setTimeout(function(){
// 				$("#overlay").fadeOut(300);
// 			},500);
// 		});
// 	});	
// });



// _sidebar-variantes.pug
// let testSidebarVariantes:boolean = $(".sidebar").attr("expand") == "true";
// if( testSidebarVariantes ){
//   $(".sidebar_content").parent().attr("style", "width: 250px !important;");

//   $(".sidebar_content").addClass("is_open");
//   $(".sidebar_button").addClass("is_open");
//   $(".content").addClass("is_sidebar_open");
// }

// $('.sidebar-collapsible-button').on('click', function() {
//   $('#sidebar_wrapper_aside .sidebar').toggleClass('isClosed');
// });


// _scrolling-menu-variantes.pug
// $("#btn-nav-previous").click(function() {
//   $(".menu-inner-box").animate({ scrollLeft: "-=200px" });
// });

// $("#btn-nav-next").click(function() {
//   $(".menu-inner-box").animate({ scrollLeft: "+=200px" });
// });


// _field-select-plus-MediaElementAudioSourceNode.pug
// fieldSelectPlusMinus("testSelectPlusMinusHorizontal", {});
// fieldSelectPlusMinus("testSelectPlusMinusVertial", {});
// fieldSelectPlusMinus("testSelectPlusMinusOptional", {});
// fieldSelectPlusMinus("testSelectPlusMinusRequired", {});

// let page_params: UrlParams = {};

// fieldSelectPlusAutocomplete("contrato", {});

// http_findAll("contratos", page_params, payload => {
//     llenaSelectContrato(payload);
//   });

// const llenaSelectContrato = (contratos: any) => {
//     fieldSelectPlusAutocomplete("contrato", {
//       id: "id",
//       text: "contrato",
//       payload: contratos
//     });
//   };

// _quiz-varaintes.pug
// let ejemplo_encuesta_params: UrlParams = {}; 
// http_findAll("encuesta", ejemplo_encuesta_params, payload => {
//   // Parameters: field name group, id of quiz, data
//   fillQuiz("ejemplo_encuesta", "encuesta", payload);
// });



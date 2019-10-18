/// <reference path="../../typings/index.d.ts" />

console.log("CONSULTA DE CAPITALES");
const fillAverageOrdenes = (average: any) => {
  var dataSetY = [];
  var dataSetX = [];

  for (var i = 0; i < average.length; i++) {
    var data = average[i];
    dataSetX.push(data.dataA);
    dataSetY.push(data.dataB);
  }

  simpleBarChart({
    id: "averageChartOrdenes",
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





//CAMBIAR COLOR A SELECT DE OPERACION
$("#Operacion").change(function(){
  var opcion = $("#Operacion :selected").val();
  if (opcion == "CPA" ||opcion == "C" ) {
      $("#field_Operacion .select2-selection").removeClass("rojo");
      $("#field_Operacion .select2-selection").addClass("verde");     
  }else{
      $("#field_Operacion .select2-selection").removeClass("verde");
      $("#field_Operacion .select2-selection").addClass("rojo");
  }
});

//FUNCION TOOLTIP AL HACER ENTER EN EMISORAS
$("#emisora").autocomplete({
  select: function (a, b) {
      $(this).val(b.item.value); 
      document.getElementById("field_pemisora").style.display = "block";
  }
});
//FUNCION TOOLTIP AL HACER ENTER EN CONTRATOS
$("#contrato").on('keypress', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
          document.getElementById("contrato").style.width = "7em";        
          document.getElementById("field_digito").style.display = "block";
          document.getElementById("field_digito").style.position = "relative";
          document.getElementById("field_digito").style.top = "-.5em";
          
          document.getElementById("perfilC").style.position = "relative";
          document.getElementById("perfilC").style.left = "8.5em";         
          document.getElementById("perfilC").style.top = "-1.5em";

          document.getElementById("field_IPContrato").style.position = "relative";
          document.getElementById("field_IPContrato").style.left = "9.5em";         
          
          document.getElementById("field_titular").style.display = "block";
          document.getElementById("field_perfilC").style.display = "block";
          document.getElementById("field_IPContrato").style.display = "block";         
          
        }

});


//FUNCION AUTOCOMPLETAR
var  data;
let emisoras_params: UrlParams = {};
http_findAll("emisoras", emisoras_params, emisorasJ => {
  const rec_count = emisorasJ.length;
  $("#count_contratos").html(rec_count);
  data = emisorasJ;
});


$(function() { 
  $( "#emisora" ).autocomplete({
    source:function(request,response){
     var regex = new RegExp(request.term,'i'); 
       response($.map(data,function(value,key){
         if(regex.test(value.nombre)){
           return {
            value:value.nombre
           };
         }
       }));
    },
    minLength: 1,
    delay: 50
  });
} );

//MOSTRAR OCULTAR ELEMENTOS EN CAPTURAR AVANZADOS
$('#field_CapturarDA').change(() => {
	var opcion = $("#field_CapturarDA :checked").val();
  console.log("INGRESA AL CLICK DEL CHECK DE AVANZADOS *****************" +opcion);
	if (opcion == "true") {
		$("#elementosOcultos").css('display', 'block');
	} else {
		$("#elementosOcultos").css('display', 'none');	
	}
});

/* $("#button-add").click(() =>{
const resetCheck = $("input[name='reset']:checked").val();
					if (resetCheck == 'reset') {
						($("#ordenaElementos") as any).parsley().reset();
					}
        }); */
/*         document.getElementById("p2").style.color = "blue";
 */
//ELEMENTOS SELECT
($("#Operacion") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#Vigencia") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#ServicioI") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#TitulosAP") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#ModoC") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#MPL") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#difPujas") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("#table_Ccapitales").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Sts",
    "Contrato",
    "Digito",
    "Nombre",
    "Emisora",
    "Operacion",
    "Cantidad",
    "Precio",
    "Vigencia",
    "%VO"
  ],
  colModel: [
    { name: "Sts", width: 50, frozen:true},
    { name: "Contrato", width: 80, frozen:true },
    { name: "Digito", width: 80 },
    { name: "Nombre", width: 80, align: "right" },
    { name: "Emisora", width: 80, align: "right" },
    { name: "Operacion", width: 80, align: "right" },
    { name: "Cantidad", width: 80, sortable: false },
    { name: "Precio", width: 80 },
    { name: "Vigencia", width: 80 },
    { name: "%VO", width: 80 }
  ],
  pager: "#pager_Ccapitales",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "Contrato",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  shrinkToFit: false,
  caption: ""
});
//$("#table_Ccapitales").jqGrid('setFrozenColumns');
//ordenes enviadas
//jQuery("#grid").jqGrid('destroyFrozenColumns');
$("#table_Oenviadas").jqGrid({
  datatype: "local",
  height: 150,
  colNames: [
    "No",
    "Detalle",
    "Contrato",
    "Perfil contrato",
    "Emisora",
    "Perfil Emisora",
    "Operacion",
    "Cantidad",
    "Precio",
    "Vigencia",
    "Envio",
    "%VO",
    "Modalidad",
    "MPL",
    "Dif Pujas",
    "Rompe",
    "Servicio de Inversión",
    "Medio Cierre",
    "Número de Red/Telefono",
    "Clasificación ETF"

  ],
  colModel: [
    { name: "No", width: 50, frozen: true},
    { name: "Detalle", width: 80, frozen: true },
    { name: "Contrato", width: 80 },
    { name: "Perfil contrato", width: 80, align: "right" },
    { name: "Emisora", width: 80, align: "right" },
    { name: "Perfil Emisora", width: 80, align: "right" },
    { name: "Operacion", width: 80, sortable: false },
    { name: "Cantidad", width: 80, sortable: false },
    { name: "Precio", width: 80 },
    { name: "Vigencia", width: 80 },
    { name: "Envio", width: 80 },
    { name: "%VO", width: 80 },
    { name: "Modalidad", width: 80 },
    { name: "MPL", width: 80 },
    { name: "Dif Pujas", width: 80 },
    { name: "Rompe", width: 80 },
    { name: "Servicio de Inversión", width: 80 },
    { name: "Medio Cierre", width: 80 },
    { name: "Número de Red/Telefono", width: 80 },
    { name: "Clasificación ETF", width: 80 }
  ],
  pager: "#pager_Oenviadas",
  rowNum: 20,
  rowList: [10, 20, 30],
  sortname: "Contrato",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  shrinkToFit: true,
  caption: ""
});
//$("#table_Oenviadas").jqGrid("setFrozenColumns");
//fillGrid("#table_Oenviadas");

//ordenes con error
$("#table_Oerror").jqGrid({
  datatype: "local",
  height: 150,
  colNames: [
    "No",
    "Detalle",
    "Contrato",
    "Perfil contrato",
    "Emisora",
    "Perfil Emisora",
    "Operacion",
    "Cantidad",
    "Precio",
    "Vigencia",
    "Envio",
    "%VO",
    "Modalidad",
    "MPL",
    "Dif Pujas",
    "Rompe",
    "Servicio de Inversión",
    "Medio Cierre",
    "Número de Red/Telefono",
    "Clasificación ETF"

  ],
  colModel: [
    { name: "No", width: 50, frozen:true},
    { name: "Detalle", width: 80, frozen:true },
    { name: "Contrato", width: 80 },
    { name: "Perfil contrato", width: 80, align: "right" },
    { name: "Emisora", width: 80, align: "right" },
    { name: "Perfil Emisora", width: 80, align: "right" },
    { name: "Operacion", width: 80, sortable: false },
    { name: "Cantidad", width: 80, sortable: false },
    { name: "Precio", width: 80 },
    { name: "Vigencia", width: 80 },
    { name: "Envio", width: 80 },
    { name: "%VO", width: 80 },
    { name: "Modalidad", width: 80 },
    { name: "MPL", width: 80 },
    { name: "Dif Pujas", width: 80 },
    { name: "Rompe", width: 80 },
    { name: "Servicio de Inversión", width: 80 },
    { name: "Medio Cierre", width: 80 },
    { name: "Número de Red/Telefono", width: 80 },
    { name: "Clasificación ETF", width: 80 }
  ],
  pager: "#pager_Oerror",
  rowNum: 20,
  rowList: [10, 20, 30],
  sortname: "Contrato",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  //shrinkToFit: false,
  caption: ""
});


//$("#table_Oerror").jqGrid('setFrozenColumns');
/* fillGrid("#table_Oerror");

function fillGrid(id) {
  for (var idx = 1; idx < 10; idx++) {
    $(id).jqGrid("addRowData", idx, { frozen1: 'Frozen1', frozen2: 'Frozen2', nf1: 'Free1', nf2: 'Free2', nf3: 'Free3'});
  }
} */

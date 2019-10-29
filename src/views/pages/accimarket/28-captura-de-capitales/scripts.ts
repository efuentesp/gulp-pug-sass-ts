/// <reference path="../../typings/index.d.ts" />

console.log("CONSULTA DE CAPITALES");

var contratoValido;
var  data;
$(document).ready(() => {
  document.getElementById("field_menuSimulado").style.display="none";
  
let emisoras_params: UrlParams = {};
http_findAll("emisoras", emisoras_params, emisorasJ => {
  const rec_count = emisorasJ.length;
  $("#count_contratos").html(rec_count);
  data = emisorasJ;
});
});

$('#field_menuSimulado').on('change', function() {
  var valueSelected = $("input[name='menuSimulado']:checked").val();
  console.log("seleccionado: "+valueSelected);
  switch(valueSelected.toString()){
  case "P":
      
  break; 
  case "E":      
    console.log("EDITAR DATOS");
    var gridDetalle = $("#table_Ccapitales");
      var rowId = gridDetalle.jqGrid('getGridParam', 'selrow');
      var rowData = gridDetalle.jqGrid('getRowData', rowId);
      $("#cantidad").val(rowData.Cantidad);
  break;
  case "C":
      console.log("COPIAR DATOS");
      var gridDetalle = $("#table_Ccapitales");
      var rowId = gridDetalle.jqGrid('getGridParam', 'selrow');
      var rowData = gridDetalle.jqGrid('getRowData', rowId);
      var datalist =[];
     var data = {};
     data["Sts"] ="0";
     data["Contrato"] =rowData.Contrato;
     data["Digito"] =rowData.Digito;
     data["Nombre"] =rowData.Nombre;
     data["Emisora"] =rowData.Emisora;
     data["Operacion"] =rowData.Operacion;
     data["Cantidad"] =rowData.Cantidad;
     data["Precio"] =rowData.Precio;
     data["Vigencia"] =rowData.Vigencia;
     data["VO"] =rowData.VO;

     datalist.push(data);
     manejoJson(datalist);

  break;
  case "B":
      console.log("BORRAR DATOS");
      var gridDetalle = $("#table_Ccapitales");
      var rowId = gridDetalle.jqGrid('getGridParam', 'selrow');
      gridDetalle.jqGrid('delRowData',rowId); 
  break;
  case "V":
      console.log("VALIDAR DATOS");
  break;
  case "S":
      console.log("ENVIAR DATOS");
  break;
  case "CE":
      console.log("COPIAR A EXCEL");
  break;
  default:
      console.log("default: ");
  break; 
  }
});
$("#btn_add").click(() => {
   const formListOrdenes = ($("#capturaDeCapitales-validacion") as any)
      .parsley()
      .on("field:validated", () => {
          const ok = $(".parsley-error").length === 0;
      })
      .on("form:submit", () => { 
    console.log("form:submit ***ENVIANDO DATOS A TABLA");

    const contrato  = $("#contrato ").val();
    const digito  = $("#digito").val();
    const titular  = $("#titular").val();
    const emisora   = $("#emisora").val();
    const Operacion   = $("#Operacion").val();
    const cantidad   = $("#cantidad").val();
    const precio   = $("#precio").val();
    const Vigencia   = $("#Vigencia").val();
    const PorcentajeVO  = $("#PorcentajeVO").val();

     var datalist =[];
     var data = {};
     data["Sts"] ="0";
     data["Contrato"] =contrato;
     data["Digito"] =digito;
     data["Nombre"] =titular;
     data["Emisora"] =emisora;
     data["Operacion"] =Operacion;
     data["Cantidad"] =cantidad;
     data["Precio"] =precio;
     data["Vigencia"] =Vigencia;
     data["VO"] =PorcentajeVO;
     datalist.push(data);
     
     manejoJson(datalist);
    return false;
  });
});
  
function manejoJson(datalist){
  var rowCount = $("#table_Ccapitales").jqGrid('getGridParam', 'records')
  if(rowCount==0){
   $('#table_Ccapitales').jqGrid('setGridParam',{data: datalist}); 
   $('#table_Ccapitales').trigger('reloadGrid'); 
  }else{
    console.log("INGRESA A ELSE ")
   var datalist2 =[];
   var datafromgrid = $('#table_Ccapitales').jqGrid('getGridParam','data');
   console.log("TAMAÑO "+datafromgrid.length)
   for (var i = 0; i < rowCount; i++) {  
        var data2 = {};        
        data2["Sts"] =datafromgrid[i].Sts;
        data2["Contrato"] =datafromgrid[i].Contrato;
        data2["Digito"] =datafromgrid[i].Digito;
        data2["Nombre"] =datafromgrid[i].Nombre;
        data2["Emisora"] =datafromgrid[i].Emisora;
        data2["Operacion"] =datafromgrid[i].Operacion;
        data2["Cantidad"] =datafromgrid[i].Cantidad;
        data2["Precio"] =datafromgrid[i].Precio;
        data2["Vigencia"] =datafromgrid[i].Vigencia;
        data2["VO"] =datafromgrid[i].VO;
        console.log("cantidad "+datafromgrid[i].Cantidad);
        datalist2.push(data2);
   }
   datalist2.push(datalist[0]);
   console.log("SALE DE FOR "+datalist2.length);
   $('#table_Ccapitales').jqGrid('clearGridData');
   $('#table_Ccapitales').jqGrid('setGridParam',{data: datalist2}); 
   $('#table_Ccapitales').trigger('reloadGrid'); 
  }
  console.log("despues: "+ $("#gbox_table_Ccapitales").jqGrid('getGridParam', 'records'));
}
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
    "VO"
  ],
  colModel: [
    { name: "Sts", width: 50},
    { name: "Contrato", width:80},
    { name: "Digito", width: 80 },
    { name: "Nombre", width: 80, align: "right" },
    { name: "Emisora", width: 80, align: "right" },
    { name: "Operacion", width: 80, align: "right" },
    { name: "Cantidad", width: 80 },
    { name: "Precio", width: 80 },
    { name: "Vigencia", width: 80 },
    { name: "VO", width: 80 }
  ],
  pager: "#pager_Ccapitales",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "Contrato",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  sortable: true,
  //shrinkToFit: false,
  caption: ""
});
//$("#table_Ccapitales").jqGrid('setFrozenColumns');

//validacion no vcaracteres especiales
function check(e) {
  if (e == 8 || e==13){     
    return true;  
  }
  if(e==9 || e==11){
    return true;
  }
var patron = /[A-Za-z0-9]/; 
var tecla_final = String.fromCharCode(e);
return patron.test(tecla_final);
}

function checkNumL(e) {
  if (e == 8 || e==13) {
      return true;
  }
  if(e==9 || e==11){
    return true;
  }
  var patron = /[MmcCdDvV]/;
  var tecla_final = String.fromCharCode(e);
  if(e <= 13 || (e >= 48 && e <= 57) || e == 190 || patron.test(tecla_final)||e==46){
     return true;
  }else{
    return false;
  }
  ;
}
function checkNum(e) {
  if (e == 8 || e==13) {
      return true;
  }
  if(e==9 ){
    return true;
  }
  var patron = /[0-9]/;
  var tecla_final = String.fromCharCode(e);
  return patron.test(tecla_final);
}


$("#cantidad").on('keypress', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  var retorno = checkNum(code);
  if(!retorno){
    return false;
  }else{
    $("#cantidad").on('keyup', function (e) {
      var entrada = $("#cantidad").val().toString();
  var parteEntera = entrada.replace(/\,/g, ''),
  salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  $("#cantidad").val(salida);
});
  }
});

$("#precio").on('keypress', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  var pasa = checkNumL(code);
  if(pasa){
    if (code == 8 || code ==13) {
      return true;
   }
var entrada = $("#precio").val().toString().split('.');
var  parteDecimal = entrada[1];
if(parteDecimal !=undefined && parteDecimal != null){
if(parteDecimal.length >= 4){
 return false;
}
}else{
  var esLetra = false;
  $("#precio").on('keyup', function (e) {     

    var code = (e.keyCode ? e.keyCode : e.which);
    if (code.toString() == "77" || code.toString() == "109"){
      $("#precio").val("");
      $("#precio").val("MKT");
      return false;
    }
  
    if (code.toString() == "67" || code.toString() == "99"){
      $("#precio").val("");
      $("#precio").val("CIERRE");
      return false;
    }
  
    if (code.toString() == "68" || code.toString() == "100" ){
      $("#precio").val("");
      $("#precio").val("DC");
      return false;
    }	 
  
    if (code.toString() == "86"  || code.toString() == "118" ){
      $("#precio").val("");
      $("#precio").val("VWAP");
      return false;
    }
  
     //parte de agregar comas
     var entrada = $("#precio").val().toString().split('.'),
     parteEntera = entrada[0].replace(/\,/g, ''),
     parteDecimal = entrada[1],
     salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
     var precio  =salida.replace("$",'') + (parteDecimal !== undefined ? '.' + parteDecimal : '');
      $("#precio").val(precio);    
  });
}
}else{
  return false;
}
});

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

//OCULTAR NUMERO DE TELEFONO
$("#ModoC").change(function(){
  var opcion = $("#ModoC :selected").val();
  if (opcion == "R") {
    document.getElementById("field_red").style.display = "block";    
    document.getElementById("field_red").style.display = "flex"; 
  }else{
    document.getElementById("field_red").style.display = "none";
  }
});


 
//FUNCION TOOLTIP AL HACER ENTER EN CONTRATOS
var dataContratos:any;
$("#contrato").on('keypress', function (e) {
  
  var code = (e.keyCode ? e.keyCode : e.which);
  var retorno = checkNumL(code);
  if(!retorno){
    return false;
  }
        if(code==13){        
          getContratos();
        }
});
$("#contrato").on('keydown', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
      if(code==9 || code==11){            
        getContratos();
        $("#field_emisora").focus();
      }
});


function getContratos(){
  const contratot: string = String($("#contrato").val());        
            http_findOne("contratoP", contratot, dataParams => { 
              dataContratos = dataParams;                        
          });             
          elementosContratos(dataContratos);  
}

function elementosContratos(dataC){
  if (dataC != null && dataC != undefined ) {
    document.getElementById("contrato").style.width = "7em";        
    document.getElementById("field_digito").style.display = "block";
    document.getElementById("field_titular").style.display = "block";
    document.getElementById("field_perfilC").style.display = "block";
    document.getElementById("field_IPContrato").style.display = "block";

    document.getElementById("field_digito").style.position = "relative";
    document.getElementById("field_digito").style.top = "-.5em";
    
    document.getElementById("perfilC").style.position = "relative";
    document.getElementById("perfilC").style.left = "8.5em";         
    document.getElementById("perfilC").style.top = "-1.5em";

    document.getElementById("field_IPContrato").style.position = "relative";
    document.getElementById("field_IPContrato").style.left = "7.5em";  
    document.getElementById("field_IPContrato").style.top = "1.3em";
    
    
    $("#digito").val(dataC.digito);
    $("#titular").val(dataC.cliente);
    $("#perfilC").val(dataC.perfilC);
    $("#IPContrato").val(dataC.elegibilidad);       
    contratoValido=true;
    dataContratos = null;
  }else{
    document.getElementById("contrato").style.width = "15em"; 
    document.getElementById("field_titular").style.display = "none";
    document.getElementById("field_perfilC").style.display = "none";
    document.getElementById("field_IPContrato").style.display = "none";  
    document.getElementById("field_digito").style.display = "none";

    $("#digito").val("");
    $("#titular").val("");
    $("#perfilC").val("");
    $("#IPContrato").val("");
    contratoValido=false;
    }
    
  }

//FUNCION AUTOCOMPLETAR


 $(function() { 
  $( "#emisora" ).autocomplete({
    source:function(request,response){
     var regex = new RegExp(request.term,'i');
       response($.map(data,function(value,key){
         if(regex.test(value.nombre)){
           return {
            value:value.nombre
            
           };          
         }else{

         }
       }));
    },
    minLength: 1,
    delay: 20,
    open: function(event, ui) {
      $(this).autocomplete("widget").css({
          "width": 200,
          "overflow-y": "auto" ,
          "max-height": "80px"
      });   
    }

  });
} ); 


//FUNCION TOOLTIP AL HACER ENTER EN EMISORAS
$("#emisora").autocomplete({
  select: function (a, b) {
      var valor =$(this).val(b.item.value);   
        document.getElementById("field_pemisora").style.display = "block";       
        $("#field_pemisora").addClass("pemisoranew");  
        $("#pemisora").val(valor.val()); 
        if(contratoValido){
          document.getElementById("field_Posicion").style.display = "block"; 
          document.getElementById("field_precMdo").style.display = "block"; 
          document.getElementById("field_PrecCierre").style.display = "block";  
          document.getElementById("field_precMdo").style.display= "flex";
          document.getElementById("field_PrecCierre").style.display = "flex";
          document.getElementById("field_Posicion").style.display = "flex";
        }
  }
});

$("#emisora").on('keypress', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  var retorno = check(code);
  if(!retorno){
    return false;
  }
  $("#field_pemisora").removeClass("pemisoranew");
  document.getElementById("field_pemisora").style.display = "none";
  document.getElementById("field_Posicion").style.display = "none"; 
  document.getElementById("field_precMdo").style.display = "none"; 
  document.getElementById("field_PrecCierre").style.display = "none";
});
$("#emisora").on('keyup', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code!=13){
  $("#field_pemisora").removeClass("pemisoranew");
  document.getElementById("field_pemisora").style.display = "none";
  document.getElementById("field_Posicion").style.display = "none"; 
  document.getElementById("field_precMdo").style.display = "none"; 
  document.getElementById("field_PrecCierre").style.display = "none";
  }
});

//MOSTRAR OCULTAR ELEMENTOS EN CAPTURAR AVANZADOS
$('#field_CapturarDA').change(() => {
	var opcion = $("#field_CapturarDA :checked").val();
	if (opcion == "true") {
		$("#elementosOcultos").css('display', 'block');
	} else {
		$("#elementosOcultos").css('display', 'none');	
	}
});

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
  sortable: true,
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
  sortable: true,
  caption: ""
});


//$("#table_Oerror").jqGrid('setFrozenColumns');
/* fillGrid("#table_Oerror");

function fillGrid(id) {
  for (var idx = 1; idx < 10; idx++) {
    $(id).jqGrid("addRowData", idx, { frozen1: 'Frozen1', frozen2: 'Frozen2', nf1: 'Free1', nf2: 'Free2', nf3: 'Free3'});
  }
} */

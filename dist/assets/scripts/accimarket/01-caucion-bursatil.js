console.log("01-caucion-bursatil"),$("#criterios_busqueda_accordion").accordion(ui_accordion_settings),$("#fecha").datepicker(ui_datepicker_settings);var rest_url=REST_URL+"/fideicomiso";$("#table_contratos").jqGrid({datatype:"local",height:250,colNames:["Contrato","Libro","Cliente","Digito","TV","Descr TV","Emisora","Serie","Cantidad","Precio","Valuación","Promotor","Folio","Fecha","Negocio"],colModel:[{name:"contrato",width:55},{name:"libro",width:90},{name:"cliente",width:80,align:"right"},{name:"digito",width:80,align:"right"},{name:"tv",width:80,align:"right"},{name:"descr_tv",width:150,sortable:!1},{name:"emisora",width:90},{name:"serie",width:90},{name:"cantidad",width:90},{name:"precio",width:90},{name:"valuacion",width:90},{name:"promotor",width:90},{name:"folio",width:90},{name:"fecha",width:90},{name:"negocio",width:90}],pager:"#pager_contratos",rowNum:10,rowList:[10,20,30],sortname:"contrato",sortorder:"desc",viewrecords:!0,gridview:!0,autoencode:!0,caption:""});var contratos_params={};http_findAll("contratos",contratos_params,function(o){fillJqGrid("#table_contratos",o)});var form=$("#criterios-busqueda").parsley().on("field:validated",function(){$(".parsley-error").length}).on("form:submit",function(){console.log("form:submit"),contratos_params={};var o=$("#fecha").val(),t=$("#contrato").val(),a=$("#digito").val(),i=$("input[name='negocio']:checked").val();return o&&(contratos_params.fecha=o),t&&(contratos_params.contrato=t),a&&(contratos_params.digito=a),i&&(contratos_params.negocio=i),http_findAll("contratos",contratos_params,function(o){fillJqGrid("#table_contratos",o)}),!1});
//# sourceMappingURL=../../maps/accimarket/01-caucion-bursatil.js.map

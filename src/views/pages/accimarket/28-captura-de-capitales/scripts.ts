/// <reference path="../../typings/index.d.ts" />

console.log("05-consulta-mercado-dinero-listado-ordenes-directo");

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
    { name: "Sts", width: 50},
    { name: "Contrato", width: 80 },
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
  caption: ""
});
//ordenes enviadas
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
    { name: "No", width: 50},
    { name: "Detalle", width: 80 },
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
  caption: ""
});

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
    { name: "No", width: 50},
    { name: "Detalle", width: 80 },
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
  caption: ""
});

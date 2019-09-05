console.log("05-consulta-mercado-dinero-listado-ordenes-directo");

$("#consultas_tab_group").tabs();

$("#table_operaciones").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Contrato",
    "Libro",
    "Cliente",
    "Digito",
    "TV",
    "Descr TV",
    "Emisora",
    "Serie",
    "Cantidad",
    "Precio",
    "Valuación",
    "Promotor",
    "Folio",
    "Fecha",
    "Negocio"
  ],
  colModel: [
    { name: "contrato", width: 55 },
    { name: "libro", width: 90 },
    { name: "cliente", width: 80, align: "right" },
    { name: "digito", width: 80, align: "right" },
    { name: "tv", width: 80, align: "right" },
    { name: "descr_tv", width: 150, sortable: false },
    { name: "emisora", width: 90 },
    { name: "serie", width: 90 },
    { name: "cantidad", width: 90 },
    { name: "precio", width: 90 },
    { name: "valuacion", width: 90 },
    { name: "promotor", width: 90 },
    { name: "folio", width: 90 },
    { name: "fecha", width: 90 },
    { name: "negocio", width: 90 }
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

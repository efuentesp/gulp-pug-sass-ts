/// <reference path="../../typings/index.d.ts" />

console.log("03-seguimiento-de-ordenes-historico");

$.contextMenu({
  selector: "#btn_pdf",
  callback: function(key, options) {
    var m = "clicked: " + key;
    console.log(m);
  },
  items: {
    opcion1: { name: "Opción 1" },
    opcion2: { name: "Opción 2" },
    opcion3: { name: "Opción 3" }
  }
});

$("#btn_pdf").on("click", function(e) {
  console.log("clicked", this);
});

$("#table_ordenes_historicas").jqGrid({
  url: "http://localhost:3000/fideicomiso",
  datatype: "json",
  mtype: "GET",
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
    "Folio"
  ],
  colModel: [
    { name: "generalesnumero", width: 55 },
    { name: "generalesnombre", width: 90 },
    { name: "generalesadministrador", width: 80, align: "right" },
    { name: "generalespromotor", width: 80, align: "right" },
    { name: "caracteristicasformamanejo", width: 80, align: "right" },
    { name: "caracteristicastiponegocio", width: 150, sortable: false },
    { name: "caracteristicasproducto", width: 90 },
    { name: "caracteristicasmontoapertura", width: 90 },
    { name: "adicionalesnoescritura", width: 90 },
    { name: "caracteristicasfechaalta", width: 90 },
    { name: "adicionalesfechainscripcion", width: 90 },
    { name: "adicionalesnombrenotario", width: 90 },
    { name: "adicionalesnonotario", width: 90 }
  ],
  pager: "#pager_ordenes_historicas",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "generalesnumero",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

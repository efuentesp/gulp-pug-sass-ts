/// <reference path="../../typings/index.d.ts" />

console.log("00-distribucion-de-instrucciones");

($("#transaccion") as any).select2({
  minimumResultsForSearch: Infinity
});
($("#institucion_financiera") as any).select2({
  minimumResultsForSearch: Infinity
});
($("#dispersion") as any).select2({
  minimumResultsForSearch: Infinity
});
($("#subsistema") as any).select2({
  minimumResultsForSearch: Infinity
});
($("#comparacion") as any).select2({
  minimumResultsForSearch: Infinity
});
($("#sucursal") as any).select2({
  minimumResultsForSearch: Infinity
});

fieldSelectPlusMinus("contrato", {});

$("#table_grid_promocion").jqGrid({
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
  pager: "#pager_contratos",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "generalesnumero",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_grid_administrativas").jqGrid({
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
  pager: "#pager_contratos",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "generalesnumero",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_grid_fiduciario").jqGrid({
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
  pager: "#pager_contratos",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "generalesnumero",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

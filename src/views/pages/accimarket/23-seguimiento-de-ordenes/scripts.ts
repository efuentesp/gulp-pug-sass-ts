$("#table_grid_mov_contrato").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Fecha Operación",
    "Fecha Liquidación",
    "Operación",
    "Emisora",
    "Perfil del Producto al momento de la Operación",
    "TV",
    "Cantidad",
    "Precio",
    "Imp.Bruto",
    "Comisión",
    "IVA",
    "Impuesto",
    "Imp.Neto",
    "Tasa",
    "Plazo",
    "Tipo Portafolio",
    "Rompe",
    "Serv. Inversión",
    "Perfil del Cliente al momento de la Operación",
    "Medio Cierre",
    "Número de Red/Teléfono",
    "Clasificación ETF",
    "Oper. Art. 194"
  ],
  colModel: [
    { name: "fechaO", width: 55 },
    { name: "fechaL", width: 90 },
    { name: "operacion", width: 80, align: "right" },
    { name: "emisora", width: 80, align: "right" },
    { name: "perfilProd", width: 80, align: "right" },
    { name: "tv", width: 80, align: "right" },
    { name: "cantidad", width: 150, sortable: false },
    { name: "precio", width: 90 },
    { name: "impBruto", width: 90 },
    { name: "comision", width: 90 },
    { name: "iva", width: 90 },
    { name: "impuesto", width: 90 },
    { name: "impNeto", width: 90 },
    { name: "tasa", width: 90 },
    { name: "plazo", width: 90 },
    { name: "tipoPort", width: 90 },
    { name: "rompe", width: 90 },
    { name: "servInv", width: 90 },
    { name: "perfilCli", width: 90 },
    { name: "medio", width: 90 },
    { name: "numRed", width: 90 },
    { name: "clasificacion", width: 90 },
    { name: "oper", width: 90 }
  ],
  pager: "#pager_grid_mov_contrato",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "generalesnumero",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

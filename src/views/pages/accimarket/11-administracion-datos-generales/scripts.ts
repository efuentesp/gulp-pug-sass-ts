alert(".::Administracion Datos Generales");

$("#administracion_datos_generales_accordion").accordion(ui_accordion_settings);

$("#consultas_tab_group").tabs();

/*Tabs cotitular2 Clasificacion Contrato*/
$("#cotitular2_clasificacion_contrato_tab_group").tabs();

/*Grid Limitantes a Invertir*/
$("#table_limitantes_invertir_grid").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Grupo Instrumento",
    "Tipo Valor",
    "Emisoras",
    "Tipo Valor Emisora"
  ],
  colModel: [
    { name: "grupo_instrumento", width: 100 },
    { name: "tipo_valor", width: 100 },
    { name: "emisoras", width: 100, align: "right" },
    { name: "tipo_valor_emisora", width: 100, align: "right" }
  ],
  //   pager: "#pager_limitantes_invertir_grid",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "limitantes_invertir_grid",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let limitantes_invertir_grid_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

http_findAll(
  "limitantes_invertir_grid",
  limitantes_invertir_grid_params,
  payload => {
    fillJqGrid("#table_limitantes_invertir_grid", payload);
  }
);

/*Grid Relacion-Emisor*/
$("#table_relacion_emisor_grid").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Emisor", "Relación"],
  colModel: [{ name: "emisor", width: 100 }, { name: "relacion", width: 100 }],
  //   pager: "#pager_limitantes_invertir_grid",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "relacion_emisor_grid",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let relacion_emisor_grid_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

http_findAll(
  "relacion_emisor_grid_params",
  relacion_emisor_grid_params,
  payload => {
    fillJqGrid("#table_relacion_emisor_grid", payload);
  }
);

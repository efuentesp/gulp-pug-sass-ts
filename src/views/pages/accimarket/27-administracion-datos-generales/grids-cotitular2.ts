/**Grid Clasificacion Contrato / Limitantes a intervenir */

// $("#table_cotitular2_clasificacion_contrato_limitantes_intervenir").jqGrid({
//   datatype: "local",
//   height: 250,
//   colNames: [
//     "Grupo Instrumento",
//     "Tipo Valor",
//     "Emisoras",
//     "Tipo Valor Emisora"
//   ],
//   colModel: [
//     { name: "grupo_instrumento", width: 100 },
//     { name: "tipo_valor", width: 100 },
//     { name: "emisoras", width: 100 },
//     { name: "tipo_valor_emisora", width: 100 }
//   ],
//   //   pager: "#pager_cotitular2_comisiones",
//   rowNum: 10,
//   rowList: [10, 20, 30],
//   sortname: "cotitular2_clasificacion_contrato_limitantes_intervenir",
//   sortorder: "desc",
//   viewrecords: true,
//   gridview: true,
//   autoencode: true,
//   caption: ""
// });

// Form validations
let cotitular2_clasificacion_contrato_limitantes_intervenir_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_clasificacion_contrato_limitantes_intervenir",
//   cotitular2_clasificacion_contrato_limitantes_intervenir_params,
//   payload => {
//     fillJqGrid(
//       "#table_cotitular2_clasificacion_contrato_limitantes_intervenir",
//       payload
//     );
//   }
// );

/**Grid Clasificacion Contrato / Relacion Emisor */
$("#table_cotitular2_clasificacion_contrato_relacion_emisor").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Emisor", "Relación"],
  colModel: [{ name: "emisor", width: 100 }, { name: "relacion", width: 100 }],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_clasificacion_contrato_relacion_emisor",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_clasificacion_contrato_relacion_emisor_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_clasificacion_contrato_relacion_emisor",
//   cotitular2_clasificacion_contrato_relacion_emisor_params,
//   payload => {
//     fillJqGrid(
//       "#table_cotitular2_clasificacion_contrato_relacion_emisor",
//       payload
//     );
//   }
// );

/**Grid Comisiones */
/**cotitular2_comisiones */
$("#table_cotitular2_comisiones").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Tipo", "Porcentaje %"],
  colModel: [{ name: "tipo", width: 400 }, { name: "porcentaje", width: 400 }],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_comision",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_comisiones_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll("cotitular2_comisiones", cotitular2_comisiones_params, payload => {
//   fillJqGrid("#table_cotitular2_comisiones", payload);
// });

/**Grid Documentacion */
$("#table_cotitular2_documentacion_contrato").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Sts", "Documentación", "Tipo", "Observaciones"],
  colModel: [
    { name: "sts", width: 100 },
    { name: "documentacion", width: 100 },
    { name: "tipo", width: 100 },
    { name: "observaciones", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_documentacion_contrato",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_documentacion_contrato_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_documentacion_contrato",
//   cotitular2_documentacion_contrato_params,
//   payload => {
//     fillJqGrid("#table_cotitular2_documentacion_contrato", payload);
//   }
// );

$("#table_cotitular2_documentacion_cliente").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Sts", "Documentación", "Tipo", "Observaciones"],
  colModel: [
    { name: "sts", width: 100 },
    { name: "documentacion", width: 100 },
    { name: "tipo", width: 100 },
    { name: "observaciones", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_documentacion_cliente",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_documentacion_cliente_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_documentacion_cliente",
//   cotitular2_documentacion_cliente_params,
//   payload => {
//     fillJqGrid("#table_cotitular2_documentacion_cliente", payload);
//   }
// );

/**Grid Domicilio */
$("#table_cotitular2_domicilio").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Tipo Dom.",
    "Dirección",
    "Colonia",
    "Municipio/Del.",
    "C.P.",
    "Ciudad",
    "Estado",
    "Pais"
  ],
  colModel: [
    { name: "tipo_dom", width: 100 },
    { name: "direccion", width: 100 },
    { name: "colonia", width: 100 },
    { name: "municipio_deleg", width: 100 },
    { name: "cp", width: 100 },
    { name: "ciudad", width: 100 },
    { name: "estado", width: 100 },
    { name: "pais", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_domicilio",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_domicilio_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll("cotitular2_domicilio", cotitular2_domicilio_params, payload => {
//   fillJqGrid("#table_cotitular2_domicilio", payload);
// });

/**Grid Firmas Autorizadas */
$("#table_cotitular2_firmas_autorizadas").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Tipo",
    "Nombre",
    "Apellido Paterno",
    "Apellido Materno",
    "No Escri",
    "No Not",
    "Reg Pub Comer",
    "Obs Firma Aut"
  ],
  colModel: [
    { name: "tipo", width: 100 },
    { name: "nombre", width: 100 },
    { name: "ap_paterno", width: 100 },
    { name: "ap_materno", width: 100 },
    { name: "no_escri", width: 100 },
    { name: "no_not", width: 100 },
    { name: "reg_pub_comer", width: 100 },
    { name: "obs_firma_aut", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_firmas_autorizada",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_firmas_autorizadas_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_firmas_autorizadas",
//   cotitular2_firmas_autorizadas_params,
//   payload => {
//     fillJqGrid("#table_cotitular2_firmas_autorizadas", payload);
//   }
// );

/**Grid Formatos Fiscales */
$("#table_cotitular2_formatos_fiscales").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Custodio",
    "W-8 BEN",
    "W-8 IMY",
    "W9",
    "PRUEBA 2",
    "PRUEBA JQUERY",
    "Fecha Formato",
    "Fecha Vencimiento",
    " UOI"
  ],
  colModel: [
    { name: "custodio", width: 100 },
    { name: "w8_ben", width: 100 },
    { name: "w8_imy", width: 100 },
    { name: "w9", width: 100 },
    { name: "prueba2", width: 100 },
    { name: "prueba_jquery", width: 100 },
    { name: "fecha_formato", width: 100 },
    { name: "fecha_vencimiento", width: 100 },
    { name: "uoi", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_formatos_fiscales",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_formatos_fiscales_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_formatos_fiscales",
//   cotitular2_formatos_fiscales_params,
//   payload => {
//     fillJqGrid("#table_cotitular2_formatos_fiscales", payload);
//   }
// );

/**Grid Medio de Comunicacion */
$("#table_cotitular2_medio_comunicacion").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Tipo", "Descripción", "Observaciones"],
  colModel: [
    { name: "tipo", width: 100 },
    { name: "descripcion", width: 100 },
    { name: "observaciones", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_medio_comunicacion",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_medio_comunicacion_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_medio_comunicacion",
//   cotitular2_medio_comunicacion_params,
//   payload => {
//     fillJqGrid("#table_cotitular2_medio_comunicacion", payload);
//   }
// );

/**Grid Medio de Liquidacion */
$("#table_cotitular2_medio_liquidacion").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Sts",
    "Titular Cuenta",
    "Medio Liq",
    "Inst Financiera",
    "No Cta",
    "No Cliente Banco",
    "No Suc",
    "Plaza",
    "Fut Cta",
    "Fut Benef",
    "Obs Cta"
  ],
  colModel: [
    { name: "sts", width: 100 },
    { name: "titular_cuenta", width: 100 },
    { name: "medio_liq", width: 100 },
    { name: "inst_financiera", width: 100 },
    { name: "no_cuenta", width: 100 },
    { name: "no_cliente_banco", width: 100 },
    { name: "no_suc", width: 100 },
    { name: "plaza", width: 100 },
    { name: "fut_cta", width: 100 },
    { name: "fut_benef", width: 100 },
    { name: "obs_cta", width: 100 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "cotitular2_medio_liquidacion",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let cotitular2_medio_liquidacion_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

// http_findAll(
//   "cotitular2_medio_liquidacion",
//   cotitular2_medio_liquidacion_params,
//   payload => {
//     fillJqGrid("#table_cotitular2_medio_liquidacion", payload);
//   }
// );

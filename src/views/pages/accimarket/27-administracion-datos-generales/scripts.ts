/// <reference path="../../typings/index.d.ts" />
console.log("27-administracion-datos-generales");

$("#titular_contrato_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#titular_contrato_tabgroup > ul > li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

$("#cotitular2_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#cotitular2_tabgroup > ul > li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

const form27 = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", () => {
    console.log("form:submit");

    const contrato: string = String($("#contrato").val());

    http_findOne("contratos", contrato, payload => {
      console.log(payload);
      llenarInfoContrato(payload);
      llenarTitularContrato(payload);
      llenarCotitulares(payload);
    });

    return false;
  });

const llenarInfoContrato = (payload: any) => {
  $("#digito").val(payload.digito);
  $("#dv").val(payload.dv);
  $("#estatus").val(payload.estatus);
  $("#perfil").val(payload.perfil);
  $("#perfil2").val(payload.perfil2);
  $("#portafolio").val(payload.portafolio);
  $("#portafolio_uuid").val(payload.portafolio_uuid);
  $("#clabe").val(payload.clabe);
  $("#clabe2").val(payload.clabe2);
  $("#stipo_port").val(payload.stipo_port);
  $("#libro").val(payload.libro);
  // ...
};

const llenarTitularContrato = (payload: any) => {};

const llenarCotitulares = (payload: any) => {
  llenarCotitular_ClasificacionContrato(payload, 0);
  llenarCotitular_Observaciones(payload, 0);
  llenarCotitular_Comisiones(payload, 0);
  llenarCotitular_Documentacion(payload, 0);
  llenarCotitular_Domicilio(payload, 0);
  llenarCotitular_FirmasAutorizadas(payload, 0);
  llenarCotitular_FormatosFiscales(payload, 0);
  llenarCotitular_MediosComunicacion(payload, 0);
  llenarCotitular_MedioLiquidacion(payload, 0);
  // ..
};

const llenarCotitular_ClasificacionContrato = (payload: any, i: number) => {
  $("#asesor_inversion").val(
    payload.cotitulares[i].clasificacion_contrato.asesor_inversion
  );
  $("#tipo_manifiesto").val(
    payload.cotitulares[i].clasificacion_contrato.tipo_manifiesto
  );
  $("#servicio_inversion").val(
    payload.cotitulares[i].clasificacion_contrato.servicio_inversion
  );
  $("#carta_ejecucion").val(
    payload.cotitulares[i].clasificacion_contrato.carta_ejecucion
  );
  $("#fecha_carta_ejecucion").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_carta_ejecucion
  );
  $("#carta_ejecucion_2").val(
    payload.cotitulares[i].clasificacion_contrato.carta_ejecucion_2
  );
  $("#fecha_carta_ejecucion_2").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_carta_ejecucion_2
  );
  $("#institucional_pract_vta").val(
    payload.cotitulares[i].clasificacion_contrato.institucional_pract_vta
  );
  $("#justificacion_institucional_pract_vta").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_institucional_pract_vta
  );
  $("#fecha_institucional_pract_vta").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_institucional_pract_vta
  );
  $("#sofisticado_nosofisticado").val(
    payload.cotitulares[i].clasificacion_contrato.sofisticado_nosofisticado
  );
  $("#justificacion_sofisticado_nosofisticado").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_sofisticado_nosofisticado
  );
  $("#fecha_sofisticado_nosofisticado").val(
    payload.cotitulares[i].clasificacion_contrato
      .fecha_sofisticado_nosofisticado
  );
  $("#elegible_noelegible").val(
    payload.cotitulares[i].clasificacion_contrato.elegible_noelegible
  );
  $("#justificacion_elegible_noelegible").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_elegible_noelegible
  );
  $("#fecha_elegible_noelegible").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_elegible_noelegible
  );
  $("#calificado_nocalificado").val(
    payload.cotitulares[i].clasificacion_contrato.calificado_nocalificado
  );
  $("#justificacion_calificado_nocalificado").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_calificado_nocalificado
  );
  $("#fecha_calificado_nocalificado").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_calificado_nocalificado
  );
  $("#discrecional_nodiscrecional").val(
    payload.cotitulares[i].clasificacion_contrato.discrecional_nodiscrecional
  );
  $("#justificacion_discrecional_nodiscrecional").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_discrecional_nodiscrecional
  );
  $("#fecha_discrecional_nodiscrecional").val(
    payload.cotitulares[i].clasificacion_contrato
      .fecha_discrecional_nodiscrecional
  );
  $("#anexo_descriptivo").val(
    payload.cotitulares[i].clasificacion_contrato.anexo_descriptivo
  );

  llenarCotitular_LimitantesInvertir(payload, 0);
  llenarCotitular_RelacionEmisor(payload, 0);
};

const llenarCotitular_LimitantesInvertir = (payload: any, i: number) => {
  const limitantesInvertirArray: any[] =
    payload.cotitulares[i].clasificacion_contrato.limitantes_invertitr;
  fillJqGrid(
    "#table_cotitular2_clasificacion_contrato_limitantes_intervenir",
    limitantesInvertirArray
  );
};

$("#table_cotitular2_clasificacion_contrato_limitantes_intervenir").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Grupo Insrumento",
    "Tipo Valor",
    "Emisoras",
    "Tipo Valor Emisoras"
  ],
  colModel: [
    { name: "grupo_instrumentos", width: 300 },
    { name: "tipo_valor", width: 150 },
    { name: "emisoras", width: 150 },
    { name: "tipo_valor_emisora", width: 180 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "grupo_instrumentos",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_RelacionEmisor = (payload: any, i: number) => {
  const relacionEmisorArray: any[] =
    payload.cotitulares[i].clasificacion_contrato.relacion_emisor;
  fillJqGrid(
    "#table_cotitular2_clasificacion_contrato_relacion_emisor",
    relacionEmisorArray
  );
};

$("#table_cotitular2_clasificacion_contrato_relacion_emisor").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: ["Emisor", "Relación"],
  colModel: [{ name: "emisor", width: 350 }, { name: "relacion", width: 200 }],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "relacion",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_Comisiones = (payload: any, i: number) => {
  const comisionesArray: any[] = payload.cotitulares[i].comisiones;
  fillJqGrid("#table_cotitular2_comisiones", comisionesArray);
};

$("#table_cotitular2_comisiones").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: ["Tipo", "Porcentaje %"],
  colModel: [{ name: "tipo", width: 350 }, { name: "porcentaje", width: 500 }],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "porcentaje",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_Documentacion = (payload: any, i: number) => {
  const documentacionContratoArray: any[] =
    payload.cotitulares[i].documentacion.contrato;
  $("#table_cotitular2_documentacion_contrato").jqGrid("clearGridData");
  $("#table_cotitular2_documentacion_contrato").jqGrid("setGridParam", {
    data: documentacionContratoArray
  });
  $("#table_cotitular2_documentacion_contrato").trigger("reloadGrid");
  const documentacionClienteArray: any[] =
    payload.cotitulares[i].documentacion.cliente;
  $("#table_cotitular2_documentacion_cliente").jqGrid("clearGridData");
  $("#table_cotitular2_documentacion_cliente").jqGrid("setGridParam", {
    data: documentacionClienteArray
  });
  $("#table_cotitular2_documentacion_cliente").trigger("reloadGrid");
};

$("#table_cotitular2_documentacion_contrato").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: ["Sts", "Documentación", "Tipo", "Observaciones"],
  colModel: [
    { name: "sts", width: 50, formatter: valores },
    { name: "documentacion", width: 400 },
    { name: "tipo", width: 400 },
    { name: "observaciones", width: 200 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_cotitular2_documentacion_cliente").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: ["Sts", "Documentación", "Tipo", "Observaciones"],
  colModel: [
    { name: "sts", width: 50, formatter: valores },
    { name: "documentacion", width: 400 },
    { name: "tipo", width: 400 },
    { name: "observaciones", width: 200 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_Domicilio = (payload: any, i: number) => {
  const domicilioArray: any[] = payload.cotitulares[i].domicilio;
  fillJqGrid("#table_cotitular2_domicilio", domicilioArray);
};

$("#table_cotitular2_domicilio").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Tipo Dom.",
    "Dirección",
    "Colonia",
    "Municipio/Del.",
    "C.P.",
    "Ciudad",
    "Estado",
    "Pais",
    "Apto. Postal"
  ],
  colModel: [
    { name: "tipo_dom", width: 150 },
    { name: "direccion", width: 150 },
    { name: "colonia", width: 150 },
    { name: "municipio_del", width: 150 },
    { name: "cp", width: 150 },
    { name: "ciudad", width: 150 },
    { name: "estado", width: 150 },
    { name: "pais", width: 150 },
    { name: "apto_postal", width: 150 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo_dom",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_FirmasAutorizadas = (payload: any, i: number) => {
  const firmasAutorizadasArray: any[] =
    payload.cotitulares[i].firmas_autorizadas;
  fillJqGrid("#table_cotitular2_firmas_autorizadas", firmasAutorizadasArray);
};

$("#table_cotitular2_firmas_autorizadas").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Tipo",
    "Nombre",
    "Apellido Paterno",
    "Apellido  Materno",
    "No Escri",
    "No Not",
    "Reg Pub Comer",
    "Obs Firma"
  ],
  colModel: [
    { name: "tipo", width: 150 },
    { name: "nombre", width: 150 },
    { name: "ap_paterno", width: 150 },
    { name: "ap_materno", width: 150 },
    { name: "no_escri", width: 150 },
    { name: "no_not", width: 150 },
    { name: "reg_pub_comer", width: 150 },
    { name: "obs_firma", width: 150 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_FormatosFiscales = (payload: any, i: number) => {
  const formatosFiscalesArray: any[] = payload.cotitulares[i].formatos_fiscales;
  //fillJqGrid("#table_cotitular2_formatos_fiscales", formatosFiscalesArray);
  $("#table_cotitular2_formatos_fiscales").jqGrid("clearGridData");
  $("#table_cotitular2_formatos_fiscales").jqGrid("setGridParam", {
    data: formatosFiscalesArray
  });
  $("#table_cotitular2_formatos_fiscales").trigger("reloadGrid");
};

$("#table_cotitular2_formatos_fiscales").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Custodio",
    "W-8 BEN",
    "W-8 IMY",
    "W9",
    "PRUEBA2",
    "PRUEBA JQUERY",
    "JQUERY",
    "JQUER",
    "Fecha Formato",
    "Fecha Vencimiento",
    "OUI"
  ],
  colModel: [
    { name: "custodio", width: 150 },
    { name: "w8_ben", width: 150, formatter: valores },
    { name: "w8_imy", width: 150 },
    { name: "w9", width: 150 },
    { name: "prueba2", width: 150 },
    { name: "pruebajquery", width: 150 },
    { name: "jquery", width: 150 },
    { name: "jquer", width: 150 },
    { name: "fecha_formato", width: 150 },
    { name: "fecha_vencimiento", width: 150 },
    { name: "oui", width: 150 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "fecha_vencimiento",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_MediosComunicacion = (payload: any, i: number) => {
  const mediosComunicacionArray: any[] =
    payload.cotitulares[i].medio_comunicacion;
  fillJqGrid("#table_cotitular2_medio_comunicacion", mediosComunicacionArray);
};

$("#table_cotitular2_medio_comunicacion").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: ["Tipo", "Descripción", "Observaciones"],
  colModel: [
    { name: "tipo", width: 250 },
    { name: "descripcion", width: 250 },
    { name: "observaciones", width: 560 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_MedioLiquidacion = (payload: any, i: number) => {
  const mediosComunicacionArray: any[] =
    payload.cotitulares[i].medio_liquidacion;
  fillJqGrid("#table_cotitular2_medio_liquidacion", mediosComunicacionArray);
};

$("#table_cotitular2_medio_liquidacion").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Sts",
    "Titular Cuenta",
    "Medio Liq",
    "Inst Financiera",
    "No Cta",
    "No Cliente Banco",
    "No Succ",
    "Plaza",
    "Fut Cta",
    "Fut Benef"
  ],
  colModel: [
    { name: "sts", width: 150 },
    { name: "titular_cuenta", width: 150 },
    { name: "medio_liq", width: 150 },
    { name: "inst_financiera", width: 150 },
    { name: "no_cuenta", width: 150 },
    { name: "no_cliente_banco", width: 150 },
    { name: "no_succ", width: 150 },
    { name: "plaza", width: 150 },
    { name: "fut_cta", width: 150 },
    { name: "fut_benef", width: 150 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_persona_fisica_int").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Nombre",
    "Apellido Paterno",
    "Apellido Materno",
    "Porcentaje %"
  ],
  colModel: [
    { name: "nombre_persona_int", width: 220 },
    { name: "apellido_pat_persona_int", width: 220 },
    { name: "apellido_mat_persona_int", width: 220 },
    { name: "porcentaje_persona_int", width: 220 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "nombre_persona_int",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

$("#table_persona_fisica_nac").jqGrid({
  datatype: "local",
  height: "auto",
  colNames: [
    "Nombre",
    "Apellido Paterno",
    "Apellido Materno",
    "Porcentaje %"
  ],
  colModel: [
    { name: "nombre_persona_nac", width: 220 },
    { name: "apellido_pat_persona_nac", width: 220 },
    { name: "apellido_mat_persona_nac", width: 220 },
    { name: "porcentaje_persona_nac", width: 220 }
  ],
  //   pager: "#pager_cotitular2_comisiones",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "nombre_persona_nac",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

const llenarCotitular_Observaciones = (payload: any, i: number) => {
  $("#text_area_observaciones").val(
    payload.cotitulares[i].observaciones.text_area_observaciones
  );
  $("#fecha_apertura").val(payload.cotitulares[i].observaciones.fecha_apertura);
  $("#monto_inicial").val(payload.cotitulares[i].observaciones.monto_inicial);
  $("#sector").val(payload.cotitulares[i].observaciones.sector);
  $("#residencia").val(payload.cotitulares[i].observaciones.residencia);
  $("#envio_correspondencia").val(
    payload.cotitulares[i].observaciones.envio_correspondencia
  );
  $("#tipo_cuenta").val(payload.cotitulares[i].observaciones.tipo_cuenta);
  $("#manejo_cuenta").val(payload.cotitulares[i].observaciones.manejo_cuenta);
  $("#custodia_admon").val(payload.cotitulares[i].observaciones.custodia_admon);
  $("#lim_max_operacion").val(
    payload.cotitulares[i].observaciones.lim_max_operacion
  );
  $("#isr_mdo_din").val(payload.cotitulares[i].observaciones.isr_mdo_din);
  $("#fecha_ult_mov").val(payload.cotitulares[i].observaciones.fecha_ult_mov);
  $("#porcentaje_acum_isr").val(
    payload.cotitulares[i].observaciones.porcentaje_acum_isr
  );
  $("#porcentaje_acum_ide").val(
    payload.cotitulares[i].observaciones.porcentaje_acum_ide
  );
  $("#imprime_estado_cuenta").val(
    payload.cotitulares[i].observaciones.imprime_estado_cuenta
  );
};

function valores(cellvalue, options, rowObject) {
  if (cellvalue == "yellow check" || cellvalue == "check yellow") {
    return '<div class="w-5 h-5 bg-yellow-500 ml-6"></div>';
  } else if (cellvalue == "green check" || cellvalue == "check green") {
    return '<div class="w-5 h-5 bg-green-500 ml-6"></div>';
  } else if (cellvalue == "red check" || cellvalue == "check red") {
    return '<div class="w-5 h-5 bg-red-500 ml-6"></div>';
  } else if (cellvalue == "black check" || cellvalue == "check black") {
    return '<div class="w-5 h-5 bg-black-500 ml-6"></div>';
  } else {
    return "";
  }
}

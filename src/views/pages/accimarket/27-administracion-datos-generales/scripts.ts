/// <reference path="../../typings/index.d.ts" />
console.log("27-administracion-datos-generales");

const form27 = ($("#criteriosBusqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", () => {
    console.log("form:submit");

    const contrato: string = String($("#txtContrato").val());

    httpFindOne("contratos", contrato, payload => {
      console.log(payload);
      llenarInfoContrato(payload);
      llenarTitularContrato(payload);
      llenarCotitulares(payload);
    });

    return false;
  });

const llenarInfoContrato = (payload: any) => {
  $("#txtDigito").val(payload.digito);
  $("#txtDv").val(payload.dv);
  $("#txtEstatus").val(payload.estatus);
  $("#txtPerfil").val(payload.perfil);
  $("#txtPerfilDos").val(payload.perfil2);
  $("#txtPortafolio").val(payload.portafolio);
  $("#txtPortafolioUuid").val(payload.portafolio_uuid);
  $("#txtClabe").val(payload.clabe);
  $("#txtClabeDos").val(payload.clabe2);
  $("#txtStipoPort").val(payload.stipo_port);
  $("#txtLibro").val(payload.libro);
  // ...
};

const llenarTitularContrato = (payload: any) => { };

const llenarCotitulares = (payload: any) => {
  llenarCotitularClasificacionContrato(payload, 0);
  llenarCotitularObservaciones(payload, 0);
  llenarCotitularComisiones(payload, 0);
  llenarCotitularDocumentacion(payload, 0);
  llenarCotitularDomicilio(payload, 0);
  llenarCotitularFirmasAutorizadas(payload, 0);
  llenarCotitularFormatosFiscales(payload, 0);
  llenarCotitularMediosComunicacion(payload, 0);
  llenarCotitularMedioLiquidacion(payload, 0);
  // ..
};

const llenarCotitularClasificacionContrato = (payload: any, i: number) => {
  $("#txtAsesorInversion").val(
    payload.cotitulares[i].clasificacion_contrato.asesor_inversion
  );
  $("#txtTipoManifiesto").val(
    payload.cotitulares[i].clasificacion_contrato.tipo_manifiesto
  );
  $("#txtServicioInversion").val(
    payload.cotitulares[i].clasificacion_contrato.servicio_inversion
  );
  $("#txtCartaEjecucion").val(
    payload.cotitulares[i].clasificacion_contrato.carta_ejecucion
  );
  $("#txtFechaCartaEjecucion").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_carta_ejecucion
  );
  $("#txtCartaEjecucionDos").val(
    payload.cotitulares[i].clasificacion_contrato.carta_ejecucion_2
  );
  $("#txtFechaCartaEjecucionDos").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_carta_ejecucion_2
  );
  $("#txtInstitucionalPractVta").val(
    payload.cotitulares[i].clasificacion_contrato.institucional_pract_vta
  );
  $("#txtJustificacionInstitucionalPractVta").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_institucional_pract_vta
  );
  $("#txtFechaInstitucionalPractVta").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_institucional_pract_vta
  );
  $("#txtSofisticadoNosofisticado").val(
    payload.cotitulares[i].clasificacion_contrato.sofisticado_nosofisticado
  );
  $("#txtJustificacionSofisticadoNosofisticado").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_sofisticado_nosofisticado
  );
  $("#txtFechaSofisticadoNosofisticado").val(
    payload.cotitulares[i].clasificacion_contrato
      .fecha_sofisticado_nosofisticado
  );
  $("#txtElegibleNoelegible").val(
    payload.cotitulares[i].clasificacion_contrato.elegible_noelegible
  );
  $("#txtJustificacionElegibleNoelegible").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_elegible_noelegible
  );
  $("#txtFechaElegibleNoelegible").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_elegible_noelegible
  );
  $("#txtCalificadoNocalificado").val(
    payload.cotitulares[i].clasificacion_contrato.calificado_nocalificado
  );
  $("#txtJustificacionCalificadoNocalificado").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_calificado_nocalificado
  );
  $("#txtFechaCalificadoNocalificado").val(
    payload.cotitulares[i].clasificacion_contrato.fecha_calificado_nocalificado
  );
  $("#txtDiscrecionalNodiscrecional").val(
    payload.cotitulares[i].clasificacion_contrato.discrecional_nodiscrecional
  );
  $("#txtJustificacionDiscrecionalNodiscrecional").val(
    payload.cotitulares[i].clasificacion_contrato
      .justificacion_discrecional_nodiscrecional
  );
  $("#txtFechaDiscrecionalNodiscrecional").val(
    payload.cotitulares[i].clasificacion_contrato
      .fecha_discrecional_nodiscrecional
  );
  $("#txtAnexoDescriptivo").val(
    payload.cotitulares[i].clasificacion_contrato.anexo_descriptivo
  );

  llenarCotitularLimitantesInvertir(payload, 0);
  llenarCotitularRelacionEmisor(payload, 0);
};

const llenarCotitularLimitantesInvertir = (payload: any, i: number) => {
  const limitantesInvertirArray: any[] =
    payload.cotitulares[i].clasificacion_contrato.limitantes_invertitr;
  fillJqGrid(
    "#dtgCotitularDosClasificacionContratoLimitantesIntervenir",
    limitantesInvertirArray
  );
};

$("#dtgCotitularDosClasificacionContratoLimitantesIntervenir").jqGrid({
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

const llenarCotitularRelacionEmisor = (payload: any, i: number) => {
  const relacionEmisorArray: any[] =
    payload.cotitulares[i].clasificacion_contrato.relacion_emisor;
  fillJqGrid(
    "#dtgCotitularDosClasificacionContratoRelacionEmisor",
    relacionEmisorArray
  );
};

$("#dtgCotitularDosClasificacionContratoRelacionEmisor").jqGrid({
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

const llenarCotitularComisiones = (payload: any, i: number) => {
  const comisionesArray: any[] = payload.cotitulares[i].comisiones;
  fillJqGrid("#dtgCotitularDosComisiones", comisionesArray);
};

$("#dtgCotitularDosComisiones").jqGrid({
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

const llenarCotitularDocumentacion = (payload: any, i: number) => {
  const documentacionContratoArray: any[] =
    payload.cotitulares[i].documentacion.contrato;
  $("#dtgCotitularDosDocumentacionContrato").jqGrid("clearGridData");
  $("#dtgCotitularDosDocumentacionContrato").jqGrid("setGridParam", {
    data: documentacionContratoArray
  });
  $("#dtgCotitularDosDocumentacionContrato").trigger("reloadGrid");
  const documentacionClienteArray: any[] =
    payload.cotitulares[i].documentacion.cliente;
  $("#dtgCotitularDosDocumentacionCliente").jqGrid("clearGridData");
  $("#dtgCotitularDosDocumentacionCliente").jqGrid("setGridParam", {
    data: documentacionClienteArray
  });
  $("#dtgCotitularDosDocumentacionCliente").trigger("reloadGrid");
};

$("#dtgCotitularDosDocumentacionContrato").jqGrid({
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

$("#dtgCotitularDosDocumentacionCliente").jqGrid({
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

const llenarCotitularDomicilio = (payload: any, i: number) => {
  const domicilioArray: any[] = payload.cotitulares[i].domicilio;
  fillJqGrid("#dtgCotitularDosDomicilio", domicilioArray);
};

$("#dtgCotitularDosDomicilio").jqGrid({
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

const llenarCotitularFirmasAutorizadas = (payload: any, i: number) => {
  const firmasAutorizadasArray: any[] =
    payload.cotitulares[i].firmas_autorizadas;
  fillJqGrid("#dtgCotitularDosFirmasAutorizadas", firmasAutorizadasArray);
};

$("#dtgCotitularDosFirmasAutorizadas").jqGrid({
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

const llenarCotitularFormatosFiscales = (payload: any, i: number) => {
  const formatosFiscalesArray: any[] = payload.cotitulares[i].formatos_fiscales;
  //fillJqGrid("#table_cotitular2_formatos_fiscales", formatosFiscalesArray);
  $("#dtgCotitularDosFormatosFiscales").jqGrid("clearGridData");
  $("#dtgCotitularDosFormatosFiscales").jqGrid("setGridParam", {
    data: formatosFiscalesArray
  });
  $("#dtgCotitularDosFormatosFiscales").trigger("reloadGrid");
};

$("#dtgCotitularDosFormatosFiscales").jqGrid({
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

const llenarCotitularMediosComunicacion = (payload: any, i: number) => {
  const mediosComunicacionArray: any[] =
    payload.cotitulares[i].medio_comunicacion;
  fillJqGrid("#dtgCotitularDosMedioComunicacion", mediosComunicacionArray);
};

$("#dtgCotitularDosMedioComunicacion").jqGrid({
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

const llenarCotitularMedioLiquidacion = (payload: any, i: number) => {
  const mediosComunicacionArray: any[] =
    payload.cotitulares[i].medio_liquidacion;
  fillJqGrid("#dtgCotitularDosMedioLiquidacion", mediosComunicacionArray);
};

$("#dtgCotitularDosMedioLiquidacion").jqGrid({
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

$("#dtgPersonaFisicaInt").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Nombre", "Apellido Paterno", "Apellido Materno", "Porcentaje %"],
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

$("#dtgPersonaFisicaNac").jqGrid({
  datatype: "local",
  height: 250,
  colNames: ["Nombre", "Apellido Paterno", "Apellido Materno", "Porcentaje %"],
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

const llenarCotitularObservaciones = (payload: any, i: number) => {
  $("#txaTextAreaObservaciones").val(
    payload.cotitulares[i].observaciones.text_area_observaciones
  );
  $("#txtFechaApertura").val(payload.cotitulares[i].observaciones.fecha_apertura);
  $("#txtMontoInicial").val(payload.cotitulares[i].observaciones.monto_inicial);
  $("#txtSector").val(payload.cotitulares[i].observaciones.sector);
  $("#txtResidencia").val(payload.cotitulares[i].observaciones.residencia);
  $("#txtEnvioCorrespondencia").val(
    payload.cotitulares[i].observaciones.envio_correspondencia
  );
  $("#txtTipoCuenta").val(payload.cotitulares[i].observaciones.tipo_cuenta);
  $("#txtManejoCuenta").val(payload.cotitulares[i].observaciones.manejo_cuenta);
  $("#txtCustodiaAdmon").val(payload.cotitulares[i].observaciones.custodia_admon);
  $("#txtLimMaxOperacion").val(
    payload.cotitulares[i].observaciones.lim_max_operacion
  );
  $("#txtIsrMdoDin").val(payload.cotitulares[i].observaciones.isr_mdo_din);
  $("#txtFechaUltMov").val(payload.cotitulares[i].observaciones.fecha_ult_mov);
  $("#txtPorcentajeAcumIsr").val(
    payload.cotitulares[i].observaciones.porcentaje_acum_isr
  );
  $("#txtPorcentajeAcumIde").val(
    payload.cotitulares[i].observaciones.porcentaje_acum_ide
  );
  $("#txtImprimeEstadoCuenta").val(
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

// const source_cotitulares = $("#hb-cotitulares").html();
// console.log(source_cotitulares);
// const template_cotitulares = Handlebars.compile(source_cotitulares);
// $("#titular-cotitulares").append(template_cotitulares(null));

$(".amTabGroup").tabs();

$("#divTitularContratoTabGroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#divTitularContratoTabGroup > ul > li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

$("#divCotitularDosTabGroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#divCotitularDosTabGroup > ul > li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

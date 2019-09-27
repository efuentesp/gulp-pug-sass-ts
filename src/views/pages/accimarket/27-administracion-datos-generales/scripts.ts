console.log("27-administracion-datos-generales");

/****   TAB-GROUP ------//--> */

/*config TITULAR tabgroup */
// $('#titular_contrato_tabgroup').tabs();
$("#titular_contrato_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#titular_contrato_tabgroup > ul > li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

/*config COTITULAR2 tabgroup */
// $('#cotitular2_tabgroup').tabs();
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

  $("#table_cotitular2_clasificacion_contrato_limitantes_intervenir").jqGrid({
    data: limitantesInvertirArray,
    datatype: "local",
    height: "auto",
    colNames: [
      "Grupo Insrumento",
      "Tipo Valor",
      "Emisoras",
      "Tipo Valor Emisoras"
    ],
    colModel: [
      { name: "grupo_instrumentos", width: 150 },
      { name: "tipo_valor", width: 150 },
      { name: "emisoras", width: 150 },
      { name: "tipo_valor_emisora", width: 150 }
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
};

const llenarCotitular_RelacionEmisor = (payload: any, i: number) => {
  const relacionEmisorArray: any[] =
    payload.cotitulares[i].clasificacion_contrato.relacion_emisor;

  $("#table_cotitular2_clasificacion_contrato_relacion_emisor").jqGrid({
    data: relacionEmisorArray,
    datatype: "local",
    height: "auto",
    colNames: ["Emisor", "Relación"],
    colModel: [
      { name: "emisor", width: 150 },
      { name: "relacion", width: 150 }
    ],
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
};

const llenarCotitular_Comisiones = (payload: any, i: number) => {
  const comisionesArray: any[] = payload.cotitulares[i].comisiones;

  $("#table_cotitular2_comisiones").jqGrid({
    data: comisionesArray,
    datatype: "local",
    height: "auto",
    colNames: ["Tipo", "Porcentaje %"],
    colModel: [
      { name: "tipo", width: 150 },
      { name: "porcentaje", width: 150 }
    ],
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
};

const llenarCotitular_Documentacion = (payload: any, i: number) => {
  const documentacionContratoArray: any[] =
    payload.cotitulares[i].documentacion.contrato;
  const documentacionClienteArray: any[] =
    payload.cotitulares[i].documentacion.cliente;

  $("#table_cotitular2_documentacion_contrato").jqGrid({
    data: documentacionContratoArray,
    datatype: "local",
    height: "auto",
    colNames: ["Sts", "Documentación", "Tipo", "Observaciones"],
    colModel: [
      { name: "sts", width: 150 },
      { name: "documentacion", width: 150 },
      { name: "tipo", width: 150 },
      { name: "observaciones", width: 150 }
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
    data: documentacionClienteArray,
    datatype: "local",
    height: "auto",
    colNames: ["Sts", "Documentación", "Tipo", "Observaciones"],
    colModel: [
      { name: "sts", width: 150 },
      { name: "documentacion", width: 150 },
      { name: "tipo", width: 150 },
      { name: "observaciones", width: 150 }
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
};

const llenarCotitular_Domicilio = (payload: any, i: number) => {
  const domicilioArray: any[] = payload.cotitulares[i].domicilio;

  $("#table_cotitular2_domicilio").jqGrid({
    data: domicilioArray,
    datatype: "local",
    height: "auto",
    colNames: [
      "Tipo Dom.",
      "Dirección",
      "Colonia",
      "Municipio/Del.",
      "C.P.",
      "Ciudad",
      "Estado"
    ],
    colModel: [
      { name: "tipo_dom", width: 150 },
      { name: "direccion", width: 150 },
      { name: "colonia", width: 150 },
      { name: "municipio_del", width: 150 },
      { name: "cp", width: 150 },
      { name: "ciudad", width: 150 },
      { name: "estado", width: 150 }
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
};

const llenarCotitular_FirmasAutorizadas = (payload: any, i: number) => {
  const firmasAutorizadasArray: any[] =
    payload.cotitulares[i].firmas_autorizadas;

  $("#table_cotitular2_firmas_autorizadas").jqGrid({
    data: firmasAutorizadasArray,
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
};

const llenarCotitular_FormatosFiscales = (payload: any, i: number) => {
  const formatosFiscalesArray: any[] = payload.cotitulares[i].formatos_fiscales;

  $("#table_cotitular2_formatos_fiscales").jqGrid({
    data: formatosFiscalesArray,
    datatype: "local",
    height: "auto",
    colNames: [
      "Custodio",
      "W-8 BEN",
      "W-8 IMY",
      "W9",
      "PRUEBA2",
      "PRUEBA JQUERY",
      "Fecha Formato",
      "Fecha Vencimiento"
    ],
    colModel: [
      { name: "custodio", width: 150 },
      { name: "w8_ben", width: 150 },
      { name: "w8_imy", width: 150 },
      { name: "w9", width: 150 },
      { name: "prueba2", width: 150 },
      { name: "pruebajquery", width: 150 },
      { name: "fecha_formato", width: 150 },
      { name: "fecha_vencimiento", width: 150 }
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
};

const llenarCotitular_MediosComunicacion = (payload: any, i: number) => {
  const mediosComunicacionArray: any[] =
    payload.cotitulares[i].medio_comunicacion;

  $("#table_cotitular2_medio_comunicacion").jqGrid({
    data: mediosComunicacionArray,
    datatype: "local",
    height: "auto",
    colNames: ["Tipo", "Descripción", "Observaciones"],
    colModel: [
      { name: "tipo", width: 150 },
      { name: "descripcion", width: 150 },
      { name: "observaciones", width: 150 }
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
};

const llenarCotitular_MedioLiquidacion = (payload: any, i: number) => {
  const mediosComunicacionArray: any[] =
    payload.cotitulares[i].medio_liquidacion;

  $("#table_cotitular2_medio_liquidacion").jqGrid({
    data: mediosComunicacionArray,
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
};

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

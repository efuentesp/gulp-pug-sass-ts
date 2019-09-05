console.log('27-administracion-datos-generales');

/*acordion*/
$('#criterios_busqueda_accordion').accordion(ui_accordion_settings);

/****   TABS ------//--> */

/*config tabs TITULAR_COTITULAR2*/
$('#titular_cotitular_tabgroup').tabs();

/*config tabs COTITULAR2 _clasificacion_contrato*/
$('#cotitular2_clasificacion_contrato_tab_group').tabs();

/****   TAB-GROUP ------//--> */

/*config TITULAR tabgroup */
// $('#titular_contrato_tabgroup').tabs();
$('#titular_contrato_tabgroup')
	.tabs()
	.addClass('ui-tabs-vertical ui-helper-clearfix');
$('#titular_contrato_tabgroup > ul > li')
	.removeClass('ui-corner-top')
	.addClass('ui-corner-left');

/*config COTITULAR2 tabgroup */
// $('#cotitular2_tabgroup').tabs();
$('#cotitular2_tabgroup')
	.tabs()
	.addClass('ui-tabs-vertical ui-helper-clearfix');
$('#cotitular2_tabgroup > ul > li')
	.removeClass('ui-corner-top')
	.addClass('ui-corner-left');

const form27 = ($('#criterios-busqueda') as any)
	.parsley()
	.on('field:validated', () => {
		const ok = $('.parsley-error').length === 0;
		// console.log("Errores de validación", $(".parsley-error"))
		// $(".callout-info").toggleClass("hidden", !ok);
		// $(".callout-warning").toggleClass("hidden", ok);
	})
	.on('form:submit', () => {
		console.log('form:submit');

		const contrato: string = String($('#contrato').val());

		http_findOne('contratos', contrato, payload => {
			console.log(payload);
			llenarInfoContrato(payload);
			llenarTitularContrato(payload);
			llenarCotitulares(payload);
		});

		return false;
	});

const llenarInfoContrato = (payload: any) => {
	$('#digito').val(payload.digito);
	$('#dv').val(payload.dv);
	$('#estatus').val(payload.estatus);
	$('#perfil').val(payload.perfil);
	$('#perfil2').val(payload.perfil2);
	$('#portafolio').val(payload.portafolio);
	$('#portafolio_uuid').val(payload.portafolio_uuid);
	$('#clabe').val(payload.clabe);
	$('#clabe2').val(payload.clabe2);
	$('#stipo_port').val(payload.stipo_port);
	$('#libro').val(payload.libro);
	// ...
};

const llenarTitularContrato = (payload: any) => {};

const llenarCotitulares = (payload: any) => {
	llenarCotitular_ClasificacionContrato(payload, 0);
	llenarCotitular_Observaciones(payload, 0);
	// ..
};

const llenarCotitular_ClasificacionContrato = (payload: any, i: number) => {
	$('#asesor_inversion').val(payload.cotitulares[i].clasificacion_contrato.asesor_inversion);
	$('#tipo_manifiesto').val(payload.cotitulares[i].clasificacion_contrato.tipo_manifiesto);
	$('#servicio_inversion').val(payload.cotitulares[i].clasificacion_contrato.servicio_inversion);
	$('#carta_ejecucion').val(payload.cotitulares[i].clasificacion_contrato.carta_ejecucion);
	$('#fecha_carta_ejecucion').val(payload.cotitulares[i].clasificacion_contrato.fecha_carta_ejecucion);
	$('#carta_ejecucion_2').val(payload.cotitulares[i].clasificacion_contrato.carta_ejecucion_2);
	$('#fecha_carta_ejecucion_2').val(payload.cotitulares[i].clasificacion_contrato.fecha_carta_ejecucion_2);
	$('#institucional_pract_vta').val(payload.cotitulares[i].clasificacion_contrato.institucional_pract_vta);
	$('#justificacion_institucional_pract_vta').val(
		payload.cotitulares[i].clasificacion_contrato.justificacion_institucional_pract_vta
	);
	$('#fecha_institucional_pract_vta').val(
		payload.cotitulares[i].clasificacion_contrato.fecha_institucional_pract_vta
	);
	$('#sofisticado_nosofisticado').val(payload.cotitulares[i].clasificacion_contrato.sofisticado_nosofisticado);
	$('#justificacion_sofisticado_nosofisticado').val(
		payload.cotitulares[i].clasificacion_contrato.justificacion_sofisticado_nosofisticado
	);
	$('#fecha_sofisticado_nosofisticado').val(
		payload.cotitulares[i].clasificacion_contrato.fecha_sofisticado_nosofisticado
	);
	$('#elegible_noelegible').val(payload.cotitulares[i].clasificacion_contrato.elegible_noelegible);
	$('#justificacion_elegible_noelegible').val(
		payload.cotitulares[i].clasificacion_contrato.justificacion_elegible_noelegible
	);
	$('#fecha_elegible_noelegible').val(payload.cotitulares[i].clasificacion_contrato.fecha_elegible_noelegible);
	$('#calificado_nocalificado').val(payload.cotitulares[i].clasificacion_contrato.calificado_nocalificado);
	$('#justificacion_calificado_nocalificado').val(
		payload.cotitulares[i].clasificacion_contrato.justificacion_calificado_nocalificado
	);
	$('#fecha_calificado_nocalificado').val(
		payload.cotitulares[i].clasificacion_contrato.fecha_calificado_nocalificado
	);
	$('#discrecional_nodiscrecional').val(payload.cotitulares[i].clasificacion_contrato.discrecional_nodiscrecional);
	$('#justificacion_discrecional_nodiscrecional').val(
		payload.cotitulares[i].clasificacion_contrato.justificacion_discrecional_nodiscrecional
	);
	$('#fecha_discrecional_nodiscrecional').val(
		payload.cotitulares[i].clasificacion_contrato.fecha_discrecional_nodiscrecional
	);
	$('#anexo_descriptivo').val(payload.cotitulares[i].clasificacion_contrato.anexo_descriptivo);

	llenarCotitular_LimitantesInvertir(payload, 0);
};

const llenarCotitular_LimitantesInvertir = (payload: any, i: number) => {
	const limitantesInvertirArray: any[] = payload.cotitulares[i].clasificacion_contrato.limitantes_invertitr;

	$('#table_cotitular2_clasificacion_contrato_limitantes_intervenir').jqGrid({
		data: limitantesInvertirArray,
		datatype: 'local',
		height: 'auto',
		colNames: ['Grupo Insrumento', 'Tipo Valor', 'Emisoras', 'Tipo Valor Emisoras'],
		colModel: [
			{ name: 'grupo_instrumentos', width: 150 },
			{ name: 'tipo_valor', width: 150 },
			{ name: 'emisoras', width: 150 },
			{ name: 'tipo_valor_emisora', width: 150 }
		],
		//   pager: "#pager_cotitular2_comisiones",
		rowNum: 10,
		rowList: [10, 20, 30],
		sortname: 'grupo_instrumentos',
		sortorder: 'desc',
		viewrecords: true,
		gridview: true,
		autoencode: true,
		caption: ''
	});
};

const llenarCotitular_Observaciones = (payload: any, i: number) => {
	$('#text_area_observaciones').val(payload.cotitulares[i].observaciones.text_area_observaciones);
	$('#fecha_apertura').val(payload.cotitulares[i].observaciones.fecha_apertura);
	$('#monto_inicial').val(payload.cotitulares[i].observaciones.monto_inicial);
	$('#sector').val(payload.cotitulares[i].observaciones.sector);
	$('#residencia').val(payload.cotitulares[i].observaciones.residencia);
	$('#envio_correspondencia').val(payload.cotitulares[i].observaciones.envio_correspondencia);
	$('#tipo_cuenta').val(payload.cotitulares[i].observaciones.tipo_cuenta);
	$('#manejo_cuenta').val(payload.cotitulares[i].observaciones.manejo_cuenta);
	$('#custodia_admon').val(payload.cotitulares[i].observaciones.custodia_admon);
	$('#lim_max_operacion').val(payload.cotitulares[i].observaciones.lim_max_operacion);
	$('#isr_mdo_din').val(payload.cotitulares[i].observaciones.isr_mdo_din);
	$('#fecha_ult_mov').val(payload.cotitulares[i].observaciones.fecha_ult_mov);
	$('#porcentaje_acum_isr').val(payload.cotitulares[i].observaciones.porcentaje_acum_isr);
	$('#porcentaje_acum_ide').val(payload.cotitulares[i].observaciones.porcentaje_acum_ide);
	$('#imprime_estado_cuenta').val(payload.cotitulares[i].observaciones.imprime_estado_cuenta);
};

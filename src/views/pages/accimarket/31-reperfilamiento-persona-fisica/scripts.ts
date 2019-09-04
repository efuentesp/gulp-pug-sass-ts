let pf_params: UrlParams = {};

$('#grupoInstrumentos').hide();

$('#reperfilamiento-pf').accordion(ui_accordion_settings);

$('#contrato').change(() => {
	pf_params.contrato = $('#contrato').val();

	http_findAll('busquedaContrato', pf_params, payload => {
		if (payload.length > 0) {
			$('#nombre').val(payload[0].nombre);
			$('#perfil').val(payload[0].perfilActual);
			($('#personaPerfilar') as any).select2({
				placeholder: '--Seleccione--',
				minimumResultsForSearch: Infinity,
				data: payload[0].personasPerfilar
			});
		} else {
			$('#nombre').val('');
			$('#perfil').val('');
		}
	});
});

($('#personaPerfilar') as any).select2({
	placeholder: '--Seleccione--',
	minimumResultsForSearch: Infinity
});

$("input[name='limitantes']").change(() => {
	var opcion = $("input[name='limitantes']:checked").val();
	console.log(opcion);
	if (opcion == 'true') {
		$('#grupoInstrumentos').show();
	} else {
		$('#grupoInstrumentos').hide();
	}
});

const formularioPF = ($('#criterios-busqueda') as any)
	.parsley()
	.on('field:validated', () => {
		const ok = $('.parsley-error').length === 0;
	})
	.on('form:submit', () => {
		console.log('form:submit');

		pf_params = {};

		//Grupo 1
		const contrato = $('#contrato').val();
		if (contrato) {
			pf_params.contrato = contrato;
		}

		const nombre = $('#nombre').val();
		if (nombre) {
			pf_params.nombre = nombre;
		}

		const perfil = $('#perfil').val();
		if (perfil) {
			pf_params.perfil = perfil;
		}

		const personaPerfilar = $('#personaPerfilar').val();
		if (personaPerfilar) {
			pf_params.personaPerfilar = personaPerfilar;
		}

		//Grupo Liquidaciones
		const liquidezPor = $('#liquidezPor').val();
		if (liquidezPor) {
			pf_params.liquidezPor = liquidezPor;
		}

		const liquidezMonto = $('#liquidezMonto').val();
		if (liquidezMonto) {
			pf_params.liquidezMonto = liquidezMonto;
		}

		const cortoPlazoPor = $('#cortoPlazoPor').val();
		if (cortoPlazoPor) {
			pf_params.cortoPlazoPor = cortoPlazoPor;
		}

		const cortoPlazoMonto = $('#cortoPlazoMonto').val();
		if (cortoPlazoMonto) {
			pf_params.cortoPlazoMonto = cortoPlazoMonto;
		}

		const medianoPlazoPor = $('#medianoPlazoPor').val();
		if (medianoPlazoPor) {
			pf_params.medianoPlazoPor = medianoPlazoPor;
		}

		const medianoPlazoMonto = $('#medianoPlazoMonto').val();
		if (medianoPlazoMonto) {
			pf_params.medianoPlazoMonto = medianoPlazoMonto;
		}

		const largoPlazoPor = $('#largoPlazoPor').val();
		if (largoPlazoPor) {
			pf_params.largoPlazoPor = largoPlazoPor;
		}

		const largoPlazoMonto = $('#largoPlazoMonto').val();
		if (largoPlazoMonto) {
			pf_params.largoPlazoMonto = largoPlazoMonto;
		}

		const patrimonioPor = $('#patrimonioPor').val();
		if (patrimonioPor) {
			pf_params.patrimonioPor = patrimonioPor;
		}

		const patrimonioMonto = $('#patrimonioMonto').val();
		if (patrimonioMonto) {
			pf_params.patrimonioMonto = patrimonioMonto;
		}

		//Grupo 2
		const edad = $('#edad').val();
		if (edad) {
			pf_params.edad = edad;
		}

		const estudios = $('#estudios').val();
		if (estudios) {
			pf_params.estudios = estudios;
		}

		const ocupacion = $('#estudios').val();
		if (ocupacion) {
			pf_params.ocupacion = ocupacion;
		}

		const anterior = $('#anterior').val();
		if (anterior) {
			pf_params.anterior = anterior;
		}

		const actual = $('#actual').val();
		if (actual) {
			pf_params.actual = actual;
		}

		const inversiones = $("input[name='inversiones']:checked").val();
		if (inversiones) {
			pf_params.inversiones = inversiones;
		}

		const estrategia = $('#estrategia').val();
		if (estrategia) {
			pf_params.estrategia = estrategia;
		}

		const asesoria = $('#asesoria').val();
		if (asesoria) {
			pf_params.asesoria = asesoria;
		}

		//Grupo 3 es la encuesta

		//Grupo 4
		const proposito = $('#proposito').val();
		if (proposito) {
			pf_params.proposito = proposito;
		}

		const tolerancia = $('#tolerancia').val();
		if (tolerancia) {
			pf_params.tolerancia = tolerancia;
		}

		const limitantes = $("input[name='limitantes']:checked").val();
		if (limitantes) {
			pf_params.limitantes = limitantes;
		}

		const horizonteInversion = $('#horizonte-Inversion').val();
		if (horizonteInversion) {
			pf_params.horizonteInversion = horizonteInversion;
		}

		//Grupo 5 es la encuesta

		//Grupo 6
		var origenUno = new Array();
		$("input[name='chk_origen_uno']:checked").each(function() {
			origenUno.push($(this).val());
		});
		if (origenUno) {
			pf_params.origenUno = origenUno;
		}

		//Falta Perfil Doc

		console.log(JSON.stringify(pf_params));

		http_create('perfilamiento_personas_fisicas', pf_params, (payload: any) => {
			console.log(payload);
		});

		return false;
	});

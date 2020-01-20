let paramsReperfilamientoPersonaMoralm: UrlParams = {};

$('#txtContratoPM').change(() => {

  paramsReperfilamientoPersonaMoralm = {};
  paramsReperfilamientoPersonaMoralm.contrato = String($('#contratoPM').val());

  httpFindAll("contratoPM", paramsReperfilamientoPersonaMoralm, payload => {
    if (payload !== null) {
      $('#txtNombrePM').val(payload.nomFirma);
      $('#txtPerfilPM').val(payload.perfil);
      ($('#cmbPersonaPerfilarPM') as any).select2({
        placeholder: '--Seleccione--',
        minimumResultsForSearch: Infinity,
        data: payload.listaFirmas
      });
    } else {
      $('#txtNombrePM').val('');
      $('#txtPerfilPM').val('');
    }
  });
});

($("#cmbPersonaPerfilarPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbGraficosOpcionU") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbGraficosOpcionD") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbGraficosOpcionT") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbAntiguedadConsPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbGiroPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbTipoPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbActividadActuaPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbEstrategiaInvPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbAsesoriaInvPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbGraficosOpcion") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

let params_pm: UrlParams = {};

$('#contratoPM').change(() => {

  params_pm = {};
  params_pm.contrato = String($('#contratoPM').val());

  http_findAll("contratoPM", params_pm, payload => {
    if (payload !== null) {
      $('#nombrePM').val(payload.nomFirma);
      $('#perfilPM').val(payload.perfil);
      ($('#personaPerfilarPM') as any).select2({
        placeholder: '--Seleccione--',
        minimumResultsForSearch: Infinity,
        data: payload.listaFirmas
      });
    } else {
      $('#nombrePM').val('');
      $('#perfilPM').val('');
    }
  });
});

($("#personaPerfilarPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#graficosOpcionU") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#graficosOpcionD") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#graficosOpcionT") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#antiguedadConsPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#giroPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#tipoPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#actividadActuaPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#estrategiaInvPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#asesoriaInvPM") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#graficosOpcion") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

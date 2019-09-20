$("#reperfilamiento-pm").accordion(ui_accordion_settings);

$("#reperfilamiento_pm_tab_group").tabs();

$('#contratoPM').change(() => {

    const contrato: string = String($('#contratoPM').val());

    http_findOne('busquedaContrato', contrato, payload => {
        if (payload !== null) {
            $('#nombrePM').val(payload.nombre);
            $('#perfilPM').val(payload.perfilActual);
            ($('#personaPerfilarPM') as any).select2({
                placeholder: '--Seleccione--',
                minimumResultsForSearch: Infinity,
                data: payload.personasPerfilar
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
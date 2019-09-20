$('#criterios_busqueda_rendimientos').accordion(ui_accordion_settings);
$('#fechaInicial').datepicker(ui_datepicker_settings);
$('#fechaFinal').datepicker(ui_datepicker_settings);

($("#renta") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#moduloCalculo") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

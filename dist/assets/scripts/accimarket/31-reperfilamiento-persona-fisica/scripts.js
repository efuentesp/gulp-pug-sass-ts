$("#reperfilamiento-pf").accordion(ui_accordion_settings);
$("#personaPerfilar").select2({
    minimumResultsForSearch: Infinity
});
$("#edad").select2({
    minimumResultsForSearch: Infinity
});
$("#estudios").select2({
    minimumResultsForSearch: Infinity
});
$("#ocupacion").select2({
    minimumResultsForSearch: Infinity
});
$("#anterior").select2({
    minimumResultsForSearch: Infinity
});
$("#actual").select2({
    minimumResultsForSearch: Infinity
});
$("#estrategia").select2({
    minimumResultsForSearch: Infinity
});
$("#asesoria").select2({
    minimumResultsForSearch: Infinity
});
$("#proposito").select2({
    minimumResultsForSearch: Infinity
});
$("#tolerancia").select2({
    minimumResultsForSearch: Infinity
});
$("#horizonte-Inversion").select2({
    minimumResultsForSearch: Infinity
});
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
jQuery.each(arr, function (i, val) {
    $("#opcion2-" + val).select2({
        minimumResultsForSearch: Infinity
    });
    $("#fercuencia2-" + val).select2({
        minimumResultsForSearch: Infinity
    });
    $("#plazo2-" + val).select2({
        minimumResultsForSearch: Infinity
    });
    $("#volumen2-" + val).select2({
        minimumResultsForSearch: Infinity
    });
});

//# sourceMappingURL=../../../maps/accimarket/31-reperfilamiento-persona-fisica/scripts.js.map

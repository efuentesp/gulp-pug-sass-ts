$("#reperfilamiento-pf").accordion(ui_accordion_settings);

($("#personaPerfilar") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#edad") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#estudios") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#ocupacion") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#anterior") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#actual") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#estrategia") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#asesoria") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#proposito") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#tolerancia") as any).select2({
  minimumResultsForSearch: Infinity
});

($("#horizonte-Inversion") as any).select2({
  minimumResultsForSearch: Infinity
});

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
jQuery.each(arr, function(i, val) {
  ($("#opcion2-" + val) as any).select2({
    minimumResultsForSearch: Infinity
  });

  ($("#fercuencia2-" + val) as any).select2({
    minimumResultsForSearch: Infinity
  });

  ($("#plazo2-" + val) as any).select2({
    minimumResultsForSearch: Infinity
  });

  ($("#volumen2-" + val) as any).select2({
    minimumResultsForSearch: Infinity
  });
});

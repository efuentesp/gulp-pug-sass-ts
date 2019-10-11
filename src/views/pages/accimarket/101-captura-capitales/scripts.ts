/// <reference path="../../typings/index.d.ts" />

console.log("101-captura-capitales");

($("#grupo") as any).select2({
  placeholder: "Seleccione una opción",
  minimumResultsForSearch: Infinity
});

($("#instrumento") as any).select2({
  placeholder: "Seleccione una opción",
  minimumResultsForSearch: Infinity
});

const rest_url = `${REST_URL}/cotizacion_reportos`;
let cotizacion_reportos_params: UrlParams = {};
http_findAll("cotizacion_reportos", cotizacion_reportos_params, payload => {
  llenaGridContratos(payload);
  const rec_count = payload.length;
  $("#count_contratos").html(rec_count);
});

let select_params: UrlParams = {};
/*
rpc("http://localhost:3000/edadesService", "", (data, textStatus, jQxhr) => {
    console.log(textStatus);
    ($("#edad") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: data
    });
});*/

httpFindAll("edadesService", select_params, (payload: any) => {
  ($("#edad") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

httpFindAll("estudiosService", select_params, (payload: any) => {
  ($("#estudios") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

httpFindAll("ocupacionService", select_params, (payload: any) => {
  ($("#ocupacion") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

($("#anterior") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#actual") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

httpFindAll("estrategiaService", select_params, (payload: any) => {
  ($("#estrategia") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

httpFindAll("asesoriaService", select_params, (payload: any) => {
  ($("#asesoria") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

httpFindAll("propositoService", select_params, (payload: any) => {
  ($("#proposito") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

httpFindAll("toleranciaService", select_params, (payload: any) => {
  ($("#tolerancia") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity,
    data: payload
  });
});

fieldSelectPlusMinus("grupoInstrumento", {});
($("#grupoInstrumento") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

fieldSelectPlusMinus("grupoInstrumentoValor", {});
($("#grupoInstrumentoValor") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

fieldSelectPlusMinus("emisoras", {});
($("#emisoras") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#emisorasTipoValor") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

httpFindAll("horizonteInversion", select_params, (payload: any) => {
  ($("#horizonte-Inversion") as any)
    .select2({
      placeholder: "--Seleccione--",
      minimumResultsForSearch: Infinity,
      data: payload
    })
    .change(function () {
      var element = document.getElementById("textoPortafolio");
      element.innerHTML = $(this)
        .find("option:selected")
        .text();
      select_params = {};
      select_params.id = $(this)
        .find("option:selected")
        .val();
      obtienRangos(select_params);
    });
});

function obtienRangos(select_params: any) {
  httpFindAll("detallePortaFolio", select_params, payload => {
    if (payload.length > 0) {
      document.getElementById("menorDeUno").innerHTML =
        payload[0].menorDeUn + "%";
      document.getElementById("deUnoaTres").innerHTML =
        payload[0].deUnoaTres + "%";
      document.getElementById("mayorDeTres").innerHTML =
        payload[0].mayorDeTres + "%";
      document.getElementById("totalInver").innerHTML =
        +payload[0].menorDeUn +
        +payload[0].deUnoaTres +
        +payload[0].mayorDeTres +
        "%";
    } else {
      document.getElementById("menorDeUno").innerHTML = "";
      document.getElementById("deUnoaTres").innerHTML = "";
      document.getElementById("mayorDeTres").innerHTML = "";
      document.getElementById("totalInver").innerHTML = "";
    }
  });
}

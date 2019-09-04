let select_params: UrlParams = {};

http_findAll("edadesService", select_params, (payload: any) => {
    ($("#edad") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    });
});

http_findAll("estudiosService", select_params, (payload: any) => {
    ($("#estudios") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    });
});

http_findAll("ocupacionService", select_params, (payload: any) => {
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

http_findAll("estrategiaService", select_params, (payload: any) => {
    ($("#estrategia") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    });
});

http_findAll("asesoriaService", select_params, (payload: any) => {
    ($("#asesoria") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    });
});

http_findAll("propositoService", select_params, (payload: any) => {
    ($("#proposito") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    });
});

http_findAll("toleranciaService", select_params, (payload: any) => {
    ($("#tolerancia") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    });
});

($("#grupoInstrumento") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#grupoInstrumentoValor") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#emisoras") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#emisorasTipoValor") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

http_findAll("horizonteInversion", select_params, (payload: any) => {
    ($("#horizonte-Inversion") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity,
        data: payload
    }).change(function () {
        var element = document.getElementById("textoPortafolio");
        element.innerHTML = $(this).find("option:selected").text();
        select_params = {};
        select_params.id = $(this).find("option:selected").val();
        obtienRangos(select_params);
    });
});

function obtienRangos(select_params: any) {
    http_findAll("detallePortaFolio", select_params, payload => {
        if (payload.length > 0) {
            document.getElementById("menorDeUno").innerHTML = payload[0].menorDeUn + "%";
            document.getElementById("deUnoaTres").innerHTML = payload[0].deUnoaTres + "%";
            document.getElementById("mayorDeTres").innerHTML = payload[0].mayorDeTres + "%";
            document.getElementById("totalInver").innerHTML = (+payload[0].menorDeUn + +payload[0].deUnoaTres + +payload[0].mayorDeTres) + "%";
        } else {
            document.getElementById("menorDeUno").innerHTML = "";
            document.getElementById("deUnoaTres").innerHTML = "";
            document.getElementById("mayorDeTres").innerHTML = "";
            document.getElementById("totalInver").innerHTML = "";
        }
    });
}
/// <reference path="../../typings/index.d.ts" />
let listaFlujo_params: UrlParams = {};

fieldPlusMinus("emisora", {});
fieldPlusMinus("contrato", {});
fieldPlusMinus("digito", {});


$("#table_busquedaFlujo").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Emisora",
        "Mkt",
        "Total de Ordenes",
        "Prec. Ordenado",
        "Prec. Asignado",
        "Vol. Ordenado",
        "Vol. Pendiente",
        "Vol. ASignado"
    ],

    colModel: [
        { name: "emisora", width: 200 },
        { name: "mkt", width: 200 },
        { name: "totaldeOrdenes", width: 200 },
        { name: "precOrdenado", width: 110 },
        { name: "precAsignado", width: 110 },
        { name: "volOrdenado", width: 110 },
        { name: "volPendiente", width: 110 }
    ],

    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "tipo",
    sortorder: "desc",
    shrinkToFit: false,
});

$("#btn_search").click(() => {
    const formListFlujo = ($("#criterios-listFlujo") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("form:submit");

            listaFlujo_params = {};

            const emisora = getList("emisora");
            if (emisora.length > 0) {
                listaFlujo_params.emisora = emisora;
            }

            const contrato = getList("contrato");
            if (contrato.length > 0) {
                listaFlujo_params.contrato = contrato;
            }

            const digito = getList("digito");
            if (digito.length > 0) {
                listaFlujo_params.digito = digito;
            }

            const precio = $("input[name='precio']:checked").val();
            if (precio) {
                listaFlujo_params.precio = precio;
            }

            const volumen = $("input[name='volumen']:checked").val();
            if (volumen) {
                listaFlujo_params.volumen = volumen;
            }

            const operacion = $("input[name='operacion']:checked").val();
            if (operacion) {
                listaFlujo_params.operacion = operacion;
            }

            const vista = $("input[name='vista']:checked").val();
            if (vista) {
                listaFlujo_params.vista = vista;
            }

            http_findAll("flujo", listaFlujo_params, payload => {
                const rec_count = payload.length;
                $("#count_flujo").html(rec_count);
                fillJqGrid("#table_busquedaFlujo", payload);
            });

            return false;
        });
});

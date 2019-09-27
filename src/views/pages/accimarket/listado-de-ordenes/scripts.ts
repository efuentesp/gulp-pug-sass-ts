let listaOrdenes_params: UrlParams = {};

$("#criterios_busqueda_ordenes").accordion(ui_accordion_settings);

fieldPlusMinus("sociedad");
fieldPlusMinus("contrato");
fieldPlusMinus("digito");
fieldPlusMinus("usuario");

$("#table_busquedaOrdenes").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Tipo",
        "Folio",
        "Contrato",
        "Emisora",
        "Digito",
        "Cliente",
        "Importe/Cantidad",
        "Perfil del Cliente al momento de la Operacion",
        "Perfil del Producto al momento de la Operacion"
    ],
    colModel: [
        { name: "tipo", width: 55 },
        { name: "folio", width: 55 },
        { name: "contrato", width: 90 },
        { name: "emisora", width: 110 },
        { name: "digito", width: 50 },
        { name: "cliente", width: 110 },
        { name: "cantidad", width: 110 },
        { name: "perfil", width: 250 },
        { name: "perfil2", width: 250 }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "tipo",
    sortorder: "desc",
    shrinkToFit: false,
});

$("#btn_search").click(() => {
    const formListOrdenes = ($("#criterios-listOrdenes") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("form:submit");

            listaOrdenes_params = {};

            const sociedad = getList("sociedad");
            if (sociedad.length > 0) {
                listaOrdenes_params.sociedad = sociedad;
            }

            const contrato = getList("contrato");
            if (contrato.length > 0) {
                listaOrdenes_params.contrato = contrato;
            }

            const digito = getList("digito");
            if (digito.length > 0) {
                listaOrdenes_params.digito = digito;
            }

            const usuario = getList("usuario");
            if (usuario.length > 0) {
                listaOrdenes_params.usuario = usuario;
            }

            const estatus = $("input[name='estatus']:checked").val();
            if (estatus) {
                listaOrdenes_params.estatus = estatus;
            }

            const clasificacion = $("input[name='clasificacion']:checked").val();
            if (clasificacion) {
                listaOrdenes_params.clasificacion = clasificacion;
            }

            http_findAll("contratos", listaOrdenes_params, payload => {
                const rec_count = payload.length;
                $("#count_contratos").html(rec_count);
                fillJqGrid("#table_busquedaOrdenes", payload);
            });

            return false;
        });
});

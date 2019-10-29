/// <reference path="../../typings/index.d.ts" />
let listaAsignacion_params: UrlParams = {};

fieldPlusMinus("emisora", {});
fieldPlusMinus("contrato", {});
fieldPlusMinus("digito", {});
fieldPlusMinus("usuario", {});



$("#table_busquedaAsignacion").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Columna Estatus",
        "Columna de Seleccion",
        "Oper",
        "Contrato",
        "Ordenada",
        "Precio Orden",
        "Envio",
        "Emisora",
        "PPP",
        "% Asig.",
        "Cliente",
        "Canc.",
        "% Confirm.",
        "Confirmada",
        "Por Confirmar",
        "Sts. Imp.",
        "Vigencia",
        "Tipo",
        "Nombre de Usuario",
        "Extension",
        "% VO Capt.",
        "Asignada",
        "Prec. Lim.",
        "Tipo MPL",
        "Vol. Bolsa",
        "% Vol. Bolsa",
        "Vol. Oculto",
        "Justificacion",
        "Medio Instr.",
        "Servicio Inversion",
        "Titulos PreAsignados",
        "Usuario",
        "Fec. Venc.",
        "Dif. Puja",
        "Tipo Medio de Liq.",
        "Medio de Liq.",
        "Pendiente",
        "Digito",
        "Precio Orden",
        "Fecha",
        "Orden",
        "Rompe",
        "Tipo de Orden",
        "Perfil del cliente al momento de la Operacion",
        "Perfil del producto al momento de la Operacion",
        "Medio Cierre",
        "Numero de Red/Telefono",
        "Clasificacion ETF"
    ],
    colModel: [
        { name: "columnaEstatus", width: 55 },
        { name: "columnadeSeleccion", width: 55 },
        { name: "oper", width: 110 },
        { name: "contrato", width: 110 },
        { name: "ordenada", width: 110 },
        { name: "precioOrden", width: 110 },
        { name: "envio", width: 110 },
        { name: "emisora", width: 110 },
        { name: "PPP", width: 110 },
        { name: "%asig", width: 100 },
        { name: "cliente", width: 110 },
        { name: "canc", width: 110 },
        { name: "%confirm", width: 100 },
        { name: "confirmada", width: 110 },
        { name: "porconfirmar", width: 110 },
        { name: "stsImp", width: 110 },
        { name: "vigencia", width: 110 },
        { name: "tipo", width: 110 },
        { name: "nombredeUsuario", width: 110 },
        { name: "extension", width: 110 },
        { name: "%VOcapt", width: 100 },
        { name: "asignada", width: 100 },
        { name: "precLim", width: 100 },
        { name: "tipoMPL", width: 100 },
        { name: "volBolsa", width: 100 },
        { name: "%volBolsa", width: 100 },
        { name: "volOculto", width: 100 },
        { name: "justificacion", width: 100 },
        { name: "medioInstr", width: 100 },
        { name: "servicioInversion", width: 110 },
        { name: "titulosPreAsignados", width: 110 },
        { name: "usuario", width: 100 },
        { name: "fecVenc", width: 100 },
        { name: "difPuja", width: 100 },
        { name: "tipomediodeLiq", width: 100 },
        { name: "mediodeLiq", width: 100 },
        { name: "pendiente", width: 100 },
        { name: "digito", width: 100 },
        { name: "precioOrden", width: 100 },
        { name: "fecha", width: 100 },
        { name: "orden", width: 100 },
        { name: "rompe", width: 100 },
        { name: "tipoOrden", width: 100 },
        { name: "perfildelclientealmomentodelaOperacion", width: 110 },
        { name: "perfildelproductoalmomentodelaOperacion", width: 110 },
        { name: "medioCierre", width: 100 },
        { name: "numerodeRed/Telefono", width: 110 },
        { name: "clasificacionETF", width: 110 }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "tipo",
    sortorder: "desc",
    shrinkToFit: false,
});

$("#btn_search").click(() => {
    const formListAsignacion = ($("#criterios-listAsignacion") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("form:submit");

            listaAsignacion_params = {};

            const emisora = getList("emisora");
            if (emisora.length > 0) {
                listaAsignacion_params.emisora = emisora;
            }

            const contrato = getList("contrato");
            if (contrato.length > 0) {
                listaAsignacion_params.contrato = contrato;
            }

            const digito = getList("digito");
            if (digito.length > 0) {
                listaAsignacion_params.digito = digito;
            }

            const usuario = getList("usuario");
            if (usuario.length > 0) {
                listaAsignacion_params.usuario = usuario;
            }

            const estatus = $("input[name='estatus']:checked").val();
            if (estatus) {
                listaAsignacion_params.estatus = estatus;
            }

            const operacion = $("input[name='operacion']:checked").val();
            if (operacion) {
                listaAsignacion_params.operacion = operacion;
            }

            const vista = $("input[name='vista']:radio_button").val();
            if (vista) {
                listaAsignacion_params.vista = vista;
            }

            http_findAll("asignacion", listaAsignacion_params, payload => {
                const rec_count = payload.length;
                $("#count_asignacion").html(rec_count);
                fillJqGrid("#table_busquedaAsignacion", payload);
            });

            $("#table_busquedaAsignacion").jqGrid("setFrozenColumns");

            // $("#btn_pdf").click(() =>
            //     $("#dialogo_pdf").dialog({
            //         modal: true,
            //         closeText: "",
            //         show: true,
            //         title: "Generar PDF",
            //         buttons: [
            //             {
            //                 text: "Aceptar",
            //                 icon: "ui-icon-check",
            //                 click: function () {
            //                     $(this).dialog("close");
            //                 }

            //                 // Uncommenting the following line would hide the text,
            //                 // resulting in the label being used as a tooltip
            //                 //showText: false
            //             }
            //         ]
            //     })
            // );

            // $("#btn_xls").click(() =>
            //     $("#dialogo_xls").dialog({
            //         modal: true,
            //         closeText: "",
            //         show: true,
            //         title: "Generar XLS"
            //     })
            // );

            return false;
        });
});

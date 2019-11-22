/// <reference path="../../typings/index.d.ts" />
let listaAsignacion_params: UrlParams = {};
let listaFlujo_params: UrlParams = {};
let listaHechos_params: UrlParams = {};
let listaCancelarOrdenes_params: UrlParams = {};
let source_asignacion_params: UrlParams = {};
let destination_asignacion_params: UrlParams = {};

// fieldSelectPlusAutocomplete("emisora", {});
fieldPlusMinus("usuario-asignacion-flujo", {});
fieldPlusMinus("contrato", {});
//fieldPlusMinus("digito", {});


$("#rowOpciones").hide();
$("#rowFlujo").hide();
$("#rowVolumen").hide();

$("input[name='vista']").click(function () {
    var radio = $("input[name='vista']:checked").val();
    if (radio == "SI") {
        $("#rowEstatus").show();
        $("#rowOpciones").hide();
        $("#rowUsuario").show();
        $("#rowSolo").show();
        $("#rowAsignacion").show();
        $("#rowFlujo").hide();
        $("#rowVolumen").hide();
        $("#field_exclu").hide();
        $("#field_excluir").hide();


    } else {
        $("#rowEstatus").hide();
        $("#rowOpciones").show();
        $("#rowUsuario").hide();
        $("#rowSolo").hide();
        $("#rowAsignacion").hide();
        $("#rowFlujo").show();
        $("#rowVolumen").show();
        $("#field_exclu").show();
        $("#field_excluir").show();

    }
});

http_findAll("asignacion", listaAsignacion_params, payload => {
    llenaGridAsignacionOrdenes(payload);
    llenaSelectEmisora(payload);
    llenaSelectDigito(payload);
    const rec_count = payload.length;
    $("#count_asignacion").html(rec_count);
});

const llenaGridAsignacionOrdenes = (asignaciones: any) => {
    $("#table_busquedaAsignacion").jqGrid({
        data: asignaciones,
        datatype: "local",
        height: "auto",
        shrinkToFit: false,
        sortname: "contrato",
        sortorder: "desc",
        rowNum: 10,
        rowList: [10, 20, 30],
        colNames: [
            "Estatus",
            "",
            "<input type= 'checkbox' name = 'chkAllOutputField'/>",
            "Operacion",
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
            {
                name: "estatus",
                hidden: true
            },
            {
                name: "columnaEstatus",
                index: "columnaEstatus",
                width: 20,
                sortable: false,
                formatter: (cellvalue, options, rowobject) => {
                    // console.log(rowobject.estatus);
                    let color = "desconocido";
                    switch (rowobject.estatus) {
                        case "S01": {
                            color = "asignado";
                            break;
                        }
                        case "S02": {
                            color = "pendientes";
                            break;
                        }
                        case "S03": {
                            color = "sin-asignar";
                            break;
                        }
                        case "S04": {
                            color = "canceladas";
                            break;
                        }
                        case "S05": {
                            color = "distribuidas";
                            break;
                        }
                        case "S06": {
                            color = "bloqueadas";
                            break;
                        }
                    }
                    return `<div class='w-5 h-5 ${color}'></div>`;
                }
            },
            {
                name: "columnadeSeleccion",
                index: "columnadeSeleccion",
                width: 20,
                sortable: false,
                formatter: (cellvalue, options, rowobject) => {
                    return "<input type='checkbox' name='' value=''>";
                }
            },
            { name: "operacion", width: 110 },
            { name: "contrato", width: 110 },
            { name: "ordenada", width: 110 },
            { name: "preciOrden", width: 110 },
            { name: "envio", width: 110 },
            { name: "emisora", width: 110 },
            { name: "ppp", width: 110 },
            { name: "asig", width: 100 },
            { name: "cliente", width: 110 },
            { name: "canc", width: 110 },
            { name: "confirm", width: 100 },
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
            { name: "tipoMediodeLiq", width: 100 },
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
        loadComplete: function () {
            console.log("Context Menu");
            ($("tr.jqgrow.table-row-asignados", this) as any).contextMenu(
                "AsignadosMenu",
                {
                    bindings: {
                        "configuracion-de-columnas": function (event) {
                            console.log("Configuracion de columnas");
                        },
                        "copiar-excel": function (event) {
                            console.log("Copiar excel");
                        },
                        "hechos": function (event) {
                            console.log("Hechos");
                        },
                        "compra": function (event) {
                            console.log("Compra");
                        },
                        "venta": function (event) {
                            console.log("Venta");
                        },
                        "reporte-detallado-PDF": function (event) {
                            console.log("Reporte detallado PDF");
                        },
                        "reporte-detallado-Excel": function (event) {
                            console.log("Reporte detallado Excel");
                        }
                    },
                    onContexMenu: function (event, menu) { }
                }
            );
            ($("tr.jqgrow.table-row-pendientes", this) as any).contextMenu(
                "PendientesMenu",
                {
                    bindings: {
                        "configuracion-de-columnas": function (event) {
                            console.log("Configuracion de columnas");
                        },
                        "copiar-excel": function (event) {
                            console.log("Copiar excel");
                        },
                        "modificar-cantidad": function (event) {
                            console.log("Modificar cantidad");
                        },
                        "cancelar": function (event) {
                            console.log("Cancelar");
                        },
                        "cancelar-ordenes-seleccionadas": function (event) {
                            console.log("Cancelar ordenes seleccionadas");
                        },
                        "hechos": function (event) {
                            console.log("Hechos");
                        },
                        "compra": function (event) {
                            console.log("Compra");
                        },
                        "venta": function (event) {
                            console.log("Venta");
                        },
                        "reporte-detallado-PDF": function (event) {
                            console.log("Reporte detallado PDF");
                        },
                        "reporte-detallado-Excel": function (event) {
                            console.log("Reporte detallado Excel");
                        }
                    },
                    onContexMenu: function (event, menu) { }
                }
            );
            ($("tr.jqgrow.table-row-sin-asignar", this) as any).contextMenu(
                "AsignarMenu",
                {
                    bindings: {
                        "configuracion-de-columnas": function (event) {
                            console.log("Configuracion de columnas");
                        },
                        "copiar-excel": function (event) {
                            console.log("Copiar excel");
                        },
                        "cancelar": function (event) {
                            console.log("Cancelar");
                        },
                        "modificar-cantidad": function (event) {
                            console.log("Modificar cantidad");
                        },
                        "compra": function (event) {
                            console.log("Compra");
                        },
                        "venta": function (event) {
                            console.log("Venta");
                        },
                        "reporte-detallado-PDF": function (event) {
                            console.log("Reporte detallado PDF");
                        },
                        "reporte-detallado-Excel": function (event) {
                            console.log("Reporte detallado Excel");
                        }
                    },
                    onContexMenu: function (event, menu) { }
                }
            );

            ($("tr.jqgrow.table-row-canceladas", this) as any).contextMenu(
                "CanceladasMenu",
                {
                    bindings: {
                        "configuracion-de-columnas": function (event) {
                            console.log("Configuracion de columnas");
                        },
                        "copiar-excel": function (event) {
                            console.log("Copiar excel");
                        },
                        "compra": function (event) {
                            console.log("Compra");
                        },
                        "reporte-detallado-PDF": function (event) {
                            console.log("Reporte detallado PDF");
                        },
                        "reporte-detallado-Excel": function (event) {
                            console.log("Reporte detallado Excel");
                        }
                    },
                    onContexMenu: function (event, menu) { }
                }
            );
            ($("tr.jqgrow.table-row-distribuidas", this) as any).contextMenu(
                "DistribuidasMenu",
                {
                    bindings: {
                        "configuracion-de-columnas": function (event) {
                            console.log("Configuracion de columnas");
                        },
                        "copiar-excel": function (event) {
                            console.log("Copiar excel");
                        },
                        "hechos": function (event) {
                            console.log("Hechos");
                        },
                        "compra": function (event) {
                            console.log("Compra");
                        },
                        "venta": function (event) {
                            console.log("Venta");
                        }
                    },
                    onContexMenu: function (event, menu) { }
                }
            );
            ($("tr.jqgrow.table-row-bloqueadas", this) as any).contextMenu(
                "BloqueadasMenu",
                {
                    bindings: {
                        "configuracion-de-columnas": function (event) {
                            console.log("Configuracion de columnas");
                        },
                        "copiar-excel": function (event) {
                            console.log("Copiar excel");
                        },
                        "cancelar": function (event) {
                            console.log("Cancelar");
                        },
                        "modificar-cantidad": function (event) {
                            console.log("Modificar cantidad");
                        },
                        "compra": function (event) {
                            console.log("Compra");
                        },
                        "venta": function (event) {
                            console.log("Venta");
                        },
                        "reporte-detallado-PDF": function (event) {
                            console.log("Reporte detallado PDF");
                        },
                        "reporte-detallado-Excel": function (event) {
                            console.log("Reporte detallado Excel");
                        }
                    },
                    onContexMenu: function (event, menu) { }
                }
            );
        },
        rowattr: function (item) {
            let table_row_class = { class: "" }
            let class_content = ""

            switch (item.tipo) {
                case "CPA": {
                    class_content = class_content + "table-row-compra"
                    break;
                }
                case "VTA": {
                    class_content = class_content + "table-row-venta"
                    break;
                }
            }
            console.log(class_content);

            switch (item.estatus) {
                case "S01": {
                    class_content = class_content + " table-row-asignados"
                    break;
                }
                case "S02": {
                    class_content = class_content + " table-row-pendientes"
                    break;
                }
                case "S03": {
                    class_content = class_content + " table-row-sin-asignar"
                    break;
                }
                case "S04": {
                    class_content = class_content + " table-row-canceladas"
                    break;
                }
                case "S05": {
                    class_content = class_content + " table-row-distribuidas"
                    break;
                }
                case "S06": {
                    class_content = class_content + " table-row-bloqueadas"
                    break;
                }
            }
            console.log("---> ", table_row_class)
            table_row_class.class = class_content;
            console.log(table_row_class)
            return table_row_class; // {class: "table-row-compra table-row-pendientes"}
            // {class: "table-row-venta table-row-bloqueadas"}
            // {class: "table-row-venta table-row-distribuidas"}
            // {class: "table-row-venta table-row-canceladas"}
            // {class: "table-row-compra table-row-sin-asignar"}
            // {class: "table-row-compra table-row-pendientes"}
            // {class: "table-row-venta table-row-asignados"}
        }
    });
};


http_findAll("flujo", listaFlujo_params, payload => {
    llenaGridFlujoOrdenes(payload);
    const rec_count = payload.length;
    $("#count_flujo").html(rec_count);
});

const llenaGridFlujoOrdenes = (flujos: any) => {
    console.log("---> ", flujos)
    $("#table_busquedaFlujo").jqGrid({
        pager: "#pager_busquedaFlujo",
        data: flujos,
        datatype: "local",
        height: "auto",
        shrinkToFit: false,
        autoWidth: true,
        sortname: "flujo",
        sortorder: "desc",
        rowNum: 10,
        rowList: [5, 10, 15, 20],
        viewrecords: true,
        gridview: true,
        autoencode: true,
        sortable: true,
        multiselect: false,
        caption: "",
        colNames: [
            "Emisora",
            "Mkt",
            "Total de Ordenes",
            "Prec. Ordenado",
            "Prec. Asignado",
            "Vol. Ordenado",
            "Vol. Pendiente",
            "Vol. Asignado",
            "Tipo"
        ],
        colModel: [
            { name: "emisora", width: 170 },
            { name: "mkt", width: 170 },
            { name: "totaldeOrdenes", width: 170 },
            { name: "precOrdenados", width: 170 },
            { name: "precAsignado", width: 170 },
            { name: "volOrdenado", width: 170 },
            { name: "volPendiente", width: 170 },
            { name: "volAsignado", width: 170 },
            { name: "tipo", width: 170 },
        ],
        grouping: true,
        groupingView: {
            groupField: ["emisora", "tipo"],
            groupColumnShow: [true, false],
            groupText: ["<b>{0}</b>", "<b>{0}</b>"],
            groupOrder: ["asc", "asc"],

        },
        rowattr: function (item) {
            let table_row_class = { class: "" }
            let class_content = ""

            switch (item.tipo) {
                case "CPA": {
                    class_content = class_content + "table_compra"
                    break;
                }
                case "VTA": {
                    class_content = class_content + "table_venta"
                    break;
                }
            }
            table_row_class.class = class_content;
            return table_row_class;
        }
    });
    var i = 0;
    $(".table_busquedaFlujoghead_1").each(function (index, element) {
        i = i % 2;
        if (i == 0) {
            $(element).addClass("table_compra");
        } else {
            $(element).addClass("table_venta");
        }
        i++;
    });
}

http_findAll("hechos", listaHechos_params, payload => {
    llenaGridHechos(payload);
    const rec_count = payload.length;
    $("#count_hechos").html(rec_count);
});

const llenaGridHechos = (hechos: any) => {
    $("#table_busquedaHechos").jqGrid({
        data: hechos,
        datatype: "local",
        height: "auto",
        shrinkToFit: false,
        sortname: "cantidad",
        sortorder: "desc",
        rowNum: 10,
        rowList: [10, 20, 30],

        colNames: ["Cantidad", "Hora", "Precio"],

        colModel: [
            { name: "cantidad", width: 110 },
            { name: "hora", width: 110 },
            { name: "precio", width: 110 }
        ]
    });
};
http_findAll("cancelarordenes", listaCancelarOrdenes_params, payload => {
    llenaGridCancelarOrdenes(payload);
    const rec_count = payload.length;
    $("#count_hechos").html(rec_count);
});
const llenaGridCancelarOrdenes = (cancelarordenes: any) => {
    $("#table_busquedaCancelarordenes").jqGrid({
        data: cancelarordenes,
        datatype: "local",
        height: "auto",
        shrinkToFit: false,
        sortname: "orden",
        sortorder: "desc",
        rowNum: 10,
        rowList: [10, 20, 30],


        colNames: [
            "Orden",
            "Sts Cancela",
            "Contacto",
            "Promotor",
            "Tipo",
            "Emisora",
            "Cantidad",
            "Precio",
            "Fecha Captura"
        ],

        colModel: [
            { name: "orden", width: 90 },
            { name: "stsCancela", width: 220 },
            { name: "contacto", width: 100 },
            { name: "promotor", width: 80 },
            { name: "tipo", width: 80 },
            { name: "emisora", width: 80 },
            { name: "cantidad", width: 80 },
            { name: "precio", width: 80 },
            { name: "fechaCaptura", width: 100 }
        ],

    });
}
const formAsignacionOrdenes = ($("#criterios-listAsignacion") as any)
    .parsley()
    .on("field:validated", () => {
        const ok = $(".parsley-error").length === 0;
        // console.log("Errores de validación", $(".parsley-error"))
        // $(".callout-info").toggleClass("hidden", !ok);
        // $(".callout-warning").toggleClass("hidden", ok);
    })
    .on("form:submit", e => {
        console.log("form:submit", e);

        rellenarGridAsignacion();

        return false;
    });

const llenaSelectEmisora = (emisora: any) => {
    console.log("Lista:" + emisora);
    fieldSelectPlusAutocomplete("emisora", {
        id: "emisora",
        text: "emisora",
        payload: emisora
    });
};

const llenaSelectDigito = (digito: any) => {
    console.log("Lista:" + digito);
    fieldSelectPlusAutocomplete("digito", {
        id: "emisora",
        text: "digito",
        payload: digito
    });
};

const rellenarGridAsignacion = () => {
    console.log("Llena de nuevo grid Asignación");

    listaAsignacion_params = {};



    const contrato = getList("contrato");
    if (contrato.length > 0) {
        listaAsignacion_params.contrato = contrato;
    }

    const digito = getList("digito");
    if (digito.length > 0) {
        listaAsignacion_params.digito = digito;
    }

    const usuario_asignacion_flujo = getList("usuario-asignacion-flujo");
    if (usuario_asignacion_flujo.length > 0) {
        listaAsignacion_params.usuario_asignacion_flujo = usuario_asignacion_flujo;
    }
    let estatus = getChecked("estatus");
    if (estatus.length > 0) {
        listaAsignacion_params.estatus = estatus;
    }

    const tipo = getOptionSelected("tipo");
    if (tipo) {
        if (tipo !== "ALL") {
            listaAsignacion_params.tipo = tipo;
        }
    }

    http_findAll("asignacion", listaAsignacion_params, payload => {
        $("#table_busquedaAsignacion").jqGrid("clearGridData");
        $("#table_busquedaAsignacion").jqGrid("setGridParam", { data: payload });
        $("#table_busquedaAsignacion").trigger("reloadGrid");
        const rec_count = payload.length;
        $("#count_asignacion").html(rec_count);
    });
};

$("#btn_pdf").contextMenu("menu-pdf", {
    bindings: {
        "pdf-reporte-asignacion": function (event) {
            console.log("PDF Reporte de Asignación");
        },
        "pdf-confirmacion-global": function (event) {
            console.log("PDF Confirmación Global");
        },
        "pdf-confirmacion-detallada": function (event) {
            console.log("PDF Confirmación Detallada");
        }
    },
    onContexMenu: function (event, menu) { }
});

$("#btn_xls").contextMenu("menu-xls", {
    bindings: {
        "xls-reporte-asignacion": function (event) {
            console.log("XLS Reporte de Asignación");
        },
        "xls-confirmacion-global": function (event) {
            console.log("XLS Confirmación Global");
        },
        "xls-confirmacion-detallada": function (event) {
            console.log("XLS Confirmación Detallada");
        }
    },
    onContexMenu: function (event, menu) { }
});

//$("#btn_xls").on("click", function (e) { });

$("#idcancelar").click(() => {
    console.log("ventanaCancelar")
    $("#cancelarasignacionyflujo").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Cancelar Órden",
        width: 500
    })
}
);
$("#idmodificar").click(() =>
    $("#modificar").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Modificar Cantidad",
        width: 500
    })
);
$("#idhechos").click(() =>
    $("#hechos_asignacion_flujo").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Hechos",
        width: 400,
        height: 200
    })
);
$("#idcancelarordenes").click(() =>
    $("#cancelarordenes").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Cancelar Órdenes",
        width: 1000
    })
);
$("#idmantenimiento").click(() =>
    $("#mantenimiento").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Mantenimiento de Filtro de Usuarios de Asignación",
        width: 400
    })
);
$("#idcolumnas").click(() =>
    $("#columnas").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Configuración de Columnas",
        width: 600,
        height: 500


    })
);


const cuentaRegresiva = (segundos: number) => {
    if (segundos > 0) {
        const segundosRestantes = $("#segundos-restantes");
        segundosRestantes.html(segundos.toString());
        setTimeout(() => {
            cuentaRegresiva(segundos - 1);
        }, 1000);
    } else {
        // rellenarGridAsignacion();
        const segundos_actualizar = $("#segundos-actualizar").val();
        cuentaRegresiva(+segundos_actualizar);
    }
};

const segundos_actualizar = $("#segundos-actualizar").val();
cuentaRegresiva(+segundos_actualizar);

http_findAll("source", source_asignacion_params, payload => {
    llenaSource_asignacion("listado", payload);
});

http_findAll("destination", destination_asignacion_params, payload => {
    llenaDestination_asignacion("listado", payload);
});

const llenaSource_asignacion = (id: string, source: any) => {
    fillSwapList(id, "source", source);
};

const llenaDestination_asignacion = (id: string, destination: any) => {
    fillSwapList(id, "destination", destination);
};

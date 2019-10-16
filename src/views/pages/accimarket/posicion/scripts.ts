/// <reference path="../../typings/index.d.ts" />
let posicion_params: UrlParams = {};
let mov_posicion_params: UrlParams = {};
var columnasAll = [];
var colModelDinamic = [];
var listaDetalle = [];
let listaTabsVal: string[] = [];

$(document).ready(() => {
    //Consultamos el ultimo contrato
    $.ajax({
        url: "http://localhost:3000/ultimoContrato",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $("#contrato").val(result.contrato);
            //Obtenemos todas las columnas
            $.ajax({
                url: "http://localhost:3000/configInicialPosV2",
                contentType: "application/json",
                dataType: "json",
                success: function (result) {
                    for (var columna = 0; columna < result[0].configArr.length; columna++) {
                        columnasAll.push(result[0].configArr[columna].nombre);
                    }
                    //Obtiene las columnas actuales
                    $.ajax({
                        url: "http://localhost:3000/lisColumnasActuales",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (result) {
                            for (var _i = 0; _i < result.length; _i++) {
                                colModelDinamic.push({ name: result[_i].columna, index: result[_i].columna, align: "right", width: result[_i].ancho });
                            }
                            llenaActuales(result);
                            //Obtiene las columnas disponibles
                            $.ajax({
                                url: "http://localhost:3000/lisColumnasDisponibles",
                                contentType: "application/json",
                                dataType: "json",
                                success: function (result) {
                                    for (var _i = 0; _i < result.length; _i++) {
                                        colModelDinamic.push({ name: result[_i].columna, index: result[_i].columna, align: "right", hidden: true, width: result[_i].ancho });
                                    }
                                    llenaDisponibles(result);
                                    //Obtenemos los encabezados de tab
                                    $.ajax({
                                        url: "http://localhost:3000/sTipoPortfContratosV2",
                                        contentType: "application/json",
                                        dataType: "json",
                                        success: function (result) {
                                            agregarTab(result);
                                            consultaInformacion(String($("#contrato").val()));
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    $("#fechaI").datepicker("setDate", new Date());
    $("#fechaF").datepicker("setDate", new Date());
});

$("#Dialog").click(() => {
    dialogoConfiguracion();
});

const agregarTab = (listaTabs) => {
    var listaVolteada = [];
    var listaTotales = {};
    var listaGrafica = [];
    var tabs = $("#grupo_posicion").tabs();
    var tabTitle = $("#tab_title"),
        tabTemplate = "<li><a href='#{href}' title='{title}'>#{label}</a></li>";

    $("a[href='#undefined']").closest("li").remove()
    for (var tabCounter = 0; tabCounter < 2; tabCounter++) {
        var label = tabTitle.val() || listaTabs[tabCounter].descrCorta,
            id = "tabs-" + listaTabs[tabCounter].descrCorta.replace(/ /g, ""),
            title = tabTitle.val() || listaTabs[tabCounter].descrLarga,
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/\{title\}/g, title).replace(/#\{label\}/g, label));

        //Obtiene la informacion de posicion
        $.ajax({
            url: "http://localhost:3000/listaEmision",
            contentType: "application/json",
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                for (var n = 0; n < result.arregloUno.length; n++) {
                    if (result.arregloUno[n].tipoPos == null) {
                        listaTotales = result.arregloUno[n];
                    } else {
                        listaGrafica.push(result.arregloUno[n]);
                    }
                }
                listaVolteada = result.arregloDos;
            }
        });

        tabs.find(".ui-tabs-nav").append(li);
        var idEspecial = listaTabs[tabCounter].descrCorta;
        console.log("Id Generado para procesar -> " + idEspecial);
        var genereTab = generaTabDinamico(idEspecial);
        var generTabC = generaTabDinamicoD(listaVolteada, listaTotales);
        var genergraTab = graficasTabDinamico(idEspecial);
        console.log("Tab Generado -> " + genereTab + generTabC + genergraTab);
        tabs.append(genereTab + generTabC + genergraTab);
        ejecutaPai(idEspecial, listaGrafica);
        ejecutaGraficaLineal(idEspecial);
        generaTabla(idEspecial);
        listaTabsVal.push(idEspecial);
    }
    tabs.tabs("refresh");

    for (var j = 0; j < listaTabsVal.length; j++) {
        $("#graficaPortafolio_" + listaTabsVal[j]).hide();
    }

    ($("#opcionesRenta_CONTADO") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity
    });

    /*var element = document.getElementById("opcionesGraficaB");
    element.classList.remove("flex");*/
};

/*const validaColumnas = () => {
    generaTabla();
};*/

const generaTabla = (tabDescripcion) => {

    $("#table_" + tabDescripcion).jqGrid({
        datatype: "local",
        height: 'auto',
        colNames: columnasAll,
        colModel: colModelDinamic,
        sortorder: "asc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        grouping: true,
        groupingView: {
            groupField: ['descripcion'],
            groupSummary: [true],
            groupColumnShow: [false],
            groupDataSorted: true,
            groupOrder: ['asc'],
            groupSummaryPos: ['header']
        }/*,
        gridComplete: function () {
            $(".jqgrow", "#table_contado").contextMenu('contextMenu', {
                bindings: {
                    'personaliza': function (t) {
                        dialogoConfiguracion();
                    },
                    'consultaMov': function (t) {
                        dialogoMovimientos();
                    }
                },
                onContextMenu: function (event, menu) {
                    var rowId = $(event.target).parent("tr").attr("id")
                    var grid = $("#table_contado");
                    grid.setSelection(rowId);
                    return true;
                }
            });
        }*/
    });

    $("#table_totales_" + tabDescripcion).jqGrid({
        datatype: "local",
        height: 'auto',
        colNames: columnasAll,
        colModel: colModelDinamic,
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['contrato'],
            groupDataSorted: true,
            groupOrder: ['desc'],
            groupSummaryPos: ['header'],
            groupText: ['<b>Totales</b>'],
        }
    });

    $("#gbox_table_totales_" + tabDescripcion + " > div.ui-jqgrid-view > div.ui-jqgrid-hdiv").hide();
};

const consultaInformacion = (contrato: string) => {
    http_findAll("datosContrato", contrato, payload => {
        infoContrato(payload);
        if (payload[0].listaContrato.length == 0) {
            ejecutaDialog();
            $("#btn_clean").prop('disabled', true);
            $("#btn_pdf_posicion").prop('disabled', true);
            $("#btn_xls_posicion").prop('disabled', true);
        } else {
            $("#btn_clean").prop('disabled', false);
            $("#btn_pdf_posicion").prop('disabled', false);
            $("#btn_xls_posicion").prop('disabled', false);
        }

        for (var j = 0; j < listaTabsVal.length; j++) {
            respuestaServicio(listaTabsVal[j], "totales_" + listaTabsVal[j], payload[0].listaContrato);
            $("#table_" + listaTabsVal[j]).jqGrid("clearGridData");
            $("#table_" + listaTabsVal[j]).jqGrid("setGridParam", { data: payload[0].listaContrato });
            $("#table_" + listaTabsVal[j]).trigger("reloadGrid");
        }
    });
};

const infoContrato = (payload: any) => {
    $("#digito").val(payload[0].digito);
    $("#dv").val(payload[0].dv);
    $("#estatus").val(payload[0].status);
    $("#perfilContrato").val(payload[0].perfil);
    $("#libro").val(payload[0].libro);
    $("#nombreContrato").val(payload[0].nombre);
    $("#clabe").val(payload[0].clabe);
    $("#totalLiqHoy").text(payload[0].jbLiquidacion.liqHoy);
    $("#totalEfectivoA").text(payload[0].jbLiquidacion.efvoDiaAnt);
    $("#totalDepositos").text(payload[0].jbLiquidacion.deposito);
    $("#total24").text(payload[0].jbLiquidacion.liq24HRS);
    $("#totalEfectivo").text(payload[0].jbLiquidacion.efvoFecha);
    $("#totalRetiros").text(payload[0].jbLiquidacion.retiro);
    $("#totalLiq48").text(payload[0].jbLiquidacion.liq48HRS);
    $("#totalLiqM48").text(payload[0].jbLiquidacion.liqMas48HRS);
};

$('input[name="opciones"]').change(function () {
    console.log("Radio ejemplo " + $(this).is(':checked') + " " + $(this).val());
    if ($(this).val() == 'NO') {
        for (var j = 0; j < listaTabsVal.length; j++) {
            $("#tablas_" + listaTabsVal[j]).hide();
            $("#graficaPortafolio_" + listaTabsVal[j]).show();
        }
    } else {
        for (var j = 0; j < listaTabsVal.length; j++) {
            $("#graficaPortafolio_" + listaTabsVal[j]).hide();
            $("#tablas_" + listaTabsVal[j]).show();
        }
    }
});

$("#btn_consul_posicion").click(() => {
    const formListOrdenes = ($("#criterios-busqueda-posicion") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("Busqueda Principal");
            const contrato: string = String($("#contrato").val());
            consultaInformacion(contrato);
            return false;
        });
});

$("#btn_consul_mov").click(() => {
    const formMovPosicion = ($("#criterios-detalle") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("Busqueda Mov Posicion");
            const contrato = $("#contrato").val();
            if (contrato) {
                mov_posicion_params.contrato = contrato;
            }

            const fechaI = $("#fechaI").val();
            if (fechaI) {
                mov_posicion_params.fecOper = fechaI;
            }

            const fechaF = $("#fechaF").val();
            if (fechaF) {
                mov_posicion_params.fecLiq = fechaF;
            }

            $("#contratoDetalle").val($("#contrato").val())

            http_findAll("consultaCon", mov_posicion_params, payload => {
                if (payload !== null) {
                    $("#table_detalle").jqGrid("clearGridData");
                    $("#table_detalle").jqGrid("setGridParam", { data: payload.movimientosLst });
                    $("#table_detalle").trigger("reloadGrid");
                }
            });
            return false;
        });
});

$("#btn_pdf_posicion").click(() => {

    const formListOrdenesPDF = ($("#criterios-busqueda-posicion") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("PDF Principal");
            return false;
        });
});

$("#btn_pdf_mov").click(() => {
    const formMovPosicionPDF = ($("#criterios-detalle") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("PDF Mov Posicion");
            return false;
        });
});

$("#btn_xml_posicion").click(() => {
    const formListOrdenesXLS = ($("#criterios-busqueda-posicion") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("XLS Principal");
            return false;
        });
});

$("#btn_xml_mov").click(() => {
    const formMovPosicionXLS = ($("#criterios-detalle") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("XLS Mov Posicion");
            return false;
        });
});

$("#button-clean").click(() => {
    console.log("Boton de Limpiar");
    $("#table_detalle").jqGrid("clearGridData");
    $("#table_detalle").jqGrid("setGridParam", { data: listaDetalle });
    $("#table_detalle").trigger("reloadGrid");
});

$("#btn_filter").click(() => {
    console.log($("#emisionLst  option:selected").val());
    console.log($("#operacionLst  option:selected").val());
    console.log($("#portafolioLst  option:selected").val());
    const datosFiltrados: any[] = [];
    var listaEmision = $("#emisionLst  option:selected");
    var listaOperaci = $("#operacionLst  option:selected");
    var listaPortafo = $("#portafolioLst  option:selected");

    for (var i = 0; i < listaDetalle.length; i++) {
        let coincideEmi: boolean = false;
        let coincideOpe: boolean = false;
        let coincidePor: boolean = false;

        var incluyeEmi = incluyeFunction(listaEmision, listaDetalle[i].emiSerie);
        var incluyeOpe = incluyeFunction(listaOperaci, listaDetalle[i].descrOper);
        var incluyePor = incluyeFunction(listaPortafo, listaDetalle[i].descrSTipoPortf);

        if (listaEmision.length == 0 || incluyeEmi) {
            coincideEmi = true;
        }

        if (listaOperaci.length == 0 || incluyeOpe) {
            coincideOpe = true;
        }

        if (listaPortafo.length == 0 || incluyePor) {
            coincidePor = true;
        }

        if (coincideEmi && coincideOpe && coincidePor) {
            datosFiltrados.push(listaDetalle[i]);
        }
    }

    $("#table_detalle").jqGrid("clearGridData");
    $("#table_detalle").jqGrid("setGridParam", { data: datosFiltrados });
    $("#table_detalle").trigger("reloadGrid");
});

function incluyeFunction(lista, dato) {
    var j = -1;
    var i = -1;
    if (lista.length > 0) {
        for (var l = 0; l < lista.length; l++) {
            i = lista[l].value.indexOf(dato);
            j = lista[l].value.indexOf("todos");

            if (i != -1 || j != -1) {
                return true;
            } else {
                return false;
            }
        }
    }
};

const obtenerFiltrosMov = (columnas: string, select: string) => {
    const valores: [] = $("#table_detalle").jqGrid("getCol", columnas);
    var lookup = {};
    var result = [];

    for (var opc, i = 0; opc = valores[i++];) {
        var name = opc;
        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(name);
        }
        result = result.sort();
    }
    generaSelect(result, select);
};

const generaSelect = (opciones: any[], select: string) => {
    for (var i = 0; i < opciones.length; i++) {
        $('#' + select).append('<option value="' + opciones[i] + '">' + opciones[i] + '</option>');
    }
};

function columnas() {
    $("#source option").each(function () {
        var value = $(this).val();
        $("#table_contado").jqGrid('hideCol', value);
        $("#table_totales").jqGrid('hideCol', value);
    });

    $("#destination option").each(function () {
        var value = $(this).val();
        $("#table_contado").jqGrid('showCol', value);
        $("#table_totales").jqGrid('showCol', value);
    });
    $("#table_contado").trigger("reloadGrid");
    $("#table_totales").trigger("reloadGrid");
}

$("#source, #destination").listswap({
    truncate: true,
    height: 250,
    is_scroll: true
});

$("#table_detalle").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Fecha Operación",
        "Fecha Liquidación",
        "Operación",
        "Emisora",
        "Perfil del Producto al momento de la Operación",
        "TV",
        "Cantidad",
        "Precio",
        "Imp.Bruto",
        "Comisión",
        "IVA",
        "Impuesto",
        "Imp.Neto",
        "Tasa",
        "Plazo",
        "Tipo Portafolio",
        "Rompe",
        "Serv. Inversión",
        "Perfil del Cliente al momento de la Operación",
        "Medio Cierre",
        "Número de Red/Teléfono",
        "Clasificación ETF",
        "Oper. Art. 194"
    ],
    colModel: [
        { name: "fecOper", width: 90 },
        { name: "fecLiq", width: 90 },
        { name: "descrOper", width: 120 },
        { name: "emiSerie", width: 120 },
        { name: "descrPerfilContrato", width: 80 },
        { name: "tipovalor", width: 50 },
        { name: "cantidad", width: 90, sortable: false, align: "right" },
        { name: "prec", width: 90, align: "right" },
        { name: "importeBruto", width: 90, align: "right" },
        { name: "importeComis", width: 90, align: "right" },
        { name: "importeIVA", width: 90, align: "right" },
        { name: "importeImpuesto", width: 90, align: "right" },
        { name: "importeFinal", width: 90, align: "right" },
        { name: "tasaRetno", width: 90, align: "right" },
        { name: "pzo", width: 90, align: "right" },
        { name: "descrSTipoPortf", width: 90 },
        { name: "rompe", width: 90, align: "center" },
        { name: "recomend", width: 90, align: "center" },
        { name: "descrPerfilEmisora", width: 90 },
        { name: "descrMedioCierre", width: 90 },
        { name: "red", width: 90, align: "center" },
        { name: "descrTipoETF", width: 90 },
        { name: "operArt194", width: 90, align: "center" }
    ],
    viewrecords: true,
    grouping: true
});

const generaTablaPortafolio = (idGenerado, listaValores) => {
    $("#table_portafolio_" + idGenerado).jqGrid({
        data: listaValores,
        datatype: "local",
        height: 'auto',
        colNames: [
            "",
            "Emisora",
            "Valor",
            "Cambio",
            "%"
        ],
        colModel: [
            { name: "blanco", width: 50 },
            { name: "emis", width: 450 },
            { name: "valCierre", width: 140, align: "right" },
            { name: "cambio", width: 140, align: "right" },
            { name: "porcInver", width: 50, align: "right" }
        ],
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        grouping: true,
    });
};
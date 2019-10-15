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
        }
    });

    //Obtenemos todas las columnas
    $.ajax({
        url: "http://localhost:3000/configInicialPosV2",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            for (var columna = 0; columna < result[0].configArr.length; columna++) {
                columnasAll.push(result[0].configArr[columna].nombre);
            }
        }
    });

    //Obtiene las columnas actuales
    $.ajax({
        url: "http://localhost:3000/lisColumnasActuales",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            for (var _i = 0; _i < result.length; _i++) {
                colModelDinamic.push({ name: result[_i].columna, index: result[_i].columna, align: "right", width: result[_i].ancho });
            }
        }
    });

    //Obtiene las columnas disponibles
    $.ajax({
        url: "http://localhost:3000/lisColumnasDisponibles",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            for (var _i = 0; _i < result.length; _i++) {
                colModelDinamic.push({ name: result[_i].columna, index: result[_i].columna, align: "right", hidden: true, width: result[_i].ancho });
            }
        }
    });

    //Obtenemos los encabezados de tab
    $.ajax({
        url: "http://localhost:3000/sTipoPort",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            agregarTab(result);
            consultaInformacion(String($("#contrato").val()));
        }
    });

    $("#fechaI").datepicker("setDate", new Date());
    $("#fechaF").datepicker("setDate", new Date());
});

const agregarTab = (listaTabs) => {
    var tabs = $("#grupo_posicion").tabs();
    var tabTitle = $("#tab_title"),
        tabTemplate = "<li><a href='#{href}' title='{title}'>#{label}</a></li>";

    $("a[href='#undefined']").closest("li").remove()
    for (var tabCounter = 0; tabCounter < listaTabs.length; tabCounter++) {
        var label = tabTitle.val() || listaTabs[tabCounter].descrCorta,
            id = "tabs-" + listaTabs[tabCounter].descrCorta,
            title = tabTitle.val() || listaTabs[tabCounter].descrLarga,
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/\{title\}/g, title).replace(/#\{label\}/g, label));

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><div class='column w-full overflow-auto' id='tablas_" + listaTabs[tabCounter].stipoPortf + "'><table id='table_" + listaTabs[tabCounter].stipoPortf + "'><tr><td></td></tr></table><div id='pager_contado'></div><table id='table_totales_" + listaTabs[tabCounter].stipoPortf + "'><tr><td></td></tr></table><div id='pager_totales'></div></div><div class='row' id='graficaPortafolio_" + listaTabs[tabCounter].stipoPortf + "'><div class='field-group flex items-center' id='opcionesGraficaA'><table class='bg-gray-200' id='tblOpciones'><tr class='border-solid border border-gray-500' id='tituloRF'><td class='font-bold'>Renta Fija:</td><td class='cursor-pointer text-right' id='totalRF'></td></tr><tr class='border-solid border border-gray-500' id='tituloRN'><td class='font-bold'>Renta Variable:</td><td class='cursor-pointer text-right' id='totalRO'></td></tr><tr class='border-solid border border-gray-500' id='tituloN'><td class='font-bold'>Notas Estructuradas :</td><td class='cursor-pointer text-right' id='totalN'></td></tr><tr class='border-solid border border-gray-500'><td class='font-bold' id='tituloTotalCom'>Total</td><td class='cursor-pointer text-right' id='totalComp'></td></tr><tr class='border-solid border border-gray-500'><td class='font-bold'>Efectivo</td><td class='cursor-pointer text-right' id='totalEfec'></td></tr><tr class='border-solid border border-gray-500'><td class='cursor-pointer text-right' id='total'></td></tr></table><!--OpcionRenta--><div class='field is_vertical field_opcionesRenta' id='field_opcionesRenta'><div class='field-label flex'><label for='opcionesRenta'><span class='pr-3'></span></label></div><div class='field-control'><select class='select2' id='opcionesRenta' name='opcionesRenta' style='width: 15em;' data-parsley-trigger='change' data-parsley-errors-container='#field_error_block_opcionesRenta'><option></option></select><div class='field-error'><div id='field_error_block_opcionesRenta'></div></div></div></div><!--TerminaOpcionRenta--><div style='max-width: 800px;max-height: 800px; padding: 30px;'><canvas id='pieChart'></canvas></div></div><!--IniciaBloqueDos--><div class='field-group flex items-center' id='opcionesGraficaB'><div class='row'><p>Liquidez</p></div><div class='row'><div style='max-width: 600px;max-height: 150px; padding: 30px;'><canvas id='stackChartHijo'></canvas></div></div><div class='row' id='rowDetalle'><table id='table_portafolio'><tr><td></td></tr></table><div id='pager_portafolio'></div></div></div><!--TerminaBloqueDos--></div></div>");
        generaTabla(listaTabs[tabCounter].stipoPortf);
        listaTabsVal.push(listaTabs[tabCounter].stipoPortf);
    }
    tabs.tabs("refresh");

    for (var j = 0; j < listaTabsVal.length; j++) {
        $("#graficaPortafolio_" + listaTabsVal[j]).hide();
    }

    ($("#opcionesRenta") as any).select2({
        placeholder: "--Seleccione--",
        minimumResultsForSearch: Infinity
    });

    var element = document.getElementById("opcionesGraficaB");
    element.classList.remove("flex");
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
};

$('input[name="opciones"]').change(function () {
    console.log("Radio ejemplo " + $(this).is(':checked') + " " + $(this).val());
    if ($(this).val() == 'NO') {
        for (var j = 0; j < listaTabsVal.length; j++) {
            $("#tablas_" + listaTabsVal[j]).hide();
            $("#graficaPortafolio_" + listaTabsVal[j]).show();
            ejecutaPai();
            ejecutaGraficaLineal();
            generaTablaPortafolio();
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

const generaTablaPortafolio = () => {
    $("#table_portafolio").jqGrid({
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
            { name: "blanco", width: 50, align: "right" },
            { name: "emisora", width: 450, align: "right" },
            { name: "valor", width: 140 },
            { name: "cambio", width: 140, align: "right" },
            { name: "porcentaje", width: 50, align: "right" }
        ],
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        grouping: true,
    });
};
/// <reference path="../../typings/index.d.ts" />
let posicion_params: UrlParams = {};

$("#ui-id-2").hide();
$("#ui-id-3").hide();

$("#buscar").change(() => {
    const queryString = $("#buscar").val();

    console.log("Agregar lo de busqueda");
});

$("#btn_pdf").click(() =>
    $("#configColumns").dialog({
        modal: true,
        closeText: "",
        show: true,
        width: "700px",
        title: "Configuracion de Columnas",
        buttons: [
            {
                text: "Aceptar",
                icon: "ui-icon-check",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    })
);

$("#btn_xls").click(() =>
    $("#detalle").dialog({
        modal: true,
        closeText: "",
        show: true,
        width: "700px",
        title: "",
        buttons: [
            {
                text: "Aceptar",
                icon: "ui-icon-check",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    })
);

http_findAll("contratos", posicion_params, payload => {
    llenandoGridContado(payload);
    llenandoGridDifgtia(payload);
    llenandoGridSpc(payload);
});

$("#btn_search").click(() => {
    const formListOrdenes = ($("#criterios-busqueda-posicion") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("form:submit");

            const contrato: string = String($("#contrato").val());

            http_findOne("contratos", contrato, payload => {
                infoContrato(payload);
                if (payload.listaContado.length == 0) {
                    ejecutaDialog();
                }
                respuestaServicio("contado", "totales", payload.listaContado);
                respuestaServicio("difgtia", "totalesDifgtia", payload.listaDifGtia);
                respuestaServicio("spc", "totalesSpc", payload.listaSpc);
                accionTabs(payload);
            });
            return false;
        });
});

const infoContrato = (payload: any) => {
    $("#digito").val(payload.digito);
    $("#dv").val(payload.dv);
    $("#estatus").val(payload.estatus);
    $("#perfilContrato").val(payload.perfil);
    $("#libro").val(payload.libro);
    $("#nombreContrato").val(payload.portafolio_uuid);
    $("#clabe").val(payload.clabe);
};

const llenandoGridContado = (payload: any) => {
    $("#table_contado").jqGrid({
        data: payload.listaContado,
        datatype: "local",
        height: 'auto',
        colNames: [
            "Contrato",
            "Plazo",
            "Emisora",
            "Cantidad",
            "Costo",
            "Precio",
            "Inversion",
            "Valor",
            "Tasa",
            "%Tot",
            "%Inv",
            "Ult. Mov.",
            "Fec. Ve...",
            "Imp. Venc.",
            "Nat.",
            "ISR Dia"
        ],
        colModel: [
            { name: "contrato", index: 'contrato', width: 120, align: "right" },
            { name: "plazo", width: 85, align: "right" },
            { name: "emisora", width: 140 },
            { name: "cantidad", width: 75, align: "right" },
            { name: "costo", width: 75, align: "right" },
            { name: "precio", width: 75, align: "right" },
            { name: "inversion", width: 75, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "valor", width: 70, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "tasa", width: 55, align: "right" },
            { name: "porTot", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "porInv", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "ultMov", width: 80, align: "right" },
            { name: "fechaVen", width: 80, align: "right" },
            { name: "impVenc", width: 80, align: "right" },
            { name: "nat", width: 45 },
            { name: "isrDia", width: 70, align: "right" }
        ],
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['contrato'],
            groupSummary: [true],
            groupDataSorted: true,
            groupOrder: ['desc'],
            groupSummaryPos: ['header'],
            groupText: ['<b>Renta Fija</b>'],
        },
    });

    var jsonTotales = '[{"contrato": "","emisora": "Posicion Total","inversion": "0","valor": "0","porInv": "0"},{"contrato": "","emisora": "Efectivo","inversion": "","valor": "0","porInv": ""},{"contrato": "","emisora": "RF","inversion": "0","valor": "0","porInv": ""}]';
    var obj = JSON.parse(jsonTotales);

    $("#table_totales").jqGrid({
        data: obj,
        datatype: "local",
        height: 'auto',
        colNames: [
            "Contrato",
            "Plazo",
            "Emisora",
            "Cantidad",
            "Costo",
            "Precio",
            "Inversion",
            "Valor",
            "Tasa",
            "%Tot",
            "%Inv",
            "Ult. Mov.",
            "Fec. Ve...",
            "Imp. Venc.",
            "Nat.",
            "ISR Dia"
        ],
        colModel: [
            { name: "contrato", index: 'contrato', width: 120, align: "right" },
            { name: "plazo", width: 85, align: "right" },
            { name: "emisora", width: 140 },
            { name: "cantidad", width: 75, align: "right" },
            { name: "costo", width: 75, align: "right" },
            { name: "precio", width: 75, align: "right" },
            { name: "inversion", width: 75, align: "right" },
            { name: "valor", width: 70, align: "right" },
            { name: "tasa", width: 55, align: "right" },
            { name: "porTot", width: 55, align: "right" },
            { name: "porInv", width: 55, align: "right" },
            { name: "ultMov", width: 80, align: "right" },
            { name: "fechaVen", width: 80, align: "right" },
            { name: "impVenc", width: 80, align: "right" },
            { name: "nat", width: 45 },
            { name: "isrDia", width: 70, align: "right" }
        ],
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
};

const llenandoGridDifgtia = (payload: any) => {
    $("#table_difgtia").jqGrid({
        data: payload.listaDifGtia,
        datatype: "local",
        height: 'auto',
        colNames: [
            "Contrato",
            "Plazo",
            "Emisora",
            "Cantidad",
            "Costo",
            "Precio",
            "Inversion",
            "Valor",
            "Tasa",
            "%Tot",
            "%Inv",
            "Ult. Mov.",
            "Fec. Ve...",
            "Imp. Venc.",
            "Nat.",
            "ISR Dia"
        ],
        colModel: [
            { name: "contrato", index: 'contrato', width: 120, align: "right" },
            { name: "plazo", width: 85, align: "right" },
            { name: "emisora", width: 140 },
            { name: "cantidad", width: 75, align: "right" },
            { name: "costo", width: 75, align: "right" },
            { name: "precio", width: 75, align: "right" },
            { name: "inversion", width: 75, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "valor", width: 70, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "tasa", width: 55, align: "right" },
            { name: "porTot", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "porInv", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "ultMov", width: 80, align: "right" },
            { name: "fechaVen", width: 80, align: "right" },
            { name: "impVenc", width: 80, align: "right" },
            { name: "nat", width: 45 },
            { name: "isrDia", width: 70, align: "right" }
        ],
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['contrato'],
            groupSummary: [true],
            groupDataSorted: true,
            groupOrder: ['desc'],
            groupSummaryPos: ['header'],
            groupText: ['<b>Renta Fija</b>'],
        }
    });

    var jsonTotales = '[{"contrato": "","emisora": "Posicion Total","inversion": "0","valor": "0","porInv": "0"},{"contrato": "","emisora": "Efectivo","inversion": "","valor": "0","porInv": ""},{"contrato": "","emisora": "RF + RV + NE","inversion": "0","valor": "0","porInv": ""}]';
    var obj = JSON.parse(jsonTotales);

    $("#table_totalesDifgtia").jqGrid({
        data: obj,
        datatype: "local",
        height: 'auto',
        colNames: [
            "Contrato",
            "Plazo",
            "Emisora",
            "Cantidad",
            "Costo",
            "Precio",
            "Inversion",
            "Valor",
            "Tasa",
            "%Tot",
            "%Inv",
            "Ult. Mov.",
            "Fec. Ve...",
            "Imp. Venc.",
            "Nat.",
            "ISR Dia"
        ],
        colModel: [
            { name: "contrato", index: 'contrato', width: 120, align: "right" },
            { name: "plazo", width: 85, align: "right" },
            { name: "emisora", width: 140 },
            { name: "cantidad", width: 75, align: "right" },
            { name: "costo", width: 75, align: "right" },
            { name: "precio", width: 75, align: "right" },
            { name: "inversion", width: 75, align: "right" },
            { name: "valor", width: 70, align: "right" },
            { name: "tasa", width: 55, align: "right" },
            { name: "porTot", width: 55, align: "right" },
            { name: "porInv", width: 55, align: "right" },
            { name: "ultMov", width: 80, align: "right" },
            { name: "fechaVen", width: 80, align: "right" },
            { name: "impVenc", width: 80, align: "right" },
            { name: "nat", width: 45 },
            { name: "isrDia", width: 70, align: "right" }
        ],
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
};

const llenandoGridSpc = (payload: any) => {
    $("#table_spc").jqGrid({
        data: payload.listaSpc,
        datatype: "local",
        height: 'auto',
        colNames: [
            "Contrato",
            "Plazo",
            "Emisora",
            "Cantidad",
            "Costo",
            "Precio",
            "Inversion",
            "Valor",
            "Tasa",
            "%Tot",
            "%Inv",
            "Ult. Mov.",
            "Fec. Ve...",
            "Imp. Venc.",
            "Nat.",
            "ISR Dia"
        ],
        colModel: [
            { name: "contrato", index: 'contrato', width: 120, align: "right" },
            { name: "plazo", width: 85, align: "right" },
            { name: "emisora", width: 140 },
            { name: "cantidad", width: 75, align: "right" },
            { name: "costo", width: 75, align: "right" },
            { name: "precio", width: 75, align: "right" },
            { name: "inversion", width: 75, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "valor", width: 70, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "tasa", width: 55, align: "right" },
            { name: "porTot", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "porInv", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
            { name: "ultMov", width: 80, align: "right" },
            { name: "fechaVen", width: 80, align: "right" },
            { name: "impVenc", width: 80, align: "right" },
            { name: "nat", width: 45 },
            { name: "isrDia", width: 70, align: "right" }
        ],
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['contrato'],
            groupSummary: [true],
            groupDataSorted: true,
            groupOrder: ['desc'],
            groupSummaryPos: ['header'],
            groupText: ['<b>Renta Fija</b>'],
        }
    });

    var jsonTotales = '[{"contrato": "","emisora": "Posicion Total","inversion": "0","valor": "0","porInv": "0"},{"contrato": "","emisora": "Efectivo","inversion": "","valor": "0","porInv": ""},{"contrato": "","emisora": "RF + RV + NE","inversion": "0","valor": "0","porInv": ""}]';
    var obj = JSON.parse(jsonTotales);

    $("#table_totalesSpc").jqGrid({
        data: obj,
        datatype: "local",
        height: 'auto',
        colNames: [
            "Contrato",
            "Plazo",
            "Emisora",
            "Cantidad",
            "Costo",
            "Precio",
            "Inversion",
            "Valor",
            "Tasa",
            "%Tot",
            "%Inv",
            "Ult. Mov.",
            "Fec. Ve...",
            "Imp. Venc.",
            "Nat.",
            "ISR Dia"
        ],
        colModel: [
            { name: "contrato", index: 'contrato', width: 120, align: "right" },
            { name: "plazo", width: 85, align: "right" },
            { name: "emisora", width: 140 },
            { name: "cantidad", width: 75, align: "right" },
            { name: "costo", width: 75, align: "right" },
            { name: "precio", width: 75, align: "right" },
            { name: "inversion", width: 75, align: "right" },
            { name: "valor", width: 70, align: "right" },
            { name: "tasa", width: 55, align: "right" },
            { name: "porTot", width: 55, align: "right" },
            { name: "porInv", width: 55, align: "right" },
            { name: "ultMov", width: 80, align: "right" },
            { name: "fechaVen", width: 80, align: "right" },
            { name: "impVenc", width: 80, align: "right" },
            { name: "nat", width: 45 },
            { name: "isrDia", width: 70, align: "right" }
        ],
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
};

function sumatoria(valores) {
    var total = 0;
    for (let num of valores) {
        total += parseInt(num);
    }
    return total;
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
        "Fecha Operacion",
        "Fecha Liquidacion",
        "Operacion",
        "Emisora",
        "TV",
        "Cantidad",
        "Precio"
    ],
    colModel: [
        { name: "fechOperacion", index: 'contrato', width: 120 },
        { name: "fechLiquidacion", width: 120 },
        { name: "operacion", width: 140 },
        { name: "emisora", width: 75 },
        { name: "tv", width: 75 },
        { name: "cantidad", width: 75 },
        { name: "precio", width: 75 }
    ],
    viewrecords: true,
    grouping: true
});
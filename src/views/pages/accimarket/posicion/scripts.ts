let posicion_params: UrlParams = {};
$("#grupo_posicion").tabs();

$(document).ready(function () {
    http_findAll("posicionService", posicion_params, payload => {
        $("#table_contado").jqGrid({
            data: payload,
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
                { name: "contrato", index: 'contrato', width: 90, align: "right", editable: true },
                { name: "plazo", width: 55, align: "right" },
                { name: "emisora", width: 55 },
                { name: "cantidad", width: 55, align: "right" },
                { name: "costo", width: 55, align: "right" },
                { name: "precio", width: 55, align: "right" },
                { name: "inversion", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
                { name: "valor", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
                { name: "tasa", width: 55, align: "right" },
                { name: "porTot", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
                { name: "porInv", width: 55, align: "right", sorttype: "float", formatter: "number", summaryType: 'sum' },
                { name: "ultMov", width: 55, align: "right" },
                { name: "fechaVen", width: 55, align: "right" },
                { name: "impVenc", width: 55, align: "right" },
                { name: "nat", width: 55 },
                { name: "isrDia", width: 55, align: "right" }
            ],
            viewrecords: true,
            grouping: true,
            groupingView: {
                groupField: ['contrato'],
                groupColumnShow: [true],
                groupSummary: [true],
                groupText: ['<b>Renta Fija</b>'],
                groupCollapse: false,
                groupOrder: ['desc']
            }
        });
    });
});

$("#table_difgtia").jqGrid({
    datatype: "local",
    height: 250,
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
        { name: "contrato", width: 55 },
        { name: "plazo", width: 55 },
        { name: "emisora", width: 55 },
        { name: "cantidad", width: 55 },
        { name: "costo", width: 55 },
        { name: "precio", width: 55 },
        { name: "inversion", width: 55 },
        { name: "valor", width: 55 },
        { name: "tasa", width: 55 },
        { name: "tot", width: 55 },
        { name: "inv", width: 55 },
        { name: "ultMov", width: 55 },
        { name: "fecVe", width: 55 },
        { name: "impVenc", width: 55 },
        { name: "nat", width: 55 },
        { name: "isrDia", width: 55 }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "tipo",
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});

$("#table_spc").jqGrid({
    datatype: "local",
    height: 250,
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
        { name: "contrato", width: 55 },
        { name: "plazo", width: 55 },
        { name: "emisora", width: 55 },
        { name: "cantidad", width: 55 },
        { name: "costo", width: 55 },
        { name: "precio", width: 55 },
        { name: "inversion", width: 55 },
        { name: "valor", width: 55 },
        { name: "tasa", width: 55 },
        { name: "tot", width: 55 },
        { name: "inv", width: 55 },
        { name: "ultMov", width: 55 },
        { name: "fecVe", width: 55 },
        { name: "impVenc", width: 55 },
        { name: "nat", width: 55 },
        { name: "isrDia", width: 55 }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: "tipo",
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});
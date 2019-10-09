/// <reference path="../../typings/index.d.ts" />

console.log("Rendimientos");

$("#btn_search").click(() => {
    const formListOrdenes = ($("#criterios-busqueda-rendimientos") as any)
        .parsley()
        .on("field:validated", () => {
            const ok = $(".parsley-error").length === 0;
        })
        .on("form:submit", () => {
            console.log("form:submit");

            const contrato: string = String($("#contrato").val());

            http_findOne("contratos", contrato, payload => {
                infoContratoRendimiento(payload);

                fillJqGrid("#table_resultadosMensuales", payload.listaMensuales);
                graficaMensuales("graficaMensual", payload.listaMensuales);

                fillJqGrid("#table_resultadosAcomulados", payload.listaAcumulados);
                graficaMensuales("graficaAcumulados", payload.listaAcumulados);
            });
            return false;
        });
});

($("#renta") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#moduloCalculo") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

$("#table_resultadosMensuales").jqGrid({
    datatype: "local",
    height: '150',
    colNames: [
        "Periodo",
        "Portafolio %",
        "Inflacion %",
        "IPC %",
        "Cetes 28 %",
        "Deval %",
        "Soc Inv RF-PM %",
        "Cetes 91 %",
        "Soc Inv RV %",
        "INMEX %"
    ],
    colModel: [
        { name: "periodo", width: 300, align: "center" },
        { name: "portafolio", width: 300, align: "center" },
        { name: "S01", width: 300, hidden: true, align: "center" },
        { name: "S02", width: 300, hidden: true, align: "center" },
        { name: "S03", width: 300, hidden: true, align: "center" },
        { name: "S04", width: 300, hidden: true, align: "center" },
        { name: "S05", width: 300, hidden: true, align: "center" },
        { name: "S06", width: 300, hidden: true, align: "center" },
        { name: "S07", width: 300, hidden: true, align: "center" },
        { name: "S08", width: 300, hidden: true, align: "center" }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});

$("#table_resultadosAcomulados").jqGrid({
    datatype: "local",
    height: '150',
    colNames: [
        "Periodo",
        "Portafolio %",
        "Inflacion %",
        "IPC %",
        "Cetes 28 %",
        "Deval %",
        "Soc Inv RF-PM %",
        "Cetes 91 %",
        "Soc Inv RV %",
        "INMEX %"
    ],
    colModel: [
        { name: "periodo", width: 300 },
        { name: "portafolio", width: 300 },
        { name: "S01", width: 300, hidden: true, align: "center" },
        { name: "S02", width: 300, hidden: true, align: "center" },
        { name: "S03", width: 300, hidden: true, align: "center" },
        { name: "S04", width: 300, hidden: true, align: "center" },
        { name: "S05", width: 300, hidden: true, align: "center" },
        { name: "S06", width: 300, hidden: true, align: "center" },
        { name: "S07", width: 300, hidden: true, align: "center" },
        { name: "S08", width: 300, hidden: true, align: "center" }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortorder: "desc",
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ""
});

const infoContratoRendimiento = (payload: any) => {
    $("#digito").val(payload.digito);
    $("#dv").val(payload.dv);
    $("#estatus").val(payload.estatus);
    $("#perfilContrato").val(payload.perfil);
    $("#libro").val(payload.libro);
    $("#nombreContrato").val(payload.portafolio_uuid);
    $("#clabe").val(payload.clabe);
};

const graficaMensuales = (tipoGrafica: string, lista: any) => {
    var dataSetY = [];
    var dataSetX = [];

    for (var i = 0; i < lista.length; i++) {
        var data = lista[i];
        dataSetX.push(data.periodo);
        dataSetY.push(data.total);
    }

    simpleBarChart({
        id: tipoGrafica,
        titleX: "Período",
        titleY: "Portafolio",
        labels: dataSetX,
        tickMaxY: 1.0,
        tickMinY: 0,
        tickStepY: 0.2,
        dataSet: [
            {
                type: "bar",
                label: "Real",
                backgroundColor: "#2b6cb0",
                data: dataSetY
            }
        ],
        width: "10em",
        height: "20em"
    });
};

$('input[name="chk_opcionesRendi"]').change(function () {
    console.log("Checkbox ejemplo " + $(this).is(':checked') + " " + $(this).val());
    if ($(this).is(':checked')) {
        $("#table_resultadosMensuales").jqGrid('showCol', $(this).val());
        $("#table_resultadosAcomulados").jqGrid('showCol', $(this).val());
    } else {
        $("#table_resultadosMensuales").jqGrid('hideCol', $(this).val());
        $("#table_resultadosAcomulados").jqGrid('hideCol', $(this).val());
    }
});
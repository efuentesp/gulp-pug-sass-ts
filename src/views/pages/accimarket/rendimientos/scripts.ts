$('#criterios_busqueda_rendimientos').accordion(ui_accordion_settings);
$('#fechaInicial').datepicker(ui_datepicker_settings);
$('#fechaFinal').datepicker(ui_datepicker_settings);

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
    height: 'auto',
    colNames: [
        "Periodo",
        "Portafolio %",
        "Ejemplo U",
        "Ejemplo D",
        "Ejemplo T",
    ],
    colModel: [
        { name: "periodo", width: 300 },
        { name: "portafolio", width: 300 },
        { name: "ejemplo", width: 300 },
        { name: "ejemplo", width: 300 },
        { name: "ejemplo", width: 300 }
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
    height: 'auto',
    colNames: [
        "Periodo",
        "Portafolio %"
    ],
    colModel: [
        { name: "periodo", width: 300 },
        { name: "portafolio", width: 300 }
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

$('input[name="chk_opcionesRendi"]:checked').click(function () {
    console.log($(this).val);
});
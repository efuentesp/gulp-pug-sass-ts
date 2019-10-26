/// <reference path="../../typings/index.d.ts" />

console.log("Rendimientos");


    $("#moduloCalculo").change(function(){
    var valor= $("#moduloCalculo").val();
    if (valor=="T"){
        $("#renta").prop("disabled", true);
    }else{
        $("#renta").prop("disabled", false);
    }
    });

    $(document).ready(function(){

        var fecha = new Date();
        var  dia = fecha.getDate()-1;
        var mes = fecha.getMonth()+1;
        var anio = fecha.getFullYear();
           
            var fechafi = new Date();
            var  diafi = fechafi.getDate()-1;
            var mesfi = fechafi.getMonth()+1;
            var aniofi = fechafi.getFullYear()-1;

            $( "#fechaF" ).val(+dia+"-"+mes+"-"+anio).on("change",function(){
                $( "fechaF" ).datepicker({ minDate: '25-10-2019' });
            });
                $( "#fechaI" ).val(+diafi+"-"+mesfi+"-"+aniofi).on("change",function(){
                    $("#fechaI").datepicker({ minDate: 0 });
                });
        });
        
        $( function() {
            $( "#resultadosMensuales" ).sortable();
            $( "#resultadosMensuales" ).disableSelection();
          } );
$('input[name="chk_opcionesRendi"]').change(function () {
    console.log("Checkbox ejemplo " + $(this).is(':checked') + " " + $(this).val());
    if ($(this).is(':checked')) {
        $("#table_resultadosMensuales").jqGrid('showCol', $(this).val());
        $("#table_resultadosAcumulados").jqGrid('showCol', $(this).val());
        $("#table_resultadosMensualesTWP").jqGrid('showCol', $(this).val());
        $("#table_resultadosAcumuladosTWP").jqGrid('showCol', $(this).val());
    } else {
        $("#table_resultadosMensuales").jqGrid('hideCol', $(this).val());
        $("#table_resultadosAcumulados").jqGrid('hideCol', $(this).val());
        $("#table_resultadosMensualesTWP").jqGrid('hideCol', $(this).val());
        $("#table_resultadosAcumuladosTWP").jqGrid('hideCol', $(this).val());
    }
});

    $('#btn_search').click(function() {

    if ($('#moduloCalculo').val() == 'T') {
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

                $('#gbox_table_resultadosMensuales').hide(); 
                $('#graficaMensual').hide(); 
                $('#gbox_table_resultadosAcumulados').hide(); 
                $('#graficaAcumulados').hide();
                $('#gbox_table_resultadosMensualesTWP').show(); 
                $('#graficaMensualTWP').show(); 
                $('#gbox_table_resultadosAcumuladosTWP').show(); 
                $('#graficaAcumuladosTWP').show();

                $("#gbox_table_resultadosMensualesTWP").css({top: 1, left: 1, position:'absolute'});
                $("#gbox_table_resultadosAcumuladosTWP").css({top: 1, left: 1, position:'absolute'});
                $("#graficaMensualTWP").parent().css({position: 'relative'});
                $("#graficaAcumuladosTWP").parent().css({position: 'relative'});

                fillJqGrid("#table_resultadosMensualesTWP", payload.listaMensualesTWP);
                graficaMensuales("graficaMensualTWP", payload.listaMensualesTWP);
            
                fillJqGrid("#table_resultadosAcumuladosTWP", payload.listaAcumuladosTWP);
                graficaMensuales("graficaAcumuladosTWP", payload.listaAcumuladosTWP);
            });
            return false;
        });

    } else {
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

                $('#gbox_table_resultadosMensualesTWP').hide(); 
                $('#graficaMensualTWP').hide(); 
                $('#gbox_table_resultadosAcumuladosTWP').hide(); 
                $('#graficaAcumuladosTWP').hide();
                $('#gbox_table_resultadosMensuales').show(); 
                $('#graficaMensual').show(); 
                $('#gbox_table_resultadosAcumulados').show(); 
                $('#graficaAcumulados').show();

                

                fillJqGrid("#table_resultadosMensuales", payload.listaMensuales);
                graficaMensuales("graficaMensual", payload.listaMensuales);

                fillJqGrid("#table_resultadosAcumulados", payload.listaAcumulados);
                graficaMensuales("graficaAcumulados", payload.listaAcumulados);

            });
            return false;
        });
    }
});
     
$(document).ready(function(){
    $('#renta> option[value="RT"]').attr('selected', 'selected');
});
$(document).ready(function(){
    $('#moduloCalculo> option[value="TI"]').attr('selected', 'selected');
});
/*
($("#renta") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});
*/
/*
($("#moduloCalculo") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});
*/
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

$("#table_resultadosAcumulados").jqGrid({
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
$("#table_resultadosMensualesTWP").jqGrid({
    datatype: "local",
    height: '150',
    colNames: [
        "periodo",
          "Valor_Mercado",
          "Aportaciones",
          "Retiros",
          "Cambio_de_valores",
          "crecimiento_%_Portafolio Periodo",
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
        { name: "Valor_Mercado", width: 300, align: "center" },
        { name: "Aportaciones", width: 300, align: "center" },
        { name: "Retiros", width: 300, align: "center" },
        { name: "Cambio_de_valores", width: 300, align: "center" },
        { name: "crecimiento_%_Portafolio Periodo", width: 300, align: "center" },
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

$("#table_resultadosAcumuladosTWP").jqGrid({
    datatype: "local",
    height: '150',
    colNames: [
        "periodo",
        "Valor Mercado",
        "crecimiento_%_Portafolio Periodo",
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
        { name: "Valor Mercado", width: 300 },
        { name: "crecimiento_%_Portafolio Periodo", width: 300 },
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

$('#gbox_table_resultadosMensualesTWP').hide(); 
$('#graficaMensualTWP').hide(); 
$('#gbox_table_resultadosAcumuladosTWP').hide(); 
$('#graficaAcumuladosTWP').hide();

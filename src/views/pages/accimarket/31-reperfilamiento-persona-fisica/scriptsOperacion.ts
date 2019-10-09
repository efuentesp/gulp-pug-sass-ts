let totalPatrimonio: number = 0;
let liquidezMonto: number = 0;
let cortoPlazo: number = 0;
let medianoPlazo: number = 0;
let largoPlazo: number = 0;

$("#liquidezMonto").change(function () {
    if (liquidezMonto != 0) {
        totalPatrimonio -= liquidezMonto;
    }
    liquidezMonto = +$("#liquidezMonto").val();
    sumaLiquidez(liquidezMonto);
    obtenerPorcentaje();
});

$("#cortoPlazoMonto").change(function () {
    if (cortoPlazo != 0) {
        totalPatrimonio -= cortoPlazo;
    }
    cortoPlazo = +$("#cortoPlazoMonto").val();
    sumaLiquidez(cortoPlazo);
    obtenerPorcentaje();
});

$("#medianoPlazoMonto").change(function () {
    if (medianoPlazo != 0) {
        totalPatrimonio -= medianoPlazo;
    }
    medianoPlazo = +$("#medianoPlazoMonto").val();
    sumaLiquidez(medianoPlazo);
    obtenerPorcentaje();
});

$("#largoPlazoMonto").change(function () {
    if (largoPlazo != 0) {
        totalPatrimonio -= largoPlazo;
    }
    largoPlazo = +$("#largoPlazoMonto").val();
    sumaLiquidez(largoPlazo);
    obtenerPorcentaje();
});

function sumaLiquidez(plazo: number) {
    totalPatrimonio += plazo;
    $("#patrimonioMonto").val(totalPatrimonio);
}

function obtenerPorcentaje() {
    let porLiquidez: number = +(liquidezMonto / totalPatrimonio).toFixed();
    let porCortoPlazo: number = +(cortoPlazo / totalPatrimonio).toFixed();
    let porMedianoPlazo: number = +(medianoPlazo / totalPatrimonio).toFixed();
    let porLargoPlazo: number = +(largoPlazo / totalPatrimonio).toFixed();
    $("#liquidezPor").val(porLiquidez * 100);
    $("#cortoPlazoPor").val(porCortoPlazo * 100);
    $("#medianoPlazoPor").val(porMedianoPlazo * 100);
    $("#largoPlazoPor").val(porLargoPlazo * 100);
    $("#patrimonioPor").val((porLiquidez + porCortoPlazo + porMedianoPlazo + porLargoPlazo) * 100);
}

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
$.each(numbers, function (index, value) {
    var radioComp = 'encuesta_' + value;
    $("#" + radioComp + "_0").change(function () {
        $("#encuesta_" + value + "_3").removeAttr("required").attr("disabled", '');
        $("#encuesta_" + value + "_4").removeAttr("required").attr("disabled", '');
        $("#encuesta_" + value + "_5").removeAttr("required").attr("disabled", '');
        ($("#criterios-busqueda") as any).parsley().reset();
    });
    $("#" + radioComp + "_1").change(function () {
        $("#encuesta_" + value + "_3").removeAttr("required").attr("disabled", '');
        $("#encuesta_" + value + "_4").removeAttr("required").attr("disabled", '');
        $("#encuesta_" + value + "_5").removeAttr("required").attr("disabled", '');
        ($("#criterios-busqueda") as any).parsley().reset();
    });
    $("#" + radioComp + "_2").change(function () {
        $("#encuesta_" + value + "_3").attr("required", "required").removeAttr("disabled");
        $("#encuesta_" + value + "_4").attr("required", "required").removeAttr("disabled");
        $("#encuesta_" + value + "_5").attr("required", "required").removeAttr("disabled");
        ($("#criterios-busqueda") as any).parsley().reset();
    });
});
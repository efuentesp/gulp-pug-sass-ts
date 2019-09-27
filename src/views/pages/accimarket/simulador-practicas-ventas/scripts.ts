$("#grupo_simulacion_practicas_ventas").tabs();

($("#simulacion") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#operacion") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#servicioInv") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

($("#titulosPosicion") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

$("#table_simulador").jqGrid({
    datatype: "local",
    height: 'auto',
    colNames: [
        "Sts",
        "Contrato",
        "Tipo de Mercado",
        "Operacion",
        "Emisoras",
        "Cantidad",
        "Precio",
        "Importe",
        "Titulos de afectar de Posicion",
        "Mensaje"
    ],
    colModel: [
        { name: "sts", width: 45 },
        { name: "contrato", width: 110 },
        { name: "tipoMercado", width: 110 },
        { name: "operacion", width: 110 },
        { name: "emisoras", width: 110 },
        { name: "cantidad", width: 80 },
        { name: "precio", width: 80 },
        { name: "importe", width: 80 },
        { name: "titulosPosicion", width: 155 },
        { name: "mensaje", width: 280 }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortorder: "desc",
    viewrecords: true,
});

$("#table_resultadosDia").jqGrid({
    datatype: "local",
    height: 'auto',
    colNames: [
        "id",
        "fecHoy",
        "folioValidacion",
        "idrfc",
        "tabla",
        "tipo",
        "idServicio",
        "esFechaValor",
        "esReporto",
        "esOperacionAEvaluar",
        "contrato",
        "emisora",
        "FALTAN RENGLONES",
    ],
    colModel: [
        { name: "id", width: 70 },
        { name: "fecHoy", width: 110 },
        { name: "folioValidacion", width: 110 },
        { name: "idrfc", width: 110 },
        { name: "tabla", width: 110 },
        { name: "tipo", width: 110 },
        { name: "idServicio", width: 110 },
        { name: "esFechaValor", width: 110 },
        { name: "esReporto", width: 110 },
        { name: "esOperacionAEvaluar", width: 110 },
        { name: "contrato", width: 110 },
        { name: "emisora", width: 110 },
        { name: "falta", width: 110 }
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    sortorder: "desc",
    viewrecords: true,
});
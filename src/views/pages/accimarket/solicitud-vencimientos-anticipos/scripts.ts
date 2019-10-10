fieldPlusMinus("contrato");
fieldPlusMinus("digito");

($("#libro") as any).select2({
    minimumResultsForSearch: Infinity
});


$("#table_solicitudesVenc").jqGrid({
    datatype: "local",
    height: 250,
    colNames: [
        "Folio Operacion",
        "Sol",
        "Contrato",
        "Digito",
        "Cliente",
        "Monto Invertido",
        "Monto Yenc Bruto",
        "Monto Venc Monto",
        "Saldo Actual",
        "Plazo",
        "NumEmision",
        "Consecutivo",
        "Emision",
        "Tasa Asig",
        "Tasa Castigada",
        "Fec. Venc. Aut.",
        "Fec. Compra"
    ],
    colModel: [
        { name: "folioOperacion", index: 'folioOperacion', width: 100 },
        { name: "sol", width: 50 },
        { name: "contrato", width: 100 },
        { name: "digito", width: 100 },
        { name: "cliente", width: 200 },
        { name: "montoInv", width: 200 },
        { name: "montoYenc", width: 200 },
        { name: "montoVenc", width: 200 },
        { name: "saldoActual", width: 200 },
        { name: "plazo", width: 50 },
        { name: "numEmision", width: 50 },
        { name: "consecutivo", width: 50 },
        { name: "emision", width: 150 },
        { name: "tasaAsig", width: 80 },
        { name: "tasaCastigada", width: 80 },
        { name: "fechVenc", width: 80 },
        { name: "fechCompra", width: 80 }
    ],
    viewrecords: true,
    grouping: true,
    groupingView: {
        groupField: ['contrato'],
        groupOrder: ['desc']
    }
});
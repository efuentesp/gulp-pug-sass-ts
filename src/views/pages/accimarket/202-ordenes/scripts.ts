($("#operacion") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity
  });

  ($("#emisora") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity
  });

  ($("#serie") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity
  });

  ($("#tipo_valor") as any).select2({
    language: "es",
    placeholder: "",
    minimumResultsForSearch: Infinity
  });

  fieldPlusMinus("contrato", {});
  fieldPlusMinus("digito", {});

  const llenaGridContratosDirectos = (contratos: any) => {
    $("#table_contratos_directos").jqGrid({
      data: contratos,
      datatype: "local",
      toppager: true,
      gridview: true,
      pgtext: "P\u00E1gina {0} de {1}",
      // recordtext: "Mostrando {0} - {1} de {2}",
      // pagerpos: "center",
      viewrecords: true,
      autowidth: true,
      // forceFit: true,
      height: "auto",
      // shrinkToFit: false,
      rowNum: 20,
      // rowList: [10, 20, 30],
    colNames: [
        "Stat Envio",
        // "Contrato",
        // "Dígito",
        // "Perfil del Contrato",
        // "Saldo",
        // "Posición",
        // "Monto a Invertir",
        // "Títulos",
        // "Fecha Valor",
        // "Orden",
        // "Emisora/serie",
        // "Tipo valor",
        // "Precio Banda",
        // "Precio Pactado",
        // "Spread",
        // "Servicio de Inversión",
        // "Medio de cierre",
        // "Red",
        // "Prioridad",
        // "Medio de Liquidación"
    ],
      colModel: [
        { name: "stat_envio", index: "stat_envio", align: "center", width: 100, sortable: true },
        // { name: "Contrato", index: "Contrato", align: "center", width: 100, sortable: true },
        // { name: "Dígito", index: "Dígito", align: "center", width: 200, sortable: true },
        // { name: "Perfil del Contrato", index: "Perfil del Contrato", align: "center", width: 50, sortable: true },
        // { name: "Saldo", index: "Saldo", align: "center", width: 100, sortable: true },
        // { name: "Posición", index: "Posición", align: "center", width: 100, sortable: true },
        // { name: "Monto a Invertir", index: "Monto a Invertir", align: "center", width: 200, sortable: true },
        // { name: "Títulos", index: "Títulos", align: "center", width: 50, sortable: true },
        // { name: "Fecha Valor", index: "Fecha Valor", align: "center", width: 100, sortable: true },
        // { name: "Orden", index: "Orden", align: "center", width: 100, sortable: true },
        // { name: "Emisora/serie", index: "Emisora/serie", align: "center", width: 200, sortable: true },
        // { name: "Tipo valor", index: "Tipo valor", align: "center", width: 50, sortable: true },
        // { name: "Precio Banda", index: "Precio Banda", align: "center", width: 100, sortable: true },
        // { name: "Precio Pactado", index: "Precio Pactado", align: "center", width: 100, sortable: true },
        // { name: "Spread", index: "Spread", align: "center", width: 200, sortable: true },
        // { name: "Servicio de Inversión", index: "Servicio de Inversión", align: "center", width: 50, sortable: true },
        // { name: "Medio de cierre", index: "Medio de cierre", align: "center", width: 100, sortable: true },
        // { name: "Red", index: "Red", align: "center", width: 100, sortable: true },
        // { name: "Prioridad", index: "Prioridad", align: "center", width: 200, sortable: true },
        // { name: "Medio de Liquidación", index: "Medio de Liquidación", align: "center", width: 50, sortable: true }
      ]
    });
  };

  llenaGridContratosDirectos([]);

  const llenaGridEnviosDirectos = (contratos: any) => {
    $("#table_envios_directos").jqGrid({
      data: contratos,
      datatype: "local",
      toppager: true,
      gridview: true,
      pgtext: "P\u00E1gina {0} de {1}",
      // recordtext: "Mostrando {0} - {1} de {2}",
      // pagerpos: "center",
      viewrecords: true,
      autowidth: true,
      // forceFit: true,
      height: "auto",
      // shrinkToFit: false,
      rowNum: 20,
      // rowList: [10, 20, 30],
    colNames: [
        "Envíos",
        // "Folío operación",
        // "Contrato",
        // "Nombre",
        // "Dígito",
        // "Monto",
        // "Títulos",
        // "Precio Pactado",
        // "Spread",
        // "Servicio de Inversión",
        // "Medio de cierre",
        // "Red",
        // "Prioridad",
        // "Medio de Liquidación",
        // "Sts",
        // "Fuera de precio",
        // "Obsevación",
        // "Flujo"
    ],
      colModel: [
        { name: "envios", index: "envios", align: "center", width: 100, sortable: true },
        // { name: "Folío de operación", index: "Folío de operación", align: "center", width: 100, sortable: true },
        // { name: "Contrato", index: "Contrato", align: "center", width: 100, sortable: true },
        // { name: "Nombre", index: "Nombre", align: "center", width: 100, sortable: true },
        // { name: "Dígito", index: "Dígito", align: "center", width: 200, sortable: true },
        // { name: "Monto", index: "Monto", align: "center", width: 50, sortable: true },
        // { name: "Títulos", index: "Títulos", align: "center", width: 50, sortable: true },
        // { name: "Precio Pactado", index: "Precio Pactado", align: "center", width: 100, sortable: true },
        // { name: "Spread", index: "Spread", align: "center", width: 200, sortable: true },
        // { name: "Servicio de Inversión", index: "Servicio de Inversión", align: "center", width: 50, sortable: true },
        // { name: "Medio de cierre", index: "Medio de cierre", align: "center", width: 100, sortable: true },
        // { name: "Red", index: "Red", align: "center", width: 100, sortable: true },
        // { name: "Prioridad", index: "Prioridad", align: "center", width: 200, sortable: true },
        // { name: "Medio de Liquidación", index: "Medio de Liquidación", align: "center", width: 50, sortable: true },
        // { name: "Sts", index: "Sts", align: "center", width: 100, sortable: true },
        // { name: "Fuera de precio", index: "Fuera de precio", align: "center", width: 100, sortable: true },
        // { name: "Observación", index: "Observación", align: "center", width: 200, sortable: true },
        // { name: "Flujo", index: "Flujo", align: "center", width: 100, sortable: true }
      ]
    });
  };

  llenaGridEnviosDirectos([]);

  const llenaGridErroresDirectos = (contratos: any) => {
    $("#table_errores_directos").jqGrid({
      data: contratos,
      datatype: "local",
      toppager: true,
      gridview: true,
      pgtext: "P\u00E1gina {0} de {1}",
      // recordtext: "Mostrando {0} - {1} de {2}",
      // pagerpos: "center",
      viewrecords: true,
      autowidth: true,
      // forceFit: true,
      height: "auto",
      // shrinkToFit: false,
      rowNum: 20,
      // rowList: [10, 20, 30],
    colNames: [
        "Observación",
        "Contrato",
        "Nombre",
        "Dígito",
        "Perfil del contrato",
        "Monto",
        "Títulos",
        "Precio pactado",
        "Spread",
        "Servicio de inversión",
        "Medio de cierre",
        "Red",
        "Prioridad",
        "Medio de liquidación"
    ],
      colModel: [
        { name: "Observación", index: "Observación", align: "center", width: 100, sortable: true },
        { name: "Contrato", index: "Contrato", align: "center", width: 100, sortable: true },
        { name: "Nombre", index: "Nombre", align: "center", width: 200, sortable: true },
        { name: "Dígito", index: "Dígito", align: "center", width: 50, sortable: true },
        { name: "Perfil del contrato", index: "Perfil del contrato", align: "center", width: 100, sortable: true },
        { name: "Monto", index: "Monto", align: "center", width: 100, sortable: true },
        { name: "Títulos", index: "Títulos", align: "center", width: 50, sortable: true },
        { name: "Precio Pactado", index: "Precio Pactado", align: "center", width: 100, sortable: true },
        { name: "Spread", index: "Spread", align: "center", width: 200, sortable: true },
        { name: "Servicio de Inversión", index: "Servicio de Inversión", align: "center", width: 50, sortable: true },
        { name: "Medio de cierre", index: "Medio de cierre", align: "center", width: 100, sortable: true },
        { name: "Red", index: "Red", align: "center", width: 100, sortable: true },
        { name: "Prioridad", index: "Prioridad", align: "center", width: 200, sortable: true },
        { name: "Medio de Liquidación", index: "Medio de Liquidación", align: "center", width: 50, sortable: true }
      ]
    });
  };

llenaGridErroresDirectos([]);

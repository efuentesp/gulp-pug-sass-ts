/// <reference path="../../typings/index.d.ts" />
fieldPlusMinus("contrato", {});
fieldSelectPlusAutocomplete("digito", {});

$("#field_date").hide();

$("#ui-id-1").click(function () {
  $("#field_date").hide();
});

$("#ui-id-2").click(function () {
  $("#field_date").show();
});

$("#btn_search").click(() => {
  mensaje(1, "Ejemplo de mensaje search");
});

$("#btn_pdf").click(() => {
  mensaje(2, "Ejemplo de mensaje pdf");
});

$("#btn_xls").click(() => {
  mensaje(3, "Ejemplo de mensaje xls");
});

const mensaje = (opcion, mensaje) => {
  $("#msgText").val(mensaje);
  if (opcion == 1) {
    $("#msgInfo").show();
    $("#msgWarning").hide();
    $("#msgCritical").hide();
  } else if (opcion == 2) {
    $("#msgInfo").hide();
    $("#msgWarning").show();
    $("#msgCritical").hide();
  } else {
    $("#msgInfo").hide();
    $("#msgWarning").hide();
    $("#msgCritical").show();
  }
  $("#dialogo_aviso").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Aviso de Sistemas",
    width: 400
  })
};

$("#table_intradiaList").jqGrid({
  datatype: "local",
  height: "auto",
  shrinkToFit: false,
  rowList: [10, 20, 30],
  colNames: [
    "Operaci\u00F3n",
    "Contrato",
    "Perfil del Cliente al momento de la Operaci\u00F3n",
    "D\u00EDgito",
    "Emisora",
    "Perfil del Producto al momento de la Operaci\u00F3n",
    "TV",
    "Plazo",
    "Cantidad",
    "Precio",
    "Importe",
    "Usuario",
    "IR",
    "PR",
    "Rompe",
    "Servicio de  Inversi\u00F3n",
    "Recomend",
    "Complejo",
    "ETF",
    "Clasificaci\u00F3n ETF",
    "Medio Cierre",
    "N\u00FAmero de Red/ Tel\u00E9fono",
    "Oper. Art. 194",
    "idsistema"
  ],
  colModel: [
    {
      name: "operacion", index: "operacion", width: 100, align: "center"
    },
    {
      name: "contrato",
      index: "contrato",
      width: 100,
      align: "center",
      sorttype: "number"
    },
    {
      name: "perfilCliente",
      index: "perfilCliente",
      width: 300,
      align: "left"
    },
    {
      name: "digito",
      index: "digito",
      width: 70,
      align: "center"
    },
    {
      name: "emisora",
      index: "emisora",
      width: 100,
      align: "left"
    },
    {
      name: "perfilProducto",
      index: "perfilProducto",
      width: 300,
      align: "left"
    },
    {
      name: "tv",
      index: "tv",
      width: 50,
      align: "center"
    },
    {
      name: "plazo",
      index: "plazo",
      width: 100,
      align: "center"
    },
    {
      name: "cantidad",
      index: "cantidad",
      width: 80,
      align: "right"
    },
    {
      name: "precio",
      index: "precio",
      width: 100,
      align: "right"
    },
    {
      name: "importe",
      index: "importe",
      width: 80,
      align: "right"
    },
    {
      name: "usuario",
      index: "usuario",
      width: 70,
      align: "center"
    },
    {
      name: "ir",
      index: "ir",
      width: 100,
      align: "center"
    },
    {
      name: "pr",
      index: "pr",
      width: 100,
      align: "center"
    },
    {
      name: "rompe",
      index: "rompe",
      width: 100,
      align: "center"
    },
    {
      name: "servicioInv",
      index: "servicioInv",
      width: 300,
      align: "center"
    }, //
    {
      name: "recommend",
      index: "recommend",
      width: 120,
      align: "center"
    }, //
    {
      name: "complejo",
      index: "complejo",
      width: 100,
      align: "center"
    },
    {
      name: "etf",
      index: "etf",
      width: 100,
      align: "center"
    },
    {
      name: "calitificacionEtf",
      index: "calitificacionEtf",
      width: 160,
      align: "center"
    },
    {
      name: "medioCierre",
      index: "medioCierre",
      width: 160,
      align: "center"
    },
    {
      name: "numeroRed",
      index: "numeroRed",
      width: 111,
      align: "center"
    },
    {
      name: "operArt",
      index: "operArt",
      width: 150,
      align: "center"
    },
    {
      name: "idSistema",
      index: "idSistema",
      width: 100,
      hidden: true
    }
  ]
});



$("#table_historicList").jqGrid({
  datatype: "local",
  height: "auto",
  shrinkToFit: false,
  rowList: [10, 20, 30],
  colNames: ["Operaci\u00F3n", "Contrato", "Perfil del Cliente al momento de la Operaci\u00F3n",
    "D\u00EDgito", "Emisora", "Perfil del Producto al momento de la Operaci\u00F3n", "TV",
    "Plazo", "Cantidad", "Precio", "Importe", "Importe Neto", "Usuario", "Fecha", "IR", "PR", "Rompe",
    "Servicio de  Inversi\u00F3n", "Recomend", "Complejo", "ETF", "Clasificaci\u00F3n ETF", "Medio Cierre",
    "N\u00FAmero de Red/ Tel\u00E9fono", "Oper. Art. 194", "idsistema"
  ],
  colModel: [{
    name: "operacion",
    index: "operacion",
    width: 100,
    align: "center"
  },
  {
    name: "contrato",
    index: "contrato",
    width: 100,
    align: "center",
    sorttype: "number"
  }, //2
  {
    name: "perfilCliente",
    index: "perfilCliente",
    width: 300,
    align: "left"
  },
  {
    name: "digito",
    index: "digito",
    width: 70,
    align: "center"
  },
  {
    name: "emisora",
    index: "emisora",
    width: 100,
    align: "left"
  },
  {
    name: "perfilProducto",
    index: "perfilProducto",
    width: 300,
    align: "left"
  },
  {
    name: "tv",
    index: "tv",
    width: 50,
    align: "center"
  },
  {
    name: "plazo",
    index: "plazo",
    width: 100,
    align: "center"
  },
  {
    name: "cantidad",
    index: "cantidad",
    width: 80,
    align: "right",
    sorttype: "number"
  },
  {
    name: "precio",
    index: "precio",
    width: 100,
    align: "right",
    sorttype: "number"
  },
  {
    name: "importe",
    index: "importe",
    width: 80,
    align: "right",
    sorttype: "number"
  },
  {
    name: "importeNeto",
    index: "importeNeto",
    width: 120,
    align: "right"
  },
  {
    name: "usuario",
    index: "usuario",
    width: 70,
    align: "center"
  },
  {
    name: "fecha",
    index: "fecha",
    width: 80,
    align: "center"
  },
  {
    name: "ir",
    index: "ir",
    width: 100,
    align: "center"
  },
  {
    name: "pr",
    index: "pr",
    width: 100,
    align: "center"
  },
  {
    name: "rompe",
    index: "rompe",
    width: 100,
    align: "center"
  },
  {
    name: "servicioInv",
    index: "servicioInv",
    width: 300,
    align: "center"
  }, //
  {
    name: "recommend",
    index: "recommend",
    width: 120,
    align: "center"
  }, //
  {
    name: "complejo",
    index: "complejo",
    width: 100,
    align: "center"
  },
  {
    name: "etf",
    index: "etf",
    width: 100,
    align: "center"
  },
  {
    name: "calitificacionEtf",
    index: "calitificacionEtf",
    width: 160,
    align: "center"
  },
  {
    name: "medioCierre",
    index: "medioCierre",
    width: 160,
    align: "center"
  },
  {
    name: "numeroRed",
    index: "numeroRed",
    width: 111,
    align: "center"
  },
  {
    name: "operArt",
    index: "operArt",
    width: 150,
    align: "center"
  },
  {
    name: "idSistema",
    index: "idSistema",
    width: 100,
    hidden: true
  }]
});
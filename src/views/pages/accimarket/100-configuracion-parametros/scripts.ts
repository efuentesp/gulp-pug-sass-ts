/// <reference path="../../typings/index.d.ts" />
($("#linea-negocio") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#grupo-instrumento") as any).select2({
  minimumResultsForSearch: Infinity
});

$("#grupo-instrumento").val("PAGE");
$("#grupo-instrumento").trigger("change");

// Form validations
let spreads_params: UrlParams = {};

// const r$ = http_findAll$("contratos", contratos_params)
//   .map(v => v["data"])
//   .subscribe(data => llenaGridContratos(data));

http_findAll("spreads", spreads_params, payload => {
  llenaGridSpreads(payload);
});

const llenaGridSpreads = (spreads: any) => {
  let lastsel2;

  $("#table_spreads").jqGrid({
    data: spreads,
    datatype: "local",
    height: "auto",
    rowList: [10, 20, 30],
    colNames: ["Rango (Min-Max)", "Tasa Banda", "Spread", "Tasa Cliente"],
    colModel: [
      {
        name: "rango-min-mx",
        index: "rango-min-mx",
        width: 200
      },
      { name: "tasa-banda", index: "emisora", width: 100, sortable: false },
      {
        name: "spread",
        index: "cantidad",
        width: 100,
        sortable: false,
        editable: true
      },
      { name: "tasa-cliente", index: "emision", width: 100, sortable: false }
    ],
    onSelectRow: id => {
      if (id && id !== lastsel2) {
        $("#table_spreads").jqGrid("restoreRow", lastsel2);
        $("#table_spreads").jqGrid("editRow", id, true);
        lastsel2 = id;
      }
    }
  });
};

$("#btn_guardar_datos_inversion").click(e => {
  console.log("dialogo_guardar_datos_inversion");
  e.preventDefault();
  $("#dialogo_guardar_datos_inversion").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Guardar Datos Inversión",
    buttons: [
      {
        text: "Aceptar",
        icon: "ui-icon-check",
        click: function() {
          $(this).dialog("close");
        }
      },
      {
        text: "Salir",
        icon: "ui-icon-cancel",
        click: function() {
          $(this).dialog("close");
        }
      }
    ]
  });
});

$("#btn_guardar_datos_spreads").click(e => {
  console.log("dialogo_guardar_datos_spreads");
  e.preventDefault();
  $("#dialogo_guardar_datos_spreads").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Guardar Datos Spreads",
    buttons: [
      {
        text: "Aceptar",
        icon: "ui-icon-check",
        click: function() {
          $(this).dialog("close");
        }
      },
      {
        text: "Salir",
        icon: "ui-icon-cancel",
        click: function() {
          $(this).dialog("close");
        }
      }
    ]
  });
});

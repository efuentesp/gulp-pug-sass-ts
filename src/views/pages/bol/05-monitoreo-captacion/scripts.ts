fieldPlusMinus("tv", {});
fieldPlusMinus("emisora", {});

$("#btn_pdf").click(() =>
  $("#").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Generar PDF",
    buttons: [
      {
        text: "Aceptar",
        icon: "ui-icon-check",
        click: function() {
          $(this).dialog("close");
        }
      }
    ]
  })
);
$("#btn_xls").click(() =>
  $("#").dialog({
    modal: true,
    closeText: "",
    show: true,
    title: "Generar XLS"
  })
);

validateDateRage("rango");
// Add if the date has clear button
fieldBeginDateRangeClear("rango");
fieldEndDateRangeClear("rango");

let notaEstructurada_params: UrlParams = {};

httpFindAll(
  "notaEstructurada",
  notaEstructurada_params,
  notasEstructuradas => {
    //llenaGridNotasE(notasEstructuradas);
    llenaGridNotasE(notasEstructuradas);
    const rec_count = notasEstructuradas.length;
    $("#count_notas-estructuradas").html(rec_count);
  }
);

const pintaTabla = (datosTabla: any, idTabla, result) => {
  console.log(datosTabla);

  $("#table_" + idTabla).jqGrid("clearGridData");
  $("#table_" + idTabla).jqGrid("setGridParam", { data: datosTabla });
  $("#table_" + idTabla).trigger("reloadGrid");
  const rec_count = datosTabla.length;
  $("#count_" + idTabla).html(rec_count);
};

const llenaGridNotasE = (notasEstructuradas: any) => {
  console.log(notasEstructuradas);
  $("#table_notas-estructuradas").jqGrid({
    data: notasEstructuradas,
    datatype: "local",
    height: "auto",
    shrinkToFit: false,
    rowList: [10, 20, 30],
    colNames: [
      "TV",
      "Emisora",
      "Serie",
      "Plazo",
      "Fecha Inicio",
      "Hora Cierre",
      "Límite captado",
      "Captado",
      "Por colocar",
      "MNB",
      "MNA",
      "Estatus",
      "Mensaje"
    ],
    colModel: [
      { name: "tv", index: "tv", width: 100, sortable: true },
      { name: "emisora", index: "emisora", width: 100, sortable: false },
      { name: "serie", index: "serie", width: 100, sortable: false },
      { name: "plazo", index: "plazo", width: 100, sortable: false },
      { name: "fecInicio", index: "fecInicio", width: 100, sortable: false },
      { name: "horaCierre", index: "horaCierre", width: 100, sortable: false },
      {
        name: "limiteCaptado",
        index: "limiteCaptado",
        width: 100,
        sortable: false
      },
      { name: "captado", index: "captado", width: 100, sortable: false },
      { name: "porColocar", index: "porColocar", width: 100, sortable: false },
      { name: "mnb", index: "mnb", width: 100, sortable: false },
      { name: "mna", index: "mna", width: 100, sortable: false },
      { name: "estatus", index: "estatus", width: 100, sortable: false },
      { name: "mensaje", index: "mensaje", width: 100, sortable: false }
    ],
    loadComplete: function() {
      console.log("Menu");
      ($("tr.jqgrow", this) as any).contextMenu("contextMenu", {
        bindings: {
          "cierre-definitivo": function(event) {
            console.log("Cierre definitivo");
          },
          "detalle-captacion": function(event) {
            console.log("Detalle de captacion");
          },
          "cancela-notae": function(event) {
            console.log("Cancela nota estructurada");
          },
          "reenvio-cierre": function(event) {
            console.log("Reenvio de cierre");
          },
          "amplia-horario": function(event) {
            var rowKey = $("#table_notas-estructuradas").getGridParam("selrow");
            var notaEstructurada;
            if (rowKey != null) {
              notaEstructurada = $("#table_notas-estructuradas").jqGrid(
                "getRowData",
                rowKey
              );
              console.log("Seleccionado " + JSON.stringify(notaEstructurada));
              mostrarDialogoHorario(notaEstructurada);
            } else {
              console.log("Selecciona una nota");
            }
          }
        },
        onContexMenu: function(event, menu) {}
      });
    }
  });
};

const formMonitoreoCaptacion = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
  })
  .on("form:submit", e => {
    console.log("form:submit", e);

    notaEstructurada_params = {};

    const fechaInicio = $("#rango_begin_date").val();
    const fechaFin = $("#rango_end_date").val();

    var listTV = getList("tv");
    var listEmisora = getList("emisora");

    if (fechaInicio) {
      notaEstructurada_params.fechaInicio = fechaInicio;
    }

    if (fechaFin) {
      notaEstructurada_params.fechaFin = fechaFin;
    }

    if (listTV.length > 0) {
      notaEstructurada_params.listTV = listTV;
    }

    if (listEmisora.length > 0) {
      notaEstructurada_params.emisora = listEmisora;
    }

    httpFindAll(
      "notaEstructurada",
      notaEstructurada_params,
      notasEstructuradas => {
        // console.log(payload);
        pintaTabla(notasEstructuradas, "notas-estructuradas", "");
        // console.log(rec_count);
      }
    );

    return false;
  });

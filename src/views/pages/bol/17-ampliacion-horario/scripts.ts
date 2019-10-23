let params: UrlParams = {};

($("#horario-sacid") as any).select2({
  minimumResultsForSearch: Infinity
});

$("#horario-sacid").val("HS16");
$("#horario-sacid").trigger("change");

($("#horario-ampliacion") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

const mostrarDialogoHorario = (notaEstructurada: any) => {
  params = {};
  $("#dialogo_ampliacion_horario").dialog({
    modal: true,
    closeText: "",
    show: true,
    width: "auto",
    title: "Ampliar Horario de Cierre",
    buttons: [
      {
        text: "Aceptar",
        click: function() {
          params.emisora = notaEstructurada.emisora;
          params.fecInicio = notaEstructurada.fecInicio;
          params.horario = $("#horario-ampliacion option:selected").text();
          //idsistema, idlibro
          console.log("Params " + JSON.stringify(params));
          http_create("horarioAmpliado", params, response => {
            console.log(response);
          });
          $("#horario-ampliacion").prop("selectedIndex", 0);
          //$(this).dialog("close");
        }
      },
      {
        text: "Cancelar",
        click: function() {
          $(this).dialog("close");
        }
      }
    ]
  });
};

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

const opcionesHorarioSACID = {
  now: "16:00", //hh:mm 24 hour format only, defaults to current time
  // twentyFour: true, //Display 24 hour format, defaults to false
  upArrow: "wickedpicker__controls__control-up", //The up arrow class selector to use, for custom CSS
  downArrow: "wickedpicker__controls__control-down", //The down arrow class selector to use, for custom CSS
  close: "wickedpicker__close", //The close class selector to use, for custom CSS
  hoverState: "hover-state", //The hover state class to use, for custom CSS
  title: "Horario SACID", //The Wickedpicker's title,
  showSeconds: false, //Whether or not to show seconds,
  secondsInterval: 1, //Change interval for seconds, defaults to 1 ,
  minutesInterval: 1, //Change interval for minutes, defaults to 1
  beforeShow: null, //A function to be called before the Wickedpicker is shown
  show: null, //A function to be called when the Wickedpicker is shown
  clearable: false //Make the picker's input clearable (has clickable "x")
};

($("#horario-sacid-time") as any).wickedpicker(opcionesHorarioSACID);



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
        tabIndex: -1,
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
          ($("#horario-sacid-time") as any).wickedpicker(opcionesHorarioSACID);
        }
      },
      {
        text: "Cancelar",
        tabIndex: -1,
        click: function() {
          $(this).dialog("close");
          ($("#horario-sacid-time") as any).wickedpicker(opcionesHorarioSACID);
        }
      }
    ]
  });
};

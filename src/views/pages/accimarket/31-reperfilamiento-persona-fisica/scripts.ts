let pf_params: UrlParams = {};
let pf_encuestaU: UrlParams = {};
let pf_encuestaLstU: any[] = [];
let pf_encuestaD: UrlParams = {};
let pf_encuestaLstD: any[] = [];

$("#grupoInstrumentos").hide();

$("#chk_origen_uno_9").click(() => {
  if ($("#chk_origen_uno_9").is(":checked")) {
    $("#field_otros").show();
  } else {
    $("#field_otros").hide();
  }
});

$(document).ready(() => {
  mostrarOcultar(true);
  var element = document.getElementById("datosInfo_group");
  element.classList.remove("flex");
  $("#field_otros").hide();
});

$("#contrato").change(() => {
  const contrato: string = String($("#contrato").val());
  $("#fechaNacimiento").text("");
  $("#personaPerfilar option").remove();
  var options = new Option("--Seleccione--", "id", true, true);
  $("#personaPerfilar")
    .append(options)
    .trigger("change");

  httpFindOne("busquedaContrato", contrato, payload => {
    if (payload !== null) {
      $("#nombre").val(payload.nombre);
      $("#perfil").val(payload.perfilActual);
      if (payload.noPermiso) {
        $("#dialogoError").dialog({
          modal: true,
          closeText: "",
          show: true,
          title: "Error",
          /*buttons: [
						{
							text: "Aceptar",
							icon: "ui-icon-check",
							click: function () {
								$(this).dialog("close");
							}
						}
					],*/
          width: "450px"
        });
      }
      /*if (payload.idPerfilActual != 'IR4') {
				mostrarOcultar(true);
				($('#personaPerfilar') as any).select2({
					placeholder: '--Seleccione--',
					minimumResultsForSearch: Infinity,
					data: payload.personasPerfilar
				}).on("select2:selecting", function (evt) {
					$("#fechaNacimiento").text("Fecha de Nacimiento " + evt.params.args.data.fechaNacimiento);
					var edadActual = calcularEdad(evt.params.args.data.fechaNacimiento);
					console.log("Edad -> " + edadActual);
					if (edadActual >= 18) {
						rangoFecha(edadActual);
					} else {
						$('#edad').val("0").prop('disabled', false).trigger('change');
					}
				});
			} else {
				mostrarOcultar(false);
			}*/
    } else {
      $('#nombre').val('');
      $('#perfil').val('');
    }
  });
});

($("#personaPerfilar") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("input[name='limitantes']").change(() => {
  var opcion = $("input[name='limitantes']:checked").val();
  console.log(opcion);
  if (opcion == "true") {
    $("#grupoInstrumentos").show();
  } else {
    $("#grupoInstrumentos").hide();
  }
});

$("#btn_send").click(() => {
  const formularioPF = ($("#criterios-busqueda") as any)
    .parsley()
    .on("field:validated", () => {
      const ok = $(".parsley-error").length === 0;
    })
    .on("form:submit", () => {
      console.log("form:submit");

      pf_params = {};

      //Grupo 1
      const contrato = $("#contrato").val();
      if (contrato) {
        pf_params.contrato = contrato;
      }

      const nombre = $("#nombre").val();
      if (nombre) {
        pf_params.nombre = nombre;
      }

      const perfil = $("#perfil").val();
      if (perfil) {
        pf_params.perfil = perfil;
      }

      const personaPerfilar = $("#personaPerfilar").val();
      if (personaPerfilar) {
        pf_params.personaPerfilar = personaPerfilar;
      }

      //Grupo Liquidaciones
      const liquidezPor = $("#liquidezPor").val();
      if (liquidezPor) {
        pf_params.liquidezPor = liquidezPor;
      }

      const liquidezMonto = $("#liquidezMonto").val();
      if (liquidezMonto) {
        pf_params.liquidezMonto = liquidezMonto;
      }

      const cortoPlazoPor = $("#cortoPlazoPor").val();
      if (cortoPlazoPor) {
        pf_params.cortoPlazoPor = cortoPlazoPor;
      }

      const cortoPlazoMonto = $("#cortoPlazoMonto").val();
      if (cortoPlazoMonto) {
        pf_params.cortoPlazoMonto = cortoPlazoMonto;
      }

      const medianoPlazoPor = $("#medianoPlazoPor").val();
      if (medianoPlazoPor) {
        pf_params.medianoPlazoPor = medianoPlazoPor;
      }

      const medianoPlazoMonto = $("#medianoPlazoMonto").val();
      if (medianoPlazoMonto) {
        pf_params.medianoPlazoMonto = medianoPlazoMonto;
      }

      const largoPlazoPor = $("#largoPlazoPor").val();
      if (largoPlazoPor) {
        pf_params.largoPlazoPor = largoPlazoPor;
      }

      const largoPlazoMonto = $("#largoPlazoMonto").val();
      if (largoPlazoMonto) {
        pf_params.largoPlazoMonto = largoPlazoMonto;
      }

      const patrimonioPor = $("#patrimonioPor").val();
      if (patrimonioPor) {
        pf_params.patrimonioPor = patrimonioPor;
      }

      const patrimonioMonto = $("#patrimonioMonto").val();
      if (patrimonioMonto) {
        pf_params.patrimonioMonto = patrimonioMonto;
      }

      //Grupo 2
      const edad = $("#edad").val();
      if (edad) {
        pf_params.edad = edad;
      }

      const estudios = $("#estudios").val();
      if (estudios) {
        pf_params.estudios = estudios;
      }

      const ocupacion = $("#estudios").val();
      if (ocupacion) {
        pf_params.ocupacion = ocupacion;
      }

      const anterior = $("#anterior").val();
      if (anterior) {
        pf_params.anterior = anterior;
      }

      const actual = $("#actual").val();
      if (actual) {
        pf_params.actual = actual;
      }

      const inversiones = $("input[name='inversiones']:checked").val();
      if (inversiones) {
        pf_params.inversiones = inversiones;
      }

      const estrategia = $("#estrategia").val();
      if (estrategia) {
        pf_params.estrategia = estrategia;
      }

      const asesoria = $("#asesoria").val();
      if (asesoria) {
        pf_params.asesoria = asesoria;
      }

      //Grupo 3 es la encuesta
      var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      $.each(numbers, function (index, value) {
        pf_encuestaU = {};
        pf_encuestaU.idEncuesta = value;

        var radioComp = "encuesta_" + value;
        var score = $("input[name='" + radioComp + "']");
        z: for (var i = 0; i < score.length; i++) {
          var componente = $("input[id='" + score[i].id + "']:checked").val();
          if (i == 0 && componente == "on") {
            pf_encuestaU.noConoceNiHaInvertido = false;
            pf_encuestaU.punto = $("#" + score[i].id).attr("data-points");
          } else if (i == 1 && componente == "on") {
            pf_encuestaU.soloConoce = false;
            pf_encuestaU.punto = $("#" + score[i].id).attr("data-points");
          }
          if (i == 2 && componente == "on") {
            pf_encuestaU.conoceHaInvertido = true;
            pf_encuestaU.punto = $("#" + score[i].id).attr("data-points");
            pf_encuestaU.frecuencia = $("#" + radioComp + "_3").val();
            pf_encuestaU.plazo = $("#" + radioComp + "_4").val();
            pf_encuestaU.volumen = $("#" + radioComp + "_5").val();
          }
        }
        pf_encuestaLstU.push(pf_encuestaU);
      });
      pf_params.encuestaLst = pf_encuestaLstU;

      //Grupo 4
      const proposito = $("#proposito").val();
      if (proposito) {
        pf_params.proposito = proposito;
      }

      const tolerancia = $("#tolerancia").val();
      if (tolerancia) {
        pf_params.tolerancia = tolerancia;
      }

      const limitantes = $("input[name='limitantes']:checked").val();
      if (limitantes) {
        pf_params.limitantes = limitantes;
      }

      const horizonteInversion = $("#horizonte-Inversion").val();
      if (horizonteInversion) {
        pf_params.horizonteInversion = horizonteInversion;
      }

      //Grupo 5 es la encuesta
      var numberEncuesta = [0, 1, 2];
      $.each(numberEncuesta, function (index, value) {
        pf_encuestaD = {};
        pf_encuestaD.idEncuesta = value;
        var radioCompE = "encuesta2_" + value;
        var valoreE = $("input[name='" + radioCompE + "']");
        z: for (var i = 0; i < valoreE.length; i++) {
          var componente = $("input[id='" + valoreE[i].id + "']:checked").val();
          if (componente == "on") {
            pf_encuestaD.valor = $("#" + valoreE[i].id).attr("data-points");
          }
        }
        pf_encuestaLstD.push(pf_encuestaD);
      });
      pf_params.encuestaLstD = pf_encuestaLstD;

      //Grupo 6
      var origenUno = new Array();
      $("input[name='chk_origen_uno']:checked").each(function () {
        origenUno.push($(this).val());
      });
      if (origenUno) {
        pf_params.origenUno = origenUno;
      }

      //Origen en la opcion de Otros
      if ($("#chk_origen_uno_9").is(":checked")) {
        const origen_otros = $("#otros").val();
        if (origen_otros) {
          pf_params.otros = origen_otros;
        }
      }

      //Falta Perfil Doc

      console.log(JSON.stringify(pf_params));

      httpCreate(
        "perfilamiento_personas_fisicas",
        pf_params,
        (payload: any) => {
          console.log(payload);
        }
      );

      return false;
    });
});

function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edadObtenida = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edadObtenida--;
  }
  console.log("Edad -> " + edadObtenida);
  return edadObtenida;
}

function rangoFecha(ed) {
  var valor = 0;
  if (ed >= 18 && ed <= 35) {
    console.log("Esta entre los 18-35");
    valor = 25;
  } else if (ed >= 36 && ed <= 45) {
    console.log("Esta entre los 36-45");
    valor = 20;
  } else if (ed >= 46 && ed <= 55) {
    console.log("Esta entre los 46-55");
    valor = 15;
  } else if (ed >= 56 && ed <= 65) {
    console.log("Esta entre los 56-65");
    valor = 10;
  } else {
    console.log("Es mayor de los 66");
    valor = 5;
  }
  $("#edad")
    .val(valor)
    .prop("disabled", true)
    .trigger("change");
}

function mostrarOcultar(tipo) {
  if (tipo) {
    $("#mesaggePerfil").show();
    $("#rowPerfilar").show();
    $("#grupoTodo").show();
    $("#grupoAsesor").hide();
    $("#sticky-action-bar").show();
  } else {
    $("#mesaggePerfil").html(
      "El contrato tiene asociado un Asesor en Inversión, por lo tanto se le debe asignar por default el Perfil de Inversión P7 (NO APLICA)."
    );
    $("#downloadPerfil").html(
      "Clic en el boton PDF para descargar la documentacion. "
    );
    $("#rowPerfilar").hide();
    $("#grupoTodo").hide();
    $("#grupoAsesor").show();
    $("#sticky-action-bar").hide();
  }
}

$("#boton").click(() => {
  var parametros = '[{ "emisora": "Emi", "tipoValor": "1" }]';
  $("#dtgEmisora")
    .jqGrid("addRow", { data: parametros })
    .trigger("reloadGrid");
});

$("#dtgEmisora").jqGrid({
  datatype: "local",
  height: 100,
  width: 305,
  colNames: ["Emisoras", "Tipo Valor"],
  colModel: [{ name: "emisora" }, { name: "tipoValor" }],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  shrinkToFit: false
});

// Quiz group 3
let encuesta_params: UrlParams = {};
// Name of json
httpFindAll("encuesta", encuesta_params, payload => {
  // Parameters: field name group, id of quiz, data
  fillQuiz("grupoTres", "encuesta", payload);
});

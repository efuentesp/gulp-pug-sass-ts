let pfParams: UrlParams = {};
let pfEncuestaU: UrlParams = {};
let pfEncuestaLstU: any[] = [];
let pfEncuestaD: UrlParams = {};
let pf_encuestaLstD: any[] = [];

$("#divGrupoInstrumentos").hide();

$("#chkOrigenUno9").click(() => {
  if ($("#chkOrigenUno9").is(":checked")) {
    $("#divFieldOtros").show();
  } else {
    $("#divFieldOtros").hide();
  }
});

$(document).ready(() => {
  mostrarOcultar(true);
  var element = document.getElementById("divDatosInfoGroup");
  element.classList.remove("flex");
  $("#divFieldOtros").hide();
});

$("#txtContrato").change(() => {
  const contrato: string = String($("#txtContrato").val());
  console.log("---------+> ", contrato);
  $("#divFechaNacimiento").text("");
  $("#cmbPersonaPerfilar option").remove();
  var options = new Option("--Seleccione--", "id", true, true);
  $("#cmbPersonaPerfilar")
    .append(options)
    .trigger("change");

  httpFindOne("busquedaContrato", contrato, payload => {
    if (payload !== null) {
      $("#txtNombre").val(payload.nombre);
      $("#txtPerfil").val(payload.perfilActual);
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
      $('#txtMombre').val('');
      $('#txtPerfil').val('');
    }
  });
});

($("#cmbPersonaPerfilar") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("input[name='rdbLimitantes']").change(() => {
  var opcion = $("input[name='rdbLimitantes']:checked").val();
  console.log(opcion);
  if (opcion == "true") {
    $("#divGrupoInstrumentos").show();
  } else {
    $("#divGupoInstrumentos").hide();
  }
});

$("#btnSend").click(() => {
  const formularioPF = ($("#criteriosBusqueda") as any)
    .parsley()
    .on("field:validated", () => {
      const ok = $(".parsley-error").length === 0;
    })
    .on("form:submit", () => {
      console.log("form:submit");

      pfParams = {};

      //Grupo 1
      const contrato = $("#txtContrato").val();
      if (contrato) {
        pfParams.contrato = contrato;
      }

      const nombre = $("#txtNombre").val();
      if (nombre) {
        pfParams.nombre = nombre;
      }

      const perfil = $("#txtPperfil").val();
      if (perfil) {
        pfParams.perfil = perfil;
      }

      const personaPerfilar = $("#cmbPersonaPerfilar").val();
      if (personaPerfilar) {
        pfParams.personaPerfilar = personaPerfilar;
      }

      //Grupo Liquidaciones
      const liquidezPor = $("#txtLiquidezPor").val();
      if (liquidezPor) {
        pfParams.liquidezPor = liquidezPor;
      }

      const liquidezMonto = $("#txtLiquidezMonto").val();
      if (liquidezMonto) {
        pfParams.liquidezMonto = liquidezMonto;
      }

      const cortoPlazoPor = $("#txtCortoPlazoPor").val();
      if (cortoPlazoPor) {
        pfParams.cortoPlazoPor = cortoPlazoPor;
      }

      const cortoPlazoMonto = $("#txtCortoPlazoMonto").val();
      if (cortoPlazoMonto) {
        pfParams.cortoPlazoMonto = cortoPlazoMonto;
      }

      const medianoPlazoPor = $("#txtMedianoPlazoPor").val();
      if (medianoPlazoPor) {
        pfParams.medianoPlazoPor = medianoPlazoPor;
      }

      const medianoPlazoMonto = $("#txtMedianoPlazoMonto").val();
      if (medianoPlazoMonto) {
        pfParams.medianoPlazoMonto = medianoPlazoMonto;
      }

      const largoPlazoPor = $("#txtLargoPlazoPor").val();
      if (largoPlazoPor) {
        pfParams.largoPlazoPor = largoPlazoPor;
      }

      const largoPlazoMonto = $("#txtLargoPlazoMonto").val();
      if (largoPlazoMonto) {
        pfParams.largoPlazoMonto = largoPlazoMonto;
      }

      const patrimonioPor = $("#txtPatrimonioPor").val();
      if (patrimonioPor) {
        pfParams.patrimonioPor = patrimonioPor;
      }

      const patrimonioMonto = $("#txtPatrimonioMonto").val();
      if (patrimonioMonto) {
        pfParams.patrimonioMonto = patrimonioMonto;
      }

      //Grupo 2
      const edad = $("#cmbEdad").val();
      if (edad) {
        pfParams.edad = edad;
      }

      const estudios = $("#cmbEstudios").val();
      if (estudios) {
        pfParams.estudios = estudios;
      }

      const ocupacion = $("#cmbOcupacion").val();
      if (ocupacion) {
        pfParams.ocupacion = ocupacion;
      }

      const anterior = $("#cmbAnterior").val();
      if (anterior) {
        pfParams.anterior = anterior;
      }

      const actual = $("#cmbActual").val();
      if (actual) {
        pfParams.actual = actual;
      }

      const inversiones = $("input[name='rdbInversiones']:checked").val();
      if (inversiones) {
        pfParams.inversiones = inversiones;
      }

      const estrategia = $("#cmbEstrategia").val();
      if (estrategia) {
        pfParams.estrategia = estrategia;
      }

      const asesoria = $("#cmbAsesoria").val();
      if (asesoria) {
        pfParams.asesoria = asesoria;
      }

      //Grupo 3 es la encuesta
      var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      $.each(numbers, function (index, value) {
        pfEncuestaU = {};
        pfEncuestaU.idEncuesta = value;

        var radioComp = "rdbEncuesta" + value;
        var score = $("input[name='" + radioComp + "']");
        z: for (var i = 0; i < score.length; i++) {
          var componente = $("input[id='" + score[i].id + "']:checked").val();
          if (i == 0 && componente == "on") {
            pfEncuestaU.noConoceNiHaInvertido = false;
            pfEncuestaU.punto = $("#" + score[i].id).attr("data-points");
          } else if (i == 1 && componente == "on") {
            pfEncuestaU.soloConoce = false;
            pfEncuestaU.punto = $("#" + score[i].id).attr("data-points");
          }
          if (i == 2 && componente == "on") {
            pfEncuestaU.conoceHaInvertido = true;
            pfEncuestaU.punto = $("#" + score[i].id).attr("data-points");
            pfEncuestaU.frecuencia = $("#" + radioComp + "3").val();
            pfEncuestaU.plazo = $("#" + radioComp + "4").val();
            pfEncuestaU.volumen = $("#" + radioComp + "5").val();
          }
        }
        pfEncuestaLstU.push(pfEncuestaU);
      });
      pfParams.encuestaLst = pfEncuestaLstU;

      //Grupo 4
      const proposito = $("#cmbProposito").val();
      if (proposito) {
        pfParams.proposito = proposito;
      }

      const tolerancia = $("#cmbTolerancia").val();
      if (tolerancia) {
        pfParams.tolerancia = tolerancia;
      }

      const limitantes = $("input[name='rdbLimitantes']:checked").val();
      if (limitantes) {
        pfParams.limitantes = limitantes;
      }

      const horizonteInversion = $("#cmbHorizonteInversion").val();
      if (horizonteInversion) {
        pfParams.horizonteInversion = horizonteInversion;
      }

      //Grupo 5 es la encuesta
      var numberEncuesta = [0, 1, 2];
      $.each(numberEncuesta, function (index, value) {
        pfEncuestaD = {};
        pfEncuestaD.idEncuesta = value;
        var radioCompE = "rbdencuestaPerfilamientoPersonaFisica" + value;
        var valoreE = $("input[name='" + radioCompE + "']");
        z: for (var i = 0; i < valoreE.length; i++) {
          var componente = $("input[id='" + valoreE[i].id + "']:checked").val();
          if (componente == "on") {
            pfEncuestaD.valor = $("#" + valoreE[i].id).attr("data-points");
          }
        }
        pf_encuestaLstD.push(pfEncuestaD);
      });
      pfParams.encuestaLstD = pf_encuestaLstD;

      //Grupo 6
      var origenUno = new Array();
      $("input[name='chkOrigenUno']:checked").each(function () {
        origenUno.push($(this).val());
      });
      if (origenUno) {
        pfParams.origenUno = origenUno;
      }

      //Origen en la opcion de Otros
      if ($("#chkOrigenUno9").is(":checked")) {
        const origenOtros = $("#txtOtros").val();
        if (origenOtros) {
          pfParams.otros = origenOtros;
        }
      }

      //Falta Perfil Doc

      console.log(JSON.stringify(pfParams));

      httpCreate(
        "perfilamiento_personas_fisicas",
        pfParams,
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
    $("#divRowPerfilar").show();
    $("#divGrupoTodo").show();
    $("#divGrupoAsesor").hide();
    $("#divStickyActionBar").show();
  } else {
    $("#mesaggePerfil").html(
      "El contrato tiene asociado un Asesor en Inversión, por lo tanto se le debe asignar por default el Perfil de Inversión P7 (NO APLICA)."
    );
    $("#downloadPerfil").html(
      "Clic en el boton PDF para descargar la documentacion. "
    );
    $("#divRowPerfilar").hide();
    $("#divGrupoTodo").hide();
    $("#divGrupoAsesor").show();
    $("#divStickyActionBar").hide();
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
let encuestaParams: UrlParams = {};
// Name of json
httpFindAll("encuesta", encuestaParams, payload => {
  // Parameters: field name group, id of quiz, data
  fillQuiz("divGrupoTres", "encuesta", payload);
});

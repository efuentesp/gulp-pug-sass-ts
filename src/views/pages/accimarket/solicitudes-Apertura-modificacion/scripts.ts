/// <reference path="../../typings/index.d.ts" />
let listaOrdenes_parametros: UrlParams = {};

fieldPlusMinus("contratoApertura", {});
fieldPlusMinus("digitoApertura", {});
fieldPlusMinus("folioApertura", {});
fieldPlusMinus("contratoModificacion", {});
fieldPlusMinus("digitoModificacion", {});

($("#estatusApertura") as any).select2({
  placeholder: "",
  minimumResultsForSearch: Infinity
});
($("#estatusModificacion") as any).select2({
  placeholder: "",
  minimumResultsForSearch: Infinity
});

validateDateRage("rangoCaptura");
validateDateRage("rangoModificacion");


$("#rangoApertura_begin_date").focus(function(){
  $(".ui-datepicker-week-end").hide();
})

$("#rangoApertura_begin_date").blur(function(){
  $(".ui-datepicker-week-end").hide();
})

$("#rangoModificacion_end_date").focus(function(){
  $(".ui-datepicker-week-end").hide();
})

$("#rangoModificacion_end_date").blur(function(){
  $(".ui-datepicker-week-end").hide();
})

$("#table_solicitudesApertura").jqGrid({
  datatype: "local",
  height: 250,
  sortable :true,
  colNames: [
    "Folio",
    "Contrato",
    "Tipo Contrato",
    "Tipo Persona",
    "Fecha Captura",
    "Estatus",
    "Digito",
    "Usuario"
  ],
  colModel: [
    { name: "folio",width:155 },
    { name: "contrato",width:155 },
    { name: "tipo_contrato",width:155 },
    { name: "tipo_persona",width:155},
    { name: "fecha_captura",width:155 },
    { name: "estatus",width:155 },
    { name: "digito",width:155 },
    { name: "usuario",width:155 }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  shrinkToFit: false,
  loadComplete: function() {
    $("#gbox_table_solicitudesApertura").contextMenu("menu-excel", {
      bindings: {
        "obtener-excel": function(event) {
          console.log("copiar excel");
        }
      },
      onContexMenu: function(event, menu) {}
    });
  }
});

$("#table_solicitudesModificacion").jqGrid({
  datatype: "local",
  height: 250,
  sortable :true,
  colNames: [
    "Folio Modif.",
    "Folio",
    "Contrato",
    "Tipo Contrato",
    "Tipo Persona",
    "Fecha Captura",
    "Estatus",
    "Digito"
  ],
  colModel: [
    { name: "folio_mod", width: 155 },
    { name: "folio", width: 155 },
    { name: "contrato", width: 155 },
    { name: "tipo_contrato", width: 155 },
    { name: "tipo_persona", width: 155 },
    { name: "fecha_captura", width: 155 },
    { name: "estatus", width: 155 },
    { name: "digito", width: 155 }
  ],
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "tipo",
  sortorder: "desc",
  shrinkToFit: false,
  loadComplete: function() {
    $("#gbox_table_solicitudesModificacion").contextMenu("menu-excel", {
      bindings: {
        "obtener-excel": function(event) {
          console.log("copiar excel");
        }
      },
      onContexMenu: function(event, menu) {}
    });
  }
});

$("#rangoCaptura_begin_date, #rangoCaptura_end_date")
  .datepicker("option", "beforeShowDay", $.datepicker.noWeekends);

$("#rangoModificacion_begin_date, #rangoModificacion_end_date")
  .datepicker("option", "beforeShowDay", $.datepicker.noWeekends);

$("#btn_search").click(() => {
  const formListOrdenes = ($("#criterios_busqueda_apertura") as any)
    .parsley()
    .on("field:validated", () => {
      const ok = $(".parsley-error").length === 0;
    })
    .on("form:submit", () => {
      console.log("form:submit");

      listaOrdenes_parametros = {};


      const contratoApertura = getList("contratoApertura");
      if (contratoApertura.length > 0) {
        listaOrdenes_parametros.contrato = contratoApertura;
      }

      const digitoApertura = getList("digitoApertura");
      if (digitoApertura.length > 0) {
        listaOrdenes_parametros.digito = digitoApertura;
      }

      const folioApertura = getList("folioApertura");
      if (folioApertura.length > 0) {
        listaOrdenes_parametros.folio = folioApertura;
      }

      const estatusApertura = $("#estatusApertura").val()
      if (estatusApertura) {
        listaOrdenes_parametros.estatus = estatusApertura;
      }

      const rangoCaptura_begin_date = $("#rangoCaptura_begin_date").val()
      if (rangoCaptura_begin_date) {
        listaOrdenes_parametros.fecha_captura = rangoCaptura_begin_date;
      }


      const rangoCaptura_end_date = $("#rangoCaptura_end_date").val()
      if (rangoCaptura_end_date) {
        listaOrdenes_parametros.fecha_captura = rangoCaptura_end_date;
      }


      httpFindAll("contratos", listaOrdenes_parametros, payload => {
        const rec_count = payload.length;
        $("#count_contratos").html(rec_count);
        fillJqGrid("#table_solicitudesApertura", payload);
      });
      return false;
    });
});

$("#btn_search_modificacion").click(() => {

  const formListOrdenes = ($("#criterios_busqueda_modificacion") as any)
    .parsley()
    .on("field:validated", () => {
      const ok = $(".parsley-error").length === 0;
    })
    .on("form:submit", () => {
      console.log("form:submit");

      listaOrdenes_parametros = {};


      const contratoModificacion = getList("contratoModificacion");
      if (contratoModificacion.length > 0) {
        listaOrdenes_parametros.contrato = contratoModificacion;
      }

      const digitoModificacion = getList("digitoModificacion");
      if (digitoModificacion.length > 0) {
        listaOrdenes_parametros.digito = digitoModificacion;
      }

      const estatusModificacion = $("#estatusModificacion").val()
      if (estatusModificacion) {
        listaOrdenes_parametros.estatus = estatusModificacion;
      }

      const rangoModificacion_begin_date = $("#rangoModificacion_begin_date").val()
      if (rangoModificacion_begin_date) {
        listaOrdenes_parametros.fecha_captura = rangoModificacion_begin_date;
      }

      const rangoModificacion_end_date = $("#rangoModificacion_end_date").val()
      if (rangoModificacion_end_date) {
        listaOrdenes_parametros.fecha_captura = rangoModificacion_end_date;
      }

      httpFindAll("contratos", listaOrdenes_parametros, payload => {
        const rec_count = payload.length;
        $("#count_contratos").html(rec_count);
        fillJqGrid("#table_solicitudesModificacion", payload);
      });
      return false;
    });
});

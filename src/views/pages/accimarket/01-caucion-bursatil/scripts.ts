/// <reference path="../../typings/index.d.ts" />

console.log("01-caucion-bursatil");

$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);

$("#fecha").datepicker(ui_datepicker_settings);

const rest_url = `${REST_URL}/fideicomiso`;

const fieldSelectPlusMinus = (id: string) => {
  const idBtnPlus = "#btn_plus_" + id;
  const idBtnMinus = "#btn_minus_" + id;
  const idInput = "#" + id;
  const list = "ul#tag_list_" + id;

  $(idInput).append('<option value=""></option>');
  $(idInput).append('<option value="AL1">Alabama 1</option>');
  $(idInput).append('<option value="AL2">Alabama 2</option>');
  $(idInput).append('<option value="AL3">Alabama 3</option>');
  $(idInput).append('<option value="AL4">Alabama 4</option>');

  $(idBtnPlus).click(() => {
    const text_to_add = $("#test option:selected").text() as string;
    const value_to_add = $("#test option:selected").val() as string;
    var exist = 0;

    if ($("li").length <= 0) {
      $(list).append(
        "<li><a id = " +
          value_to_add +
          " class='delete_item' href='javascript:void();'>" +
          text_to_add +
          "</option></a></li>"
      );
      exist = 1;
    } else {
      $(list + " li a").each(function(index) {
        if ($(this).text() === text_to_add) {
          exist = 1;
          return false;
        }
      });
    }

    if (exist == 0) {
      $(list).append(
        "<li><a id = " +
          value_to_add +
          " class='delete_item' href='javascript:void();'>" +
          text_to_add +
          "</option></a></li>"
      );
    }

    $(idInput)
      .val(null)
      .trigger("change");
  });

  $(idBtnMinus).click(() => {
    $(list + " li a").each(function(index) {
      if ($(this).attr("id") === $(idInput).val()) {
        $(this).remove();
      }
    });

    $(idInput)
      .val(null)
      .trigger("change");
  });

  $(list).delegate(".delete_item", "click", function() {
    $(idInput)
      .val(
        $(this)
          .parent()
          .find(".delete_item")
          .attr("id")
      )
      .trigger("change");
  });

  ($(idInput) as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
  });
};

const fieldPlusMinus = (id: string) => {
  const idBtnPlus = "#btn_plus_" + id;
  const idBtnMinus = "#btn_minus_" + id;
  const idInput = "#" + id;
  const list = "ul#tag_list_" + id;

  $(idBtnPlus).click(() => {
    const text_to_add = $(idInput).val() as string;
    var exist = 0;

    if ($("li").length <= 0) {
      $(list).append(
        '<li><a class="delete_item" href="javascript:void();">' +
          text_to_add +
          "</a> </li>"
      );
      exist = 1;
    } else {
      $(list + "li a").each(function(index) {
        if ($(this).text() === text_to_add) {
          exist = 1;
          return false;
        }
      });
    }

    if (exist == 0) {
      $(list).append(
        '<li><a class="delete_item" href="javascript:void();">' +
          text_to_add +
          "</a> </li>"
      );
    }

    $(idInput).val("");
  });

  $(idBtnMinus).click(() => {
    $(list + " li a").each(function(index) {
      if ($(this).text() === $(idInput).val()) {
        $(this).remove();
      }
    });

    $(idInput).val("");
  });

  $(list).delegate(".delete_item", "click", function() {
    $(idInput).val(
      $(this)
        .parent()
        .find(".delete_item")
        .html()
    );
  });
};

fieldPlusMinus("contrato");
fieldPlusMinus("digito");
fieldSelectPlusMinus("test");

$("#table_contratos").jqGrid({
  datatype: "local",
  height: 250,
  colNames: [
    "Contrato",
    "Libro",
    "Cliente",
    "Digito",
    "TV",
    "Descr TV",
    "Emisora",
    "Serie",
    "Cantidad",
    "Precio",
    "Valuación",
    "Promotor",
    "Folio",
    "Fecha",
    "Negocio"
  ],
  colModel: [
    { name: "contrato", width: 55 },
    { name: "libro", width: 90 },
    { name: "cliente", width: 80, align: "right" },
    { name: "digito", width: 80, align: "right" },
    { name: "tv", width: 80, align: "right" },
    { name: "descr_tv", width: 150, sortable: false },
    { name: "emisora", width: 90 },
    { name: "serie", width: 90 },
    { name: "cantidad", width: 90 },
    { name: "precio", width: 90 },
    { name: "valuacion", width: 90 },
    { name: "promotor", width: 90 },
    { name: "folio", width: 90 },
    { name: "fecha", width: 90 },
    { name: "negocio", width: 90 }
  ],
  pager: "#pager_contratos",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "contrato",
  sortorder: "desc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  caption: ""
});

// Form validations
let contratos_params: UrlParams = {
  // cliente: "CLIENTE 01",
  // contrato: "CONTRATO 01"
};

http_findAll("contratos", contratos_params, payload => {
  fillJqGrid("#table_contratos", payload);
});

const form = ($("#criterios-busqueda") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    // console.log("Errores de validación", $(".parsley-error"))
    // $(".callout-info").toggleClass("hidden", !ok);
    // $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", () => {
    console.log("form:submit");

    contratos_params = {};

    const fecha = $("#fecha").val();
    const contrato = $("#contrato").val();
    const digito = $("#digito").val();
    const negocio = $("input[name='negocio']:checked").val();

    if (fecha) {
      contratos_params.fecha = fecha;
    }
    if (contrato) {
      contratos_params.contrato = contrato;
    }
    if (digito) {
      contratos_params.digito = digito;
    }
    if (negocio) {
      contratos_params.negocio = negocio;
    }

    http_findAll("contratos", contratos_params, payload => {
      fillJqGrid("#table_contratos", payload);
    });

    return false;
  });

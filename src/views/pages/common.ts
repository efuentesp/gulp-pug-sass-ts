/// <reference path="typings/index.d.ts" />

console.log("common.ts");

const REST_URL = "http://localhost:3000";

interface UrlParams {
  [key: string]: any;
}

// Query UI DatePicker settings
const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];

const DAY_NAMES_MIN = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const DATE_FORMAT = "dd-mm-yy";

const ui_datepicker_settings = {
  showOn: "button",
  buttonImage: "../../assets/images/btn-calendario_32x32.png",
  buttonImageOnly: true,
  buttonText: "",
  dayNames: DAY_NAMES,
  dayNamesMin: DAY_NAMES_MIN,
  monthNames: MONTH_NAMES,
  dateFormat: DATE_FORMAT
};

// Query UI Accordion settings
const icons = { header: "ui-icon-plus", activeHeader: "ui-icon-minus" };

const ui_accordion_settings = {
  collapsible: true,
  icons: icons,
  heightStyle: "content"
};

// Query UI Tooltip settings
$(document).tooltip({
  disabled: true
});

// JqGrid functions
const fillJqGrid = (grid_id: string, data: any[]) => {
  $(grid_id).jqGrid("clearGridData");
  data.forEach((item, i) => $(grid_id).jqGrid("addRowData", i + 1, item));
};

// Sidebar
let isSidebarOpened = false;
$(".sidebar_button").click(() => {
  if (isSidebarOpened) {
    $(".sidebar_content").removeClass("is_open");
    $(".sidebar_button").removeClass("is_open");
    $(".content").removeClass("is_sidebar_open");
    $;
  } else {
    $(".sidebar_content").addClass("is_open");
    $(".sidebar_button").addClass("is_open");
    $(".content").addClass("is_sidebar_open");
  }
  isSidebarOpened = !isSidebarOpened;
});

// REST APIs}
const rest_findAll = (resource: string, params: any, cb: Function) => {
  const api_params = $.param(params);
  const url = api_params
    ? `${REST_URL}/${resource}?${api_params}`
    : `${REST_URL}/${resource}`;
  // console.log(url);

  $.ajax({
    url,
    contentType: "application/json",
    dataType: "json",
    success: result => cb(result)
  });
};

// const rest_findAll$ = (resource: string, params: any) => {
//   const api_params = $.param(params);
//   const url = api_params
//     ? `${REST_URL}/${resource}?${api_params}`
//     : `${REST_URL}/${resource}`;
//   // console.log(url);

//   return $.ajaxAsObservable({
//     url,
//     contentType: "application/json",
//     dataType: "json"
//   });
// };

const rest_create = (resource: string, payload: any, cb: Function) => {
  const url = `${REST_URL}/${resource}`;
  // console.log(url);

  $.ajax({
    type: "POST",
    url,
    data: JSON.stringify(payload),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: result => cb(result)
  });
};

// const rest_create$ = (resource: string, payload: any) => {
//   const url = `${REST_URL}/${resource}`;
//   // console.log(url);

//   return $.ajaxAsObservable({
//     type: "POST",
//     url,
//     data: JSON.stringify(payload),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json"
//   });
// };

const rest_findOne = (resource: string, id: string, cb: Function) => {
  const url = `${REST_URL}/${resource}/${id}`;
  // console.log(url);

  $.ajax({
    url,
    contentType: "application/json",
    dataType: "json",
    success: result => cb(result)
  });
};

const rest_findOne$ = (resource: string, id: string) => {
  const url = `${REST_URL}/${resource}/${id}`;

  return $.ajaxAsObservable({
    url,
    contentType: "application/json",
    dataType: "json"
  });
};

const rpc_findAll = (resource: string, params: any, cb: Function) => {
  // TODO: Implementar versión con POST
};

($("select[name=quiz_select]") as any).select2({
  minimumResultsForSearch: Infinity
});

const http_findAll = rest_findAll;
// const http_findAll$ = rest_findAll$;
const http_findOne = rest_findOne;
const http_findOne$ = rest_findOne$;
const http_create = rest_create;
// const http_create$ = rest_create$;

const fieldSelectPlusMinus = (id: string) => {
  const idBtnPlus = "#btn_plus_" + id;
  const idBtnMinus = "#btn_minus_" + id;
  const idInput = "#" + id;
  const list = "ul#tag_list_" + id;

  $(idBtnPlus).click(() => {
    const text_to_add = $(idInput + " option:selected").text() as string;
    const value_to_add = $(idInput + " option:selected").val() as string;
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
    console.log("Texto add: " + text_to_add);
    var exist = 0;

    if ($("li").length <= 0) {
      $(list).append(
        '<li><a class="delete_item" href="javascript:void();">' +
          text_to_add +
          "</a> </li>"
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

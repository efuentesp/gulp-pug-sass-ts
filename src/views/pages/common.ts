console.log("common.ts");

const REST_URL = "http://localhost:3000";

interface UrlParams {
  [key: string]: any
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

const DAY_NAMES_MIN = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

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
  buttonImage: "/assets/images/calendar.png",
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
$(document).tooltip();

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
    $
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
  console.log(url);

  $.ajax({
    url,
    contentType: "application/json",
    dataType: "json",
    success: result => cb(result)
  });
};

const rpc_findAll = (resource: string, params: any, cb: Function) => {
  // TODO: Implementar versión con POST
};

($('select[name=quiz_select]') as any).select2({
	minimumResultsForSearch: Infinity
});

const http_findAll = rest_findAll;

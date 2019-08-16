console.log("common.ts");
var REST_URL = "http://localhost:3000";
var DAY_NAMES = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];
var DAY_NAMES_MIN = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
var MONTH_NAMES = [
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
var DATE_FORMAT = "dd-mm-yy";
var ui_datepicker_settings = {
    showOn: "button",
    buttonImage: "/assets/images/calendar.png",
    buttonImageOnly: true,
    buttonText: "",
    dayNames: DAY_NAMES,
    dayNamesMin: DAY_NAMES_MIN,
    monthNames: MONTH_NAMES,
    dateFormat: DATE_FORMAT
};
var icons = { header: "ui-icon-plus", activeHeader: "ui-icon-minus" };
var ui_accordion_settings = {
    collapsible: true,
    icons: icons,
    heightStyle: "content"
};
$(document).tooltip();
var fillJqGrid = function (grid_id, data) {
    $(grid_id).jqGrid("clearGridData");
    data.forEach(function (item, i) { return $(grid_id).jqGrid("addRowData", i + 1, item); });
};
var isSidebarOpened = false;
$(".sidebar_button").click(function () {
    if (isSidebarOpened) {
        $(".sidebar_content").removeClass("is_open");
        $(".sidebar_button").removeClass("is_open");
        $(".content").removeClass("is_sidebar_open");
        $;
    }
    else {
        $(".sidebar_content").addClass("is_open");
        $(".sidebar_button").addClass("is_open");
        $(".content").addClass("is_sidebar_open");
    }
    isSidebarOpened = !isSidebarOpened;
});
var rest_findAll = function (resource, params, cb) {
    var api_params = $.param(params);
    var url = api_params
        ? REST_URL + "/" + resource + "?" + api_params
        : REST_URL + "/" + resource;
    console.log(url);
    $.ajax({
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function (result) { return cb(result); }
    });
};
var rpc_findAll = function (resource, params, cb) {
};
var http_findAll = rest_findAll;

//# sourceMappingURL=../maps/common.js.map

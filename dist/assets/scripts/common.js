console.log("common.ts");
// Query UI DatePicker settings
var dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];
var dayNamesMin = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
var monthNames = [
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
var dateFormat = "dd-mm-yy";
var ui_datepicker_settings = {
    showOn: "button",
    buttonImage: "/assets/images/calendar.png",
    buttonImageOnly: true,
    buttonText: "",
    dayNames: dayNames,
    dayNamesMin: dayNamesMin,
    monthNames: monthNames,
    dateFormat: dateFormat
};
// Query UI Accordion settings
var icons = { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" };
var ui_accordion_settings = {
    collapsible: true,
    icons: icons,
    heightStyle: "content"
};
// Query UI Tooltip settings
$(document).tooltip();

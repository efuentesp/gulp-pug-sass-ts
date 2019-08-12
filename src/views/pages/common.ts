console.log("common.ts");

// Query UI DatePicker settings
const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];

const dayNamesMin = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

const monthNames = [
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

const dateFormat = "dd-mm-yy";

const ui_datepicker_settings = {
  showOn: "button",
  buttonImage: "/assets/images/calendar.png",
  buttonImageOnly: true,
  buttonText: "",
  dayNames: dayNames,
  dayNamesMin: dayNamesMin,
  monthNames: monthNames,
  dateFormat: dateFormat
}

// Query UI Accordion settings
const icons = { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" };

const ui_accordion_settings = {
  collapsible: true,
  icons: icons,
  heightStyle: "content"
}

// Query UI Tooltip settings
$(document).tooltip();

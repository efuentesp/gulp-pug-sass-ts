/// <reference path="../../typings/index.d.ts" />

console.log("27-datos-generales-efp");

$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);

$("#titular_cotitular_tabgroup").tabs();

$("#titular_contrato_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#titular_contrato_tabgroup li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

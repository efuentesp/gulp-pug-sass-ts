/// <reference path="../../typings/index.d.ts" />

import { ui_accordion_settings } from "../../utils/ui-accordion";
import { ui_datepicker_settings } from "../../utils/ui-datepicker";
import { REST_URL, UrlParams, http_findAll } from "../../utils/http";
import { fillJqGrid } from "../../utils/jqgrid";

console.log("27-datos-generales-efp");

$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);

$("#titular_cotitular_tabgroup").tabs();

$("#titular_contrato_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#titular_contrato_tabgroup li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

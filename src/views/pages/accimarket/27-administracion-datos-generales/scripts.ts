console.log("27-datos-generales-efp");

/*acordion*/
$("#criterios_busqueda_accordion").accordion(ui_accordion_settings);

/****   TABS ------//--> */

/*config tabs TITULAR_COTITULAR2*/
$("#titular_cotitular_tabgroup").tabs();

/*config tabs COTITULAR2 _clasificacion_contrato*/
$("#cotitular2_clasificacion_contrato_tab_group").tabs();

/****   TAB-GROUP ------//--> */

/*config TITULAR tabgroup */
$("#titular_contrato_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#titular_contrato_tabgroup li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

/*config COTITULAR2 tabgroup */
$("#cotitular2_tabgroup")
  .tabs()
  .addClass("ui-tabs-vertical ui-helper-clearfix");
$("#cotitular2_tabgroup li")
  .removeClass("ui-corner-top")
  .addClass("ui-corner-left");

/// <reference path="typings/index.d.ts" />

// console.log("common.ts");

const RESTURL = "http://localhost:3000";

interface UrlParams {
  [key: string]: any;
}

// Query UI DatePicker settings
const DATEFORMAT = "dd-mm-yy";
const DATEFORMATMONTHYEAR = "MM yy";

const uiDatepickerSettings = {
  showOn: "both",
  buttonImage: "../../assets/images/btn-calendario.png",
  buttonImageOnly: true,
  buttonText: "",
  dateFormat: DATEFORMAT,
  changeMonth: true,
  changeYear: true,
  showButtonPanel: true,
  currentText: "Hoy",
  closeText: "Limpiar",
  onClose: function (dateText, inst) {
    if ($(window.event.srcElement).hasClass("ui-datepicker-close")) {
      (document.getElementById(this.id) as HTMLInputElement).value = "";
    }
  }
};

$.datepicker.regional["es"] = {
  monthNames: [
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
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  dayNamesMin: ["D", "L ", "M ", "M ", "J ", "V ", "S "]
};

$.datepicker.setDefaults($.datepicker.regional["es"]);

const uiDatepickerMonthYearSettings = {
  changeMonth: true,
  changeYear: true,
  showButtonPanel: false,
  dateFormat: DATEFORMATMONTHYEAR,
  onChangeMonthYear: function (year, month, inst) {
    $(this).datepicker(
      "setDate",
      new Date(inst.selectedYear, inst.selectedMonth, 1)
    );
  }
};

// Query UI Accordion settings
const icons = { header: "plus-icon", activeHeader: "minus-icon" };

const uiAccordionSettings = {
  collapsible: true,
  icons: icons,
  heightStyle: "content"
};

// Query UI Tooltip settings
$(document).tooltip({
  disabled: true
});

// Coloca el atributo "title" al botón para que aparezca el tooltip
$(".amButton").each(function (i, obj) {
  // const label = $(`#${obj.id} span`).html();
  const label = $(`#${obj.id}`).attr("data-tooltip");
  $(`#${obj.id}`).attr("custom-tooltip", label);
});

// Coloca el atributo "custom-tooltip" a los div, con la clase field-control, para que aparezca el tooltip
$('div[class*="amFieldControl"]').each(function (index, item) {
  if (item.attributes.getNamedItem("data-tooltip")) {
    let value = item.attributes.getNamedItem("data-tooltip").value
    if (value)
      item.setAttribute("custom-tooltip", value)
  }
});

// Coloca el atributo "custom-tooltip" a los div, con la clase field-plus-minus, para que aparezca el tooltip
$('div[class*="amFieldPlusMinus"]').each(function (index, item) {
  if (item.attributes.getNamedItem("data-tooltip")) {
    let value = item.attributes.getNamedItem("data-tooltip").value
    if (value)
      item.setAttribute("custom-tooltip", value)
  }
});

// Tabs
$(".amTabGroup").tabs();

// Accordion
$(".amAccordion").accordion(uiAccordionSettings);

// DatePicker
$(".amDatepicker")
  .datepicker(uiDatepickerSettings)
  .prop("readonly", false);

// DatePicker Month Year
$(".amMonthpicker").datepicker(uiDatepickerMonthYearSettings);

// Splitter
$(".splitter-vertical").splitter();
$(".splitter-horizontal").splitter({ type: "h" });

// JqGrid functions
const fillJqGrid = (gridId: string, data: any[]) => {
  $(gridId).jqGrid("clearGridData");
  data.forEach((item, i) => $(gridId).jqGrid("addRowData", i + 1, item));
};

// Switch / Toggle
($(".amRadioToggle") as any).toggleInput();

// Wizard
($(".wizard") as any).steps({
  headerTag: "h3",
  bodyTag: "section",
  transitionEffect: "slideLeft",
  titleTemplate: "#title#",
  autoFocus: true,
  labels: {
    cancel: "Cancelar",
    current: "paso actual:",
    pagination: "Paginación",
    loading: "Cargando ..."
  }
});

// Button images - Wizard
$("[href='#next']").html(
  '<img src="../../assets/images/boton_siguiente2.png">Siguiente</img>'
);
$("[href='#previous']").html(
  '<img src="../../assets/images/boton_regresar2.png">Anterior</img>'
);
$("[href='#finish']").html(
  '<img src="../../assets/images/btn-enviar.png">Enviar</img>'
);

// REST APIs
const restFindAll = (resource: string, params: any, cb: Function) => {
  const apiParams = $.param(params);
  const url = apiParams
    ? `${RESTURL}/${resource}?${apiParams}`
    : `${RESTURL}/${resource}`;

  $.ajax({
    url,
    contentType: "application/json",
    dataType: "json",
    success: result => cb(result)
  });
};

const restCreate = (resource: string, payload: any, cb: Function) => {
  const url = `${RESTURL}/${resource}`;

  $.ajax({
    type: "POST",
    url,
    data: JSON.stringify(payload),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: result => cb(result)
  });
};


const restFindOne = (resource: string, id: string, cb: Function) => {
  const url = `${RESTURL}/${resource}/${id}`;
 
  $.ajax({
    url,
    contentType: "application/json",
    dataType: "json",
    success: result => cb(result)
  });
};

const restFindOne$ = (resource: string, id: string) => {
  const url = `${RESTURL}/${resource}/${id}`;

  return $.ajaxAsObservable({
    url,
    contentType: "application/json",
    dataType: "json"
  });
};

/**
 * Hace el llamado ajax a los web services via POST
 * @param {string} url - url parcial del web service (p.ej. "obtenerContrato").
 * @param {object} params - Objeto con los parámetros a enviar al web service (p.ej. {cliente: "C001", estatus: "A"}).
 * @param {function} callback - Función con la respuesta del web service.
 */
const rpc = (url: string, params: any, cb: Function) => {
  $.ajax({
    url,
    dataType: "json",
    type: "post",
    contentType: "application/x-www-form-urlencoded",
    data: params,
    success: (data, textStatus, jQxhr) => cb(data, textStatus, jQxhr)
  });
};

($("select[name=amQuizSelect]") as any).select2({
  minimumResultsForSearch: Infinity
});

const httpFindAll = restFindAll;
const httpFindOne = restFindOne;
const httpCreate = restCreate;

const existText = (textToAdd: string, list: string) => {
  let exist = false;
  let count = 1;

  $.each($(list + " li a"), function () {
    if (
      $(list + " li:nth-child(" + count + ")").text() === textToAdd.trim()
    ) {
      exist = true;
      return false;
    }
    count++;
  });
  return exist;
};

const addedText = (textToAdd: string, valueToAdd: string, list: string) => {
  let added = false;
  let count = 1;

  $.each($(list + " li a"), function () {
    if ($(list + " li:nth-child(" + count + ") a").text() === "") {
      $(list + " li:nth-child(" + count + ") a").attr("id", valueToAdd);
      $(list + " li:nth-child(" + count + ") a").append(textToAdd);
      added = true;
      return false;
    }
    count++;
  });

  return added;
};

const addNode = (
  textToAdd: string,
  valueToAdd: string,
  list: string,
  maxsize: number
) => {
  if (maxsize != null) {
    if ($(list + " li").length < maxsize) {
      $(list).append(
        "<li><a id=" +
        valueToAdd +
        " class='amDeleteItem' href='javascript:void();'>" +
        textToAdd +
        "</a></li>"
      );
    }
  } else {
    $(list).append(
      "<li><a id=" +
      valueToAdd +
      " class='amDeleteItem' href='javascript:void();'>" +
      textToAdd +
      "</a></li>"
    );
  }
};

function fieldPlusMinusRepaintList(node) {
  let listContentId = [];
  let listContentValue = [];
  let nodeList: HTMLUListElement = document.getElementById(
    node
  ) as HTMLUListElement;
  let listSize = nodeList.childNodes.length;
  $(nodeList.childNodes).each(function (childNode) {
    if (nodeList.childNodes[childNode].childNodes[0].textContent) {
      listContentId.push(
        (nodeList.childNodes[childNode]
          .childNodes[0] as HTMLElement).getAttribute("id")
      );
      listContentValue.push(
        nodeList.childNodes[childNode].childNodes[0].textContent
      );
    }
  });
  while (nodeList.firstChild) {
    nodeList.removeChild(nodeList.firstChild);
  }

  for (let i = 0; i < listSize; i++) {
    let tagLi = document.createElement("LI");
    let tagA = document.createElement("A");
    tagA.setAttribute("class", "amDeleteItem");
    tagA.setAttribute("href", "javascript:void();");
    if (i < listContentId.length) {
      tagA.setAttribute("id", listContentId[i]);
      tagA.innerHTML = listContentValue[i];
    }

    tagLi.appendChild(tagA);
    nodeList.appendChild(tagLi);
  }
}

const removeHoverStyle = (list: string) => {
  $(list + " li a").each(function () {
    if ($(this).text() == "") {
      $(this).css("pointer-events", "none");
    }
  });
}

/**
 * Funcionalidad para el componente +/- con un input
 * @param {string} id - Id del componente.
 * @param {object} params - Objeto con los parámetros para el componente:
 *   maxsize (opcional): Si la lista solo permite un número limitado de elementos en la lista
 */
const fieldPlusMinus = (id: string, params: any) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const idBtnPlus = "#btnPlus" + uppcId;
  const idBtnMinus = "#btnMinus" + uppcId;
  const idInput = "#txt" + uppcId;
  const idInputHidden = "#txt" + uppcId + "Hidden";
  const list = "ul#lstTagList" + uppcId;
  const node = "lstTagList" + uppcId;
  let definedNodes = true;
  const numNodes = 4;

  if (params.nodes == undefined) {
    definedNodes = true;
  } else {
    definedNodes = params.nodes;
  }

  if (definedNodes) {
    for (let i = 0; i < numNodes; i++) {
      $(list).append(
        "<li><a class='amDeleteItem' href='javascript:void();'></a></li>"
      );
    }
  }

  $(idBtnPlus).click(() => {
    addValueToList();
  });

  $(idInput).on("keydown", (e) => {
    if (e.which == 13) {
      e.preventDefault();
      addValueToList();
    }
  });

  $('body').keydown(function (event) {
    if (event.keyCode == 46) {
      $(list + " li a").each(function (index) {
        if ($(idInputHidden).val() != "") {
          if ($(this).text() === $(idInputHidden).val()) {
            if (!definedNodes) {
              $("li:has('a.amDeleteItem'):contains(" + $(this).text() + ")").remove();
              $(list + " li").length = $(list + " li").length - 1;
            } else {
              if ($(list + " li").length <= 4) {
                $(this)
                  .find("a")
                  .first()
                  .removeAttr("id");
                $(this).text("");
              } else {
                $("li:has('a.amDeleteItem'):contains(" + $(this).text() + ")").remove();
                $(this).text("");
                $(list + " li").length = $(list + " li").length - 1;
              }
            }
          }
        }
      });
      fieldPlusMinusRepaintList(node);
      $(idInputHidden).val("");
      removeHoverStyle(list);
    }
  });

  removeHoverStyle(list);

  const addValueToList = () => {
    const textToAdd = $(idInput).val() as string;
    const valueToAdd = $(idInput).val() as string;

    if (!existText(textToAdd, list)) {
      if (!addedText(textToAdd, valueToAdd, list)) {
        addNode(textToAdd, valueToAdd, list, params.maxsize);
      }
    }
    fieldPlusMinusRepaintList(node);
    $(idInput).val("");
    removeHoverStyle(list);
  }

  $(idBtnMinus).click(() => {
    $(list + " li a").each(function (index) {
      if ($(idInputHidden).val() != "") {
        if ($(this).text() === $(idInputHidden).val()) {
          if (!definedNodes) {
            $("li:has('a.amDeleteItem'):contains(" + $(this).text() + ")").remove();
            $(list + " li").length = $(list + " li").length - 1;
          } else {
            if ($(list + " li").length <= 4) {
              $(this)
                .find("a")
                .first()
                .removeAttr("id");
              $(this).text("");
            } else {
              $("li:has('a.amDeleteItem'):contains(" + $(this).text() + ")").remove();
              $(this).text("");
              $(list + " li").length = $(list + " li").length - 1;
            }
          }
        }
      }
    });
    fieldPlusMinusRepaintList(node);
    $(idInputHidden).val("");
    removeHoverStyle(list);
  });

  // Set to input
  $(list).delegate(".amDeleteItem", "click", function () {
    $(idInputHidden).val(
      $(this)
        .parent()
        .find(".amDeleteItem")
        .html()
    );

    $(list + " li a").each(function () {
      $(this).removeClass("selected");
      $(this).css("background-color", "");
    });

    if ($(this)
      .parent()
      .find(".amDeleteItem")
      .html() != "") {
      $(this).addClass("selected");
      $(this).css("background-color", "#79c3ed");
    }
  });
};

/**
 * Funcionalidad para el componente +/- con un select
 * @param {string} id - Id del componente.
 * @param {object} params - Objeto con los parámetros para el componente:
 *   maxsize (opcional): Si la lista solo permite un número limitado de elementos en la lista
 */
const fieldSelectPlusMinus = (id: string, params: any) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const idBtnPlus = "#btnPlus" + uppcId;
  const idBtnMinus = "#btnMinus" + uppcId;
  const idInput = "#cmb" + uppcId;
  const idInputHidden = "#txt" + uppcId + "Hidden";
  const list = "ul#lstTagList" + uppcId;
  const node = "lstTagList" + uppcId;
  let definedNodes = true;
  const numNodes = 4;

  if (params.nodes == undefined) {
    definedNodes = true;
  } else {
    definedNodes = params.nodes;
  }

  if (definedNodes) {
    for (let i = 0; i < numNodes; i++) {
      $(list).append(
        "<li><a class='amDeleteItem' href='javascript:void();'></a></li>"
      );
    }
  }

  $('body').keydown(function (event) {
    if (event.keyCode == 46) {
      $(list + " li a").each(function (index) {
        if ($(this).attr("id") === $(idInputHidden).val()) {
          if (!definedNodes) {
            $(this).parent().remove();
            $(list + " li").length = $(list + " li").length - 1;
          } else {
            if ($(list + " li").length <= 4) {
              $(this)
                .find("a")
                .first()
                .removeAttr("id");
              $(this).text("");
            } else {
              $(this).parent().remove();
              $(list + " li").length = $(list + " li").length - 1;
            }
          }
        }
      });
      fieldPlusMinusRepaintList(node);
      $(idInputHidden)
        .val(null)
        .trigger("change");
      removeHoverStyle(list);
    }
  });

  removeHoverStyle(list);

  $(idBtnPlus).click(() => {
    const textToAdd = $(idInput + " option:selected").text() as string;
    const valueToAdd = $(idInput + " option:selected").val() as string;

    if (!existText(textToAdd, list)) {
      if (!addedText(textToAdd, valueToAdd, list)) {
        addNode(textToAdd, valueToAdd, list, params.maxsize);
      }
    }
    fieldPlusMinusRepaintList(node);
    $(idInput)
      .val(null)
      .trigger("change");
    removeHoverStyle(list);
  });

  $(idBtnMinus).click(() => {
    $(list + " li a").each(function (index) {
      if ($(this).attr("id") === $(idInputHidden).val()) {
        if (!definedNodes) {
          $(this).parent().remove();
          $(list + " li").length = $(list + " li").length - 1;
        } else {
          if ($(list + " li").length <= 4) {
            $(this)
              .find("a")
              .first()
              .removeAttr("id");
            $(this).text("");
          } else {
            $(this).parent().remove();
            $(list + " li").length = $(list + " li").length - 1;
          }
        }
      }
    });
    fieldPlusMinusRepaintList(node);
    $(idInputHidden)
      .val(null)
      .trigger("change");
    removeHoverStyle(list);
  });

  $(list).delegate(".amDeleteItem", "click", function () {
    $(idInputHidden)
      .val(
        $(this)
          .parent()
          .find(".amDeleteItem")
          .attr("id")
      )
      .trigger("change");

    $(list + " li a").each(function () {
      $(this).removeClass("selected");
      $(this).css("background-color", "");
    });

    if ($(this)
      .parent()
      .find(".amDeleteItem")
      .attr("id") != undefined) {
      $(this).addClass("selected");
      $(this).css("background-color", "#79c3ed");
    }
  });

  ($(idInput) as any).select2({
    placeholder: "",
    minimumResultsForSearch: Infinity
  });
};

/**
 * Funcionalidad para el componente +/- con Autocomplete
 * @param {string} id - Id del componente.
 * @param {object} params - Objeto con los parámetros para el componente:
 *   maxsize (opcional): Si la lista solo permite un número limitado de elementos en la lista
 */
const fieldSelectPlusAutocomplete = (id: string, params: any) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const idBtnPlus = "#btnPlus" + uppcId;
  const idBtnMinus = "#btnMinus" + uppcId;
  const idInput = "#cmb" + uppcId;
  const idInputHidden = "#txt" + uppcId + "Hidden";
  const list = "ul#lstTagList" + uppcId;
  const node = "lstTagList" + uppcId;
  const attrId = params.id;
  const attrText = params.text;
  const payload = params.payload;
  let definedNodes = true;
  const numNodes = 2;

  if (params.nodes == undefined) {
    definedNodes = true;
  } else {
    definedNodes = params.nodes;
  }

  if (definedNodes) {
    for (let i = 0; i < numNodes; i++) {
      $(list).append("<li><a class='amDeleteItem' href='javascript:void();'></a></li>");
    }
  }

  $('body').keydown(function (event) {
    if (event.keyCode == 46) {
      $(list + " li a").each(function (index) {
        if ($(this).attr("id") === $(idInputHidden).val()) {
          if (!definedNodes) {
            $(this).parent().remove();
            $(list + " li").length = $(list + " li").length - 1;
          } else {
            if ($(list + " li").length <= 4) {
              $(this)
                .find("a")
                .first()
                .removeAttr("id");
              $(this).text("");
            } else {
              $(this).parent().remove();
              $(list + " li").length = $(list + " li").length - 1;
            }
          }
        }
      });
      fieldPlusMinusRepaintList(node);
      $(idInputHidden)
        .val(null)
        .trigger("change");

      $(idInputHidden).removeClass("select-item");
      removeHoverStyle(list);
    }
  });

  removeHoverStyle(list);

  $(idBtnPlus).click(() => {
    const textToAdd = $(idInput + " option:selected").text() as string;
    const valueToAdd = $(idInput + " option:selected").val() as string;

    if (!existText(textToAdd, list)) {
      if (!addedText(textToAdd, valueToAdd, list)) {
        addNode(textToAdd, valueToAdd, list, params.maxsize);
      }
    }
    fieldPlusMinusRepaintList(node);
    $(idInput)
      .val(null)
      .trigger("change");

    $(idInput).removeClass("select-item");
    removeHoverStyle(list);
  });

  $(idInput).change(() => {

    if (!$(idInputHidden).hasClass("select-item")) {
      const valueToAdd = $(idInput + " option:selected").val() as string;

      if (!(valueToAdd == "")) {
        const textToAdd = $(idInput + " option:selected").text() as string;

        if (!existText(textToAdd, list)) {
          if (!addedText(textToAdd, valueToAdd, list)) {
            addNode(textToAdd, valueToAdd, list, params.maxsize);
          }
        }
        fieldPlusMinusRepaintList(node);
        $(idInput).val("");
      }

      $(idInput).removeClass("select-item");
      removeHoverStyle(list);
    }
  });

  $(idBtnMinus).click(() => {
    $(list + " li a").each(function (index) {
      if ($(this).attr("id") === $(idInputHidden).val()) {
        if (!definedNodes) {
          $(this).parent().remove();
          $(list + " li").length = $(list + " li").length - 1;
        } else {
          if ($(list + " li").length <= 4) {
            $(this)
              .find("a")
              .first()
              .removeAttr("id");
            $(this).text("");
          } else {
            $(this).parent().remove();
            $(list + " li").length = $(list + " li").length - 1;
          }
        }
      }
    });
    fieldPlusMinusRepaintList(node);
    $(idInputHidden)
      .val(null)
      .trigger("change");

    $(idInputHidden).removeClass("select-item");
    removeHoverStyle(list);
  });

  $(list).delegate(".amDeleteItem", "click", function () {
    $(idInputHidden).val(
      $(this)
        .parent()
        .find(".amDeleteItem")
        .attr("id")).trigger("change");

    $(idInputHidden).addClass("select-item");

    $(list + " li a").each(function () {
      $(this).removeClass("selected").css("background-color", "");
    });

    if ($(this)
      .parent()
      .find(".amDeleteItem")
      .attr("id") != undefined) {
      $(this).addClass("selected");
      $(this).css("background-color", "#79c3ed");
    }

  });

  var data = $.map(payload, function (item) {
    return {
      text: item[attrText],
      id: item[attrId]
    };
  });

  ($(idInput) as any).select2({
    language: "es",
    data: data,
    placeholder: ""
  });
};

/**
 * Obtiene los elementos de la lista seleccionados por cualquier componente +/-
 * @param {string} id - Id del componente.
 * @return {array} Lista de valores seleccionados
 */
const getList = (id: string) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  var list: any = [];
  
  $("#lstTagList" + uppcId + " li").each(function () {
    let value = $(this)
      .text()
      .trim();
    if (value != "") {
      list.push(value);
    }
  });

  return list;
};

/**
 * Obtiene los elementos seleccionados de un grupo de checkboxes
 * @param {string} id - Id del componente.
 * @return {array} Lista de valores seleccionados
 */
const getChecked = (id: string) => {
  let selected = [];
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const querySelect = "#divField" + uppcId + " input[type=checkbox]";

  $(querySelect).each(function () {
    if ($(this).is(":checked")) {
      selected.push($(this).attr("value"));
    }
  });

  return selected;
};

/**
 * Obtiene el elemento seleccionado de un grupo de radio buttons
 * @param {string} id - Id del componente.
 * @return {string} valor del elemento seleccionado
 */
const getOptionSelected = (id: string) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const querySelect = "input[name='rdb" + uppcId + "']:checked";

  return $(querySelect).val();
};

interface stackChartParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxY: number;
  tickMinY: number;
  tickStepY: number;
  dataSet: any[];
  width: string;
  height: string;
}

interface stackChartHParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxX: number;
  tickMinX: number;
  tickStepX: number;
  dataSet: any[];
  width: string;
  height: string;
  format: string;
}

interface barGradientChartParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxY: number;
  tickMinY: number;
  width: string;
  height: string;
  tickStepY: number;
  contexto: any;
  dataSet: any[];
}

interface barChartParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxY: number;
  tickMinY: number;
  width: string;
  height: string;
  tickStepY: number;
  dataSet: any[];
}

interface lineChartParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxY: number;
  tickMinY: number;
  tickStepY: number;
  dataSet: any[];
  pointA: number;
  pointB: number;
  width: string;
  height: string;
}

interface multiLineChartParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxY: number;
  tickMinY: number;
  tickStepY: number;
  dataSet: any[];
  width: string;
  height: string;
}

interface pieChartParams {
  id: string;
  titleX: string;
  labels: any[];
  dataSet: any[];
  width: string;
  height: string;
}

interface pieHighchartParams {
  id: string;
  title: string;
  format: string;
  plotOptionsFormat: string;
  labelsX: string;
  dataSet: any[];
}

interface barHighchartParams {
  id: string;
  title: string;
  dataSet: any[];
}

// Set any colors to pie chart
const backgroundSet = (elements: number) => {
  // Set principal
  var backgroundColorSet = [
    "#4299E1",
    "#48BB78",
    "#F56565",
    "#ECC94B",
    "#ED8936",
    "#38B2AC",
    "#9F7AEA",
    "#ED64A6",
    "#E53E3E",
    "#DD6B20",
    "#D69E2E",
    "#38A169",
    "#3182CE",
    "#319795",
    "#805AD5",
    "#D53F8C",
    "#5A67D8"
  ];

  var r = 0;
  var g = 0;
  var b = 0;
  var c;

  for (var i = 0; i < elements; i++) {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    c = "rgb(" + r + ", " + g + ", " + b + ", 0.4)";
    backgroundColorSet.push(c);
  }

  return backgroundColorSet;
};

// simpleGradientGraph
var simpleGradientGraph = null;


/**
 * Genera una gráfica de Barras
 * @param {object} params - Parámetros para armar la gráfica.
 */
const gradientBarChart = (params: barGradientChartParams) => {
  // console.log("GradientBarChart");
  if (simpleGradientGraph != null) {
    simpleGradientGraph.destroy();
  }

  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  // var ctxBar: any = document.getElementById(params.id);
  // var contextBar = ctxBar.getContext("2d");
  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = false;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  simpleGradientGraph = new Chart(params.contexto, {
    plugins: [
      {
        afterDatasetsDraw: function (simpleGradientGraph) {

          var ctx = simpleGradientGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleGradientGraph.data.datasets.forEach(function (dataset, i) {
            var meta = simpleGradientGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            },
            stacked: false,
            ticks: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: params.titleX,
              fontColor: "#000"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            stacked: false,
            scaleLabel: {
              display: true,
              labelString: params.titleY,
              fontColor: "#000"
            },
            ticks: {
              display: true,
              callback: function (value) {
                return value + "";
              },
              max: params.tickMaxY,
              min: params.tickMinY,
              stepSize: params.tickStepY
            }
          }
        ]
      }
    }
  });
};

// StackGraph
const stackChart = (params: stackChartParams) => {
  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctx: any = document.getElementById(params.id);
  var context = ctx.getContext("2d");

  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = true;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;

  const stackGraph = new Chart(context, {
    plugins: [
      {
        afterDatasetsDraw: function (stackGraph) {
          var ctx = stackGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          stackGraph.data.datasets.forEach(function (dataset, i) {
            var meta = stackGraph.getDatasetMeta(i);
            meta.data.forEach(function (element, index) {
              // GeneralFont
              ctx.fillStyle = "#000";
              var fontSize = 10;
              var fontStyle = "bold";
              var fontFamily = "Verdana";

              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );

              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              var padding = 10;

              if (dataset.data[index].toString().indexOf("-") >= 0) {
                ctx.fillText(
                  dataset.data[index] + "%",
                  element._view.x,
                  element._view.y - 10
                );
              } else {
                ctx.fillText(
                  dataset.data[index] + "%",
                  element._view.x,
                  element._view.y + 10
                );
              }
            });
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      scales: {
        xAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: params.titleX,
              fontColor: "#000"
            },
            ticks: {
              display: false
            },
            gridLines: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: params.titleY,
              fontColor: "#000"
            },
            ticks: {
              max: params.tickMaxY,
              min: params.tickMinY,
              stepSize: params.tickStepY,
              callback: function (value) {
                return value + ".00%";
              }
            },
            gridLines: {
              display: true
            }
          }
        ]
      }
    }
  });
};

// StackGraphHorizontal
const stackChartHorizontal = (params: stackChartHParams) => {
  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  let format = params.format;
  var ctx: any = document.getElementById(params.id);
  var context = ctx.getContext("2d");

  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = true;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;

  const stackGraphH = new Chart(context, {
    plugins: [
      {
        afterDatasetsDraw: function (stackGraphH) {
          var ctx = stackGraphH.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          stackGraphH.data.datasets.forEach(function (dataset, i) {
            var meta = stackGraphH.getDatasetMeta(i);
            meta.data.forEach(function (element, index) {
              // GeneralFont
              ctx.fillStyle = "#fff";
              var fontSize = 10;
              var fontStyle = "bold";
              var fontFamily = "Arial";

              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );

              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              var padding = 20;

              if (format == "%") {
                ctx.fillText(
                  formatNumber.new(dataset.data[index], "") + format,
                  element._view.x - padding,
                  element._view.y
                );
              } else {
                ctx.fillText(
                  format + formatNumber.new(dataset.data[index], ""),
                  element._view.x - padding,
                  element._view.y
                );
              }
            });
          });
        }
      }
    ],
    type: "horizontalBar",
    data: chartData,
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let label = "";
            if (format == "%") {
              label =
                data.datasets[tooltipItem.datasetIndex].label +
                " " +
                formatNumber.new(
                  data.datasets[tooltipItem.datasetIndex].data[0],
                  ""
                ) +
                format;
            } else {
              label =
                data.datasets[tooltipItem.datasetIndex].label +
                " " +
                format +
                formatNumber.new(
                  data.datasets[tooltipItem.datasetIndex].data[0],
                  ""
                );
            }

            return label;
          }
        }
      },
      legend: {
        display: true,
        position: "right"
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: params.titleX,
              fontColor: "#000"
            },
            ticks: {
              display: true,
              stepSize: params.tickStepX,
              callback: function (value) {
                let label = "";
                if (format == "%") {
                  label = formatNumber.new(value, "") + format;
                } else {
                  label = format + formatNumber.new(value, "");
                }

                return label;
              }
            },
            gridLines: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: params.titleY,
              fontColor: "#000"
            },
            ticks: {
              display: false
            },
            gridLines: {
              display: false
            }
          }
        ]
      }
    }
  });
};

// SimpleBarGraph
var simpleBGraph = null;

const simpleBarChart = (params: barChartParams) => {
  if (simpleBGraph != null) {
    simpleBGraph.destroy();
  }

  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctxBar: any = document.getElementById(params.id);
  var contextBar = ctxBar.getContext("2d");
  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = false;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  simpleBGraph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function (simpleBarGraph) {
          var ctx = simpleBarGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleBarGraph.data.datasets.forEach(function (dataset, i) {
            var meta = simpleBarGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            },
            stacked: false,
            ticks: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: params.titleX,
              fontColor: "#000"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            stacked: false,
            scaleLabel: {
              display: true,
              labelString: params.titleY,
              fontColor: "#000"
            },
            ticks: {
              display: true,
              callback: function (value) {
                return value + "";
              },
              max: params.tickMaxY,
              min: params.tickMinY,
              stepSize: params.tickStepY
            }
          }
        ]
      }
    }
  });
};

// BarGraph
const barChart = (params: barChartParams) => {
  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctxBar: any = document.getElementById(params.id);
  var contextBar = ctxBar.getContext("2d");
  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = false;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  var barGraph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function (barGraph) {
          var ctx = barGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          barGraph.data.datasets.forEach(function (dataset, i) {
            var meta = barGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 9;
                var fontStyle = "normal";
                var fontFamily = "Verdana";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );

                // DataSet 1
                if (i != 0) {
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  var padding = 20;
                  // var position = element.tooltipPosition();

                  ctx.fillText(
                    dataset.data[index] + "%",
                    element._view.x,
                    element._view.y - padding
                  );

                  if (index == 0) {
                    fontStyle = "normal";
                    ctx.beginPath();
                    //ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 40,
                      element._view.y - 90,
                      80,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 80
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 70
                    );
                    ctx.fillText(
                      "menor a 1 año",
                      element._view.x,
                      element._view.y - 60
                    );
                  }

                  if (index == 1) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 40,
                      element._view.y - 90,
                      80,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 80
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 70
                    );
                    ctx.fillText(
                      "entre 1 y 2 años",
                      element._view.x,
                      element._view.y - 60
                    );
                  }

                  if (index == 2) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 40,
                      element._view.y - 90,
                      80,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 80
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 70
                    );
                    ctx.fillText(
                      "entre 2 y 3 años",
                      element._view.x,
                      element._view.y - 60
                    );
                  }

                  if (index == 3) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 40,
                      element._view.y - 90,
                      80,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 80
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 70
                    );
                    ctx.fillText(
                      "entre 3 y 5 años",
                      element._view.x,
                      element._view.y - 60
                    );
                  }

                  if (index == 4) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 40,
                      element._view.y - 90,
                      80,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 80
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 70
                    );
                    ctx.fillText(
                      "mayor a 5 años",
                      element._view.x,
                      element._view.y - 60
                    );
                  }
                }

                // Line
                if (i == 0 && index == 4) {
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  var padding = 15;
                  // var position = element.tooltipPosition();

                  ctx.fillText(
                    "Inflación",
                    element._view.x + 145,
                    element._view.y - 10
                  );
                  ctx.fillText(
                    "esperada: 4.0%",
                    element._view.x + 145,
                    element._view.y
                  );

                  ctx.beginPath();
                  // ctx.lineWidth = "1";
                  ctx.strokeStyle = "#000";
                  // Tamaño 130 x 60
                  ctx.rect(element._view.x + 95, element._view.y - 30, 100, 60);
                  ctx.stroke();
                }
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            },
            stacked: true,
            ticks: {
              display: true,
              fontFamily: "Verdana",
              fontSize: 9,
              fontStyle: "bold"
            },
            scaleLabel: {
              display: true,
              labelString: params.titleX,
              fontColor: "#000"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: params.titleY,
              fontColor: "#000"
            },
            ticks: {
              display: true,
              // Y escale
              max: params.tickMaxY,
              min: params.tickMinY,
              stepSize: params.tickStepY,
              callback: function (value) {
                return value + ".0%";
              }
            }
          }
        ]
      }
    }
  });
};

// barChartNBar
const barChartNBar = (params: barChartParams) => {
  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctxBar: any = document.getElementById(params.id);
  var contextBar = ctxBar.getContext("2d");
  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = false;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  var barNGraph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function (barNGraph) {
          var ctx = barNGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          barNGraph.data.datasets.forEach(function (dataset, i) {
            var meta = barNGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );
                // Line
                if (i == 0 && index == 4) {
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  var padding = 15;
                  // var position = element.tooltipPosition();

                  ctx.fillText(
                    "Inflación",
                    element._view.x + 120,
                    element._view.y - 10
                  );
                  ctx.fillText(
                    "esperada: 4.0%",
                    element._view.x + 120,
                    element._view.y
                  );

                  ctx.beginPath();
                  // ctx.lineWidth = "1";
                  ctx.strokeStyle = "#000";
                  // Tamaño 130 x 60
                  ctx.rect(element._view.x + 80, element._view.y - 30, 120, 60);
                  ctx.stroke();
                }
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            } /**/,
            stacked: false /**/,
            ticks: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: params.titleX,
              fontColor: "#000"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            } /**/,
            stacked: false /**/,
            scaleLabel: {
              display: true,
              labelString: params.titleY,
              fontColor: "#000"
            } /**/,
            ticks: {
              display: true,
              // Y escale
              max: params.tickMaxY,
              min: params.tickMinY,
              stepSize: params.tickStepY,
              callback: function (value) {
                return value + ".0%";
              }
            } /**/
          }
        ]
      }
    }
  });
};

// lineGraph
const lineChart = (params: lineChartParams) => {
  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctxBar: any = document.getElementById(params.id);
  var contextBar = ctxBar.getContext("2d");
  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = false;
  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  var lineGraph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function (lineGraph) {
          var ctx = lineGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          lineGraph.data.datasets.forEach(function (dataset, i) {
            var meta = lineGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );

                // Line
                if (index == params.pointA) {
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  var padding = 15;
                  ctx.fillText("A", element._view.x, element._view.y - 80);
                  ctx.beginPath();
                  ctx.strokeStyle = "#000";
                  ctx.rect(element._view.x - 15, element._view.y - 90, 30, 30);
                  ctx.stroke();

                  ctx.beginPath();
                  ctx.moveTo(element._view.x, element._view.y);
                  ctx.lineTo(element._view.x - 5, element._view.y - 5);
                  ctx.lineTo(element._view.x + 5, element._view.y - 5);
                  ctx.lineTo(element._view.x, element._view.y);
                  ctx.lineTo(element._view.x, element._view.y - 60);
                  ctx.stroke();
                }

                if (index == params.pointB) {
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  var padding = 15;

                  ctx.fillText("B", element._view.x, element._view.y - 80);
                  ctx.beginPath();
                  ctx.strokeStyle = "#000";
                  ctx.rect(element._view.x - 15, element._view.y - 90, 30, 30);
                  ctx.stroke();

                  ctx.beginPath();
                  ctx.moveTo(element._view.x, element._view.y);
                  ctx.lineTo(element._view.x - 5, element._view.y - 5);
                  ctx.lineTo(element._view.x + 5, element._view.y - 5);
                  ctx.lineTo(element._view.x, element._view.y);
                  ctx.lineTo(element._view.x, element._view.y - 60);
                  ctx.stroke();
                }
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      legend: {
        display: false
      },
      tooltips: {},
      scales: {
        xAxes: [
          {
            ticks: {
              maxTicksLimit: 8
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      }
    }
  });
};

// MultilineGraph
const multiLineChart = (params: multiLineChartParams) => {
  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctxBar: any = document.getElementById(params.id);
  var contextBar = ctxBar.getContext("2d");

  // Style legends
  Chart.defaults.global.legend.labels.usePointStyle = false;
  Chart.defaults.global.legend.labels.fontSize = 9;
  Chart.defaults.global.legend.labels.boxWidth = 9;
  Chart.defaults.global.legend.position = "bottom";
  Chart.defaults.global.legend.display = true;

  // Style tittle graph
  Chart.defaults.global.title.display = false;
  Chart.defaults.global.title.text = "";
  // Graph responsive
  Chart.defaults.global.responsive = true;
  // Data point
  Chart.defaults.global.elements.point.radius = 0;

  var multiLineGraph = new Chart(contextBar, {
    plugins: [
      {
        beforeDraw: function (multiLineGraph) {
          var ctx = multiLineGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          var chartArea = multiLineGraph.chartArea;

          ctx.save();
          ctx.fillStyle = "#eaf7fe";
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          );
          ctx.restore();
        },

        afterDatasetsDraw: function (multiLineGraph) {
          var ctx = multiLineGraph.ctx;
          multiLineGraph.data.datasets.forEach(function (dataset, i) {
            var meta = multiLineGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                //ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );
              });
            }
          });
        }
      }
    ],
    type: "bar",
    data: chartData,
    options: {
      legend: {
        display: true,
        position: "right"
      },
      scales: {
        xAxes: [
          {
            ticks: {
              maxTicksLimit: 8
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true
            }
          }
        ]
      }
    }
  });
};

var pieGraph = null;

// PieGraph
const pieChart = (params: pieChartParams) => {
  if (pieGraph != null) {
    pieGraph.destroy();
  }

  var chartData = {
    labels: params.labels,
    datasets: params.dataSet
  };

  var ctxBar: any = document.getElementById(params.id);
  var contextBar = ctxBar.getContext("2d");

  pieGraph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function (pieGraph) {
          var ctx = pieGraph.ctx;
          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;
        }
      }
    ],
    type: "pie",
    data: chartData,
    options: {
      responsive: true,
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 50
        }
      },
      title: {
        display: true,
        text: params.titleX,
        padding: 50
      }
    }
  });
};

// Dates
const validateDateRage = (id: string) => {
  const lowcId = id[0].toLowerCase() + id.substr(1)
  $("#" + lowcId + "BeginDate").datepicker({
    ...uiDatepickerSettings,
    onClose: function (selectedDate, instance) {
      if (selectedDate != "") {
        $("#" + lowcId + "EndDate").datepicker("option", "minDate", selectedDate);
        var date = $.datepicker.parseDate(
          instance.settings.dateFormat,
          selectedDate,
          instance.settings
        );
        date.setMonth(date.getMonth() + 3);
        $("#" + lowcId + "EndDate").datepicker("option", "minDate", selectedDate);
        $("#" + lowcId + "EndDate").datepicker("option", "maxDate", date);
      }
    }
  });

  $("#" + lowcId + "EndDate").datepicker({
    ...uiDatepickerSettings,
    onClose: function (selectedDate) {
      $("#" + lowcId + "BeginDate").datepicker("option", "maxDate", selectedDate);
    }
  });
};

// Reset Form
$("#btnClean").click(() => {
  ($(".amFormGroup") as any).parsley().reset();
  $(".amFormGroup .amTagList li a").text("");
  $(".amFormGroup select.select2").val([]).trigger("change");
});

const getCheckedCheckbox = (id: string) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  var list: any = [];

  list = $("input[name='chk" + uppcId + "']:checked")
    .map(function () {
      return $(this).val();
    })
    .toArray();
  return list;
};

// Función creada por Guillermo Islas
function copyGridContentToClipboard(gridNameID, includeGroups) {
  if (gridNameID && gridNameID.trim()) {
    gridNameID = gridNameID.trim();
    var grid = $("#" + gridNameID);
    if (grid && grid.length > 0) {
      var gridData = $(grid).getGridParam("data");
      var totalRecords = $(grid).getGridParam("records");
      var colModel = $(grid).getGridParam("colModel");
      var headers = [];
      if (includeGroups && typeof includeGroups === "boolean") {
        var groupHeaders = $(grid).getGridParam("groupingView").groupField;
        $(groupHeaders).each(function (index, value) {
          headers.push(value);
        });
      }
      var column;
      var columnName;
      $(colModel).each(function () {
        column = $(this)[0];
        columnName = column.name;
        if (!column.hidden) {
          headers.push(columnName);
        }
      });
      var tableHeader = "<thead><tr>";
      $.each(headers, function (index, value) {
        tableHeader += "<th>" + value + "</th>";
      });
      tableHeader += "</tr></thead>";
      var totalRecordsTableRow =
        '<tr><td colspan="' +
        headers.length +
        '">Total de registros: ' +
        totalRecords +
        "</td></tr>";
      var row;
      var tableContent = "";
      $(gridData).each(function () {
        tableContent += "<tr>";
        row = $(this)[0];
        $.each(headers, function (index, header) {
          tableContent += "<td>" + row[header] + "</td>";
        });
        tableContent += "</tr>";
      });
      var tableID = "___" + gridNameID;
      var table = $(
        '<table id="' +
        tableID +
        '">' +
        tableHeader +
        "<tbody>" +
        totalRecordsTableRow +
        tableContent +
        "</tbody></table>"
      );
      $(table)
        .css("position", "absolute")
        .css("top", "-2000px")
        .css("left", "-2000px");
      $("body").append(table);
      var range = document.createRange();
      range.selectNodeContents(document.getElementById(tableID));
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      $(table).remove();
    }
  }
}

const fillQuiz = (field_group: string, id: string, quiz: any) => {
  let trElement = $("#" + field_group + " tbody");
  let answerOption = "";
  let answerSelect = "";
  let answersSelect = "";
  let answers = "";
  let question = "";
  let questions = "";
  let options = "";
  let option = "";
  let nAnswers = 0;
  let nQuestions = 0;
  let nResults = 0;
  let answerSelectId = []

  nQuestions = quiz[0].question.length;
  nAnswers = quiz[0].answer.length;
  nResults = quiz[0].result.length;

  // Questions
  for (let i = 0; i < nQuestions; i++) {
    question = "<tr><td class='question'>" + quiz[0].question[i].question;

    if (quiz[0].question[i].required) {
      question += "<span class='required'>*</span>";
    }

    question +=
      "<div class='field-error'><div id='field_error_block_encuesta_" +
      i +
      "'></div></div></td>";

    answers = "";
    options = "";

    // Answers
    for (let j = 0; j < nAnswers; j++) {
      let answer_points = quiz[0].question[i].points
        ? quiz[0].question[i].points[j]
        : "1";
      let disabled = quiz[0].answer[j].disabled;

      let db = "";

      if (quiz[0].answer[j].type == "option") {
        answerOption =
          "<td>" +
          "<div class='answer'>" +
          "<input type='radio' id='" +
          id +
          "_" +
          i +
          "_" +
          j +
          "' name='" +
          id +
          "_" +
          i +
          "' required data-parsley-errors-container='#field_error_block_" +
          id +
          "_" +
          j +
          "'";

        if (quiz[0].result[i].results[j].result) {
          answerOption += "checked='checked'";
        }

        answerOption +=
          "data-points='" +
          answer_points +
          "'>" +
          "<span class='checkmark'></span>" +
          "</div>" +
          "</td>";

        answers += answerOption;
      }

      if (quiz[0].answer[j].type == "select") {
        answerSelect =
          '<td><div class="answer">' +
          '<select class="select2" id="encuesta_' +
          i +
          "_" +
          j +
          '" name="quiz_select" style="width: 12em;" required ' +
          db +
          " " +
          'data-parsley-errors-container="#field_error_block_' +
          id +
          "_" +
          i +
          '">';

        answerSelectId.push(id + "_" + i + "_" + j);
        let optionValue = quiz[0].result[i].results[j].result;

        options = "";
        for (let k = 0; k < quiz[0].answer[j].options.length; k++) {
          option = '<option value="' + quiz[0].answer[j].options[k].key + '"';

          if (optionValue == quiz[0].answer[j].options[k].key) {
            option += " selected";
          }

          option += ">" + quiz[0].answer[j].options[k].value + "</option>";
          options += option;
        }

        answersSelect = answerSelect + options + "</select></div>" + "</td>";
        answers += answersSelect;
      }
    }

    questions = question + answers + "</tr>";
    trElement.append(questions);
    if (answerSelectId.length != 0) {
      initializeSelect2(answerSelectId);
    }
  }
};

function initializeSelect2(isQuizSelect2: string[]) {
  for (let i = 0; i < isQuizSelect2.length; i++) {
    ($("#" + isQuizSelect2[i]) as any).select2({
      language: "es",
      minimumResultsForSearch: Infinity
    });
  }
}

const fieldDateClear = (id: string) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const lowcId = id[0].toLowerCase() + id.substr(1)
  var fieldId = "#" + lowcId;
  var $dates = $(fieldId).datepicker();

  $("#imgClear" + uppcId).on("click", function () {
    $dates.datepicker("setDate", null);
  });
};

const fieldBeginDateRangeClear = (id: string) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const lowcId = id[0].toLowerCase() + id.substr(1)
  var fieldId = $("#" + lowcId + "BeginDate");
  var $dates = $(fieldId).datepicker();

  $("#imgClear" + uppcId + "BeginDate").on("click", function () {
    $dates.datepicker("setDate", null);
  });
};

const fieldEndDateRangeClear = (id: string) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  const lowcId = id[0].toLowerCase() + id.substr(1)
  var fieldId = $("#" + lowcId + "EndDate");
  var $dates = $(fieldId).datepicker();

  $("#imgClear" + uppcId + "EndDate").on("click", function () {
    $dates.datepicker("setDate", null);
  });
};

const json2xml = (o, tab) => {
  var toXml = function (v, name, ind) {
    var xml = "";
    if (v instanceof Array) {
      for (var i = 0, n = v.length; i < n; i++)
        xml += ind + toXml(v[i], name, ind + "\t") + "\n";
    } else if (typeof v == "object") {
      var hasChild = false;
      xml += ind + "<" + name;
      for (var m in v) {
        if (m.charAt(0) == "@")
          xml += " " + m.substr(1) + '="' + v[m].toString() + '"';
        else hasChild = true;
      }
      xml += hasChild ? ">" : "/>";
      if (hasChild) {
        for (var m in v) {
          if (m == "#text") xml += v[m];
          else if (m == "#cdata") xml += "<![CDATA[" + v[m] + "]]>";
          else if (m.charAt(0) != "@") xml += toXml(v[m], m, ind + "\t");
        }
        xml +=
          (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
      }
    } else {
      xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
    }
    return xml;
  },
    xml = "";
  for (var m in o) xml += toXml(o[m], m, "");
  return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
};

const xml2json = (xml, tab) => {
  var X = {
    toObj: function (xml) {
      var o = {};
      if (xml.nodeType == 1) {
        // element node ..
        if (xml.attributes.length)
          // element with attributes  ..
          for (var i = 0; i < xml.attributes.length; i++)
            o["@" + xml.attributes[i].nodeName] = (
              xml.attributes[i].nodeValue || ""
            ).toString();
        if (xml.firstChild) {
          // element has child nodes ..
          var textChild = 0,
            cdataChild = 0,
            hasElementChild = false;
          for (var n = xml.firstChild; n; n = n.nextSibling) {
            if (n.nodeType == 1) hasElementChild = true;
            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/))
              textChild++;
            // non-whitespace text
            else if (n.nodeType == 4) cdataChild++; // cdata section node
          }
          if (hasElementChild) {
            if (textChild < 2 && cdataChild < 2) {
              // structured element with evtl. a single text or/and cdata node ..
              X.removeWhite(xml);
              for (var n = xml.firstChild; n; n = n.nextSibling) {
                if (n.nodeType == 3)
                  // text node
                  o["#text"] = X.escape(n.nodeValue);
                else if (n.nodeType == 4)
                  // cdata node
                  o["#cdata"] = X.escape(n.nodeValue);
                else if (o[n.nodeName]) {
                  // multiple occurence of element ..
                  if (o[n.nodeName] instanceof Array)
                    o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                  else o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                } // first occurence of element..
                else o[n.nodeName] = X.toObj(n);
              }
            } else {
              // mixed content
              if (!xml.attributes.length) o = X.escape(X.innerXml(xml));
              else o["#text"] = X.escape(X.innerXml(xml));
            }
          } else if (textChild) {
            // pure text
            if (!xml.attributes.length) o = X.escape(X.innerXml(xml));
            else o["#text"] = X.escape(X.innerXml(xml));
          } else if (cdataChild) {
            // cdata
            if (cdataChild > 1) o = X.escape(X.innerXml(xml));
            else
              for (var n = xml.firstChild; n; n = n.nextSibling)
                o["#cdata"] = X.escape(n.nodeValue);
          }
        }
        if (!xml.attributes.length && !xml.firstChild) o = null;
      } else if (xml.nodeType == 9) {
        // document.node
        o = X.toObj(xml.documentElement);
      } else alert("unhandled node type: " + xml.nodeType);
      return o;
    },
    toJson: function (o, name, ind) {
      var json = name ? '"' + name + '"' : "";
      if (o instanceof Array) {
        for (var i = 0, n = o.length; i < n; i++)
          o[i] = X.toJson(o[i], "", ind + "\t");
        json +=
          (name ? ":[" : "[") +
          (o.length > 1
            ? "\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind
            : o.join("")) +
          "]";
      } else if (o == null) json += (name && ":") + "null";
      else if (typeof o == "object") {
        var arr = [];
        for (var m in o) arr[arr.length] = X.toJson(o[m], m, ind + "\t");
        json +=
          (name ? ":{" : "{") +
          (arr.length > 1
            ? "\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind
            : arr.join("")) +
          "}";
      } else if (typeof o == "string")
        json += (name && ":") + '"' + o.toString() + '"';
      else json += (name && ":") + o.toString();
      return json;
    },
    innerXml: function (node) {
      var s = "";
      if ("innerHTML" in node) s = node.innerHTML;
      else {
        var asXml = function (n) {
          var s = "";
          if (n.nodeType == 1) {
            s += "<" + n.nodeName;
            for (var i = 0; i < n.attributes.length; i++)
              s +=
                " " +
                n.attributes[i].nodeName +
                '="' +
                (n.attributes[i].nodeValue || "").toString() +
                '"';
            if (n.firstChild) {
              s += ">";
              for (var c = n.firstChild; c; c = c.nextSibling) s += asXml(c);
              s += "</" + n.nodeName + ">";
            } else s += "/>";
          } else if (n.nodeType == 3) s += n.nodeValue;
          else if (n.nodeType == 4) s += "<![CDATA[" + n.nodeValue + "]]>";
          return s;
        };
        for (var c = node.firstChild; c; c = c.nextSibling) s += asXml(c);
      }
      return s;
    },
    escape: function (txt) {
      return txt
        .replace(/[\\]/g, "\\\\")
        .replace(/[\"]/g, '\\"')
        .replace(/[\n]/g, "\\n")
        .replace(/[\r]/g, "\\r");
    },
    removeWhite: function (e) {
      e.normalize();
      for (var n = e.firstChild; n;) {
        if (n.nodeType == 3) {
          // text node
          if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
            // pure whitespace text node
            var nxt = n.nextSibling;
            e.removeChild(n);
            n = nxt;
          } else n = n.nextSibling;
        } else if (n.nodeType == 1) {
          // element node
          X.removeWhite(n);
          n = n.nextSibling;
        } // any other node
        else n = n.nextSibling;
      }
      return e;
    }
  };
  if (xml.nodeType == 9)
    // document node
    xml = xml.documentElement;
  var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
  return (
    "{\n" +
    tab +
    (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) +
    "\n}"
  );
};

const fillSwapList = (id: string, listId: string, params: any) => {
  const uppcId = id[0].toUpperCase() + id.substr(1)
  var fieldId = "#" + uppcId;
  var list = $(fieldId + listId);

  for (var i = 0; i < params.length; i++) {
    var data = params[i];
    list.append(
      "<li class='portlet' value=" +
      data.value +
      "><div class='portlet-content'>" +
      data.label +
      "</div></li>"
    );
  }
};

$("ul.amColumn").on("click", "li", function () {
  if ($(this).hasClass("selected")) {
    $(this).removeClass("selected");
  } else {
    clearList();
    $(this).addClass("selected");
  }
});

// Up
$(".amUp").click(function () {
  var currents = $(".portlet.selected");
  currents.prev().before(currents);
});

// Down
$(".amDown").click(function () {
  var currents = $(".portlet.selected");
  currents.next().after(currents);
});

// Add
$(".amAdd").click(function () {
  var currents = $(".portlet.selected");
  $(".amColumn.amDestination").append(currents);
  clearList();
});

// Remove
$(".amRemove").click(function () {
  var currents = $(".portlet.selected");
  $(".amColumn.amSource").append(currents);
  clearList();
});

$(".amColumn").sortable({
  connectWith: ".column",
  handle: ".portlet-content",
  cancel: ".portlet-toggle",
  placeholder: "portlet-placeholder ui-corner-all"
});

$(".portlet")
  .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
  .find(".portlet-content")
  .addClass("ui-corner-all");

const clearList = () => {
  $("ul.amColumn li").removeClass("selected");
};

const formatNumber = {
  separador: ",",
  sepDecimal: ".",
  formatear: function (num) {
    num += "";
    var splitStr = num.split(".");
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : "";
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, "$1" + this.separador + "$2");
    }
    return this.simbol + splitLeft + splitRight;
  },
  new: function (num, simbol) {
    this.simbol = simbol || "";
    return this.formatear(num);
  }
};

$(".amCurrency").mask("###,###,##0", { reverse: true });
$(".amNumber").mask("###,###,##0.00", { reverse: true });
$(".amInteger").mask("###,###,##0", { reverse: true });
$(".amDatepicker").mask("99-99-9999");

const putErrorsInAttrTitle = (e: any) => {
  if (e.$element.tooltip('instance') != undefined) {
    e.$element.tooltip('destroy');
  }

  // console.log(e.$element);
  // console.log(e.getErrorsMessages());
  const isInput = $(e.$element).hasClass("amInput");
  const isMultiSelect = $(e.$element).is("select[multiple='multiple']");
  if (isInput || isMultiSelect) {
    e.$element.tooltip({
      content: e.getErrorsMessages().join("<br />"),
      items: e.$element,
      position: { my: 'left center', at: 'right+10 center' }
    });
  }

  if (e.$element.next(".amCheckmark").tooltip('instance') != undefined) {
    e.$element.next(".amCheckmark").tooltip('destroy');
  }

  const isRadio = $(e.$element).is("input[type='radio']");
  const isCheckbox = $(e.$element).is("input[type='checkbox']");
  if (isRadio || isCheckbox) {
    e.$element.next(".amCheckmark").tooltip({
      content: e.getErrorsMessages().join("<br />"),
      items: e.$element.next(".amCheckmark"),
      position: { my: 'left center', at: 'right+10 center' }
    });
  }

  if (e.$element.next(".select2").tooltip('instance') != undefined) {
    e.$element.next(".select2").tooltip('destroy');
  }

  const isSelect2 = $(e.$element).is("select");
  if (isSelect2) {
    // console.log(e.$element.next(".select2"));
    e.$element.next(".select2").tooltip({
      content: e.getErrorsMessages().join("<br />"),
      items: e.$element.next(".select2"),
      position: { my: 'left center', at: 'right+10 center' }
    });
  }
}

const removeErrorsInAttrTitle = (e: any) => {
  if (e.$element.tooltip('instance') != undefined) {
    e.$element.tooltip('destroy');
  }

  if (e.$element.next(".amCheckmark").tooltip('instance') != undefined) {
    e.$element.next(".amCheckmark").tooltip('destroy');
  }

  if (e.$element.next(".select2").tooltip('instance') != undefined) {
    e.$element.next(".select2").tooltip('destroy');
  }
}

const isSelectedColumnn = (columnName: String, selectedColumns: any) => {
  let isSelected: boolean = false;

  for (var i = 0; i < selectedColumns.length; i++) {
    if (selectedColumns[i] == columnName) {
      isSelected = true;
      break;
    }
  }

  return isSelected;
};

const responsiveEffect = (widthTable: number, numColumnsBase: number, selectedColumns: any, idTable: String, idSplitterContainer: String) => {
  var colModel = $("#" + idTable).jqGrid('getGridParam', 'colModel');
  var numColumnas = selectedColumns.length + numColumnsBase;
  var gridWidth = $("#splitter-container").parent().width();

  if (gridWidth > widthTable) {
    gridWidth = widthTable;
  }
  widthColumns = gridWidth / numColumnas;

  $("#" + idTable).jqGrid("setGridWidth", gridWidth, true);

  for (var j = 0; j < colModel.length; j++) {
    $("#" + idTable).jqGrid('resizeColumn', colModel[j].name, 0);

    if (j < 2 || isSelectedColumnn(colModel[j].name, selectedColumns)) {
      $("#" + idTable).jqGrid('resizeColumn', colModel[j].name, widthColumns);
    }
  }

  $("#gbox_" + idTable).attr("style", "width: " + gridWidth + "px;");
  $("#gview_" + idTable).attr("style", "width: " + gridWidth + "px;");

  windowResize(widthTable, idTable, idSplitterContainer);
}

const windowResize = (widthTable: number, idTable: String, idSplitterContainer: String) => {
  $(window).on("resize", function () {
    var gridWidth = $("#" + idSplitterContainer).parent().width();

    if (gridWidth > widthTable) {
      gridWidth = widthTable;
    }
    
    $("#" + idTable).jqGrid("setGridWidth", gridWidth, true);
  });
}

// Get RGB Color
const colorSet = (
  rMin: number,
  rMax: number,
  gMin: number,
  gMax: number,
  bMin: number,
  bMax: number,
  min: number,
  max: number) => {

  let c = "";
  let colorArray = [];

  let arrayR = [];
  let colorR = rMin
  while (colorR <= rMax) {
    colorR = colorR + 40;
    arrayR.push(colorR);
  }

  let arrayG = [];
  let colorG = gMin
  while (colorG <= gMax) {
    colorG = colorG + 40;
    arrayG.push(colorG);
  }

  let arrayB = [];
  let colorB = bMin
  while (colorB <= bMax) {
    colorB = colorB + 40;
    arrayB.push(colorB);
  }

  let arrayC = [];
  let colorC = min
  while (colorC <= max) {
    colorC = colorC + 0.2;
    arrayC.push(colorC);
  }

  for (let i = 0; i < arrayR.length; i++) {
    for (let j = 0; j < arrayG.length; j++) {
      for (let k = 0; k < arrayB.length; k++) {
        for (let z = 0; z < arrayC.length; z++) {
          c = "rgb(" + arrayR[i] + ", " + arrayG[j] + ", " + arrayR[k] + "," + arrayC[z] + ")";
          colorArray.push(c);
        }
      }
    }
  }
  return colorArray;
};

// Get All Set Color
const getColorPieArray = () => {
  let colorArray = [];
  let colorBase = [];
  let colorArrayG = [];
  let colorArrayB = [];
  let colorArrayBL = [];

  colorBase = [
    "#becfda", "#dfe7ec", "#d9d9d9", "#00b5cc", "#87d1d9",
    "#87d1d9", "#5d87a1", "#a6a6a6", "#53565a", "#afaeb0",
    "#636165", "#466579", "#9eb7c7"];

  colorArray = colorBase;
  // Grey
  colorArrayG = colorSet(83, 166, 86, 166, 90, 166, 0, 1);
  colorArrayG.forEach(element => {
    colorArray.push(element);
  });
  // Blue
  colorArrayB = colorSet(93, 135, 135, 209, 161, 217, 0, 1);
  colorArrayB.forEach(element => {
    colorArray.push(element);
  });
  // Blue Light
  colorArrayBL = colorSet(0, 135, 181, 209, 204, 217, 0, 1);
  colorArrayBL.forEach(element => {
    colorArray.push(element);
  });

  return colorArray;
}

let pieColors = (function () {
  let colors = Highcharts.map(getColorPieArray(),
    function (color) {
      return {
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7
        },
        stops: [
          [0, color],
          [
            1,
            Highcharts.color(color)
              .brighten(-0.3)
              .get("rgb")
          ]
        ]
      };
    }
  )
  return colors;
}());

const pieHighchart = (params: pieHighchartParams) => {
  // Pie Graph
  Highcharts.chart(params.id, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: params.title
    },
    tooltip: {
      pointFormat: params.format
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors,
        dataLabels: {
          enabled: true,
          format: params.plotOptionsFormat,
          connectorColor: "silver"
        }
      }
    },
    series: [
      {
        name: params.labelsX,
        data: params.dataSet,
        type: undefined,
        animation: {
          duration: 1000
        },
        shadow: true
      }
    ]
  });
};

const pieBorderHighchart = (params: pieHighchartParams) => {
  // Pie Graph
  Highcharts.chart(params.id, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: params.title
    },
    tooltip: {
      pointFormat: params.format
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors,
        dataLabels: {
          enabled: true,
          format: params.plotOptionsFormat,
          connectorColor: "silver"
        },
        borderWidth: 10
      }
    },
    series: [
      {
        name: params.labelsX,
        data: params.dataSet,
        type: undefined,
        animation: {
          duration: 1000
        },
        shadow: true
      }
    ]
  });
};

const barHighchart = (params: barHighchartParams) => {

  let arrayData = [];

  if (params.dataSet[0]['value']['x'] != "") {
    arrayData.push(
      {
        color: '#53565a',
        name: params.dataSet[0]['value']['x'],
        borderRadiusBottomLeft: params.dataSet[0]['radiusLeftTop'],
        borderRadiusBottomRight: params.dataSet[0]['radiusLeftBottom'],
        borderRadiusTopLeft: params.dataSet[0]['radiousRightTop'],
        borderRadiusTopRight: params.dataSet[0]['radiousRightBottom'],
        data: [
          {
            y: params.dataSet[0]['value']['y'],
            color: '#53565a'
          },
          {
            y: params.dataSet[0]['value']['y'],
            color: {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, '#ffffff'], // start
                [0.2, '#ffffff'], // middle
                [1, '#c9cacc'] // end
              ]
            }
          },
        ],
        pointPadding: -0.15,
        type: undefined,
      });
  }

  if (params.dataSet[1]['value']['x'] != "") {
    arrayData.push({
      color: '#a6a6a6',
      name: params.dataSet[1]['value']['x'],
      borderRadiusBottomLeft: params.dataSet[1]['radiusLeftTop'],
      borderRadiusBottomRight: params.dataSet[1]['radiusLeftBottom'],
      borderRadiusTopLeft: params.dataSet[1]['radiousRightTop'],
      borderRadiusTopRight: params.dataSet[1]['radiousRightBottom'],
      data: [
        {
          y: params.dataSet[1]['value']['y'],
          color: '#a6a6a6'
        },
        {
          y: params.dataSet[1]['value']['y'],
          color: {
            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            stops: [
              [0, '#ffffff'], // start
              [0.2, '#ffffff'], // middle
              [1, '#d9d9d9'] // end
            ]
          }
        },
      ],
      pointPadding: -0.15,
      type: undefined
    });
  }

  if (params.dataSet[2]['value']['x'] != "") {
    arrayData.push({
      color: '#5d87a1',
      name: params.dataSet[2]['value']['x'],
      borderRadiusBottomLeft: params.dataSet[2]['radiusLeftTop'],
      borderRadiusBottomRight: params.dataSet[2]['radiusLeftBottom'],
      borderRadiusTopLeft: params.dataSet[2]['radiousRightTop'],
      borderRadiusTopRight: params.dataSet[2]['radiousRightBottom'],
      data: [
        {
          y: params.dataSet[2]['value']['y'],
          color: '#5d87a1'
        },
        {
          y: params.dataSet[2]['value']['y'],
          color: {
            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            stops: [
              [0, '#ffffff'], // start
              [0.2, '#ffffff'], // middle
              [1, '#aec3d0'] // end
            ]
          }
        },
      ],
      pointPadding: -0.15,
      type: undefined
    });
  }

  if (params.dataSet[3]['value']['x'] != "") {
    arrayData.push(
      {
        color: '#87d1d9',
        name: params.dataSet[3]['value']['x'],
        borderRadiusBottomLeft: params.dataSet[3]['radiusLeftTop'],
        borderRadiusBottomRight: params.dataSet[3]['radiusLeftBottom'],
        borderRadiusTopLeft: params.dataSet[3]['radiousRightTop'],
        borderRadiusTopRight: params.dataSet[3]['radiousRightBottom'],
        data: [
          {
            y: params.dataSet[3]['value']['y'],
            color: '#87d1d9',
            borderRadiusTopLeft: 10
          },
          {
            y: params.dataSet[3]['value']['y'],
            color: {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, '#ffffff'], // start
                [0.2, '#ffffff'], // middle
                [1, '#c3e8ec'] // end
              ]
            }
          },
        ],
        pointPadding: -0.15,
        type: undefined
      });
  }

  Highcharts.chart(params.id, {
    chart: {
      type: 'bar',
      events: {
        load: function () {
          let categoryHeight = 50;
          this.update({
            chart: {
              height:
                categoryHeight * 1 +
                (this.chartHeight - this.plotHeight)
            }
          });
        }
      }
    },
    title: {
      text: params.title
    },
    xAxis: {
      categories: [params.dataSet[0]['title'], ''],
      visible: false
    },
    yAxis: {
      min: 0,
      visible: false,
      title: {
        text: ''
      },
      labels: {
        enabled: false,
        style: {
          color: '#000000',
        }
      },
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      layout: 'vertical',
      x: 20,
      y: 5
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        shadow: false
      }
    },
    series: arrayData

  });

};

const verifyYear = (day: number, month: number, year: number) => {
  let countMonthYear = 0;
  let countMonth = 0;
  let monthNum = 0;
  let monthL = 0;
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  // Day of month
  let indexMonth = 0;
  let d = new Date();
  let yPlus = d.getFullYear() + 100;
  let yMinus = d.getFullYear() - 100;

  // Para obtener el año bisiesto
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Si la fecha está fuera del rango superior 100 años
  if (year > yPlus) {
    year = d.getFullYear();
  }

  // Si la fecha está fuera del rango inferior 100 años
  if (year < yMinus) {
    year = d.getFullYear();
  }

  if (month > 0) {

    monthNum = month - 1;

    // Obtener un mes base
    if (monthNum > 11) {
      while (monthNum > 11) {
        monthNum = monthNum - 12;
      }
    }

    if (day > monthLength[monthNum]) {
      while (day > monthLength[monthNum]) {

        indexMonth = monthNum + countMonth;

        if (indexMonth < 12) {
          monthL = monthLength[indexMonth];
        } else {
          monthL = monthLength[indexMonth - 12];
        }
        day = day - monthL;
        countMonth++;
      }
    }

    month = month + countMonth;

    if (month > 12) {
      while (month > 12) {
        month = month - 12;
        countMonthYear++;
      }
    }
    year = year + countMonthYear;
  }
  return year;
};

const verifyMonth = (day: number, month: number, year: number) => {
  let countMonth = 0;
  let monthNum = 0;
  let monthL = 0;
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  // Day of month
  let indexMonth = 0;

  // Para obtener el año bisiesto
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Verifica si el mes es mayor a 0
  monthNum = month - 1;

  // Obtener un mes base
  if (monthNum > 11) {
    while (monthNum > 11) {
      monthNum = monthNum - 12;
    }
  }

  if (day > monthLength[monthNum]) {
    while (day > monthLength[monthNum]) {
      indexMonth = monthNum + countMonth;
      if (indexMonth < 12) {
        monthL = monthLength[indexMonth];
      } else {
        monthL = monthLength[indexMonth - 12];
      }
      day = day - monthL;
      countMonth++;
    }
  }

  month = month + countMonth;

  if (month > 12) {
    while (month > 12) {
      month = month - 12;
    }
  }
  return month;
};

const verifyDay = (day: number, month: number, year: number) => {
  let countMonth = 0;
  let monthNum = 0;
  let monthL = 0;
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  // Day of month
  let indexMonth = 0;

  // Para obtener el año bisiesto
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Obtiene el mes para el número de días, mes actual
  monthNum = month - 1;

  // Obtener un mes base
  if (monthNum > 11) {
    while (monthNum > 11) {
      monthNum = monthNum - 12;
    }
  }

  // Verifica los días permitido
  if (day > monthLength[monthNum]) {
    while (day > monthLength[monthNum]) {
      indexMonth = monthNum + countMonth;

      if (indexMonth < 12) {
        monthL = monthLength[indexMonth];
      } else {
        monthL = monthLength[indexMonth - 12];
      }

      day = day - monthL;
      countMonth++;
    }
  }
  return day;
};

const verifyDate = (data: string, obj: any) => {
  let array = [];
  array = data.split("-");

  let d = new Date();
  let dd = d.getDate();
  let dm = d.getMonth();
  let dy = d.getFullYear();

  let day = parseInt(array[0]);
  let month = parseInt(array[1]);
  let year = parseInt(array[2]);

  let dayA = array[0];
  if (dayA.length != 2 || dayA == "00" || dayA == undefined) {
    day = dd;
  }

  let monthA = array[1];
  if (monthA.length != 2 || monthA == "00" || monthA == undefined) {
    month = dm + 1;
  }

  let yearA = array[2];
  if (yearA.length != 4 || yearA == "0000" || yearA == undefined) {
    year = dy;
  }

  let nMonth = 0;
  let nDay = 0;
  let nYear = 0;

  nDay = verifyDay(day, month, year);
  nMonth = verifyMonth(day, month, year);
  nYear = verifyYear(day, month, year);

  $(obj).val("" + pad(nDay, 2, "") + "-" + pad(nMonth, 2, "") + "-" + nYear);
}

$(".amDatepicker").focusout(function () {
  let date = $(this)
    .val()
    .toString();
  if (date != "") {
    verifyDate(date, $(this));
  }

});

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

$(".amDatepicker").on("keydown", function (e) {
  let date = $(this)
    .val()
    .toString();

  if (e.which == 13) {
    e.preventDefault();
    if (date != "") {
      verifyDate(date, $(this));
    }
  }
});


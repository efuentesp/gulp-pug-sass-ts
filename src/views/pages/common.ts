/// <reference path="typings/index.d.ts" />

console.log("common.ts");

const REST_URL = "http://localhost:3000";

interface UrlParams {
  [key: string]: any;
}

// Query UI DatePicker settings
const DATE_FORMAT = "dd-mm-yy";
const DATE_FORMAT_MONTH_YEAR = "MM yy";

const ui_datepicker_settings = {
  showOn: "both",
  buttonImage: "../../assets/images/btn-calendario.svg",
  buttonImageOnly: true,
  buttonText: "",
  dateFormat: DATE_FORMAT,
  changeMonth: true,
  changeYear: true,
  showButtonPanel: true,
  currentText: "Hoy",
  closeText: "Limpiar",
  onClose: function(dateText, inst) {
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

const ui_datepicker_month_year_settings = {
  changeMonth: true,
  changeYear: true,
  showButtonPanel: false,
  dateFormat: DATE_FORMAT_MONTH_YEAR,
  onChangeMonthYear: function(year, month, inst) {
    $(this).datepicker(
      "setDate",
      new Date(inst.selectedYear, inst.selectedMonth, 1)
    );
  }
};

// Query UI Accordion settings
const icons = { header: "plus-icon", activeHeader: "minus-icon" };

const ui_accordion_settings = {
  collapsible: true,
  icons: icons,
  heightStyle: "content"
};

// Timepicker
// ($(".timepicker") as any).wickedpicker();

// Query UI Tooltip settings
$(document).tooltip({
  disabled: true
});

// Coloca el atributo "title" al botón para que aparezca el tooltip
$(".button").each(function(i, obj) {
  // const label = $(`#${obj.id} span`).html();
  const label = $(`#${obj.id}`).attr("data-tooltip");
  $(`#${obj.id}`).attr("title", label);
});

// Tabs
$(".tab-group").tabs();

// Accordion
$(".accordion").accordion(ui_accordion_settings);

// DatePicker
$(".datepicker")
  .datepicker(ui_datepicker_settings)
  .prop("readonly", false);

// DatePicker Month Year
$(".monthpicker").datepicker(ui_datepicker_month_year_settings);

// Splitter
$(".splitter-vertical").splitter();
$(".splitter-horizontal").splitter({ type: "h" });

// JqGrid functions
const fillJqGrid = (grid_id: string, data: any[]) => {
  $(grid_id).jqGrid("clearGridData");
  data.forEach((item, i) => $(grid_id).jqGrid("addRowData", i + 1, item));
};

// Switch / Toggle
($(".radio-toggle") as any).toggleInput();

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

($("select[name=quiz_select]") as any).select2({
  minimumResultsForSearch: Infinity
});

const http_findAll = rest_findAll;
// const http_findAll$ = rest_findAll$;
const http_findOne = rest_findOne;
const http_findOne$ = rest_findOne$;
const http_create = rest_create;
// const http_create$ = rest_create$;

const existText = (text_to_add: string, list: string) => {
  let exist = false;
  let count = 1;

  $.each($(list + " li a"), function() {
    if (
      $(list + " li:nth-child(" + count + ")").text() === text_to_add.trim()
    ) {
      exist = true;
      return false;
    }
    count++;
  });
  return exist;
};

const addedText = (text_to_add: string, value_to_add: string, list: string) => {
  let added = false;
  let count = 1;

  $.each($(list + " li a"), function() {
    if ($(list + " li:nth-child(" + count + ") a").text() === "") {
      $(list + " li:nth-child(" + count + ") a").attr("id", value_to_add);
      $(list + " li:nth-child(" + count + ") a").append(text_to_add);
      added = true;
      return false;
    }
    count++;
  });

  return added;
};

const addNode = (
  text_to_add: string,
  value_to_add: string,
  list: string,
  maxsize: number
) => {
  if (maxsize != null) {
    if ($(list + " li").length < maxsize) {
      $(list).append(
        "<li><a id=" +
          value_to_add +
          " class='delete_item' href='javascript:void();'>" +
          text_to_add +
          "</a></li>"
      );
    }
  } else {
    $(list).append(
      "<li><a id=" +
        value_to_add +
        " class='delete_item' href='javascript:void();'>" +
        text_to_add +
        "</a></li>"
    );
  }
};

function fieldPlusMinusMaxWidth(node) {
  let listcontentvalue = [];
  let max_width_size = 0;
  let nodelist: HTMLUListElement = document.getElementById(
    node
  ) as HTMLUListElement;
  $(nodelist.childNodes).each(function(childNode) {
    if (nodelist.childNodes[childNode].childNodes[0].textContent) {
      listcontentvalue.push(
        nodelist.childNodes[childNode].childNodes[0].textContent
      );
    }
  });
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = "10px verdana";
  listcontentvalue.forEach(function(text) {
    let metric = context.measureText(text).width + 10;
    if (metric > max_width_size) {
      max_width_size = metric;
    }
  });
  return max_width_size;
}

function fieldPlusMinusRepaintList(node) {
  let max_width_size = fieldPlusMinusMaxWidth(node);
  let listcontentid = [];
  let listcontentvalue = [];
  let nodelist: HTMLUListElement = document.getElementById(
    node
  ) as HTMLUListElement;
  let listSize = nodelist.childNodes.length;
  $(nodelist.childNodes).each(function(childNode) {
    if (nodelist.childNodes[childNode].childNodes[0].textContent) {
      listcontentid.push(
        (nodelist.childNodes[childNode]
          .childNodes[0] as HTMLElement).getAttribute("id")
      );
      listcontentvalue.push(
        nodelist.childNodes[childNode].childNodes[0].textContent
      );
    }
  });
  while (nodelist.firstChild) {
    nodelist.removeChild(nodelist.firstChild);
  }

  for (let i = 0; i < listSize; i++) {
    let tagLi = document.createElement("LI");
    let tagA = document.createElement("A");
    tagA.setAttribute("class", "delete_item");
    tagA.setAttribute("href", "javascript:void();");
    if (i < listcontentid.length) {
      tagA.setAttribute("id", listcontentid[i]);
      tagA.innerHTML = listcontentvalue[i];
    }

    if (max_width_size > 84.5) {
      tagLi.setAttribute("style", "width: " + max_width_size + "px;");
    }
    tagLi.appendChild(tagA);
    nodelist.appendChild(tagLi);
  }
}

// Plus Minus
const fieldPlusMinus = (id: string, params: any) => {
  console.log("Field Plus Minus");
  const idBtnPlus = "#btn_plus_" + id;
  const idBtnMinus = "#btn_minus_" + id;
  const idInput = "#" + id;
  const list = "ul#tag_list_" + id;
  const node = "tag_list_" + id;
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
        "<li><a class='delete_item' href='javascript:void();'></a></li>"
      );
    }
  }

  $(idBtnPlus).click(() => {
    const text_to_add = $(idInput).val() as string;
    const value_to_add = $(idInput).val() as string;

    if (!existText(text_to_add, list)) {
      if (!addedText(text_to_add, value_to_add, list)) {
        addNode(text_to_add, value_to_add, list, params.maxsize);
      }
    }
    fieldPlusMinusRepaintList(node);
    $(idInput).val("");
  });

  $(idBtnMinus).click(() => {
    var nodelist = document.getElementById(node);
    $(list + " li a").each(function(index) {
      if ($(idInput).val() != "") {
        if ($(this).text() === $(idInput).val()) {
          if (!definedNodes) {
            nodelist.childNodes[index].remove();
            $(list + " li").length = $(list + " li").length - 1;
          } else {
            if ($(list + " li").length <= 4) {
              $(this)
                .find("a")
                .first()
                .removeAttr("id");
              $(this).text("");
            } else {
              nodelist.childNodes[index].remove();
              $(list + " li").length = $(list + " li").length - 1;
            }
          }
        }
      }
    });
    fieldPlusMinusRepaintList(node);
    $(idInput).val("");
  });

  // Set to input
  $(list).delegate(".delete_item", "click", function() {
    $(idInput).val(
      $(this)
        .parent()
        .find(".delete_item")
        .html()
    );
  });
};

// Select Plus Minus
const fieldSelectPlusMinus = (id: string, params: any) => {
  const idBtnPlus = "#btn_plus_" + id;
  const idBtnMinus = "#btn_minus_" + id;
  const idInput = "#" + id;
  const list = "ul#tag_list_" + id;
  const node = "tag_list_" + id;
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
        "<li><a class='delete_item' href='javascript:void();'></a></li>"
      );
    }
  }

  $(idBtnPlus).click(() => {
    const text_to_add = $(idInput + " option:selected").text() as string;
    const value_to_add = $(idInput + " option:selected").val() as string;

    if (!existText(text_to_add, list)) {
      if (!addedText(text_to_add, value_to_add, list)) {
        addNode(text_to_add, value_to_add, list, params.maxsize);
      }
    }
    fieldPlusMinusRepaintList(node);
    $(idInput)
      .val(null)
      .trigger("change");
  });

  $(idBtnMinus).click(() => {
    var nodelist = document.getElementById(node);
    $(list + " li a").each(function(index) {
      if ($(this).attr("id") === $(idInput).val()) {
        if (!definedNodes) {
          nodelist.childNodes[index].remove();
          $(list + " li").length = $(list + " li").length - 1;
        } else {
          if ($(list + " li").length <= 4) {
            $(this)
              .find("a")
              .first()
              .removeAttr("id");
            $(this).text("");
          } else {
            nodelist.childNodes[index].remove();
            $(list + " li").length = $(list + " li").length - 1;
          }
        }
      }
    });

    fieldPlusMinusRepaintList(node);

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
    placeholder: "",
    minimumResultsForSearch: Infinity
  });
};

// Autocomplete Plus Minus
const fieldSelectPlusAutocomplete = (id: string, params: any) => {
  const idBtnPlus = "#btn_plus_" + id;
  const idBtnMinus = "#btn_minus_" + id;
  const idInput = "#" + id;
  const list = "ul#tag_list_" + id;
  const node = "tag_list_" + id;
  const restService = params.service;
  const attrId = params.id;
  const attrText = params.text;
  const payload = params.payload;
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
        "<li><a class='delete_item' href='javascript:void();'></a></li>"
      );
    }
  }

  $(idBtnPlus).click(() => {
    const text_to_add = $(idInput + " option:selected").text() as string;
    const value_to_add = $(idInput + " option:selected").val() as string;

    if (!existText(text_to_add, list)) {
      if (!addedText(text_to_add, value_to_add, list)) {
        addNode(text_to_add, value_to_add, list, params.maxsize);
      }
    }
    fieldPlusMinusRepaintList(node);
    $(idInput)
      .val(null)
      .trigger("change");
  });

  $(idBtnMinus).click(() => {
    var nodelist = document.getElementById(node);
    $(list + " li a").each(function(index) {
      if ($(this).attr("id") === $(idInput).val()) {
        if (!definedNodes) {
          nodelist.childNodes[index].remove();
          $(list + " li").length = $(list + " li").length - 1;
        } else {
          if ($(list + " li").length <= 4) {
            $(this)
              .find("a")
              .first()
              .removeAttr("id");
            $(this).text("");
          } else {
            nodelist.childNodes[index].remove();
            $(list + " li").length = $(list + " li").length - 1;
          }
        }
      }
    });

    fieldPlusMinusRepaintList(node);

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

  var data = $.map(payload, function(item) {
    return {
      text: item[attrText],
      id: item[attrId]
    };
  });

  ($(idInput) as any).select2({
    language: "es",
    data: data,
    placeholder: "",
    minimumInputLength: 3
  });
};

const getList = (id: string) => {
  var list: any = [];

  $("#tag_list_" + id + " li").each(function() {
    let value = $(this)
      .text()
      .trim();
    if (value != "") {
      list.push(value);
    }
  });

  return list;
};

const getChecked = (id: string) => {
  let selected = [];
  const query_select = "#field_" + id + " input[type=checkbox]";

  $(query_select).each(function() {
    if ($(this).is(":checked")) {
      selected.push($(this).attr("value"));
    }
  });

  return selected;
};

const getOptionSelected = (id: string) => {
  const query_select = "input[name='" + id + "']:checked";

  return $(query_select).val();
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

const gradientBarChart = (params: barGradientChartParams) => {
  console.log("GradientBarChart");
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
        afterDatasetsDraw: function(simpleBarGraph) {
          console.log("Se ejecuta la funcion");
          var ctx = simpleBarGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleBarGraph.data.datasets.forEach(function(dataset, i) {
            var meta = simpleBarGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
              callback: function(value) {
                return value + "";
              }
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
        afterDatasetsDraw: function(stackGraph) {
          var ctx = stackGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          stackGraph.data.datasets.forEach(function(dataset, i) {
            var meta = stackGraph.getDatasetMeta(i);
            meta.data.forEach(function(element, index) {
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
              callback: function(value) {
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
        afterDatasetsDraw: function(stackGraphH) {
          var ctx = stackGraphH.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          stackGraphH.data.datasets.forEach(function(dataset, i) {
            var meta = stackGraphH.getDatasetMeta(i);
            meta.data.forEach(function(element, index) {
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
          label: function(tooltipItem, data) {
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
              callback: function(value) {
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
        afterDatasetsDraw: function(simpleBarGraph) {
          var ctx = simpleBarGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleBarGraph.data.datasets.forEach(function(dataset, i) {
            var meta = simpleBarGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
              callback: function(value) {
                return value + "";
              }
            }
          }
        ]
      }
    }
  });
};

// SimpleBarGraph
var simpleBAuxGraph = null;

const simpleBarAuxChart = (params: barChartParams) => {
  if (simpleBAuxGraph != null) {
    simpleBAuxGraph.destroy();
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

  simpleBAuxGraph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function(simpleBarGraph) {
          var ctx = simpleBarGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleBarGraph.data.datasets.forEach(function(dataset, i) {
            var meta = simpleBarGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
              callback: function(value) {
                return value + "";
              }
            }
          }
        ]
      }
    }
  });
};

// SimpleBarGraph
var simpleBAux1Graph = null;

const simpleBarAux1Chart = (params: barChartParams) => {
  if (simpleBAux1Graph != null) {
    simpleBAux1Graph.destroy();
  }

  simpleBGraph.destroy();

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

  simpleBAux1Graph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function(simpleBarGraph) {
          var ctx = simpleBarGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleBarGraph.data.datasets.forEach(function(dataset, i) {
            var meta = simpleBarGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
              callback: function(value) {
                return value + "";
              }
            }
          }
        ]
      }
    }
  });
};

// SimpleBarGraph
var simpleBAux2Graph = null;

const simpleBarAux2Chart = (params: barChartParams) => {
  if (simpleBAux2Graph != null) {
    simpleBAux2Graph.destroy();
  }

  simpleBAuxGraph.destroy();

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

  simpleBAux2Graph = new Chart(contextBar, {
    plugins: [
      {
        afterDatasetsDraw: function(simpleBarGraph) {
          var ctx = simpleBarGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          simpleBarGraph.data.datasets.forEach(function(dataset, i) {
            var meta = simpleBarGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
              callback: function(value) {
                return value + "";
              }
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
        afterDatasetsDraw: function(barGraph) {
          var ctx = barGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          barGraph.data.datasets.forEach(function(dataset, i) {
            var meta = barGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
                ctx.fillStyle = "#000";
                var fontSize = 12;
                var fontStyle = "normal";
                var fontFamily = "Arial";

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
                      element._view.x - 60,
                      element._view.y - 120,
                      120,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 100
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 90
                    );
                    ctx.fillText(
                      "menor a 1 año",
                      element._view.x,
                      element._view.y - 80
                    );
                  }

                  if (index == 1) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 60,
                      element._view.y - 120,
                      120,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 100
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 90
                    );
                    ctx.fillText(
                      "entre 1 y 2 años",
                      element._view.x,
                      element._view.y - 80
                    );
                  }

                  if (index == 2) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 60,
                      element._view.y - 120,
                      120,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 100
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 90
                    );
                    ctx.fillText(
                      "entre 2 y 3 años",
                      element._view.x,
                      element._view.y - 80
                    );
                  }

                  if (index == 3) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 60,
                      element._view.y - 120,
                      120,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 100
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 90
                    );
                    ctx.fillText(
                      "entre 3 y 5 años",
                      element._view.x,
                      element._view.y - 80
                    );
                  }

                  if (index == 4) {
                    ctx.beginPath();
                    // ctx.lineWidth = "1";
                    ctx.strokeStyle = "#000";
                    ctx.rect(
                      element._view.x - 60,
                      element._view.y - 120,
                      120,
                      60
                    );
                    ctx.stroke();
                    ctx.fillText(
                      "Horizonte de",
                      element._view.x,
                      element._view.y - 100
                    );
                    ctx.fillText(
                      "Inversión",
                      element._view.x,
                      element._view.y - 90
                    );
                    ctx.fillText(
                      "mayor a 5 años",
                      element._view.x,
                      element._view.y - 80
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
            },
            stacked: true,
            ticks: {
              display: true,
              fontFamily: "Verdana",
              fontSize: 12,
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
              callback: function(value) {
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
        afterDatasetsDraw: function(barNGraph) {
          var ctx = barNGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          barNGraph.data.datasets.forEach(function(dataset, i) {
            var meta = barNGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
              callback: function(value) {
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
        afterDatasetsDraw: function(lineGraph) {
          var ctx = lineGraph.ctx;

          ctx.canvas.style.width = params.width;
          ctx.canvas.style.height = params.height;

          lineGraph.data.datasets.forEach(function(dataset, i) {
            var meta = lineGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
        beforeDraw: function(multiLineGraph) {
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

        afterDatasetsDraw: function(multiLineGraph) {
          var ctx = multiLineGraph.ctx;
          multiLineGraph.data.datasets.forEach(function(dataset, i) {
            var meta = multiLineGraph.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
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
        afterDatasetsDraw: function(pieGraph) {
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
  $("#" + id + "_begin_date").datepicker({
    ...ui_datepicker_settings,
    onClose: function(selectedDate, instance) {
      if (selectedDate != "") {
        $("#" + id + "_end_date").datepicker("option", "minDate", selectedDate);
        var date = $.datepicker.parseDate(
          instance.settings.dateFormat,
          selectedDate,
          instance.settings
        );
        date.setMonth(date.getMonth() + 3);
        $("#" + id + "_end_date").datepicker("option", "minDate", selectedDate);
        $("#" + id + "_end_date").datepicker("option", "maxDate", date);
      }
    }
  });

  $("#" + id + "_end_date").datepicker({
    ...ui_datepicker_settings,
    onClose: function(selectedDate) {
      $("#" + id + "_begin_date").datepicker("option", "maxDate", selectedDate);
    }
  });
};

// Clean selects
// TODO: No amarrar el clean a la clase .is-search-form ya que no siempre se usa.
$("#btn_clean").click(() => {
  ($(".is-search-form") as any).parsley().reset();
  $("li a").text("");
});

const getCheckedCheckbox = (id: string) => {
  var list: any = [];

  list = $("input[name='chk_" + id + "']:checked")
    .map(function() {
      return $(this).val();
    })
    .toArray();
  return list;
};

// Función creada por Guillermo Islas
// function relocateSummary(gridNameID, summaryColumnName, decimalPlaces) {
//   if (gridNameID && summaryColumnName) {
//     var summaryRow = $("#" + gridNameID + " tr[jqfootlevel]");
//     if (summaryRow && summaryRow.length > 0) {
//       var singleRow;
//       $(summaryRow).each(function(index) {
//         singleRow = $(this);
//         var columnFullName = gridNameID + "_" + summaryColumnName;
//         var summaryColumn = $(singleRow).find(
//           "td[aria-describedBy=" + columnFullName + "]"
//         );
//         var summaryIndex = $(summaryColumn).index();
//         if (-1 != summaryIndex) {
//           var sum = $(summaryColumn);
//           var sumValue = Number($(sum).html());
//           if (decimalPlaces && !isNaN(sumValue)) {
//             sumValue = "$" + Number(sumValue).toFixed(decimalPlaces);
//             $(sum).html(sumValue);
//           }
//           var level = $(singleRow).attr("jqfootlevel");
//           var headerRowID = "#" + gridNameID + "ghead_" + level + "_" + index;
//           var headerRow = $(headerRowID);
//           if (headerRow && headerRow.length > 0) {
//             $(headerRow)
//               .find("td:first")
//               .attr("colspan", summaryIndex - 1);
//             $(headerRow).append(sum);
//             $(singleRow).remove();
//           }
//         }
//       });
//     }
//   }
// }

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
        $(groupHeaders).each(function(index, value) {
          headers.push(value);
        });
      }
      var column;
      var columnName;
      $(colModel).each(function() {
        column = $(this)[0];
        columnName = column.name;
        if (!column.hidden) {
          headers.push(columnName);
        }
      });
      var tableHeader = "<thead><tr>";
      $.each(headers, function(index, value) {
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
      $(gridData).each(function() {
        tableContent += "<tr>";
        row = $(this)[0];
        $.each(headers, function(index, header) {
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
  var trElement = $("#" + field_group + " tbody");
  var answerOption = "";
  var answerSelect = "";
  var answersSelect = "";
  var answers = "";
  var question = "";
  var questions = "";
  var options = "";
  var option = "";
  var nAnswers = 0;
  var nQuestions = 0;
  var nResults = 0;

  nQuestions = quiz[0].question.length;
  nAnswers = quiz[0].answer.length;
  nResults = quiz[0].result.length;

  // Questions
  for (var i = 0; i < nQuestions; i++) {
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
    for (var j = 0; j < nAnswers; j++) {
      var answer_points = quiz[0].question[i].points
        ? quiz[0].question[i].points[j]
        : "1";
      var disabled = quiz[0].answer[j].disabled;

      var db = "";
      //   if (disabled) {
      //     db = "disabled";
      //   }

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

        let optionValue = quiz[0].result[i].results[j].result;

        options = "";
        for (var k = 0; k < quiz[0].answer[j].options.length; k++) {
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
  }
};

const fieldDateClear = (id: string) => {
  var _id = "#" + id;
  var $dates = $(_id).datepicker();

  $("#clear_" + id).on("click", function() {
    $dates.datepicker("setDate", null);
  });
};

const fieldBeginDateRangeClear = (id: string) => {
  var _id = $("#" + id + "_begin_date");
  var $dates = $(_id).datepicker();

  $("#clear_" + id + "_begin_date").on("click", function() {
    $dates.datepicker("setDate", null);
  });
};

const fieldEndDateRangeClear = (id: string) => {
  var _id = $("#" + id + "_end_date");
  var $dates = $(_id).datepicker();

  $("#clear_" + id + "_end_date").on("click", function() {
    $dates.datepicker("setDate", null);
  });
};

const json2xml = (o, tab) => {
  var toXml = function(v, name, ind) {
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
    toObj: function(xml) {
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
    toJson: function(o, name, ind) {
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
    innerXml: function(node) {
      var s = "";
      if ("innerHTML" in node) s = node.innerHTML;
      else {
        var asXml = function(n) {
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
    escape: function(txt) {
      return txt
        .replace(/[\\]/g, "\\\\")
        .replace(/[\"]/g, '\\"')
        .replace(/[\n]/g, "\\n")
        .replace(/[\r]/g, "\\r");
    },
    removeWhite: function(e) {
      e.normalize();
      for (var n = e.firstChild; n; ) {
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

const fillSwapList = (id: string, list_id: string, params: any) => {
  var _id = "#" + id;
  var list = $("#listado_" + list_id);

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

$("ul.column").on("click", "li", function() {
  if ($(this).hasClass("selected")) {
    $(this).removeClass("selected");
  } else {
    clearList();
    $(this).addClass("selected");
  }
});

// Up
$(".up").click(function() {
  var currents = $(".portlet.selected");
  currents.prev().before(currents);
});

// Down
$(".down").click(function() {
  var currents = $(".portlet.selected");
  currents.next().after(currents);
});

// Add
$(".add").click(function() {
  var currents = $(".portlet.selected");
  $(".column.destination").append(currents);
  clearList();
});

// Remove
$(".remove").click(function() {
  var currents = $(".portlet.selected");
  $(".column.source").append(currents);
  clearList();
});

$(".column").sortable({
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
  $("ul.column li").removeClass("selected");
};

const formatNumber = {
  separador: ",",
  sepDecimal: ".",
  formatear: function(num) {
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
  new: function(num, simbol) {
    this.simbol = simbol || "";
    return this.formatear(num);
  }
};

$(".currency").mask("###,###,##0", { reverse: true });
$(".number").mask("###,###,##0.00", { reverse: true });
$(".integer").mask("###,###,##0", { reverse: true });
$(".datepicker").mask("99-99-9999");

$("input").on({
  mouseenter: function(e) {
    // console.log("hover", e);
    const hasError = $(e.target).hasClass("parsley-error");
    if (hasError) {
      const fieldErrorQuerySelector = `#field_${e.target.id} .field-error`;
      const fieldError = $(fieldErrorQuerySelector);
      console.log(fieldErrorQuerySelector);
      fieldError.css("display", "flex");
    }
  },
  mouseleave: function(e) {
    // console.log("out", e);
    const hasError = $(e.target).hasClass("parsley-error");
    if (hasError) {
      const fieldErrorQuerySelector = `#field_${e.target.id} .field-error`;
      const fieldError = $(fieldErrorQuerySelector);
      fieldError.css("display", "none");
    }
  }
});

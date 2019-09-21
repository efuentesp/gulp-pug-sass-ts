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

const DAY_NAMES_MIN = ["D", "L ", "M ", "M ", "J ", "V ", "S "];

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

    if ($("li").length <= 0 && text_to_add.length > 0) {
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

    if (exist == 0 && text_to_add.length > 0) {
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
        $("li:has('a'):contains(" + $(this).text() + ")").remove();
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
    var exist = 0;

    if ($("li").length <= 0 && text_to_add.length > 0) {
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

    if (exist == 0 && text_to_add.length > 0) {
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
        $("li:has('a'):contains(" + $(this).text() + ")").remove();
        $(this).remove();
      }
    });

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

const getList = (id: string) => {
  var list: any = [];

  $("#tag_list_" + id + " li").each(function() {
    list.push(
      $(this)
        .text()
        .trim()
    );
  });

  return list;
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
}

interface barChartParams {
  id: string;
  titleX: string;
  titleY: string;
  labels: any[];
  tickMaxY: number;
  tickMinY: number;
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
}

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
          stackGraph.data.datasets.forEach(function(dataset, i) {
            var meta = stackGraph.getDatasetMeta(i);
            meta.data.forEach(function(element, index) {
              // GeneralFont
              ctx.fillStyle = "#000";
              var fontSize = 10;
              var fontStyle = "normal";
              var fontFamily = "Arial";

              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );

              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              var padding = 10;

              ctx.fillText(
                dataset.data[index] + "%",
                element._view.x,
                element._view.y
              );
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

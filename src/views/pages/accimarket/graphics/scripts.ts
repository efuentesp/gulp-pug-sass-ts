/// <reference path="../../typings/index.d.ts" />

let rates_params: UrlParams = {};
let rendimientos_params: UrlParams = {};
let rendimientosh_params: UrlParams = {};
let promedios_params: UrlParams = {};

// Service line chart
http_findAll("rates", rates_params, payload => {
  fillEstrategias(payload);
});

// Service multiline chart
http_findAll("rates", rates_params, payload => {
  fillRates(payload);
});

// Services stack chart
http_findAll("rendimientos", rendimientos_params, payload => {
  fillRendimientos(payload);
});

// Services stack chart horizontal
http_findAll("rendimientosh", rendimientosh_params, payload => {
  fillHorizontalRendimientos(payload);
});

// Services bar chart
http_findAll("promedios", promedios_params, payload => {
  fillPromedios(payload);
});

http_findAll("promediosNBar", promedios_params, payload => {
  fillPromediosNBar(payload);
});

// Services bar chart
http_findAll("promedios", promedios_params, payload => {
  fillPromediosPie(payload);
  fillPromediosPieHighcharts(payload);
});

// Stack
const fillRendimientos = (rendimientos: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetX = [];

  for (var i = 0; i < rendimientos.length; i++) {
    var data = rendimientos[i];
    dataSetX.push(data.mes);
    dataSetY1.push(data.dataA);
    dataSetY2.push(data.dataB);
  }

  stackChart({
    id: "stackChart",
    titleX: "Cifras de rendimientos, tasas e inflación con fines ilustrativos",
    titleY: "Tasa Efectiva del Mejor y Peor Mes",
    labels: dataSetX,
    tickMaxY: 8.0,
    tickMinY: -8.0,
    tickStepY: 2.0,
    dataSet: [
      {
        label: "Peor Mes",
        backgroundColor: "#2b6cb0",
        data: dataSetY1
      },
      {
        label: "Mejor Mes",
        backgroundColor: "#c53030",
        data: dataSetY2
      }
    ],
    width: "400px",
    height: "200px"
  });
};

const fillPromedios = (promedios: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetX = [];

  for (var i = 0; i < promedios.length; i++) {
    var data = promedios[i];
    dataSetX.push(data.horizonte);
    dataSetY1.push(data.dataA);
    dataSetY2.push(data.dataB);
  }

  barChart({
    id: "barChart",
    titleX: "Cifras de rendimientos, tasas e inflación con fines ilustrativos",
    titleY: "Rendimientos Promedio Anual",
    labels: dataSetX,
    tickMaxY: 15.0,
    tickMinY: 0,
    tickStepY: 1,
    width: "400px",
    height: "200px",
    dataSet: [
      {
        type: "line",
        label: "Promedio",
        backgroundColor: "#c53030",
        data: dataSetY1,
        fill: false,
        borderColor: "#c53030",
        borderWidth: 2
      },
      {
        type: "bar",
        label: "Real",
        backgroundColor: "#2b6cb0",
        data: dataSetY2
      }
    ]
  });
};

const fillPromediosNBar = (promediosNBar: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetY3 = [];
  var dataSetY4 = [];
  var dataSetY5 = [];
  var dataSetX = [];

  for (var i = 0; i < promediosNBar.length; i++) {
    var data = promediosNBar[i];
    dataSetX.push(data.horizonte);
    dataSetY1.push(data.dataA);
    dataSetY2.push(data.dataB);
    dataSetY3.push(data.dataC);
    dataSetY4.push(data.dataD);
    dataSetY5.push(data.dataE);
  }

  barChartNBar({
    id: "barChartNBar",
    titleX: "Cifras de rendimientos, tasas e inflación con fines ilustrativos",
    titleY: "Rendimientos Promedio Anual",
    labels: dataSetX,
    tickMaxY: 15.0,
    tickMinY: -15 /*0*/,
    tickStepY: 1,
    width: "400px",
    height: "200px",
    dataSet: [
      {
        type: "line",
        label: "Promedio",
        backgroundColor: "#c53030",
        data: dataSetY1,
        fill: false,
        borderColor: "#c53030",
        borderWidth: 2
      },
      {
        type: "bar",
        label: "Real",
        backgroundColor: "#2b6cb0",
        data: dataSetY2
      },
      {
        type: "bar",
        label: "Real2",
        backgroundColor: "#ffb3b3",
        data: dataSetY3
      },
      {
        type: "bar",
        label: "Real3",
        backgroundColor: "#b3ffb3",
        data: dataSetY4
      },
      {
        type: "bar",
        label: "Real4",
        backgroundColor: "#ffff66",
        data: dataSetY5
      }
    ]
  });
};

const fillRates = (rates: any) => {
  var dataSetY = [];
  var dataSetX = [];

  for (var i = 0; i < rates.length; i++) {
    var data = rates[i];
    var priceDate = new Date(data.updatedDate.replace(" ", "T") + "Z");
    dataSetX.push(
      ("0" + priceDate.getHours()).slice(-2) +
      ":" +
      ("0" + priceDate.getMinutes()).slice(-2)
    );
    dataSetY.push(data.askClose);
  }

  lineChart({
    id: "lineChart",
    titleX: "X",
    titleY: "Y",
    labels: dataSetX,
    tickMaxY: 15.0,
    tickMinY: 0,
    tickStepY: 1,
    dataSet: [
      {
        type: "line",
        label: "Porcentaje",
        backgroundColor: "#2b6cb0",
        data: dataSetY,
        fill: false,
        borderColor: "#2b6cb0",
        borderWidth: 2
      }
    ],
    pointA: 56,
    pointB: 200,
    width: "600px",
    height: "200px"
  });
};

const fillEstrategias = (rates: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetY3 = [];
  var dataSetX = [];

  for (var i = 0; i < rates.length; i++) {
    var data = rates[i];
    var priceDate = new Date(data.updatedDate.replace(" ", "T") + "Z");
    dataSetX.push(
      ("0" + priceDate.getHours()).slice(-2) +
      ":" +
      ("0" + priceDate.getMinutes()).slice(-2)
    );
    dataSetY1.push(data.askClose);
    dataSetY2.push(data.askLow);
    dataSetY3.push(data.bidOpen);
  }

  multiLineChart({
    id: "multiChart",
    titleX: "X",
    titleY: "Y",
    labels: dataSetX,
    tickMaxY: 15.0,
    tickMinY: 0,
    tickStepY: 1,
    dataSet: [
      {
        type: "line",
        label: "Largo Plazo",
        backgroundColor: "#c53030",
        data: dataSetY3,
        fill: false,
        borderColor: "#c53030",
        fontColor: "#c53030",
        borderWidth: 1
      },
      {
        type: "line",
        label: "Mediano Plazo",
        fill: false,
        data: dataSetY2,
        backgroundColor: "#2b6cb0",
        borderColor: "#2b6cb0",
        borderWidth: 1,
        fontColor: "#2b6cb0"
      },
      {
        type: "line",
        label: "Largo Plazo",
        fill: false,
        data: dataSetY1,
        borderColor: "#2f855a",
        borderWidth: 1,
        fontColor: "#2f855a",
        backgroundColor: "#2f855a"
      }
    ],
    width: "600px",
    height: "200px"
  });
};

const fillPromediosPie = (promedios: any) => {
  var dataSetY = [];
  var dataSetX = [];

  for (var i = 0; i < promedios.length; i++) {
    var data = promedios[i];
    dataSetX.push(data.horizonte);
    dataSetY.push(data.dataB);
  }

  pieChart({
    id: "pieChart",
    titleX: "Cifras de rendimientos, tasas e inflación con fines ilustrativos",
    labels: dataSetX,
    width: "400px",
    height: "200px",
    dataSet: [
      {
        type: "pie",
        label: "Real",
        backgroundColor: backgroundSet(promedios.length),
        data: dataSetY
      }
    ]
  });
};

// Stack Horizontal
const fillHorizontalRendimientos = (rendimientosh: any) => {
  var dataSetY1 = [];
  var dataSetY2 = [];
  var dataSetY3 = [];
  var dataSetY4 = [];
  var dataSetX = [];

  for (var i = 0; i < rendimientosh.length; i++) {
    var data = rendimientosh[i];
    dataSetX.push(data.mes);
    dataSetY1.push(data.dataA);
    dataSetY2.push(data.dataB);
    dataSetY3.push(data.dataC);
    dataSetY4.push(data.dataD);
  }

  stackChartHorizontal({
    id: "stackChartH",
    titleX: "",
    titleY: "",
    labels: dataSetX,
    tickMaxX: 100.0,
    tickMinX: 0.0,
    tickStepX: 20.0,
    dataSet: [
      {
        label: "None",
        backgroundColor: "yellow",
        data: dataSetY1
      },
      {
        label: "In Progress",
        backgroundColor: "orange",
        data: dataSetY2
      },
      {
        label: "Not Yet Started",
        backgroundColor: "red",
        data: dataSetY3
      },
      {
        label: "Recompletion required",
        backgroundColor: "blue",
        data: dataSetY4
      }
    ],
    width: "800px",
    height: "200px",
    format: "%"
  });
};

Highcharts.chart('containerBar', {
  chart: {
      type: 'bar',
      events: {
        load: function() {
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
      text: 'Bar Chart'
  },
  xAxis: {
      categories: ['Apples','']
  },
  yAxis: {
      min: 0,
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
      y: 0
  },
  plotOptions: {
      series: {
          stacking: 'normal',
          shadow: false
      }
  },
  series: [
  {
      color: '#53565a',
      name: 'John',
      data: [
        {
          y: 5,
          color: '#53565a'
        },
        {
          y: 5,
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
  }, 
  {
      color: '#a6a6a6',
      name: 'Jane',
      data: [
        {
          y: 2,
          color: '#a6a6a6'
        },
        {
          y: 2,
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
  }, {
      color: '#5d87a1',
      name: 'Joe',
      data: [
        {
          y: 2,
          color: '#5d87a1'
        },
        {
          y: 2,
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
  },
  {
    color: '#87d1d9',
    name: 'Janin',
    data: [
      {
        y: 1,
        color: '#87d1d9',
        borderRadiusTopLeft: 10
      },
      {
        y: 1,
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
  } 
]
  
});

const fillPromediosPieHighcharts = (promedios: any) => {
  let charData = [];

  for (let i = 0; i < promedios.length; i++) {
    var data = promedios[i];
    charData.push({name:data.horizonte, y:data.dataB})
  }

  pieHighchart({
    id: "container",
    title: "Promedios Pie Chart",
    format: "{series.name}: <b>{point.percentage:.1f}%</b>",
    plotOptionsFormat: "<b>{point.name}</b>: {point.percentage:.1f} %",
    labelsX: "Porcentaje",
    dataSet: charData
  });

  pieBorderHighchart({
    id: "containerBorder",
    title: "Promedios Pie Chart",
    format: "{series.name}: <b>{point.percentage:.1f}%</b>",
    plotOptionsFormat: "<b>{point.name}</b>: {point.percentage:.1f} %",
    labelsX: "Porcentaje",
    dataSet: charData
  });
};







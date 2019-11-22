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

  // Radialize the colors
  Highcharts.setOptions({
    colors: Highcharts.map(
      ["#466579", "#9eb7c7", "#becfda", "#dfe7ec", "#afaeb0", "#636165"],
      function(color) {
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
            ] // darken
          ]
        };
      }
    )
  });

var colors = Highcharts.getOptions().colors;

Highcharts.chart('containerBar', {
  chart: {
      type: 'bar',
      events: {
        load: function() {
          let categoryHeight = 45;
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
      text: 'Frutas Bar Chart'
  },
  xAxis: {
      categories: ['Apples']
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Total fruit consumption'
      }
  },
  legend: {
      reversed: true
  },
  plotOptions: {
      series: {
          stacking: 'normal',
          shadow: true
      }
  },
  series: [{
      name: 'John',
      data: [5],
      type: undefined,
      // borderRadius: 15
  }, {
      name: 'Jane',
      data: [2],
      type: undefined,
      // borderRadius: 15
  }, {
      name: 'Joe',
      data: [3],
      type: undefined,
      // borderRadius: 15
  }
 
],
  
});

const fillPromediosPieHighcharts = (promedios: any) => {
  let dataSetY = [];
  let dataSetX = [];
  let charData = [];

  for (let i = 0; i < promedios.length; i++) {
    var data = promedios[i];
    charData.push({name:data.horizonte, y:data.dataB})
  }

// Pie Graph
Highcharts.chart("container", {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie"
  },
  title: {
    text: "Promedios Pie Chart"
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        // style: {
        //   color:
        //     // (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
        //     "black"
        // },
        connectorColor: "silver"
      },
      borderWidth: 10
    }
  },
  series: [
    {
      name: "Share",
      data: charData,
      type: undefined,
      animation: {
        duration: 1000
        //   easing: "easeOutBounce"
      },
      shadow: true
    }
  ]
});

};

// Highcharts.chart("containerChart", {
//   chart: {
//     type: "timeline"
//   },
//   xAxis: {
//     visible: false
//   },
//   yAxis: {
//     visible: false
//   },
//   title: {
//     text: "Timeline of Space Exploration"
//   },
//   subtitle: {
//     text:
//       'Info source: <a href="https://en.wikipedia.org/wiki/Timeline_of_space_exploration">www.wikipedia.org</a>'
//   },
//   colors: [
//     "#4185F3",
//     "#427CDD",
//     "#406AB2",
//     "#3E5A8E",
//     "#3B4A68",
//     "#363C46"
//   ],
//   series: [
//     {
//       type:undefined,
//       data: [
//         {
//           name: "First dogs",
//           label: "1951: First dogs in space",
//           description:
//             "22 July 1951 First dogs in space (Dezik and Tsygan) "
//         },
//         {
//           name: "Sputnik 1",
//           label: "1957: First artificial satellite",
//           description:
//             "4 October 1957 First artificial satellite. First signals from space."
//         },
//         {
//           name: "First human spaceflight",
//           label: "1961: First human spaceflight (Yuri Gagarin)",
//           description:
//             "First human spaceflight (Yuri Gagarin), and the first human-crewed orbital flight"
//         },
//         {
//           name: "First human on the Moon",
//           label: "1969: First human on the Moon",
//           description:
//             "First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon"
//         },
//         {
//           name: "First space station",
//           label: "1971: First space station",
//           description:
//             "Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971."
//         },
//         {
//           name: "Apollo–Soyuz Test Project",
//           label: "1975: First multinational manned mission",
//           description:
//             "The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station."
//         }
//       ]
//     }
//   ]
// });



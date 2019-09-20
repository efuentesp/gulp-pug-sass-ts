/// <reference path="../../typings/index.d.ts" />

let estrategias_params: UrlParams = {};
let rates_params: UrlParams = {};
let rendimientos_params: UrlParams = {};
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

// Services bar chart
http_findAll("promedios", promedios_params, payload => {
  fillPromedios(payload);
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

  stackChart(
    "stackChart",
    "Cifras de rendimientos, tasas e inflación con fines ilustrativos",
    "Tasa Efectiva del Mejor y Peor Mes",
    dataSetX,
    [
      {
        label: "Peor Mes",
        backgroundColor: "#c53030",
        data: dataSetY1
      },
      {
        label: "Mejor Mes",
        backgroundColor: "#2b6cb0",
        data: dataSetY2
      }
    ],
    [
      {
        tickMaxY: 8.0,
        tickMinY: -8.0,
        tickStepY: 2.0,
        scaleLabelDisplayX: true,
        scaleLabelDisplayY: true,
        tickDisplayX: false,
        tickDisplayY: true,
        legendPosition: "bottom",
        legendDisplay: true,
        usePointStyle: true,
        graphTitleDisplay: false,
        graphTitle: ""
      }
    ]
  );
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

  barChart(
    "barChart",
    "Cifras de rendimientos, tasas e inflación con fines ilustrativos",
    "Rendimientos Promedio Anual",
    dataSetX,
    [
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
    ],
    [
      {
        tickMaxY: 15.0,
        tickMinY: 0,
        tickStepY: 1.0,
        scaleLabelDisplayX: true,
        scaleLabelDisplayY: true,
        tickDisplayX: false,
        tickDisplayY: true,
        legendPosition: "bottom",
        legendDisplay: false,
        usePointStyle: true,
        graphTitleDisplay: false,
        graphTitle: ""
      }
    ]
  );
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

  lineChart(
    "lineChart",
    "X",
    "Y",
    dataSetX,
    [
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
    [
      {
        tickMaxY: 15.0,
        tickMinY: 0,
        tickStepY: 1.0,
        scaleLabelDisplayX: true,
        scaleLabelDisplayY: true,
        tickDisplayX: false,
        tickDisplayY: true,
        legendPosition: "bottom",
        legendDisplay: false,
        usePointStyle: true,
        graphTitleDisplay: false,
        graphTitle: ""
      }
    ],
    56,
    200
  );
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

  multiLineChart(
    "multiChart",
    "X",
    "Y",
    dataSetX,
    [
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
    [
      {
        tickMaxY: 15.0,
        tickMinY: 0,
        tickStepY: 1.0,
        scaleLabelDisplayX: true,
        scaleLabelDisplayY: true,
        tickDisplayX: false,
        tickDisplayY: true,
        legendPosition: "bottom",
        legendDisplay: true,
        usePointStyle: true,
        graphTitleDisplay: false,
        graphTitle: ""
      }
    ]
  );
};

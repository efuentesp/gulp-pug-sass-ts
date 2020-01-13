/// <reference path="../../typings/index.d.ts" />

let rates_params: UrlParams = {};
let rendimientos_params: UrlParams = {};
let rendimientosh_params: UrlParams = {};
let rendimientoshc_params: UrlParams = {};
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

// Services stack chart horizontal
http_findAll("rendimientoshc", rendimientoshc_params, payload => {
  fillPromediosHighchartBar(payload);
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
    id: "divCanvasStackChart",
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
    id: "divCanvasBarChart",
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
    id: "divCanvasBarChartNBar",
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
    id: "divCanvasLineChart",
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
    id: "divCanvasMultiChart",
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
    id: "divCanvasPieChart",
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
    id: "divCanvasStackChartH",
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


const fillPromediosPieHighcharts = (promedios: any) => {
  let charData = [];

  for (let i = 0; i < promedios.length; i++) {
    let data = promedios[i];
    // Json property   "promedios": [{"horizonte": "A (Liquidez)", "dataB": 3.8}] 
    charData.push({name:data.horizonte, y:data.dataB})
  }

  pieHighchart({
    id: "divContainer",
    title: "Promedios Pie Chart",
    format: "{series.name}: <b>{point.percentage:.1f}</b>",
    plotOptionsFormat: "<b>{point.name}</b>: {point.percentage:.1f}",
    labelsX: "Porcentaje",
    dataSet: charData
  });

  pieBorderHighchart({
    id: "divContainerBorder",
    title: "Promedios Pie Chart",
    format: "{series.name}: <b>{point.percentage:.1f}</b>",
    plotOptionsFormat: "<b>{point.name}</b>: {point.percentage:.1f}",
    labelsX: "Porcentaje",
    dataSet: charData
  });
};


// Stack Horizontal
const fillPromediosHighchartBar = (datos: any) => {

  let charData = [];
  for (let i = 0; i < datos.length; i++) {
    let data = datos[i];
    charData.push({title:data.mes, value:data.data1, radiusLeftTop: '', radiusLeftBottom: '', radiousRightTop: '', radiousRightBottom: ''});
    charData.push({title:data.mes, value:data.data2, radiusLeftTop: '', radiusLeftBottom: '', radiousRightTop: '30px', radiousRightBottom: '30px'});
    // Second Stack 
    charData.push({title:data.mes, value:data.data3, radiusLeftTop: '30px', radiusLeftBottom: '30px', radiousRightTop: '', radiousRightBottom: ''});
    // First Stack 
    charData.push({title:data.mes, value:data.data4, radiusLeftTop: '', radiusLeftBottom: '', radiousRightTop: '', radiousRightBottom: ''});
  }

  barHighchart({
    id: "divContainerBar",
    title: "Bar Chart",
    dataSet: charData
  });

};  





let params_rates: UrlParams = {};
let params_objInversion: UrlParams = {};
let params_objInversionRA: UrlParams = {};

// Grafica Mapa de Liquidez
http_findAll("rates", params_rates, payload => {
    fillLiquidez(payload);
});

const fillLiquidez = (rates: any) => {
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
        width: "10em",
        height: "20em"
    });
};

// Grafica de Barras Objetivo de Inversion Uno
http_findAll("promedios", params_objInversion, payload => {
    fillObjInversion(payload);
});

const fillObjInversion = (promedios: any) => {
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
        ],
        width: "10em",
        height: "20em"
    });
};

// Grafica de Barras de Azul y Roja
http_findAll("rendimientos", params_objInversionRA, payload => {
    fillObjInversionRA(payload);
});

const fillObjInversionRA = (rendimientos: any) => {
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
                backgroundColor: "#c53030",
                data: dataSetY1
            },
            {
                label: "Mejor Mes",
                backgroundColor: "#2b6cb0",
                data: dataSetY2
            }
        ],
        width: "10em",
        height: "20em"
    });
};

// Grafica de multilenas Objetivo de Inversion Dos
http_findAll("rates", params_rates, payload => {
    fillMultileneasObjetivo(payload);
});

const fillMultileneasObjetivo = (rates: any) => {
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
        width: "10em",
        height: "20em"
    });
};
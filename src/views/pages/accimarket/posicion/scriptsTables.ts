let promed_params: UrlParams = {};
let mov_pos_dialog_params: UrlParams = {};

const respuestaServicio = (tabla: string, tablaTotal: string, payload: any) => {
    $("#table_" + tabla).jqGrid("clearGridData");
    $("#table_" + tabla).jqGrid("setGridParam", { data: payload });
    $("#table_" + tabla).trigger("reloadGrid");

    var self = $("#table_" + tabla);
    var sumInversion = sumatoria(self.jqGrid("getCol", "inversion", ['sum']));
    var sumValor = sumatoria(self.jqGrid("getCol", "valor", ['sum']));
    var sumPorInv = sumatoria(self.jqGrid("getCol", "porInv", ['sum']));
    var jsonTotales = '[{"contrato": "","emisora": "Posicion Total","inversion": "' + sumInversion + '","valor": "' + sumValor + '","porInv": "' + sumPorInv + '"},{"contrato": "","emisora": "Efectivo","inversion": "","valor": "' + sumValor + '","porInv": ""},{"contrato": "","emisora": "RF","inversion": "' + sumInversion + '","valor": "' + sumValor + '","porInv": ""}]';
    var obj = JSON.parse(jsonTotales);

    $("#table_" + tablaTotal).jqGrid("clearGridData");
    $("#table_" + tablaTotal).jqGrid("setGridParam", { data: obj });
    $("#table_" + tablaTotal).trigger("reloadGrid");
};

const dialogoConfiguracion = () => {
    $("#dialogConfig").click(() => {
        $("#configColumns").dialog({
            modal: true,
            closeText: "",
            show: true,
            width: "620px",
            title: "Configuracion de Columnas",
            buttons: [
                {
                    text: "Aceptar",
                    icon: "ui-icon-check",
                    click: function () {
                        $(this).dialog("close");
                        columnas();
                    }
                }
            ]
        });
    });
};

const dialogoMovimientos = () => {
    $("#dialogMovimi").click(() => {
        mov_pos_dialog_params = {};

        const contrato = $("#contrato").val();
        if (contrato) {
            mov_pos_dialog_params.contrato = contrato;
        }

        const fechaI = $("#fechaI").val();
        if (fechaI) {
            mov_pos_dialog_params.fechaIni = fechaI;
        }

        const fechaF = $("#fechaF").val();
        if (fechaF) {
            mov_pos_dialog_params.fechaFin = fechaF;
        }

        $("#contratoDetalle").val($("#contrato").val())

        http_findAll("consultaCon", mov_pos_dialog_params, payload => {
            if (payload !== null) {
                listaDetalle = payload.movimientosLst;

                $("#table_detalle").jqGrid("clearGridData");
                $("#table_detalle").jqGrid("setGridParam", { data: payload.movimientosLst });
                $("#table_detalle").trigger("reloadGrid");

                $('#emisionLst').children('option:not(:first)').remove();
                obtenerFiltrosMov("emiSerie", "emisionLst");
                $('#operacionLst').children('option:not(:first)').remove();
                obtenerFiltrosMov("descrOper", "operacionLst");
                $('#portafolioLst').children('option:not(:first)').remove();
                obtenerFiltrosMov("descrSTipoPortf", "portafolioLst");
            }
        });

        $("#detalle").dialog({
            modal: true,
            closeText: "",
            show: true,
            width: "700px",
            title: "",
            buttons: [
                {
                    text: "Aceptar",
                    icon: "ui-icon-check",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    });
};

const ejecutaDialog = () => {
    $("#dialogo_msg").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Mensaje",
        buttons: [
            {
                text: "Aceptar",
                icon: "ui-icon-check",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
};

const ejecutaPai = () => {
    http_findAll("promedios", promed_params, payload => {
        var dataSetY = [];
        var dataSetX = [];

        for (var i = 0; i < payload.length; i++) {
            var data = payload[i];
            dataSetX.push(data.horizonte);
            dataSetY.push(data.dataB);
        }

        pieChart({
            id: "pieChart",
            titleX: "",
            labels: dataSetX,
            width: "400px",
            height: "200px",
            dataSet: [
                {
                    type: "pie",
                    label: "Real",
                    backgroundColor: backgroundSet(payload.length),
                    data: dataSetY
                }
            ]
        });
    });
}

const sumatoria = (valores) => {
    var total = 0;
    for (let num of valores) {
        total += parseInt(num);
    }
    return total;
}

const genereTabDimanic = (tabLst: any[]) => {
    console.log("Obtiene Tab a crear");
    for (var i = 0; i < tabLst.length; i++) {
        console.log("Tab -> " + tabLst[i].descrCorta);
    }
}
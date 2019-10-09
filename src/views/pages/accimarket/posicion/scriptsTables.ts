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

    $("#ui-id-2").show();
    $("#ui-id-3").show();

};

const accionTabs = (payload: any) => {

    $("#ui-id-2").click(function () {
        if (payload.listaDifGtia.length == 0) {
            ejecutaDialog();
        }
    });

    $("#ui-id-3").click(function () {
        if (payload.listaSpc.length == 0) {
            ejecutaDialog();
        }
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
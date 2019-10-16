
fieldPlusMinus("tv");
fieldPlusMinus("emisora");

$("#btn_pdf").click(() =>
    $("#").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Generar PDF",
        buttons: [
            {
                text: "Aceptar",
                icon: "ui-icon-check",
                click: function () {
                    $(this).dialog("close");
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            }
        ]
    })
);
$("#btn_xls").click(() =>
    $("#").dialog({
        modal: true,
        closeText: "",
        show: true,
        title: "Generar XLS"
    })
);

validateDateRage("rango");

let notaEstructurada_params: UrlParams = {};


http_findAll("notaEstructurada", notaEstructurada_params, notasEstructuradas => {
    llenaGridNotasE(notasEstructuradas);
    const rec_count = notasEstructuradas.length;
    $("#count_notas-estructuradas").html(rec_count);

});



const llenaGridNotasE = (notasEstructuradas: any) => {
    console.log(notasEstructuradas);
    $("#table_notas-estructuradas").jqGrid({
        data: notasEstructuradas,
        datatype: "local",
        height: "auto",
        shrinkToFit: false,
        rowList: [10, 20, 30],
        colNames: [
            "TV",
            "Emisora",
            "Serie",
            "Plazo",
            "Fecha Inicio",
            "Hora Cierre",
            "Límite captado",
            "Captado",
            "Por colocar",
            "MNB",
            "MNA",
            "Estatus",
            "Mensaje"
        ],
        colModel: [
            { name: "tv", index: "tv", width: 100, sortable: true },
            { name: "emisora", index: "emisora", width: 100, sortable: false },
            { name: "serie", index: "serie", width: 100, sortable: false },
            { name: "plazo", index: "plazo", width: 100, sortable: false },
            { name: "fecInicio", index: "fecInicio", width: 100, sortable: false },
            { name: "horaCierre", index: "horaCierre", width: 100, sortable: false },
            { name: "limiteCaptado", index: "limiteCaptado", width: 100, sortable: false },
            { name: "captado", index: "captado", width: 100, sortable: false },
            { name: "porColocar", index: "porColocar", width: 100, sortable: false },
            { name: "mnb", index: "mnb", width: 100, sortable: false },
            { name: "mna", index: "mna", width: 100, sortable: false },
            { name: "estatus", index: "estatus", width: 100, sortable: false },
            { name: "mensaje", index: "mensaje", width: 100, sortable: false }

        ],
        loadComplete: function () {
            console.log('Menu');
            ($("tr.jqgrow", this) as any).contextMenu('contextMenu', {
                bindings: {
                    'cierre-definitivo': function (event) {
                        console.log('Cierre definitivo');
                    },
                    'detalle-captacion': function (event) {
                        console.log('Detalle de captacion');
                    },
                    'cancela-notae': function (event) {
                        console.log('Cancela nota estructurada');
                    },
                    'reenvio-cierre': function (event) {
                        console.log('Reenvio de cierre');
                    },
                    'amplia-horario': function (event) {
                        console.log('Amplia horario');
                    },
                }, onContexMenu: function (event, menu) {

                }
            });
        }
    });

    /* $("#table_notas-estructuradas").setGridParam({
 
         loadComplete: function () {
             $('tr.jqgrow', "#table_notas-estructuradas").contextmenu('contextMenu', {
                 bindings: {
                     'cierre-definitivo': function (event) {
                         console.log('Cierre definitivo');
                     },
                     'detalle-captacion': function (event) {
                         console.log('Detalle de captacion');
                     },
                     'cancela-notae': function (event) {
                         console.log('Cancela nota estructurada');
                     },
                     'reenvio-cierre': function (event) {
                         console.log('Reenvio de cierre');
                     },
                     'amplia-horario': function (event) {
                         console.log('Amplia horario');
                     },
                 },onContexMenu: function(event, menu){
 
                 }
             });
         }
     });*/

    $("#table_notas-estructuradas").jqGrid("setGridParam",
        {
            loadComplete: function () {
                console.log("setGridParam")
                $("#table_notas-estructuradas").contextMenu('contextMenu', {
                    bindings: {
                        'cierre-definitivo': function (event) {
                            console.log('Cierre definitivo');
                        },
                        'detalle-captacion': function (event) {
                            console.log('Detalle de captacion');
                        },
                        'cancela-notae': function (event) {
                            console.log('Cancela nota estructurada');
                        },
                        'reenvio-cierre': function (event) {
                            console.log('Reenvio de cierre');
                        },
                        'amplia-horario': function (event) {
                            console.log('Amplia horario');
                        },
                    }, onContexMenu: function (event, menu) {

                    }
                });

            }
        }
    );

};

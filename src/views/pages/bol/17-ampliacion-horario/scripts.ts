($("#horario-sacid") as any).select2({
    minimumResultsForSearch: Infinity
});

($("#horario-ampliacion") as any).select2({
    placeholder: "--Seleccione--",
    minimumResultsForSearch: Infinity
});

$("#btn_mostrar_ventana").click(() =>
    $("#dialogo_ampliacion_horario").dialog({
        modal: true,
        closeText: "",
        show: true,
        width: "auto",
        title: "Ampliar Horario de Cierre",
        buttons: [
            {
                text: "Aceptar",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    })
);
$('#grupo_movi_contrato').tabs();
$('#grupo_datos').tabs();
$('#criterios_acordion').accordion(ui_accordion_settings);
$('#fechaI').datepicker(ui_datepicker_settings);
$('#fechaF').datepicker(ui_datepicker_settings);

$('#table_grid_mov_contrato').jqGrid({
    datatype: 'local',
    height: 250,
    colNames: [
        'Fecha Operación',
        'Fecha Liquidación',
        'Operación',
        'Emisora',
        'Perfil del Producto al momento de la Operación',
        'TV',
        'Cantidad',
        'Precio',
        'Imp.Bruto',
        'Tasa',
        'Plazo',
        'Tipo Portafolio',
        'Rompe',
        'Serv. Inversión',
        'Perfil del Cliente al momento de la Operación',
        'Medio Cierre',
        'Número de Red/Teléfono',
        'Clasificación ETF',
        'Oper. Art. 194'
    ],
    colModel: [
        { name: 'contrato', width: 100 },
        { name: 'libro', width: 110 },
        { name: 'cliente', width: 100, align: 'right' },
        { name: 'digito', width: 100, align: 'right' },
        { name: 'tv', width: 270, align: 'right' },
        { name: 'descr_tv', width: 100, sortable: false },
        { name: 'emisora', width: 100 },
        { name: 'serie', width: 100 },
        { name: 'cantidad', width: 100 },
        { name: 'precio', width: 100 },
        { name: 'valuacion', width: 100 },
        { name: 'promotor', width: 100 },
        { name: 'folio', width: 100 },
        { name: 'fecha', width: 100 },
        { name: 'negocio', width: 270 },
        { name: 'promotor', width: 100 },
        { name: 'folio', width: 150 },
        { name: 'fecha', width: 100 },
        { name: 'negocio', width: 100 }
    ],
    pager: '#pager_contratos',
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: 'contrato',
    sortorder: 'desc',
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ''
});

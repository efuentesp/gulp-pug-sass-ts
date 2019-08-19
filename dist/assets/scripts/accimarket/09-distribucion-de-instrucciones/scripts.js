console.log('00-distribucion-de-instrucciones');
$('#criterios_busqueda_accordion').accordion(ui_accordion_settings);
$('#tabs_resultados_busqueda').tabs();
$('#transaccion').select2({
    minimumResultsForSearch: Infinity
});
$('#institucion_financiera').select2({
    minimumResultsForSearch: Infinity
});
$('#dispersion').select2({
    minimumResultsForSearch: Infinity
});
$('#subsistema').select2({
    minimumResultsForSearch: Infinity
});
$('#comparacion').select2({
    minimumResultsForSearch: Infinity
});
$('#sucursal').select2({
    minimumResultsForSearch: Infinity
});
$('#table_grid_promocion').jqGrid({
    url: 'http://localhost:3000/fideicomiso',
    datatype: 'json',
    mtype: 'GET',
    colNames: [
        'Contrato',
        'Libro',
        'Cliente',
        'Digito',
        'TV',
        'Descr TV',
        'Emisora',
        'Serie',
        'Cantidad',
        'Precio',
        'Valuación',
        'Promotor',
        'Folio'
    ],
    colModel: [
        { name: 'generalesnumero', width: 55 },
        { name: 'generalesnombre', width: 90 },
        { name: 'generalesadministrador', width: 80, align: 'right' },
        { name: 'generalespromotor', width: 80, align: 'right' },
        { name: 'caracteristicasformamanejo', width: 80, align: 'right' },
        { name: 'caracteristicastiponegocio', width: 150, sortable: false },
        { name: 'caracteristicasproducto', width: 90 },
        { name: 'caracteristicasmontoapertura', width: 90 },
        { name: 'adicionalesnoescritura', width: 90 },
        { name: 'caracteristicasfechaalta', width: 90 },
        { name: 'adicionalesfechainscripcion', width: 90 },
        { name: 'adicionalesnombrenotario', width: 90 },
        { name: 'adicionalesnonotario', width: 90 }
    ],
    pager: '#pager_contratos',
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: 'generalesnumero',
    sortorder: 'desc',
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ''
});
$('#table_grid_administrativas').jqGrid({
    url: 'http://localhost:3000/fideicomiso',
    datatype: 'json',
    mtype: 'GET',
    colNames: [
        'Contrato',
        'Libro',
        'Cliente',
        'Digito',
        'TV',
        'Descr TV',
        'Emisora',
        'Serie',
        'Cantidad',
        'Precio',
        'Valuación',
        'Promotor',
        'Folio'
    ],
    colModel: [
        { name: 'generalesnumero', width: 55 },
        { name: 'generalesnombre', width: 90 },
        { name: 'generalesadministrador', width: 80, align: 'right' },
        { name: 'generalespromotor', width: 80, align: 'right' },
        { name: 'caracteristicasformamanejo', width: 80, align: 'right' },
        { name: 'caracteristicastiponegocio', width: 150, sortable: false },
        { name: 'caracteristicasproducto', width: 90 },
        { name: 'caracteristicasmontoapertura', width: 90 },
        { name: 'adicionalesnoescritura', width: 90 },
        { name: 'caracteristicasfechaalta', width: 90 },
        { name: 'adicionalesfechainscripcion', width: 90 },
        { name: 'adicionalesnombrenotario', width: 90 },
        { name: 'adicionalesnonotario', width: 90 }
    ],
    pager: '#pager_contratos',
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: 'generalesnumero',
    sortorder: 'desc',
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ''
});
$('#table_grid_fiduciario').jqGrid({
    url: 'http://localhost:3000/fideicomiso',
    datatype: 'json',
    mtype: 'GET',
    colNames: [
        'Contrato',
        'Libro',
        'Cliente',
        'Digito',
        'TV',
        'Descr TV',
        'Emisora',
        'Serie',
        'Cantidad',
        'Precio',
        'Valuación',
        'Promotor',
        'Folio'
    ],
    colModel: [
        { name: 'generalesnumero', width: 55 },
        { name: 'generalesnombre', width: 90 },
        { name: 'generalesadministrador', width: 80, align: 'right' },
        { name: 'generalespromotor', width: 80, align: 'right' },
        { name: 'caracteristicasformamanejo', width: 80, align: 'right' },
        { name: 'caracteristicastiponegocio', width: 150, sortable: false },
        { name: 'caracteristicasproducto', width: 90 },
        { name: 'caracteristicasmontoapertura', width: 90 },
        { name: 'adicionalesnoescritura', width: 90 },
        { name: 'caracteristicasfechaalta', width: 90 },
        { name: 'adicionalesfechainscripcion', width: 90 },
        { name: 'adicionalesnombrenotario', width: 90 },
        { name: 'adicionalesnonotario', width: 90 }
    ],
    pager: '#pager_contratos',
    rowNum: 10,
    rowList: [10, 20, 30],
    sortname: 'generalesnumero',
    sortorder: 'desc',
    viewrecords: true,
    gridview: true,
    autoencode: true,
    caption: ''
});

//# sourceMappingURL=../../../maps/accimarket/09-distribucion-de-instrucciones/scripts.js.map
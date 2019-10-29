// Form validations
($("#servicio-inv") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});
($("#medio-cierre") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

let ordenes_params: UrlParams = {};

http_findAll("ordenes_nota_estructurada", ordenes_params, payload => {
  llenaGridOrdenes(payload);
  const rec_count = payload.length;
  $("#count_ordenes").html(rec_count);
});

const llenaGridOrdenes = (listaOrdenes: any) => {
  $("#table_ordenes").jqGrid({
    data: listaOrdenes,
    datatype: "local",
    height: "57em",
    shrinkToFit: false,
    rowList: [10, 20, 30],
    colNames: [
      "Contrato",
      "Dígito",
      "Nombre",
      "Emisora",
      "Operación",
      "Importe",
      "Precio",
      "Rompe",
      "Servicio de Inversión"
      //   "Plazo",
      //   "Tasa",
      //   "Fecha Inicio",
      //   "Fecha Vencimiento",
      //   "Moneda Base",
      //   "Moneda Alternativa",
      //   "Títulos a Liquidar",
      //   "Perfil Contrato",
      //   "Perfil Emisora",
      //   "Efectivo disponible",
      //   "Tipo de Medio de Liquidación",
      //   "Medio de Liquidación",
      //   "Medio Cierre",
      //   "Número de Red/Teléfono",
      //   "Estatus de Orden",
      //   "Mensaje"
    ],
    colModel: [
      {
        name: "contrato",
        index: "contrato",
        width: 100,
        sortable: true,
        sorttype: "number",
        frozen: true
      },
      { name: "digito", index: "digito", width: 100, sortable: false },
      { name: "nombre", index: "nombre", width: 100, sortable: false },
      { name: "emisora", index: "emisora", width: 100, sortable: false },
      { name: "operacion", index: "operacion", width: 100, sortable: false },
      { name: "importe", index: "importe", width: 100, sortable: false },
      { name: "precio", index: "precio", width: 100, sortable: false },
      { name: "rompe", index: "rompe", width: 100, sortable: false },
      {
        name: "servicio_inversion",
        index: "servicio_inversion",
        width: 150,
        sortable: false
      }
      //   { name: "plazo", index: "plazo", width: 100, sortable: false },
      //   { name: "tasa", index: "tasa", width: 100, sortable: false },
      //   {
      //     name: "fechaInicio",
      //     index: "fechaInicio",
      //     width: 90,
      //     formatter: "date",
      //     sortable: false
      //   },
      //   {
      //     name: "fechaVencimiento",
      //     index: "fechaVencimiento",
      //     width: 90,
      //     formatter: "date",
      //     sortable: false
      //   },
      //   { name: "monedaBase", index: "monedaBase", width: 90, sortable: false },
      //   {
      //     name: "monedaAlternativa",
      //     index: "monedaAlternativa",
      //     width: 90,
      //     sortable: false
      //   },
      //   {
      //     name: "titulosLiquidar",
      //     index: "titulosLiquidar",
      //     width: 90,
      //     sortable: false
      //   },
      //   {
      //     name: "perfilContrato",
      //     index: "perfilContrato",
      //     width: 90,
      //     sortable: false
      //   },
      //   {
      //     name: "perfilEmisora",
      //     index: "perfilEmisora",
      //     width: 90,
      //     sortable: false
      //   },
      //   {
      //     name: "efectivoDisponible",
      //     index: "efectivoDisponible",
      //     width: 90,
      //     sortable: false
      //   },
      //   {
      //     name: "tipoMedLiquidacion",
      //     index: "tipoMedLiquidacion",
      //     width: 90,
      //     sortable: false
      //   },
      //   {
      //     name: "medioLiquidacion",
      //     index: "medioLiquidacion",
      //     width: 90,
      //     sortable: false
      //   },
      //   { name: "medioCierre", index: "medioCierre", width: 90, sortable: false },
      //   { name: "numRedTel", index: "numRedTel", width: 90, sortable: false },
      //   { name: "estatus", index: "estatus", width: 90, sortable: false },
      //   { name: "mensaje", index: "mensaje", width: 90, sortable: false }
    ]
  });
};

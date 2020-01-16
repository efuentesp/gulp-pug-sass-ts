/// <reference path="../../typings/index.d.ts" />

console.log("103-consultas-mercado-dinero");

let orden_directo_params: UrlParams = {};

httpFindAll("orden_en_directo", orden_directo_params, payload => {
  llenaGridOrdenDirecto(payload);
  const rec_count = payload.length;
  $("#count_contratos").html(rec_count);
});

const llenaGridOrdenDirecto = (ordenes: any) => {
  $("#table_ordenes").jqGrid({
    data: ordenes,
    datatype: "local",
    height: "auto",
    shrinkToFit: false,
    rowList: [10, 20, 30],
    colNames: [
      "Folio Operación",
      "Solicitudes Cancelación",
      "Fecha Operación",
      "Fecha Asignación",
      "Libro",
      "Contrato",
      "Dígito",
      "Emiora",
      "Usuario"
    ],
    colModel: [
      {
        name: "folio_operacion",
        index: "folio_operacion",
        width: 100,
        sortable: true,
        sorttype: "number",
        frozen: true
      },
      {
        name: "solicitudes_cancelacion",
        index: "solicitudes_cancelacion",
        width: 100,
        sortable: false
      },
      {
        name: "fecha_operacion",
        index: "fecha_operacion",
        width: 100,
        sortable: false
      },
      {
        name: "fecha_asignacion",
        index: "fecha_asignacion",
        width: 100,
        sortable: false
      },
      { name: "libro", index: "libro", width: 100, sortable: false },
      { name: "contrato", index: "contrato", width: 100, sortable: false },
      { name: "digito", index: "digito", width: 100, sortable: false },
      { name: "emisora", index: "emisora", width: 100, sortable: false },
      {
        name: "usuario",
        index: "usuario",
        width: 100,
        sortable: false
      }
    ]
  });
};

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
    ],
    loadComplete: function() {
      console.log("Menu");
      ($("tr.jqgrow", this) as any).contextMenu("contextMenu", {
        bindings: {
          "editar-orden": function(event) {
            console.log("Editar Orden");
          },
          "cancelar-orden": function(event) {
            console.log("Cancelar orden");
          }
        },
        onContexMenu: function(event, menu) {}
      });
    }
  });
};

const llenarInfoContratoNE = (contrato: any) => {
  $("#descripcion").val(contrato.contrato);
  $("#perfil").val(contrato.perfil);
  $("#digito").val(contrato.digito);
  $("#efectivo").val(contrato.saldo);
};

$("#contrato").keypress(event => {
  const keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == 13) {
    const contrato: string = String($("#contrato").val());

    http_findOne("contratos", contrato, payload => {
      console.log(payload);
      llenarInfoContratoNE(payload);
    });
  }
});

($("#emisora") as any).select2({
  placeholder: "--Seleccione--"
});

fieldSelectPlusAutocomplete("emisora", {
  service: "emisoras",
  id: "id",
  text: "value"
});

$("#emisora").on("select2:select", e => {
  const emisora: string = String($("#emisora").val());

  http_findOne("datosEmisora", emisora, payload => {
    console.log(payload);
    llenarInfoEmisoraNE(payload);
  });
});

const llenarInfoEmisoraNE = (emisora: any) => {
  var tv = $("#tv").val(emisora.tv);
  var plazo = $("#plazo").val(emisora.plazo);
  var tasa = $("#tasa").val(emisora.tasa);
  var fechaInicio = $("#fechaInicio").val(emisora.fechaInicio);
  var fechaVencimiento = $("#fechaVencimiento").val(emisora.fechaFin);
  var monedaBase = $("#monedaBase").val(emisora.monedaBase);
  var monedaAlt = $("#monedaAlt").val(emisora.monedaAlt);
  var precio = $("#precio").val(emisora.precio);
  var totalColocar = $("#totalColocar").val(emisora.totalColocar);
  var multiploInversion = $("#multiploInversion").val(
    emisora.multiploInversion
  );
  var minimoInversion = $("#minimoInversion").val(emisora.minimoInversion);
  var tituloLiq = $("#tituloLiq").val(emisora.tituloLiq);
  var tipoMed = $("#tipoMed").val(emisora.tipoMed);
  var medLiq = $("#medLiq").val(emisora.medLiq);
};

$("#importe").keypress(event => {
  const keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == 13) {
    const importe = Number($("#importe").val());
    const totalColocar = Number($("#totalColocar").val());
    const minimoInversion = Number($("#minimoInversion").val());
    console.log(importe, totalColocar);
    if (importe > totalColocar) {
      alert(
        "El importe a liquidar no puede ser mayor que el total a colocar de la emisión"
      );
    } else {
      alert("Si pasa");
    }

    if (importe < minimoInversion) {
      alert(
        "El importe a liquidar no puede ser menor a la inversión minima definida en la emisión"
      );
    } else {
      alert("Si pasa");
    }
  }
});

$("#btn-guardar").click(() => {});

$("#btn_clean").click(() => {
  ($("nueva-nota") as any).parsley().reset();
  $(".select2")
    .val(null)
    .trigger("change");
});

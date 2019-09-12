console.log("form-validation");

($("#new-customer") as any)
  .parsley()
  .on("field:validated", () => {
    const ok = $(".parsley-error").length === 0;
    $(".callout-info").toggleClass("hidden", !ok);
    $(".callout-warning").toggleClass("hidden", ok);
  })
  .on("form:submit", () => {
    console.log("form:submit");
    alert("Form ready to be sent!");
    return false;
  });

$("#fecha1").datepicker(ui_datepicker_settings);
$("#fecha2").datepicker(ui_datepicker_settings);
$("#fecha3").datepicker(ui_datepicker_settings);
$("#fecha4").datepicker(ui_datepicker_settings);

($("#payment") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#payment2") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("#payment2").change(() => {
  ($("#new-customer") as any).parsley().validate();
});

($("#payment3") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("#payment3").change(() => {
  ($("#new-customer") as any).parsley().validate();
});

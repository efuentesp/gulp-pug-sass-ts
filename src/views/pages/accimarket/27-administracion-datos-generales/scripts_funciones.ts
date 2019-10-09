$('input[name="chk_documentacion_flags"]').change(function () {
    console.log("Checkbox ejemplo " + $(this).is(':checked') + " " + $(this).val());
});
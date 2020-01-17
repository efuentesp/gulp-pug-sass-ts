console.log("form-validation");

($("#newCustomer") as any)
  .parsley()
  .on("field:success", (e) => {
    removeErrorsInAttrTitle(e);
  })
  .on("field:error", (e) => {
    putErrorsInAttrTitle(e);
  })
  .on("form:submit", () => {
    console.log("form:submit");
    console.log("--------+> Input id: ", $("#txtId").val());
    console.log("--------+> Input nombreUno: ", $("#txtNombreUno").val());
    console.log("--------+> Input nombreDos: ", $("#txtNombreDos").val());
    console.log("--------+> Input nombreTres: ", $("#txtNombreTres").val());
    console.log("--------+> Email emailUno: ", $("#emailUno").val());
    console.log("--------+> Email emailDos: ", $("#emailDos").val());
    console.log("--------+> Date fechaUno: ", $("#fechaUno").val());
    console.log("--------+> Date fechaDos: ", $("#fechaDos").val());
    console.log("--------+> Date fechaTres: ", $("#fechaTres").val());
    console.log("--------+> Date fechaCuatro: ", $("#fechaCuatro").val());
    console.log("--------+> Field plus minus contratoPlusMinusUno: ", getList("contratoPlusMinusUno"));
    console.log("--------+> Field plus minus contratoPlusMinusDos: ", getList("contratoPlusMinusDos"));
    console.log("--------+> Field plus minus contratoPlusMinusTres: ", getList("contratoPlusMinusTres"));
    console.log("--------+> Field plus minus contratoPlusMinusCuatro: ", getList("contratoPlusMinusCuatro"));
    console.log("--------+> Field select plus minus contratoSelectPlusMinusUno: ", getList("contratoSelectPlusMinusUno"));
    console.log("--------+> Field select plus minus contratoSelectPlusMinusDos: ", getList("contratoSelectPlusMinusDos"));
    console.log("--------+> Field select plus minus contratoSelectPlusMinusTres: ", getList("contratoSelectPlusMinusTres"));
    console.log("--------+> Field select plus minus contratoSelectPlusMinusCuatro: ", getList("contratoSelectPlusMinusCuatro"));
    console.log("--------+> Options bancoUno: ", getOptionSelected("bancoUno"));
    console.log("--------+> Options bancoDos: ", getOptionSelected("bancoDos"));
    console.log("--------+> Input descriptionUno: ", $("#descriptionUno").val());
    console.log("--------+> Input descriptionDos: ", $("#descriptionDos").val());
    console.log("--------+> Checks productsUno: ", getChecked("productsUno"));
    console.log("--------+> Checks productsDos: ", getChecked("productsDos"));
    console.log("--------+> Checks productsTres: ", getChecked("productsTres"));
    console.log("--------+> Checks productsCuatro: ", getChecked("productsCuatro"));
    console.log("--------+> Checks servicioInversionUno: ", getChecked("servicioInversionUno"));
    console.log("--------+> Checks servicioInversionDos: ", getChecked("servicioInversionDos"));
    console.log("--------+> Select paymentUno: ", $("#cmbPaymentUno").val());
    console.log("--------+> Select paymentDos: ", $("#cmbPaymentDos").val());
    console.log("--------+> Select paymentTres: ", $("#cmbPaymentTres").val());
    console.log("--------+> Input amount: ", $("#txtAmount").val());
    console.log("--------+> Fileupload adjuntarArchivo: ", $("#adjuntarArchivo").val());
    console.log("--------+> Search buscar: ", $("#txtBuscar").val());
    console.log("--------+> Multiselect multi: ", $("#cmbMulti").val());
    alert("Form ready to be sent!");
    return false;
  });

fieldPlusMinus("contratoPlusMinusUno", {});
fieldPlusMinus("contratoPlusMinusDos", {});
fieldPlusMinus("contratoPlusMinusTres", {});
fieldPlusMinus("contratoPlusMinusCuatro", {});
fieldSelectPlusMinus("contratoSelectPlusMinusUno", {});
fieldSelectPlusMinus("contratoSelectPlusMinusDos", {});
fieldSelectPlusMinus("contratoSelectPlusMinusTres", {});
fieldSelectPlusMinus("contratoSelectPlusMinusCuatro", {});

($("#cmbPaymentUno") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

($("#cmbPaymentDos") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("#cmbPaymentDos").change(() => {
  ($("#newCustomer") as any).parsley().validate();
});

($("#cmbPaymentTres") as any).select2({
  placeholder: "--Seleccione--",
  minimumResultsForSearch: Infinity
});

$("#cmbPaymentTres").change(() => {
  ($("#newCustomer") as any).parsley().validate();
});

$("#id").alphanum({allow: "_-"});
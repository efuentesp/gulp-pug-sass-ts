console.log("form-validation");

import { ui_accordion_settings } from "../../utils/ui-accordion";
import { ui_datepicker_settings } from "../../utils/ui-datepicker";
import { REST_URL, UrlParams, http_findAll } from "../../utils/http";
import { fillJqGrid } from "../../utils/jqgrid";

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

$("#payment2").change(() => {
  ($("#new-customer") as any).parsley().validate();
});

$("#payment3").change(() => {
  ($("#new-customer") as any).parsley().validate();
});

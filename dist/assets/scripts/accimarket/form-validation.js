$("#new-customer").parsley().on("field:validated",function(){var e=0===$(".parsley-error").length;$(".callout-info").toggleClass("hidden",!e),$(".callout-warning").toggleClass("hidden",e)}).on("form:submit",function(){return console.log("form:submit"),alert("Form ready to be sent!"),!1});
//# sourceMappingURL=../../maps/accimarket/form-validation.js.map

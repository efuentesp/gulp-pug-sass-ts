$("#new-customer")
    .parsley()
    .on("field:validated", function () {
    var ok = $(".parsley-error").length === 0;
    $(".callout-info").toggleClass("hidden", !ok);
    $(".callout-warning").toggleClass("hidden", ok);
})
    .on("form:submit", function () {
    console.log("form:submit");
    alert("Form ready to be sent!");
    return false;
});

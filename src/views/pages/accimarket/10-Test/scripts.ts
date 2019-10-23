/// <reference path="../../typings/index.d.ts" />

console.log("10-Test");

$("#btn-nav-previous").click(function() {
  $(".menu-inner-box").animate({ scrollLeft: "-=200px" });
});

$("#btn-nav-next").click(function() {
  $(".menu-inner-box").animate({ scrollLeft: "+=200px" });
});

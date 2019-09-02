/// <reference path="typings/index.d.ts" />

console.log("common.ts");

// JQuery UI Tooltip settings
$(document).tooltip({
  disabled: true
});

// Sidebar
let isSidebarOpened = false;
$(".sidebar_button").click(() => {
  if (isSidebarOpened) {
    $(".sidebar_content").removeClass("is_open");
    $(".sidebar_button").removeClass("is_open");
    $(".content").removeClass("is_sidebar_open");
    $;
  } else {
    $(".sidebar_content").addClass("is_open");
    $(".sidebar_button").addClass("is_open");
    $(".content").addClass("is_sidebar_open");
  }
  isSidebarOpened = !isSidebarOpened;
});

// Select2
// ($("select[name=quiz_select]") as any).select2({
//   minimumResultsForSearch: Infinity
// });

($(".select2") as any).select2({
  minimumResultsForSearch: Infinity
});

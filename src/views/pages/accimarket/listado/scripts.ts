/// <reference path="../../typings/index.d.ts" />

let source_params: UrlParams = {};
let destination_params: UrlParams = {};

$("#source, #destination").listswap({
  truncate: true,
  height: 250,
  is_scroll: true
});

http_findAll("source", source_params, payload => {
  llenaSource(payload);
});

http_findAll("destination", destination_params, payload => {
  llenaDestination(payload);
});

const llenaSource = (source: any) => {
  var select = $("#source");
  var list = $("#listbox_source_wrapper ul");

  for (var i = 0; i < source.length; i++) {
    var data = source[i];
    select.append(
      "<option value = " + data.value + ">" + data.label + "</option>"
    );

    list.append(
      "<li class='listbox_option odd' data-value=" +
        data.value +
        "><span class='truncate'>" +
        data.label +
        "</span></li>"
    );
  }
};

// $("#listbox_source_wrapper ul li span").click(() => {

// });

// $("#listbox_source_wrapper ul li").click(() => {
//   console.log("DAto");
// });

// $("#listbox_source_wrapper ul li.listbox_option").on("click", "span", function(
//   e
// ) {
//   e.preventDefault();
//   var $this = $(this).parent();

//   console.log("Res:" + $this);

//   $this
//     .addClass("select")
//     .siblings()
//     .removeClass("select");
//   //$("#sizevalue").val($this.data("value"));
// });

const llenaDestination = (destination: any) => {
  var select = $("#destination");
  var list = $("#listbox_destination_wrapper ul");

  for (var i = 0; i < destination.length; i++) {
    var data = destination[i];
    select.append(
      "<option value = " + data.value + ">" + data.label + "</option>"
    );

    list.append(
      "<li class='listbox_option' data-value=" +
        data.value +
        "><span class='truncate'>" +
        data.label +
        "</span></li>"
    );
  }
};

$("#listbox_source_wrapper ul li").click(() => {
  console.log("Element");
});

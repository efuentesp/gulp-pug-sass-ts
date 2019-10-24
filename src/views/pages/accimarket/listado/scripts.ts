/// <reference path="../../typings/index.d.ts" />

let source_params: UrlParams = {};
let destination_params: UrlParams = {};

http_findAll("source", source_params, payload => {
  llenaSource("listado", payload);
});

http_findAll("destination", destination_params, payload => {
  llenaDestination("listado", payload);
});

const llenaSource = (id: string, source: any) => {
  fillSwapList(id, "source", source);
};

const llenaDestination = (id: string, destination: any) => {
  fillSwapList(id, "destination", destination);
};

const fillSwapList = (id: string, list_id: string, params: any) => {
  var _id = "#" + id;
  var list = $("#listado_" + list_id);

  for (var i = 0; i < params.length; i++) {
    var data = params[i];
    list.append("<li value = " + data.value + ">" + data.label + "</li>");
  }

  $(_id + "_source").disableSelection();
  $(_id + "_destination").disableSelection();
};

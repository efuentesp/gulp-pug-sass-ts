/// <reference path="../../typings/index.d.ts" />

let source_params: UrlParams = {};
let destination_params: UrlParams = {};

$("#source, #destination").listswap({
  truncate: true,
  height: 250,
  is_scroll: true,
  id_source: "source",
  id_destination: "destination",
  id_listSwap: "listboxswap_swap"
});

http_findAll("source", source_params, payload => {
  llenaSource(payload);
});

http_findAll("destination", destination_params, payload => {
  llenaDestination(payload);
});

const llenaSource = (source: any) => {
  fillSwapList("source", "listboxswap_swap", source);
};

const llenaDestination = (destination: any) => {
  fillSwapList("destination", "listboxswap_swap", destination);
};

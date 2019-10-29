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

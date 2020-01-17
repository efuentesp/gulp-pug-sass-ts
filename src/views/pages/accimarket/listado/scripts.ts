/// <reference path="../../typings/index.d.ts" />

let source_params: UrlParams = {};
let destination_params: UrlParams = {};

httpFindAll("source", source_params, payload => {
  llenaSource("lstListado", payload);
});

httpFindAll("destination", destination_params, payload => {
  llenaDestination("lstListado", payload);
});

const llenaSource = (id: string, source: any) => {
  fillSwapList(id, "Source", source);
};

const llenaDestination = (id: string, destination: any) => {
  fillSwapList(id, "Destination", destination);
};

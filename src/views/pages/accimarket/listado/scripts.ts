/// <reference path="../../typings/index.d.ts" />

let listswapSourceParams: UrlParams = {};
let listwapDestinationParams: UrlParams = {};

httpFindAll("source", listswapSourceParams, payload => {
  llenaSource("listado", payload);
});

httpFindAll("destination", listwapDestinationParams, payload => {
  llenaDestination("listado", payload);
});

const llenaSource = (id: string, source: any) => {
  fillSwapList(id, "Source", source);
};

const llenaDestination = (id: string, destination: any) => {
  fillSwapList(id, "Destination", destination);
};

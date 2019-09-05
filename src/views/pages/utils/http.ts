/// <reference path="../../../../typings/index.d.ts" />

// import * as Rx from "rxjs";

export const REST_URL = "http://localhost:3000";

export interface UrlParams {
  [key: string]: any;
}

// REST APIs}
const rest_findAll = (resource: string, params: any, cb: Function) => {
  const api_params = $.param(params);
  const url = api_params
    ? `${REST_URL}/${resource}?${api_params}`
    : `${REST_URL}/${resource}`;
  console.log(url);

  $.ajax({
    url,
    contentType: "application/json",
    dataType: "json",
    success: result => cb(result)
  });
};

// const rest_findAll$ = (resource: string, params: any) => {
//   const api_params = $.param(params);
//   const url = api_params
//     ? `${REST_URL}/${resource}?${api_params}`
//     : `${REST_URL}/${resource}`;
//   console.log(url);

//   const promise = $.ajax({
//     url,
//     contentType: "application/json",
//     dataType: "json"
//   }).promise();

//   return from(promise);
// };

const rpc_findAll = (resource: string, params: any, cb: Function) => {
  // TODO: Implementar versión con POST
};

export const http_findAll = rest_findAll;
// export const http_findAll$ = rest_findAll$;

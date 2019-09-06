// const rest_findAll$ = (resource, params) => {
//   const api_params = $.param(params);
//   const url = api_params
//     ? `${REST_URL}/${resource}?${api_params}`
//     : `${REST_URL}/${resource}`;
//   console.log(url);

//   return $.ajaxAsObservable({
//     url,
//     contentType: "application/json",
//     dataType: "json"
//   });
// };

// rest_findAll$("contratos", {}).subscribe(console.log);
console.log("rxjs!");

import builder from './api-common';

export const test = builder.build({
  baseUrl: builder.BASEURL_01,
  url: "/test",
  method: "get",
  simulation: false,
  simulator: "/static/json/test.json"
});

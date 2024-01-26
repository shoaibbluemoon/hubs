export const Http = {
    getHeaders: async (extraHeaders) => {
    const qs = new URLSearchParams(location.search);
    const token = qs.get("entry") || localStorage.getItem('token');
    const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiJlYjg1MWMyMGY0ZDQzY2YxNWRlN2UwYjJiZTI2N2I5OSIsImlhdCI6MTY1MDM1NjQxMn0.Rkz37tnm_PSu9Ww2JwuyDSQ2SaeewlukrM_yxmxzyZ8";
    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiJlYjg1MWMyMGY0ZDQzY2YxNWRlN2UwYjJiZTI2N2I5OSIsImlhdCI6MTY1MDM1NjQxMn0.Rkz37tnm_PSu9Ww2JwuyDSQ2SaeewlukrM_yxmxzyZ8',
  
      const defaultHeaders = {
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`
       };
      return extraHeaders
        ? { ...extraHeaders, ...defaultHeaders }
        : defaultHeaders;
    },
    get: async (url, body, extraHeaders) => {
      try {
        const headers = await Http.getHeaders(extraHeaders);
        const response = await body ? fetch(url, {
          method: "GET",
          body: JSON.stringify(body),
          headers,
        }) : fetch(url, {
          method: "GET",
          headers,
        });
        if (headers["Content-Type"] === "application/json") {
          const responseData = await response.json();
          if (responseData.error || responseData.statusCode) {
            return Promise.reject(responseData);
          }
          return responseData;
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    post: async (url, body, extraHeaders, noToken) => {
      try {
        const headers = noToken ? {"Content-type": "application/json"} : await Http.getHeaders(extraHeaders);
  
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers,
        });
        if (headers["Content-Type"] === "application/json") {
          const responseData = await response.json();
          if (responseData.error || responseData.statusCode) {
            return Promise.reject(responseData);
          }
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    patch: async (url, extraHeaders, body) => {
      try {
        const headers = await Http.getHeaders(extraHeaders);
        const response = await fetch(url, {
          method: "PATCH",
          body: JSON.stringify(body),
          headers,
        });
        const responseData = await response.json();
        if (responseData.error || responseData.statusCode) {
          return Promise.reject(responseData);
        }
        return responseData;
      } catch (e) {
        console.log(e);
      }
    },
    put: async (url, body) => {
      try {
        const headers = await Http.getHeaders();
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(body),
          headers,
        });
        const responseData = await response.json();
        if (responseData.error || responseData.statusCode) {
          return Promise.reject(responseData);
        }
        return responseData;
      } catch (e) {
        console.log(e);
      }
    },
    delete: async (url, extraHeaders, body) => {
      try {
        const headers = await Http.getHeaders(extraHeaders);
        const response = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify(body),
          headers,
        });
        const responseData = await response.json();
        if (responseData.error || responseData.statusCode) {
          return Promise.reject(responseData);
        }
        return responseData;
      } catch (e) {
        console.log(e);
      }
    },
  };
  
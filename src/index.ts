import { AxiosRequestConfig, Method, AxiosResponse, AxiosError } from "axios";
import buildFullPath from "axios/lib/core/buildFullPath";
import settle from "axios/lib/core/settle";
import buildURL from "axios/lib/helpers/buildURL";
import parseHeaders from "axios/lib/helpers/parseHeaders";
import utils from "axios/lib/utils";

type Config = Exclude<AxiosRequestConfig, "method"> & { method: Method };

type UpperCaseMethod =
  "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "PURGE"
  | "LINK"
  | "UNLINK";

export default function xhrAdapter<T> (config: Config): Promise<AxiosResponse<T>> {
  return new Promise((resolve, reject) => {
    let requestData = config.data;
    const requestHeaders = config.headers ?? {};

    if (utils.isFormData(requestData)) {
      delete requestHeaders["Content-Type"]; // Let the browser set it
    }

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password || "";
      requestHeaders.Authorization = "Basic " + Buffer.from(username + ":" + password).toString("base64");
    }

    // Handle low level network errors
    const onerror = function handleError () {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config));
    };

    // Handle timeout
    const ontimeout = function handleTimeout () {
      reject(new AxiosError("timeout of " + config.timeout + "ms exceeded", AxiosError.ECONNABORTED, config));
    };

    // Remove Content-Type if data is undefined
    utils.forEach(requestHeaders, function setRequestHeader (val: any, key: string) {
      if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
        // Remove Content-Type if data is undefined
        delete requestHeaders[key];
      }
    });

    // Add withCredentials to request if needed
    // if (config.withCredentials) {
    //   request.withCredentials = true
    // }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    // Listen for ready state
    const onload = function handleLoad (resp: GM.Response<T>) {
      // Prepare the response
      const responseHeaders = "responseHeaders" in resp ? parseHeaders(resp.responseHeaders) : {};
      const responseData = !config.responseType || config.responseType === "text" ? resp.responseText : resp.response;
      const response: AxiosResponse = {
        data: responseData,
        status: resp.status,
        statusText: resp.statusText,
        headers: responseHeaders,
        config: config,
        request: {
          // can't got real XMLHttpRequest object, only some property is available
          responseURL: resp.finalUrl,
          status: resp.status,
          statusText: resp.statusText,
          responseXML: null
        }
      };
      settle(resolve, reject, response);
    };

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled (cancel) {
        reject(cancel);
        // Clean up request
      });
    }

    // Change response type
    let responseType: XMLHttpRequestResponseType | undefined;
    if (config.responseType && config.responseType !== "json") {
      if (config.responseType === "stream") {
        return reject(new AxiosError("using stream as `responseType` is not supported in browser"));
      }
      responseType = config.responseType;
    }

    const method = config.method.toUpperCase() as UpperCaseMethod;
    if (method === "UNLINK" || method === "PURGE" || method === "LINK") {
      reject(new AxiosError(`${method} is not a supported method by GM.xmlHttpRequest`));
    } else {
      const headers: Record<string, string> = {};

      for (const [key, value] of Object.entries(requestHeaders)) {
        if (value !== undefined && value !== null) {
          headers[key] = value.toString();
        }
      }

      GM.xmlHttpRequest({
        method,
        url: buildURL(buildFullPath(config.baseURL, config.url), config.params, config.paramsSerializer),
        headers,
        responseType: responseType,
        data: requestData,
        timeout: config.timeout,
        ontimeout,
        onload,
        onerror
      });
    }
  });
};

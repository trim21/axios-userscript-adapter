// 'use strict'

const utils = require('axios/lib/utils')
const settle = require('axios/lib/core/settle')

const buildURL = require('axios/lib/helpers/buildURL')
const parseHeaders = require('axios/lib/helpers/parseHeaders')
const createError = require('axios/lib/core/createError')
// var cookies = require('axios/lib/helpers/cookies')
var btoa = (typeof window !== 'undefined' && window.btoa) || require('axios/lib/helpers/btoa')

/**
 *
 * @param {Object} config
 * @return {Promise<any>}
 */

module.exports = function xhrAdapter (config) {
  return new Promise((resolve, reject) => {
    var requestData = config.data
    var requestHeaders = config.headers

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type'] // Let the browser set it
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || ''
      var password = config.auth.password || ''
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password)
    }


    // Handle low level network errors
    const onerror = function handleError () {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config))
    }

    // Handle timeout
    const ontimeout = function handleTimeout () {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'))
    }

    // Remove Content-Type if data is undefined
    utils.forEach(requestHeaders, function setRequestHeader (val, key) {
      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
        // Remove Content-Type if data is undefined
        delete requestHeaders[key]
      }
    })

    // Add withCredentials to request if needed
    // if (config.withCredentials) {
    //   request.withCredentials = true
    // }

    if (requestData === undefined) {
      requestData = null
    }

    // Send the request
    // Listen for ready state
    let onload = function handleLoad (resp) {
      // Prepare the response
      var responseHeaders = 'responseHeaders' in resp ? parseHeaders(resp.responseHeaders) : null
      var responseData = !config.responseType || config.responseType === 'text' ? resp.responseText : resp.response
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: resp.status === 1223 ? 204 : resp.status,
        statusText: resp.status === 1223 ? 'No Content' : resp.statusText,
        headers: responseHeaders,
        config: config,
        request: null
      }
      settle(resolve, reject, response)
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled (cancel) {

        reject(cancel)
        // Clean up request
      })
    }

    GM_xmlhttpRequest({
      method: config.method.toUpperCase(),
      url: buildURL(config.url, config.params, config.paramsSerializer),
      headers: requestHeaders,
      data: requestData,
      timeout: config.timeout,
      ontimeout,
      onload,
      onerror,
    })
  })
}

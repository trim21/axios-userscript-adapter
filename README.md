# axios-userscript-adapter

An [adapter] for [axios] to make ajax calls within [UserScript][userscript]
via the [GM.xmlHttpRequest] function as provided by the [Greasemonkey] and [Tampermonkey] WebExtensions for Firefox and Chromium-based browsers.

## Synopsis

```javascript
// ==UserScript==
// @name        new user script
// @namespace   https://trim21.me/
// @description hello
// @version     0.0.1
// @author      Trim21 <trim21me@gmail.com>
// @match       http*://*/*
// @require     https://cdn.jsdelivr.net/npm/axios@~0.21.1/dist/axios.min.js
// @require     https://cdn.jsdelivr.net/npm/axios-userscript-adapter@~0.1.2/dist/axiosGmxhrAdapter.min.js
// @grant       GM.xmlHttpRequest
// @run-at      document-end
// ==/UserScript==

console.log(axios.defaults.adapter);
axios.defaults.adapter = axiosGmxhrAdapter;

axios.get("https://httpbin.org/headers");
```

## Description

The [axios documentation][adapter] describes axios adapters as
*modules that handle dispatching a request and settling a returned Promise once a response is received*.
The standard axios distribution includes adapters for the browser via `xmlHttpRequest`, and node.js via `http` and `https`.

Custom adapters are typically used for 'mocking' requests for testing purposes,
such as [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter).

`axios-userscript-adapter` is specifically for using axios in the browser.

Chiefly, in [userscript] where the `xmlHttpRequest` function for making ajax requests is replaced with `GM.xmlHttpRequest`.
`GM.xmlHttpRequest` is a privileged function available within the [Greasemonkey] and [Tampermonkey]
webextensions that allow userscripts to make ajax requests that cross same origin policy boundaries.
In other words, using axios, the userscript can make http requests to sites that didn't originate from the currently loaded web page.
Read the [GM.xmlHttpRequest] function wiki page for further details.

After assigning `axios-userscript-adapter` as the default adapter:

```javascript
var axios = require("axios");
var adapter = require("axios-userscript-adapter");

axios.defaults.adapter = adapter;
```

all the usual axios goodness is available within your userscript.

## Requirements

`axios-userscript-adapter@0.1.2` requires axios 0.21.0 or higher

add `// @grant GM.xmlHttpRequest` to your userscript metadata

If you are using older version, you may grant `GM_xmlhttpRequest`

## Installation:

```bash
npm install axios axios-userscript-adapter
```

## Further Examples

As previously shown, you can set `axios-userscript-adapter` as the default adapter,
in which case, all axios requests will be dispatched via `GM.xmlHttpRequest`.
However, you can instead specify the adapter on individual requests via a `config` object.

```javascript
console.log(axios.defaults.adapter);
axios.defaults.adapter = axiosGmxhrAdapter;

axios.get("https://httpbin.org/headers");
```

Example with webpack:

```javascript
var axios = require("axios");
var adapter = require("axios-userscript-adapter");

// Send a POST request using GM.xmlHttpRequest
axios({
  method: "post",
  url: "https://www.different-server.com/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
  adapter: adapter,
});
```

or via any requests made by an instance:

```javascript
var axios = require("axios");
var adapter = require("axios-userscript-adapter");

var instance = axios.create({
  // `url` is the server URL that will be used for the request
  url: "https://www.different-server.com/user",

  // `method` is the request method to be used when making the request
  method: "post",

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response.
  adapter: adapter,
});

// Send a POST request using GM.xmlHttpRequest
instance.request({
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
});
```


esm support:

```javascript

import adapter from 'axios-userscript-adapter/dist/esm'

```

## thanks

`axios-userscript-adapter` is forked from [`axios-gmxhr-adapter`](https://github.com/damoclark/axios-gmxhr-adapter)

## Licence

Copyright (c) 2018-2021 Damien Clark, [Trim21](https://github.com/Trim21)
Copyright (c) 2017 Damien Clark, [Damo's World](https://damos.world)<br/> <br/>
Licenced under the terms of the

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DAMIEN CLARK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


[adapter]: https://github.com/axios/axios/tree/master/lib/adapters#readme
[axios]: https://github.com/axios/axios
[userscript]: https://github.com/OpenUserJs/OpenUserJS.org/wiki/Userscript-beginners-HOWTO
[GM.xmlHttpRequest]: https://wiki.greasespot.net/GM.xmlHttpRequest
[Greasemonkey]: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
[Tampermonkey]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en

# axios-gmxhr-adapter

An [adapter](https://github.com/mzabriskie/axios/tree/master/lib/adapters#readme) for 
[axios](https://github.com/mzabriskie/axios) to make ajax calls within [userscripts](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Userscript-beginners-HOWTO) via the [GM_xmlhttpRequest](https://wiki.greasespot.net/GM_xmlhttpRequest) function as provided
 by the [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
 and [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
WebExtensions for Firefox and Chromium-based browsers. 

## Synopsis

```javascript
var axios = require('axios') ;
var adapter = require('axios-userscript-adapter') ;

axios.defaults.adapter = adapter ;

// Make a request for a user with a given ID using GM_xmlhttpRequest
// crossing same origin policy boundaries
axios.get('https://www.different-server.com/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## Description
The [axios documentation](https://github.com/mzabriskie/axios/tree/master/lib/adapters#readme) describes axios adapters as *modules that handle dispatching a request and settling a returned Promise once a response is received.*  The standard axios distribution includes adapters for the browser via `xmlHttpRequest`, and node.js via `http` and `https`.  

Custom adapters are typically used for 'mocking' requests for testing purposes, such as [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter).  `axios-gmxhr-adapter` is specifically for using axios in the browser, chiefly, in [userscripts](https://openuserjs.org/about/Userscript-Beginners-HOWTO) where the `xmlHttpRequest` function for making ajax requests is replaced with `GM_xmlhttpRequest`.  `GM_xmlhttpRequest` is a privileged function available within the [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) and
[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
 webextensions that allow userscripts to make ajax requests that cross same origin policy boundaries.  In other words, using axios, the userscript can make http requests to sites that didn't originate from the currently loaded web page.  Read the [GM_xmlhttpRequest](https://wiki.greasespot.net/GM_xmlhttpRequest) function wiki page for further details.

After assigning `axios-gmxhr-adapter` as the default adapter:

```javascript
var axios = require('axios') ;
var adapter = require('axios-gmxhr-adapter') ;

axios.defaults.adapter = adapter ;
```

all the usual axios goodness is available within your userscript.

## Requirements
`axios-gmxhr-adapter` requires axios 0.13.0 or higher

## Installation:
```bash
npm install axios axios-gmxhr-adapter
```

## Further Examples
As previously shown, you can set `axios-gmxhr-adapter` as the default adapter, in which case, all axios requests will be dispatched via `GM_xmlhttpRequest`.  However, you can instead specify the adapter on individual requests via a `config` object.  For example:

```javascript
var axios = require('axios') ;
var adapter = require('axios-gmxhr-adapter') ;

// Send a POST request using GM_xmlhttpRequest
axios({
  method: 'post',
  url: 'https://www.different-server.com/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  adapter: adapter
});
```

or via any requests made by an instance:

```javascript
var axios = require('axios') ;
var adapter = require('axios-gmxhr-adapter') ;

var instance = axios.create({
  // `url` is the server URL that will be used for the request
  url: 'https://www.different-server.com/user',

  // `method` is the request method to be used when making the request
  method: 'post', 

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response.
	adapter: adapter
}) ;

// Send a POST request using GM_xmlhttpRequest
instance.request({
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```




## Licence
axios-gmxhr-adapter
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

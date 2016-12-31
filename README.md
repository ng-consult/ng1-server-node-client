# ng1-server-node-client

This is the node.js client required to connect to a [ng1-server](https://github.com/ng-consult/ng1-server) instance.

# Usage

```bash

npm install --save ng1-server-node-client

```

Then inside your node.js that serves the HTML : 

```
var Client = require('ng1-server-node-client`);

var client = new Client('http://127.0.0.1:8881');

client.renderHTML(url, function( response ) {
    
});

client.renderHTML(url, html, function( response ) {
    
});

```


**Response's structure:** 

```
{
  status: number,
  html?: string  
}

```

**Status codes:** 

- **1** : This URL should never be pre-rendered as defined in the `configDir/serverRenderRules.js`
- **2** : This URL has been pre-rendered correctly, the `response.html` property contains the result.
- **4** : Some error happens, html has not been preprendered, `response.html` is not set.

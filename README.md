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

client.renderURL(url, function( response ) {
    
});

client.renderHTML(url, html, function( response ) {
    
});

```


The client takes as a parameter the address of the `bridge_external socket server` defined into your ng1-server instance.

It has two methods : 

**renderURL( url: string, callback )**

Can be Used for testing, the ng1-server will query the URL specified and returns the page's HTML.

**renderHTML( url: string, html:string, callback )**

Use this inside your main web server function. 


`express example` : 

```javascript

 var YOUR_DOMAIN = 'http://abcd.com';
 
 app.get('/*', function(req, res) {
   
    var jadeHtml = jade.renderFile( path.join(__dirname , 'views/index-classic.pug'), {});

    var client = new Client('http://127.0.0.1:8881');

    client.renderHTML( YOURDOMAIN + req.url, jadeHtml, (ngData) => {
        
        switch(ngData.status) {
            case 2:
                res.send(ngData.html);
                break;
            case 1:
            case 4:
                res.send(jadeHtml);
                break;
            default:
                throw new Error('Unknown status: ' + ngData.status);
        }

    });

});


```

And your PUG (Ex Jade) template : 

```jade

doctype html
html(ng-app="myApp")
    head
        base(href="/")
        script(src="public/ng1-server/dist/ng1-server.js")
        script(src="Your javascript sources...")
        script(type="text/javascript").           
            window.serverConfig = {
                debug: false,
                httpCache: false,
                restcache: false
            };
    body
        .... Your HTML, including <div ng-view> or <div ui-view>


```

**Response's structure:** 

The callback function gets a response defined as : 

```
{
  status: number,
  html?: string  
}

```

**Status codes:** 

- **1** : This URL should never be pre-rendered as defined in the `configYaml/serverRenderRules.yml`
- **2** : This URL has been pre-rendered correctly, the `response.html` property contains the result.
- **4** : Some error happens, html has not been preprendered, `response.html` is not set.

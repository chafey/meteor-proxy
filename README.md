meteor-proxy
------------

Example of proxying http requests with meteor.

instructions:

* Run the http-server meteor project on port 4000.  This http-server responds to any HTTP calls:
 - GET - replies with the request headers as JSON
 - POST - echoes back the JSON in the post body
 - PUT - returns 200
 - DELETE - returns 200

> cd http-server; meteor --port 4000

2) Run the meteor-proxy.  This will proxy requests to the http-server.  It includes a simple gui that
   will send GET and POST requests through it.

> cd meteor-proxy; meteor

* Open a web browser to http://localhost:3000.
* Press the "GET" button to send a HTTP GET request through the proxy (verify that it shows up on http-server)
* Press the "POST" button to send a HTTP POST request through the proxy (verify that it shows up on http-server)

You can also use any HTTP client such as curl or postman to exercise these endpoints:

* http://localhost:3000/GetProxy    (returns the HTTP request headers as JSON)
* http://localhost:3000/PostProxy   (returns the JSON sent in the body of POST back)

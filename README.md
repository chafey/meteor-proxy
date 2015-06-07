meteor-proxy
------------

Example of proxying http requests with meteor

instructions:

1) Run the http-server meteor project on port 4000

> cd http-server; meteor --port 4000

2) Run the meteor-proxy

> cd meteor-proxy; meteor

* Open a web browser to http://localhost:3000.
* Press the "GET" button to send a HTTP GET request through the proxy
* Press the "POST" button to se a HTTP POST request through the proxy

You can also use any HTTP client such as curl or postman to exercise these endpoints:

* http://localhost:3000/GetProxy    (returns the HTTP request headers as JSON)
* http://localhost:3000/PostProxy   (returns the JSON sent in the body of POST back)



function mirror(request, response, next) {
    console.log(request.method + " " + request.url);
    // do not respond to root requests so meteor can serve up the main page
    if(request.url === '/') {
        next();
    }
    if(request.method === "GET") {
        var contentType = request.headers['accept'];
        if(!contentType || contentType === '*/*') {
            contentType = "application/json";
        }
        response.setHeader('content-type', contentType);
        response.writeHead(200);
        if(contentType === 'application/json') {
            response.end(JSON.stringify({request : {headers: request.headers}}));
        }
        else
        {
            response.end();
        }
    } else if(request.method === "POST") {
        response.setHeader('content-type', request.headers['content-type']);
        response.writeHead(200);
        request.on('data', function(data) {
            console.log('data ' + data.length + " bytes");
            response.write(data);
        });
        request.on('end', function() {
            console.log('end');
            response.end();
        });
    } else if(request.method === "PUT") {
        response.writeHead(200);
        request.on('data', function(data) {
            console.log('data ' + data.length + " bytes");
        });
        request.on('end', function() {
            console.log('end');
            response.end();
        });
    } else if(request.method === "DELETE") {
        response.writeHead(200);
        response.end();

    } else if(request.method === "HEAD") {
        response.writeHead(200);
        response.end();

    } else {
        response.writeHead(404);
        response.end();
    }

}

WebApp.connectHandlers
    .use(mirror);

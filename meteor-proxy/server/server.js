var rootUrl = "http://localhost:4000";
var Fiber = Npm.require('fibers');

function doProxy(targetUrl, req, res, next) {
    var url = Npm.require('url');
    var options = url.parse(targetUrl);

    options.headers = req.headers;
    options.method = req.method;
    options.headers['host'] = options.host;
    options.headers.cookie = req.cookies;
    var http = Npm.require('http');
    var request = http.request(options, function (resp) {
        //console.log('sending response');
        res.writeHead(resp.statusCode, resp.headers);
        resp.pipe(res);
        resp.on('end', function() {
            console.log('end');
        })
    });
    req.pipe(request);
}

function proxy(targetUrl) {
    return function (req, res, next) {
        Fiber(function () {
            console.log(req.method + ' ' + targetUrl);
            doProxy(targetUrl, req, res, next);
        }).run();
    }
}
WebApp.connectHandlers
    .use('/GetProxy', proxy(rootUrl + '/GetProxy'))
    .use('/PostProxy', proxy(rootUrl +'/PostProxy'));

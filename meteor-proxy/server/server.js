var rootUrl = "http://localhost:4000";
var Fiber = Npm.require('fibers');

Router.route('/GetJpegImage', function(){
    console.log('GetJpegImage(ironrouter)');
    this.response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': 0
    });
    //this.response.write(result.body);
    return this.response.end();
}, {where: 'server'});


function verifyAuth(req, res) {
    var id = req.headers['x-foo'];
    if(!id) {
        console.log('authorization failed');
        res.statusCode = 403;
        res.statusMessage = 'Not authorized';
        res.end();
        return;
    }
    return true;
}

function doProxy(targetUrl, req, res, next) {
    var url = Npm.require('url');
    var options = url.parse(targetUrl);

    options.headers = req.headers;
    options.method = req.method;
    //options.agent = false;
    options.headers['host'] = options.host;
    //options.headers.cookie = req.cookies;
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
            if(verifyAuth(req, res) !== true) {
                return;
            }
            doProxy(targetUrl, req, res, next);
        }).run();

    }
}
WebApp.connectHandlers
    //.use(connect.urlencoded())  // these two replace
    //.use(connect.json())        // the old bodyParser
    .use('/GetProxy', proxy(rootUrl + '/GetProxy'))
    .use('/PostProxy', proxy(rootUrl +'/PostProxy'));

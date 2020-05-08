const router = {};

var mockServer = function() {
    this.name = "mockServer";
    this.myHost = '';
    this.serverHost = "";
}

mockServer.prototype.mock = function(url) {
    router[this.myHost + url] = this.serverHost;
}

mockServer.prototype.router = function(host, port, serverHost) {
    this.myHost = host + ":" + port;
    this.serverHost = serverHost

    // this.mock('/api/auth/login')
    // this.mock('/api/user/profile')

    return router
}

module.exports = new mockServer();

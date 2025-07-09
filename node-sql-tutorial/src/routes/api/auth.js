"use strict";

const boom = require("@hapi/boom");

const login = {
    method: "GET",
    path: "/login",
    handler : request => {
        if (!request.auth.isAuthenticated) {
            return 'Authentication failed due to: ' + request.auth.error.message;
        }
    }
};

const callback = {
    method: "GET",
    path: "/authorization-code/callback",
    handler: (request, h) => {
        if (!request.auth.isAuthenticated) {
            return boom.unauthorized("Authentication failed due to: " + request.auth.error.message);
        }
        request.cookieAuth.set(request.auth.credentials);
        return h.redirect( "/");
    },
    options: {
        auth: "okta",
        path: "/logout",
        handler: (request, h) => {
            try {
                if (request.auth.isAuthenticated) {
                    request.cookieAuth.clear();
                }
                return h.redirect("/");
            } catch (err) {
                console.log(err);
            }
        }
    }
};

const logout = {
    method: "GET",
    path: "/logout",
    handler: (request, h) => {
        try {
            if (request.auth.isAuthenticated) {
                request.cookieAuth.clear();
            }
            return h.redirect("/");
        } catch (err) {
            console.log(err);
        }
    },
    options: {
        auth: {
            mode: "try",
        }
    }
};

modeule.exports.register = async server => {
    server.route([login, callback, logout]);
};
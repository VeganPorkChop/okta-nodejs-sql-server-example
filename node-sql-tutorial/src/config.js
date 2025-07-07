"use strict";

const dotenv = require("dotenv");

const assert = require("assert");

dotenv.config();

const {
PORT,
HOST,
HOST_URL,
COOKIE_ENCRYPT_PWD,
SQL_USER,
SQL_PASSWORD,
SQL_DATABASE,
SQL_SERVER,
SQL_ENCRYPT,
OKTA_ORG_URL,
OKTA_CLIENT_ID,
OKTA_CLIENT_SECRET
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, "PORT is required");  
assert(HOST, "HOST is required");
assert(HOST_URL, "HOST_URL is required");
assert(COOKIE_ENCRYPT_PWD, "COOKIE_ENCRYPT_PWD is required");
assert(SQL_USER, "SQL_USER is required");
assert(SQL_PASSWORD, "SQL_PASSWORD is required");
assert(SQL_DATABASE, "SQL_DATABASE is required");
assert(SQL_SERVER, "SQL_SERVER is required");
assert(OKTA_ORG_URL, "OKTA_ORG_URL is required");
assert(OKTA_CLIENT_ID, "OKTA_CLIENT_ID is required");
assert(OKTA_CLIENT_SECRET, "OKTA_CLIENT_SECRET is required");


module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    cookiePwd: COOKIE_ENCRYPT_PWD,
    sql: {
        user: SQL_USER,
        password: SQL_PASSWORD,
        database: SQL_DATABASE,
        server: SQL_SERVER,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    },
    okta: { 
        orgUrl: OKTA_ORG_URL,
        clientId: OKTA_CLIENT_ID,
        clientSecret: OKTA_CLIENT_SECRET
    }
};
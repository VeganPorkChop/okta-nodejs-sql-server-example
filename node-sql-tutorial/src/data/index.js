"use strict";

const { sql } = require("../config");
const events = require("./events");
const { ConnectionPool } = require("mssql");

const client = async (server, config) => {
    let pool = null;

    const closePool = async () => {
        try {
            await pool.close();
            pool = null;
        } catch (err) {
            pool = null;
            console.log("Error closing pool", err);
        }
    };

    const getConnection = async () => {
        try {
            if (pool) {
                return pool;
            }
            pool = await sql.connect(config);
            pool.on("error", async err => {
                console.log("SQL Pool Error", err);
                await closePool();
            } );
            return pool;
        } catch (err) {
            console.log("Error connecting to SQL Server", err);
            pool = null;
        }
    };

    return{
        events: await events.register( {sql, getConnection} )
    };
};

module.exports = client;
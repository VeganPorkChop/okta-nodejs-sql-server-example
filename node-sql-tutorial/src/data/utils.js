"use strict";

const fs = require("fs-extra");
const { join } = require("path");

const loadSqlQueries = async (dir) => {
    const filePath = join( process.cwd(), "src", "data", foldername);
    const files = await fs.readdir(filePath);
    constsqlfiles = files.filter(file => file.endsWith(".sql"));
    const queries = {};
    for( const sqlFile of sqlFiles  ) {
        const query = fs.readFileSync(join(filePath, sqlFile), {encoding : "utf8"});  
        queries[sqlFile.replace(".sql", "")] = query;
    }

    return queries;
};

module.exports = {
    loadSqlQueries 
};
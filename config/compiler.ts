module.exports = {
    codeElement: '',
    lineNumbers: '',
    updateLineNumbers: () => {
        setTimeout(()=>{
            const code = this.codeElement.innerText;
            const lines = code.split("\n");
            const lineCount = lines.length;
            this.lineNumbers.innerHTML = Array.from({ length: lineCount-1 }, (_, i) => i + 1).join("<br>");
        },1500);
    },
    ideDeploy: (code, line, updateLineNumbers) => {
        this.codeElement = document.querySelector(code);
        this.lineNumbers = document.querySelector(line);
        if(updateLineNumbers!=0){
            this.codeElement.addEventListener("input", updateLineNumbers);
            try{
                this.updateLineNumbers();
            }catch(e){
                updateLineNumbers();
            }   
        }
    },
    appointCode: (name, lang, compiler) => {
        for(let i=0; i<compiler.codefork.length; i++){
            if(compiler.codefork[i].lang == lang && compiler.codefork[i].name == name){
                return compiler.codefork[i].code+'\n';
            }
        }
        return 0;
    },
    purple_highlighter: [
        "AND",
        "AS",
        "ELSE",
        "IF",
        "INTO",
        "JOIN",
        "KEY",
        "LIKE",
        "OR",
        "WHEN",
        "WHENEVER",
        "WHERE",
        "WHILE",
        "WITH",
        "WITHIN",
        "WITHOUT"
    ],
    green_highlighter: [
        "=",
        "+",
        " - ",
        "/",
        "*",
        "&lt;",
        "&gt;",
        "(",
        ")",
        "&",
        ":",
        "?"
    ],
    orange_highlighter: [
        "ARRAY",
        "BINARY",
        "BOOLEAN",
        "CHARACTER",
        "DATE",
        "DAY",
        "DECIMAL",
        "DOUBLE",
        "FLOAT",
        "INT",
        "NULL",
        "OBJECT",
        "VARCHAR"
    ],
    blue_highlighter: [
        "ADD",
        "ALL",
        "ALTER",
        "ANY",
        "ASC",
        "AT",
        "BETWEEN",
        "BIGINT",
        "BIT",
        "BLOB",
        "BOTH",
        "BY",
        "CALL",
        "CASCADE",
        "CASE",
        "CAST",
        "CHAR",
        "CHECK",
        "CLOB",
        "CLOSE",
        "CLUSTER",
        "COALESCE",
        "COLLATE",
        "COLUMN",
        "COMMIT",
        "COMPRESS",
        "CONNECT",
        "CONSTRAINT",
        "CONSTRAINTS",
        "CONTINUE",
        "CONVERT",
        "CREATE",
        "CROSS",
        "CURRENT",
        "CURRENT_DATE",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_USER",
        "CURSOR",
        "DATABASE",
        "DEALLOCATE",
        "DEC",
        "DECLARE",
        "DEFAULT",
        "DEFERRABLE",
        "Deferred",
        "DELETE",
        "DESC",
        "DESCRIBE",
        "DETERMINISTIC",
        "DISCONNECT",
        "DISTINCT",
        "DROP",
        "DUMMY",
        "DUMP",
        "EMPTY",
        "ENABLE",
        "END",
        "ESCAPE",
        "EXCEPT",
        "EXCEPTION",
        "EXEC",
        "EXECUTE",
        "EXISTS",
        "EXIT",
        "EXTERNAL",
        "EXTRACT",
        "FALSE",
        "FETCH",
        "FILTER",
        "FOR",
        "FOREIGN",
        "FOUND",
        "FROM",
        "FULL",
        "FUNCTION",
        "GET",
        "GLOBAL",
        "GO",
        "GOTO",
        "GRANT",
        "GROUP",
        "GROUPING",
        "HAVING",
        "HOLD",
        "HOUR",
        "IDENTITY",
        "IMMEDIATE",
        "IN",
        "INCLUDE",
        "INDEX",
        "INDICATOR",
        "INITIALLY",
        "INNER",
        "INOUT",
        "INPUT",
        "INSENSITIVE",
        "INSERT",
        "INTEGER",
        "INTERSECT",
        "INTERVAL",
        "IS",
        "ISNULL",
        "ISOLATION",
        "LANGUAGE",
        "LARGE",
        "LAST",
        "LATERAL",
        "LEADING",
        "LEAVE",
        "LEFT",
        "LENGTH",
        "LEVEL",
        "LIMIT",
        "LISTEN",
        "LN",
        "LOAD",
        "LOCAL",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LOCK",
        "LONG",
        "LOOP",
        "LOWER",
        "MAP",
        "MATCH",
        "MAX",
        "MEMBER",
        "MERGE",
        "METHOD",
        "MIN",
        "MINUTE",
        "MISSING",
        "MOD",
        "MODE",
        "MODIFY",
        "MODULE",
        "MONTH",
        "MULTISET",
        "NAMES",
        "NATIONAL",
        "NATURAL",
        "NCHAR",
        "NCLOB",
        "NEW",
        "NEXT",
        "NO",
        "NONE",
        "NOT",
        "NOTHING",
        "NOTIFY",
        "NOW",
        "NULLIF",
        "NUMERIC",
        "OCTET_LENGTH",
        "OF",
        "OFF",
        "OFFSET",
        "OLD",
        "ON",
        "ONLY",
        "OPEN",
        "OPERATION",
        "OPTION",
        "ORDER",
        "ORDINALITY",
        "OUT",
        "OUTER",
        "OUTPUT",
        "OVER",
        "OVERLAPS",
        "PAD",
        "PARAMETER",
        "PARTIAL",
        "PARTITION",
        "PASCAL",
        "PASSWORD",
        "PATH",
        "PERCENT",
        "PERCENTILE",
        "PERCENT_RANK",
        "PRECISION",
        "PREFIX",
        "PREORDER",
        "PREPARE",
        "PRESERVE",
        "PRIMARY",
        "PRIOR",
        "PRIVILEGES",
        "PROCEDURE",
        "PUBLIC",
        "PURGE",
        "QUOTE",
        "RANGE",
        "RANK",
        "READ",
        "READS",
        "REAL",
        "RECURSIVE",
        "REF",
        "REFERENCES",
        "REFERENCING",
        "REGEXP",
        "RELEASE",
        "RENAME",
        "REPEAT",
        "REPLACE",
        "REPLICATION",
        "REQUIRE",
        "RESET",
        "RESTRICT",
        "RESULT",
        "RETURN",
        "RETURNING",
        "RETURNS",
        "REVOKE",
        "RIGHT",
        "ROLLBACK",
        "ROLLUP",
        "ROUTINE",
        "ROW",
        "ROWS",
        "ROW_NUMBER",
        "RULE",
        "SAVE",
        "SAVEPOINT",
        "SCHEMA",
        "SCHEMAS",
        "SCOPE",
        "SCROLL",
        "SEARCH",
        "SECOND",
        "SECURITY",
        "SELECT",
        "SELF",
        "SENSITIVE",
        "SEPARATOR",
        "SEQUENCE",
        "SERIALIZABLE",
        "SERVER",
        "SERVER_NAME",
        "SESSION",
        "SESSION_USER",
        "SET",
        "SETOF",
        "SETS",
        "SETTINGS",
        "SHARE",
        "SHOW",
        "SHUTDOWN",
        "SIGNAL",
        "SIMILAR",
        "SIMPLE",
        "SINGLE",
        "SIZE",
        "SKIP",
        "SMALLINT",
        "SOME",
        "SOURCE",
        "SPACE",
        "SPATIAL",
        "SPECIFIC",
        "SPECIFICTYPE",
        "SQL",
        "SQLEXCEPTION",
        "SQLSTATE",
        "SQLWARNING",
        "SQRT",
        "START",
        "STATE",
        "STATEMENT",
        "STATIC",
        "STATISTICS",
        "STDDEV_POP",
        "STDDEV_SAMP",
        "STDIN",
        "STDOUT",
        "STORAGE",
        "STORED",
        "STRAIGHT_JOIN",
        "STRING",
        "STRUCTURE",
        "STYLE",
        "SUBCLASS_ORIGIN",
        "SUBSTRING",
        "SUM",
        "SYMMETRIC",
        "SYNONYM",
        "SYSTEM",
        "SYSTEM_USER",
        "TABLE",
        "TABLESAMPLE",
        "TABLESPACE",
        "TABLE_NAME",
        "TEMP",
        "TEMPLATE",
        "TEMPORARY",
        "TERMINATE",
        "TEXT",
        "THEN",
        "TIME",
        "TIMESTAMP",
        "TIMEZONE_HOUR",
        "TIMEZONE_MINUTE",
        "TO",
        "TRAILING",
        "TRANSACTION",
        "TRANSACTIONAL",
        "TRANSFORM",
        "TRANSLATE",
        "TRIGGER",
        "TRIM",
        "TRUE",
        "TRUNCATE",
        "TRUSTED",
        "TUPLE",
        "TYPE",
        "UESCAPE",
        "UNION",
        "UNIQUE",
        "UNKNOWN",
        "UNNEST",
        "UNPIVOT",
        "UNSIGNED",
        "UNTIL",
        "UPDATE",
        "UPPER",
        "UPDATES",
        "USAGE",
        "USE",
        "USER",
        "USER_DEFINED_TYPE",
        "USING",
        "UTF8",
        "UTILIZATION",
        "VALUE",
        "VALUES",
        "VARIABLE",
        "VARYING",
        "VIEW",
        "VOLATILE",
        "WIDTH_BUCKET",
        "WINDOW",
        "WORK",
        "WRAPPER",
        "WRITE",
        "YEAR",
        "ZONE"
    ],
    string_highlighter: [
        `'`,
        `"`,
        '`'
    ],
    sqlCompiler: (filedName)=>{
        let parser = document.querySelector(filedName).innerHTML;
        let tokens = {
            "green_highlighter": "grn",
            "blue_highlighter": "blu",
            "purple_highlighter": "prp",
            "orange_highlighter": "org",
        };
        parser = parser.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        for (let [key, value] of Object.entries(tokens)) {
            let j = eval(`compiler.${key}`);
            for (let i = 0; i < j.length; i++) {
                parser = parser.replaceAll(` ${j[i]} `, ` <span class="${value}">${j[i]}</span> `);
                if(parser.startsWith(j[i])){
                    parser = parser.replaceAll(`${j[i]}`, `<span class="${value}">${j[i]}</span>`);
                }
                parser = parser.replaceAll(`\n${j[i]} `, `\n<span class="${value}">${j[i]}</span> `);
            }
        }
        parser = parser.replaceAll(/\d+/g, match => `<span class="sky">${match}</span>`);
        let k = eval(`compiler.string_highlighter`);
        for (let i=0; i<k.length; i++) {
            parser = parser.replaceAll(` ${k[i]}`, ` <span class="gld">${k[i]}`).replaceAll(`${k[i]} `, `${k[i]}</span> `).replaceAll(`${k[i]};`, `${k[i]}</span>;`);
        }
        document.querySelector(filedName).innerHTML = parser;
    }
};
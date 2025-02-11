module.exports = {
    themeSet: [
        [
            ["--bg-color", "#f6f6f6"],
            ["--bot-m-color", "#ddd9d9dc"],
            ["--user-m-color", "#0c8df0ca"],
            ["--send-color", "#90a4ae"],
            ["--scrollbarBG", "#fff"],
            ["--thumbBG", "#90a4ae"],
            ["--eco-lighting", "#00ff09"],
            ["--atom-blue", "#0c8ff0"],
            ["--revers-white", "#000"],
            ["--glass-color", "#ececec79"],
            ["--code-color", "#ebf0f4"],
            ["--code-li-color", "#fff"]
        ],
        [
            ["--bg-color", "#0d1117"],
            ["--bot-m-color", "#ddd9d9dc"],
            ["--user-m-color", "#0c8df0ca"],
            ["--send-color", "#90a4ae"],
            ["--scrollbarBG", "#fff"],
            ["--thumbBG", "#90a4ae"],
            ["--eco-lighting", "#00ff09"],
            ["--atom-blue", "#0c8ff0"],
            ["--revers-white", "#fff"],
            ["--glass-color", "#161b2279"],            
            ["--code-color", "#161b20"],
            ["--code-li-color", "#1E1E1E"]
        ]
    ],
    duplex: 1441,
    hash: [["0","*z"],["1","*y"],["2","*x"],["3","*w"],["4","*v"],["5","*u"],["6","*t"],["7","*s"],["8","*r"],["9","*q"],["&",0],["+",1],["=",2],["-",3],["a",4],["e",5],["i",6],["n",7],["u",8],["g",9],["r","!h"],["l","!i"],["t","!j"]],
    encrypt: [["0","*z"],["1","*y"],["2","*x"],["3","*w"],["4","*v"],["5","*u"],["6","*t"],["7","*s"],["8","*r"],["9","*q"],["&",0],["+",1],["=",2],["-",3],["a",4],["e",5],["i",6],["n",7],["u",8],["g",9],["r","!h"],["l","!i"],["t","!j"],["A","!p"],["E","*F"], ["H","LP"],["L","!P"],["T","@"],["S","/M"],["O","*o"]],
    browser_data: [
        {
            name: "Chrome",
            version: 125
        },
        {
            name: "Microsoft Internet Explorer",
            version: 114
        },
        {
            name: "Firefox",
            version: 119
        },
        {
            name: "Safari",
            version: 80
        },
    ],
    error_templet: `
        <div class="workspace blbg" style="background: #0000009e;" id="errorPreview">
            <div class="errorView">
                <header class="flx"><img src="../public/favicon.ico" alt="load"/>
                    <span style="cursor: pointer;" onclick="system.closePyError();">&times;</span>
                </header>
                <div class="error-message">
                    <i class="fa fa-times-circle-o"></i>
                    <h2>Error: <|error.code|>!</h2>
                    <small class="form-text text-muted">This error genaredted by system for handle unwanted useage of resource</small>
                    <p><|error.message|></p>
                <div class="btn btn-process" style="margin-top: 40px;" onclick="system.closePyError();"><i class="fa fa-refresh"></i> Re-try</div>
            </div>
        </div>`,
};
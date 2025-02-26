module.exports = {
    themeSet: [
        [
            ["--bg-color", "#f6f6f6"],
            ["--bot-m-color", "#ddd9d9dc"],
            ["--user-m-color", "#4a2c83"],
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
            ["--user-m-color", "#4a2c83ca"],
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
    chat_metadata : {
        "namespace": "Nanonium",
        "dev": "Krishnendu Mitra",
        "type": "Chat History Backup",
        "content": "mime/json",
        "exe": ".nano"
    },
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
                </div>
            </div>
        </div>`,
    info_templet: `
        <div class="modal" tabindex="-1" role="dialog" style="display: block;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><|title|></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="new TAB().close();"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <|body|>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="new TAB().close();">Close</button>
                        <button type="button" class="btn btn-primary" onclick="<|next|>">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    model_switch: `
        <small class="form-text text-muted">This machine learning model are use to understand your questions and genareted desire SQL query.</small><br>
        <h6>Public Models</h6>
        <div class="flp">
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio">O1 Model
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio">O2 Model <span title="Beta Version">Beta Version</span>
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio">O3 Model
                </label>
            </div>
        </div><br>
        <div class="purches">Want access to premium model's with RAG? <span>Purchase additional units</span></button>
    `,
    chat_impexp: `
        <small class="form-text text-muted">Import your previous chats or export your current chat data for future refrence.</small><br>
        <h6>Import</h6>
        <label class="label">
            <input name="file" accept=".nano" type="file" id="file-input">
            <span>Browes the Nano_json file</span>
        </label>
        <input type="text" placeholder="No file choosen" readonly="true" name="file-name" id="file-name"/>
        <br><br>
        <h6>Export</h6>
        <div class="btn btn-success"><i class="fa fa-download"></i> Download chats</div>
    `

};
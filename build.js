var fs = require('fs');

var build = "window.HTML = " + JSON.stringify(dirToObject("html")) + ";\n";
build += "window.CSS = " + JSON.stringify(dirToObject("css")) + ";\n";
build += fs.readFileSync("extension.js").toString();

fs.writeFileSync("build/build.js", build);

function dirToObject(dir) {
    var dirFiles = fs.readdirSync(dir);
    var dirObj = {};

    for (var i = 0; i < dirFiles.length; i++) {
        var contents = fs.readFileSync(dir + "/" + dirFiles[i]);
        var filename = dirFiles[i].split(".");
        filename.pop();
        filename.join(".");

        dirObj[filename] = contents.toString();
    }

    return dirObj;
}


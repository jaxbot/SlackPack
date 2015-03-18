var fs = require('fs');

var htmlFiles = fs.readdirSync("html");
var htmlObj = {};

for (var i = 0; i < htmlFiles.length; i++) {
    var contents = fs.readFileSync("html/" + htmlFiles[i]);
    htmlObj[htmlFiles[i].replace(".html", "")] = contents.toString();
}

var build = "window.HTML = " + JSON.stringify(htmlObj) + ";\n";
build += fs.readFileSync("extension.js").toString();

fs.writeFileSync("build/build.js", build);


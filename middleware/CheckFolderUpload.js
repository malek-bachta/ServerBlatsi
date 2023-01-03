var fs = require("fs");

function CheckFolderUpload(req, res, next) {
  var dir = "./" + "uploads" + "/";
  var dir1 = "./" + "uploads" + "/" + "posts" + "/";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("Creat uploads!");
  } else {
   console.log("Dir uploads Exist!");
  }
  if (!fs.existsSync(dir1)) {
    fs.mkdirSync(dir1);
    console.log("Creat uploads/posts!");
  } else {
  console.log("Dir uploads/posts Exist!");
  }
  return next();
}

module.exports = CheckFolderUpload;

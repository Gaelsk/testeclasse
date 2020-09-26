const fs = require("fs");

module.exports = file => {
  fs.unlink(file, err => {
    if (err) {
      throw err;
    } else {
      console.log("File deleted");
    }
  });
};

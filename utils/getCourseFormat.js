const getCourseFormat = url => {
	const x = url.split("/")[url.split("/").length - 1];
    const y = x.split("?")[0]
    const z = y.split("%2F")[y.split("%2F").length -1];
    const name = z.split(".")[1]
  switch (name) {
    case ("mp4", "mvk", "ts"):
      return "Video";
    case "pdf":
      return "PDF";
    case "mp3":
      return "Audio";
  }
};

console.log(getCourseFormat("doc.pdf"))

module.exports = getCourseFormat;
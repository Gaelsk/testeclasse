const getFormat = url => {
	const x = url.split("/")[url.split("/").length - 1];
    const y = x.split("?")[0]
    const name = y.split("%2F")[y.split("%2F").length -1]
  switch (name) {
    case ("mp4", "mvk", "ts"):
      return "Video";
    case "pdf":
      return "PDF";
    case "mp3":
      return "Audio";
  }
};

export default getFormat
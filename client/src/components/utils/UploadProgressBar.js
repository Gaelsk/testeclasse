import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useStorage from "../../hooks/useStorage";
import LinearProgress from "@material-ui/core/LinearProgress";

const UploadProgressBar = ({ file, folder, setUrl, startUpload }) => {
  const { progress, url } = useStorage(file, folder, startUpload);

  useEffect(() => {
    setUrl(url);
    console.log("url", url);
  }, [url]);

  return (
    <div className="progress-container">
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

UploadProgressBar.propTypes = {
  file: PropTypes.object.isRequired,
  folder: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired
};

export default UploadProgressBar;

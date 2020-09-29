import { useState, useEffect } from "react";
import storage from "../firebase";

const useStorage = (file, folder, startUpload) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (startUpload) {
      const storageRef = storage.ref(`${folder}/${file.name}`);
      storageRef.put(file).on(
        "state_changed",
        snap => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        err => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url);
        }
      );
    }
  }, [startUpload]);
  return { progress, url, error };
};

export default useStorage;

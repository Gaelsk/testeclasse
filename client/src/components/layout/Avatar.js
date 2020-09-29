import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Avatar({ name, size }) {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      <Typography>{name.substr(0, 2)}</Typography>
    </div>
  );
}

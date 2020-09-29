import React from "react";
import { Typography } from "@material-ui/core";

const Gravatar = ({ name }) => {
  const colors = ["teal", "purple", "indigo", "#274b58", "#6FB1B4", "#EF978F"];
  const bg = colors[Math.round(Math.random() * (colors.length - 1))];
  return (
    <div style={{ backgroundColor: bg }} className="gravatar">
      <Typography variant="body2">{name.substr(0, 2)}</Typography>
    </div>
  );
};

export default Gravatar;

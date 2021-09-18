import React from "react";
import Button from "react-bootstrap/esm/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

const ActionButton = ({ url, _id }) => {
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt={playIcon} width="25" height="25" />
      </Button>
      <Button className="post-button">
        <img src={editIcon} alt={editIcon} width="25" height="25" />
      </Button>
      <Button className="post-button">
        <img src={deleteIcon} alt={deleteIcon} width="25" height="25" />
      </Button>
    </>
  );
};

export default ActionButton;

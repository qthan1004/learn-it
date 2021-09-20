import React, { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import Button from "react-bootstrap/esm/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

const ActionButton = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);
  const choosePostEdit = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt={playIcon} width="30" height="30" />
      </Button>
      <Button className="post-button">
        <img
          src={editIcon}
          alt={editIcon}
          width="25"
          height="25"
          onClick={choosePostEdit.bind(this, _id)}
        />
      </Button>
      <Button className="post-button" onClick={deletePost.bind(this, _id)}>
        <img src={deleteIcon} alt={deleteIcon} width="25" height="25" />
      </Button>
    </>
  );
};

export default ActionButton;

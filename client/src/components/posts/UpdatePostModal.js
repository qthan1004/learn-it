import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    hdanleUpdatePost,
    setShowToast,
  } = useContext(PostContext);

  const [updatedPost, setUpdatedPost] = useState(post);
  useEffect(() => setUpdatedPost(post), [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPost = (event) => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseUpdatePost = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmitUpdatedPost = async (event) => {
    event.preventDefault();

    const { success, message } = await hdanleUpdatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Modal show={showUpdatePostModal} onHide={handleCloseUpdatePost}>
        <Modal.Header className="d-block" closeButton>
          <Modal.Title>Making Process ??</Modal.Title>
          <Form onSubmit={onSubmitUpdatedPost}>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  required
                  aria-describedby="title-help"
                  value={title}
                  onChange={onChangeUpdatedPost}
                />
                <Form.Text id="title-help" muted>
                  Required
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="Description"
                  rows={3}
                  name="description"
                  value={description}
                  onChange={onChangeUpdatedPost}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Lession link"
                  name="url"
                  value={url}
                  onChange={onChangeUpdatedPost}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  as="select"
                  name="status"
                  value={status}
                  onChange={onChangeUpdatedPost}
                >
                  <option value="TO LEARN">TO LEARN</option>
                  <option value="LEARNING">LEARNING</option>
                  <option value="LEARNED">LEARNED</option>
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdatePost}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Learn It !
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default UpdatePostModal;

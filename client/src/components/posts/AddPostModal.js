import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { PostContext } from "../contexts/PostContext";

const AddPostModal = () => {
  const { showAddPost, setShowAddPost, addPost, setShowToast } =
    useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPost = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseAddPost = () => {
    resetAddPostData();
  };

  const onSubmitNewPost = async (event) => {
    event.preventDefault();

    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowAddPost(false);
  };

  return (
    <>
      <Modal show={showAddPost} onHide={handleCloseAddPost}>
        <Modal.Header className="d-block" closeButton>
          <Modal.Title>What do you want to learn ?</Modal.Title>
          <Form onSubmit={onSubmitNewPost}>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  required
                  aria-describedby="title-help"
                  value={title}
                  onChange={onChangeNewPost}
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
                  onChange={onChangeNewPost}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Lession link"
                  name="url"
                  value={url}
                  onChange={onChangeNewPost}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddPost}>
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

export default AddPostModal;

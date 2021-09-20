import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import UpdatePostModal from "../posts/UpdatePostModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";

const Dashboard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postLoading },
    getPost,
    setShowAddPost,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //GET ALL POSTS
  useEffect(() => getPost(), []);

  let body = null;

  if (postLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2 spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Card className="text-center mx-5 my-5">
        <Card.Header as="h1">Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to Learn It!!!</Card.Title>
          <Card.Text>
            Click the button below to track your skill to learn
          </Card.Text>
          <Button variant="primary" onClick={setShowAddPost.bind(this, true)}>
            LearnIt
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col key={post._id} className="my-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new thing to learn !</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPost.bind(this, true)}
          >
            <img src={addIcon} alt="addIcon" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {post !== null && <UpdatePostModal />}
      {body}
      <AddPostModal />
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={4000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;

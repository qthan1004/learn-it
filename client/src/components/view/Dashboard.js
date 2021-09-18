import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../posts/SinglePost";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, postLoading },
    getPost,
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
          <Button variant="primary">LearnIt</Button>
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
      </>
    );
  }

  return <>{body}</>;
};

export default Dashboard;

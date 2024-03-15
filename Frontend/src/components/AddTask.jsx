import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addTaskToList } from "../slices/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addTaskToList({ title, description }));
    setTitle("");
    setDescription("");
  };
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div className="text-end my-4">
          <Button variant="primary" type="submit" onClick={handleClick}>
            Add Task
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default AddTask;

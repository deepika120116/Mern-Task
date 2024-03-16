import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useDispatch,useSelector } from "react-redux";
import { updateTaskInTheServer } from "../slices/taskSlice";
const UpdateTask = (props) => {

  const {selectedTask}=useSelector(state=>state.tasks);
  const dispatch=useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id,setId]=useState(0);

  useEffect(()=>{
    if(Object.keys(selectedTask).length){
      setId(selectedTask.id);
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  },[selectedTask]);

  const updateTask = () => {
    // console.log("Task modal screen");
    props.onHide();
    // dispatch(updateTaskInTheList({id,title,description}));
    dispatch(updateTaskInTheServer({id,title,description}));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end my-4">
          <Button variant="primary" type="submit" onClick={updateTask}>
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdateTask;

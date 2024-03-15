import { useState } from "react";
import {  useSelector,useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import UpdateTask from "./UpdateTask";
import {removeTaskFromList, setSelectedTask} from '../slices/taskSlice';


const TaskList = () => {

  const dispatch=useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { taskList } = useSelector((state) => state.tasks);

  const handleUpdate = (task) => {
    // console.log("Task updated");
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  const handleDelete = (task) => {
    // console.log("Task Deleted");
    dispatch(removeTaskFromList(task));
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskList &&
            taskList.map((task, index) => {
              return (
                <tr className="text-center" key={task.id}>
                  <td>{index+1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={()=>handleUpdate(task)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="primary" onClick={()=>handleDelete(task)}>
                      <i className="bi bi-x-octagon"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <UpdateTask show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};
export default TaskList;

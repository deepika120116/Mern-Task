import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import UpdateTask from './UpdateTask';


const TaskList=()=>{
    const [modalShow, setModalShow] = useState(false);

    const handleUpdate=()=>{
        console.log("Task updated");
        setModalShow(true);
    };

    const handleDelete=()=>{
        console.log("Task Deleted");
    };
    return(
        <>
        <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className='text-center'>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
          <Button variant="primary" className='mx-3' onClick={handleUpdate}>
            <i className="bi bi-pencil"></i>
            </Button>
          <Button variant="primary" onClick={handleDelete}>
            <i className="bi bi-x-octagon"></i>
            </Button>
          </td>
        </tr>
       
      </tbody>
    </Table>

<UpdateTask
show={modalShow}
onHide={() => setModalShow(false)}
/>
</>
    );
};
export default TaskList;
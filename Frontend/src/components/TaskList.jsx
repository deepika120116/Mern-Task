import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const TaskList=()=>{

    const handleUpdate=()=>{
        console.log("Task updated");
    };

    const handleDelete=()=>{
        console.log("Task Deleted");
    };
    return(
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
    );
};
export default TaskList;
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const NavBar=()=>{
    const {taskList}=useSelector(state=>state.tasks);
    const {error}=useSelector(state=>state.tasks);
    return(
        <Container>
            <h1 className='text-center text-primary my-4'>Project Management</h1>
            <p className='text-center lead'>{`Currently there are ${taskList.length} task(s) pending`}</p>
            {error && <h5 className='text-center text-danger'>{error}</h5>}        
        </Container>
    );
};
export default NavBar;
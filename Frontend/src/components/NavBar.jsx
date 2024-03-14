import {Container} from 'react-bootstrap';
const NavBar=()=>{
    return(
        <Container>
            <h1 className='text-center text-primary my-4'>Project Management</h1>
            <p className='text-center lead'>Currently there are 0 task(s) pending</p>
        </Container>
    );
};
export default NavBar;
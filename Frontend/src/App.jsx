import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";
import TaskList from './components/TaskList';

function App() {
  return (
    <>
      <NavBar />
      <Container className="my-4">
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <AddTask />
            <TaskList/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

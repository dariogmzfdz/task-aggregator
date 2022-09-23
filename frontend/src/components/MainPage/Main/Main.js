import React from "react";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "./Main.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../Tasks/Container.scss";
import Modal from "react-bootstrap/Modal";
import TaskList from "../Tasks/TaskList";
import FormTodo from "../Tasks/FormTodo";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover textured" ref={ref} data-density="hard">
      <div className="page-content">
        <h2 className="gold textured" data-text={props.children}></h2>
      </div>
    </div>
  );
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#d2d2d2",
  width: "40px",
  height: "40px",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DayItem = styled("div")({
  width: "70px",
  height: "70px",
  borderRight: "1px solid #000",
  borderBottom: "1px solid #000",
});

const AddTaskButton = styled(Paper)(({ theme }) => ({
  backgroundColor: "#d2d2d2",
  width: "40px",
  height: "40px",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

// Create a modal with a form to add a new task

const tasks = [];

const Page = React.forwardRef((props, ref) => {
  const [list, setList] = useState([]);

  const handleAddItem = (addItem) => {
    setList([...list, addItem]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            textAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <DayItem>
                <h1 className="day-item">1</h1>
                <h4 className="month-item">January</h4>
              </DayItem>
            </Grid>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Grid item key={task.id}>
                  <Item>{task.title}</Item>
                </Grid>
              ))
            ) : (
              <Grid item>
                <AddTaskButton onClick={handleShow}>+</AddTaskButton>
              </Grid>
            )}
          </Grid>
          <hr />
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            textAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <DayItem>
                <h1 className="day-item">1</h1>
                <h4 className="month-item">January</h4>
              </DayItem>
            </Grid>
            {Array.from(Array(11)).map((_, index) => (
              <Grid item key={index}>
                <Item>xs=2</Item>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              maxHeight: "calc(100vh - 210px)",
              overflowY: "auto",
            }}
          >
            <div>
              <FormTodo handleAddItem={handleAddItem} />
              <TaskList list={list} setList={setList} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
});

class DemoBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
      screeHt: 1,
    };
  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  };

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  componentDidMount() {
    /*     this.setState({
      totalPage: this.flipBook.pageFlip().getPageCount(),
    }); */
    this.setState({
      screeHt: window.innerHeight,
    });
  }

  render() {
    return (
      <HTMLFlipBook
        width={400}
        height={570}
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        size="fixed"
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={false}
        onFlip={this.onPage}
        onChangeOrientation={this.onChangeOrientation}
        onChangeState={this.onChangeState}
        className="demo-book"
        ref={(el) => (this.flipBook = el)}
      >
        <PageCover>AGENDA</PageCover>
        <Page number={1}>Page content 1</Page>
        <Page number={2}>Page content 2</Page>
        <Page number={3}>Page content 3</Page>
        <Page number={4}>Page content 4</Page>
        <Page number={5}>Page content 5</Page>
        <Page number={6}>Page content 6</Page>
        <PageCover>END</PageCover>
      </HTMLFlipBook>
    );
  }
}

function MainPage() {
  return <DemoBook />;
}

export default MainPage;

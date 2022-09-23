import React, { useState } from "react";
import "./Container.scss";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";

const Container = () => {
  const [list, setList] = useState([]);

  const handleAddItem = (addItem) => {
    setList([...list, addItem]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>WishList</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        <div>
          <FormTodo handleAddItem={handleAddItem} />
          {/*(C)*/}
          <TaskList list={list} setList={setList} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Container;

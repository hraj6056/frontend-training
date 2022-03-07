import { useState, useEffect } from "react";
import "./style.css";
import Lists from "./components/lists";
import { Divider, Button, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";

type Ilists = {
  id: string;
  title: string;
  status: string;
};

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list") || "[]"));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<Ilists[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [status, setStatus] = useState<string>("Not Completed");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });

  const handleSubmit = (values: any) => {
    if (values.name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: values.name };
          }
          return item;
        })
      );
      setName("");
      setEditId("");
      setIsEditing(false);
    } else {
      const newItem = {
        id: uuidv4(),
        title: values.name,
        status: "Not Completed",
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const removeListHandler = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  };
  const editListHandler = (id: string) => {
    const editItem = list.find((item) => item.id === id);
    if (editItem) {
      setEditId(id);
      setIsEditing(true);
      setName(editItem.title);
    }
  };
  const statusListHandler = (id: string) => {
    const statusItem = list.find((item) => item.id === id);
    if (statusItem) {
      setStatus(
        (statusItem?.status === "Not Completed" ? "Completed" : "Not Completed")
      );
    }
  };
  const clearList = () => {
    setList([]);
  };

  return (
    <div className="App">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item label={"name"} name={"name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Edit Todo" : "Add Todo"}
          </Button>
        </Form.Item>
      </Form>
      <Divider dashed />

      {list.length > 0 && (
        <div>
          <h3> To Do's </h3>
          <Lists
            data={list}
            removeListHandler={removeListHandler}
            editListHandler={editListHandler}
            statusListHandler={statusListHandler}
          />
          <Button type="primary" danger onClick={clearList}>
            Clear Todo's
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;

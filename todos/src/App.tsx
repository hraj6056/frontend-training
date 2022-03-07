import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "./style.css";
import Lists from "./components/lists";
import { Divider, Button, Form, Input,Result } from "antd";
import { v4 as uuidv4 } from "uuid";

type Ilists = {
  id: string;
  title: string;
  status: boolean;
};

// const getLocalStorage = () => {
//   let list = window.localStorage.getItem("list");
//   if (list) {
//     return (list = JSON.parse(window.localStorage.getItem("list") || "[]"));
//   } else {
//     return [];
//   }
// };

const getItemsFromLS = () => {
  return JSON.parse(window.localStorage.getItem("list") as string);
};

const setItemsToLS = (items: any[]) => {
  window.localStorage.setItem("title", JSON.stringify(items));
};

const queryClient = new QueryClient();

const App = () => {
  
  const useTodo = () => {
    return useQuery<Ilists[]>(["list"], async () => {
      return getItemsFromLS();
    });
  };

  const useDeleteTodo = () => {
    return useMutation(async ({ id }: Record<"id", string>) => {
      const items = getItemsFromLS();
      return setItemsToLS(items.filter((item :Ilists) => id !== item.id));
    }, {});
  };

  const todoResults = useTodo();
  const { data, isLoading,isError } = todoResults;
  const deleteTodoResult = useDeleteTodo();

  const [name, setName] = useState<string>("");  
  const [list, setList] = useState<Ilists[]>(data || []);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  // useEffect(() => {
  //   localStorage.setItem("list", JSON.stringify(list));
  // });

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
        status: false,
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
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, status: !item.status };
        }
        return item;
      })
    );
  };

  const clearList = () => {
    setList([]);
  };

  if (isError) {
    return <Result status={"error"} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
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
              loading={isLoading}
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
    </QueryClientProvider>
  );
};

export default App;

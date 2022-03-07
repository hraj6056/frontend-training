
import { Button, List } from "antd";

type IProps = {
  data: {
    id: string;
    title: string;
    status: string;
  }[];
  removeListHandler: (id: string) => void;
  editListHandler: (id: string) => void;
  statusListHandler: (id: string) => void;
};
type Ilists ={
  id: string
  title: string
  status: string
};
const Lists =(props : IProps) =>{
  return (
    <div>
      <List
        bordered
        dataSource={props.data}
        renderItem={(item : Ilists) => (
          <List.Item>
            
            {item.title}

            <Button
              type="primary"
              block
              onClick={() => props.editListHandler(item.id)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => props.statusListHandler(item.id)}
            >
              {item.status}
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => props.removeListHandler(item.id)}
            >
              Delete
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Lists;

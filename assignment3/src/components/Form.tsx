import React from "react";
import { Button, Form, Input } from "antd";

interface IProps {
  loading: boolean;
  onSearch: (values: IQuery) => void;
}

const SearchForm: React.FC<IProps> = (props) => {
  const handleFinish = (values: any) => {
    props?.onSearch({
      title: values.title,
      year: values.year,
      page: 1,
    });
  };

  return (
    <Form onFinish={handleFinish}>
      <Form.Item label={"Title"} name={"title"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Year"} name={"year"}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={props.loading} type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;

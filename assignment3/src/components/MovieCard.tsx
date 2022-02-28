import React from "react";
import _ from "lodash";
import { Card, Space, Spin, Tag } from "antd";

interface IProps {
  loading: boolean;
  data: IMovieList[];
  footer: React.ReactNode;
}

const MovieCard: React.FC<IProps> = (props) => {
  const { loading, data, footer } = props;
  return (
    <Spin spinning={loading}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {_.map(data, ({ imdbID, Poster, Title, Year, Type }: IMovieList) => (
          <Card
            style={{ width: 300 }}
            key={imdbID}
            cover={<img style={{ height: 300 }} src={Poster} alt="" />}
          >
            <Card.Meta
              title={Title}
              description={
                <Space>
                  {Year}
                  <Tag>{Type}</Tag>
                </Space>
              }
            />
          </Card>
        ))}
      </div>
      {footer}
    </Spin>
  );
};

export default MovieCard;

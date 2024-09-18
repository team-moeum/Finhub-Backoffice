import {
  BellOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { IComment } from '@finhub/types/Comment';
import { Avatar, List, Space } from 'antd';
import React, { ReactNode } from 'react';

const IconText = ({ icon, text }: { icon: React.FC; text: ReactNode }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const CommentList = ({ data }: { data: IComment[] }) => {
  console.log(data);
  return (
    <List
      itemLayout="vertical"
      style={{ maxHeight: '50vh', overflowY: 'auto' }}
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={LikeOutlined}
              text={item.like.toString()}
              key="list-vertical-like-o"
            />,
            item.useYn === 'Y' ? (
              <EyeOutlined key="list-vertical-visible-o" />
            ) : (
              <EyeInvisibleOutlined key="list-vertical-invisible-o" />
            ),
            <IconText
              icon={() => (
                <BellOutlined
                  style={{ color: item.reportedYn === 'Y' ? '#F00' : '' }}
                />
              )}
              text=""
              key="list-vertical-like-o"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatarImgPath} />}
            title={
              <S.listItemWrap>
                <div>{item.nickname}</div>
                <S.date>{item.date}</S.date>
              </S.listItemWrap>
            }
            description={item.comment}
          />
        </List.Item>
      )}
    />
  );
};

const S = {
  listItemWrap: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  date: styled.div`
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  `,
};

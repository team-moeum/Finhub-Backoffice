import { useEffect, useState } from 'react';
import { List } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { LayoutTemplate } from '@finhub/components/templates/Layout';
import { columnAPI } from '@finhub/api/column';
import { IColumnListItem } from '@finhub/types/Column';
import { FHPath } from '@finhub/configs/Router';

export const ColumnListPage = () => {
  const [list, setList] = useState<IColumnListItem[]>([]);
  const navigate = useNavigate();

  const initRequest = async () => {
    const { list: columnList } = await columnAPI.list();
    setList(columnList);
  };

  const handleAdd = () => {
    navigate(FHPath.columnCreate.link);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <LayoutTemplate>
      <S.pageHeaderWrapper>
        <div>컬럼 목록</div>
        <FHButton onClick={handleAdd} type="primary">{`컬럼 추가`}</FHButton>
      </S.pageHeaderWrapper>
      <S.contentWrapper>
        <FHDivider />
        <S.listWrapper>
          <List
            dataSource={list}
            renderItem={(item: IColumnListItem, index: number) => (
              <Link to={item.id.toString()} key={index}>
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.modifiedTime}
                  />
                </List.Item>
              </Link>
            )}
          />
        </S.listWrapper>
      </S.contentWrapper>
    </LayoutTemplate>
  );
};

const S = {
  pageHeaderWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    div {
      font-size: 16px;
      font-weight: 600;
    }
  `,
  contentWrapper: styled.div`
    width: 100%;
  `,
  listWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    ul {
      border-top: 1px solid rgba(5, 5, 5, 0.06);
    }

    li {
      border-bottom: 1px solid rgba(5, 5, 5, 0.06) !important;
      border-left: 1px solid rgba(5, 5, 5, 0.06);
      border-right: 1px solid rgba(5, 5, 5, 0.06);
      padding: 12px 16px !important;

      &:hover {
        transition: background 0.2s;
        background-color: #f0f0f0;
      }
    }
  `,
};

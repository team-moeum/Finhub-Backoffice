import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { usertypeAPI } from '@finhub/api/userType';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import { IUsertype } from '@finhub/types/UserType';
import { USE_YN_FILTER } from '@finhub/configs/constants';

const columns = [
  {
    width: 100,
    align: 'center',
    title: 'no',
    dataIndex: 'no',
    key: 'no',
  },
  {
    width: 100,
    align: 'center',
    title: '노출여부',
    dataIndex: 'useYN',
    key: 'useYN',
  },
  {
    ellipsis: true,
    title: '유저유형명',
    dataIndex: 'name',
    key: 'name',
  },
];

export const UserTypeListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [useYN, setUseYN] = useState(USE_YN_FILTER[0]);

  const initRequest = async () => {
    const { list, totalDocuments } = await usertypeAPI.list({
      page: currentPage,
      listSize: 10,
      useYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
    }[] = list.map((item: IUsertype, idx: number) => ({
      key: item.id,
      no: totalDocuments - (currentPage - 1) * 10 - idx,
      name: item.name,
      useYN: item.useYN,
    }));

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleUseYNChange = (value: string) => {
    setUseYN(value);
  };

  const handleRow = (data: any) => {
    return {
      onClick: () => {
        navigate(`${location.pathname}/${data.key}`);
      },
    };
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, useYN]);

  return (
    <ListPageTemplate
      label="유저유형목록"
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch={false}
      onRow={handleRow}
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="노출여부">
            <FHSelect
              value={useYN}
              onChange={handleUseYNChange}
              items={USE_YN_FILTER}
            />
          </FHFormItem>
        </S.formItemWrapper>
      </S.formWrapper>
    </ListPageTemplate>
  );
};

const S = {
  formWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;
  `,
  formItemWrapper: styled.div`
    margin-right: 24px;
  `,
};

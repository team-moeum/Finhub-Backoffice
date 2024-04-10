import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListPageTemplate } from '../../components/templates/List';
import { usertypeAPI } from '../../api/userType';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHSelect } from '../../components/atoms/Select';
import { IUsertype } from '../../types/UserType';
import styled from '@emotion/styled';

export const UserTypeListPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [useYN, setUseYN] = useState('전체');

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

  const initRequest = async () => {
    const { list, totalDocuments } = await usertypeAPI.list({
      page: currentPage,
      listSize: 10,
      keyword,
      useYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
    }[] = list.map((item: IUsertype, idx: number) => ({
      key: item.id,
      no: totalDocuments - idx,
      name: item.name,
      useYN: item.useYN,
    }));

    setList(dataSource);
  };

  const handleSearch = () => {
    initRequest();
  };

  const handleTextChange =
    (_: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
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
  }, [currentPage, keyword, useYN]);

  return (
    <ListPageTemplate
      label="유저유형목록"
      keyword={keyword}
      onSearch={handleSearch}
      onTextChange={handleTextChange}
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch
      onRow={handleRow}
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="노출여부">
            <FHSelect
              value={useYN}
              onChange={handleUseYNChange}
              items={['전체', 'Y', 'N']}
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

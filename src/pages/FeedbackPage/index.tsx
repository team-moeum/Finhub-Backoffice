import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import { REPLY_FILTER } from '@finhub/configs/constants';
import { feedbackAPI } from '@finhub/api/feedback';
import { FeedbackType } from '@finhub/types/Feedback';

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
    title: '응답여부',
    dataIndex: 'reply',
    key: 'reply',
  },
  {
    ellipsis: true,
    title: '요청내용',
    dataIndex: 'context',
    key: 'context',
  },
];

export const FeedbackListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [reply, setReply] = useState(REPLY_FILTER[0]);

  const initRequest = async () => {
    const { list, totalDocuments } = await feedbackAPI.list({
      page: currentPage,
      listSize: 10,
      reply,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      context?: string;
      reply?: string;
    }[] = list.map((item: FeedbackType, idx: number) => ({
      key: item.feedbackId,
      no: totalDocuments - (currentPage - 1) * 10 - idx,
      context: item.context,
      reply: item.reply,
    }));

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleReplyChange = (value: string) => {
    setReply(value);
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
  }, [currentPage, reply]);

  return (
    <ListPageTemplate
      label="VOC목록"
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch={false}
      isCreate={false}
      onRow={handleRow}
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="응답여부">
            <FHSelect
              value={reply}
              onChange={handleReplyChange}
              items={REPLY_FILTER}
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

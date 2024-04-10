import styled from '@emotion/styled';
import type { Dayjs } from 'dayjs';
import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { LayoutTemplate } from '@finhub/components/templates/Layout';
import { FHCalendar } from '@finhub/components/atoms/Calendar';
import { formatDateString } from '@finhub/utils/formatter';
import { QuizModal } from '@finhub/components/organisms/QuizModal';
import { IQuiz } from '@finhub/types/Quiz';
import { quizAPI } from '@finhub/api/quiz';

export const QuizListPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(formatDateString(new Date()));
  const [list, setList] = useState<IQuiz[]>([]);

  const initRequest = async () => {
    const { quizList } = await quizAPI.list({
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth() + 1,
    });

    setList(quizList);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleCalendarSelect = (
    date: Dayjs,
    info: {
      source: 'date' | 'month' | 'year' | 'customize';
    },
  ) => {
    if (info.source === 'date') {
      setDate(date.format('YYYY-MM-DD'));
      openModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const cellRender = (cellDate: Dayjs) => {
    const data = list.find(
      ({ targetDate }: { targetDate: string }) =>
        targetDate ===
        `${cellDate.year()}-${(cellDate.month() + 1).toString().padStart(2, '0')}-${cellDate.date().toString().padStart(2, '0')}`,
    );

    return (
      <S.cellRenderWrapper
        current={cellDate.month() === new Date(date).getMonth()}
      >
        <h3>{data?.question}</h3>
        {data?.topicList.length ? <Tag>{data?.topicList[0].title}</Tag> : null}
      </S.cellRenderWrapper>
    );
  };

  const handleSubmit = () => {
    initRequest();
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <>
      <LayoutTemplate>
        <S.pageHeaderWrapper>
          <div>퀴즈 목록</div>
        </S.pageHeaderWrapper>
        <FHDivider />
        <S.contentWrapper>
          <FHCalendar onSelect={handleCalendarSelect} cellRender={cellRender} />
        </S.contentWrapper>
      </LayoutTemplate>
      <QuizModal
        date={date}
        quizList={list}
        open={open}
        onCancel={handleCancel}
        onOK={handleSubmit}
      />
    </>
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
  cellRenderWrapper: styled.div<{ current: boolean }>`
    opacity: ${({ current }) => (current ? 1 : 0.4)};
    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 8px;
    }
  `,
};

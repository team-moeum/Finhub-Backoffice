import styled from '@emotion/styled';
import type { Dayjs } from 'dayjs';
import { Tag } from 'antd';
import { useState } from 'react';
import { FHDivider } from '../../components/atoms/Divider';
import { LayoutTemplate } from '../../components/templates/Layout';
import { FHCalendar } from '../../components/atoms/Calendar';
import { formatDateString } from '../../utils/formatter';
import { QuizModal } from '@finhub/components/organisms/QuizModal';

export const QuizListPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(formatDateString(new Date()));

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

  const handleSubmit = () => {};

  const cellRender = (cellDate: Dayjs) => {
    return (
      <S.cellRenderWrapper
        current={cellDate.month() === new Date(date).getMonth()}
      >
        <h3>금리가 인상하면 대출을 받는 것이 좋을까?</h3>
        <Tag>#펀드란?</Tag>+@
      </S.cellRenderWrapper>
    );
  };

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
        open={open}
        onCancel={handleCancel}
        onOk={handleSubmit}
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

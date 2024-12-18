import type { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FHCalendarProps {
  cellRender?: (date: Dayjs) => ReactNode;
  onSelect?: (
    date: Dayjs,
    info: { source: 'year' | 'month' | 'date' | 'customize' },
  ) => void;
  onPanelChange?: (date: Dayjs, mode: string) => void;
  onChange?: (date: Dayjs) => void;
}

export const FHCalendar = ({
  onPanelChange,
  onSelect,
  onChange,
  cellRender,
}: FHCalendarProps) => {
  return (
    <CalendarWrapper>
      <Calendar
        mode="month"
        onChange={onChange}
        onSelect={onSelect}
        cellRender={cellRender}
        onPanelChange={onPanelChange}
      />
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  padding: 0 48px;

  .ant-picker-calendar-header {
    padding-right: 12px;
  }

  .ant-picker-calendar-mode-switch {
    display: none;
  }
`;

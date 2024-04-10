import { useNavigate } from 'react-router-dom';
import { LayoutTemplate } from '../Layout';
import { FHTable } from '../../atoms/Table';
import { FHDivider } from '../../atoms/Divider';
import { FHSearchInput } from '../../atoms/SearchInput';
import { FHButton } from '../../atoms/Button';
import { ReactNode } from 'react';
import { TablePaginationConfig } from 'antd';
import * as S from './List.style';

export interface ListPageTemplateProps {
  label: string;
  children?: ReactNode;
  isCreate?: boolean;
  isSearch?: boolean;
  keyword: string;
  onSearch: any;
  onTextChange: any;
  // table
  tableDataSource: any;
  tableColumns: any;
  placeholder?: string;
  totalDocuments: number;
  currentPage: number;
  onTablePageChange: (pagination: TablePaginationConfig) => void;
  onRow?: any;
}

export const ListPageTemplate = ({
  label,
  children,
  isCreate = true,
  isSearch = true,
  keyword = '',
  onSearch,
  onTextChange,
  // table
  tableDataSource = [],
  tableColumns = [],
  placeholder = '',
  totalDocuments,
  currentPage,
  onTablePageChange,
  onRow,
}: ListPageTemplateProps) => {
  const navigate = useNavigate();

  return (
    <LayoutTemplate>
      <S.pageHeaderWrapper>
        <div>{label}</div>
        {isCreate ? (
          <FHButton
            type="primary"
            onClick={() => navigate(`${location.pathname}/create`)}
          >
            {`${label} 추가`}
          </FHButton>
        ) : null}
      </S.pageHeaderWrapper>
      <S.contentWrapper>
        {children}
        {isSearch ? (
          <>
            <FHDivider />
            <S.inputWrapper>
              <FHSearchInput
                placeholder={placeholder}
                value={keyword}
                onChange={onTextChange('search')}
                onSearch={onSearch}
              />
            </S.inputWrapper>
          </>
        ) : null}
        <FHDivider />
        <FHTable
          dataSource={tableDataSource}
          columns={tableColumns}
          totalDocuments={totalDocuments}
          currentPage={currentPage}
          onTablePageChange={onTablePageChange}
          onRow={onRow}
        />
      </S.contentWrapper>
    </LayoutTemplate>
  );
};

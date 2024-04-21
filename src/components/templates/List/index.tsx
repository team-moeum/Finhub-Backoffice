import { ReactNode } from 'react';
import { TablePaginationConfig } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate } from '@finhub/components/templates/Layout';
import { FHTable } from '@finhub/components/atoms/Table';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { FHSearchInput } from '@finhub/components/atoms/SearchInput';
import { FHButton } from '@finhub/components/atoms/Button';
import * as S from './List.style';

export interface ListPageTemplateProps {
  label: string;
  children?: ReactNode;
  isCreate?: boolean;
  isSearch?: boolean;
  keyword?: string;
  onSearch?: any;
  onTextChange?: any;
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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTextChange) {
      onTextChange('search')(e);
    }
  };

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
                onChange={handleTextChange}
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

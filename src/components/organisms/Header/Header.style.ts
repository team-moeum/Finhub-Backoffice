import styled from '@emotion/styled';
import theme from '../../../styles/theme';

export const headerWrapper = styled.div`
  width: 100vw;
  height: 56px;
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: #fff;
`;

export const headerInnerWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    color: unset;
  }
`;

export const logo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    font-size: 14px;
    font-weight: 600;
    margin-left: 4px;
  }
`;

export const headerItemListWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const headerActiveItemWrapper = styled.div`
  height: 56px;
  padding: 0px 12px;
  font-size: 14px;
  color: ${theme.colors.text[444444]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;

export const headerItemWrapper = styled.div`
  height: 56px;
  padding: 0px 12px;
  font-size: 14px;
  color: ${theme.colors.text[444444]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

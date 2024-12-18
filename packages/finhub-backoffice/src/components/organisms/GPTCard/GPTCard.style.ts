import styled from '@emotion/styled';
import theme from '../../../styles/theme';

export const cardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

export const introWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
`;

export const userTypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const avatar = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 44px;
  height: 44px;
  margin-right: 8px;
`;

export const name = styled.div`
  font-size: 13px;
  color: ${theme.colors.text[444444]};
`;

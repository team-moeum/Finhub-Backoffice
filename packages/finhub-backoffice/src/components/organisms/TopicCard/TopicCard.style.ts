import styled from '@emotion/styled';
import theme from '../../../styles/theme';

export const cardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const name = styled.div`
  font-size: 13px;
  color: ${theme.colors.text[444444]};
`;

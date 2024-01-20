import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const container = styled.div`
  ${theme.MIXINS.flexBox('column', 'center', 'center')}
  width: 100vw;
  min-height: 100vh;
`;

import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const container = styled.section`
  ${theme.MIXINS.flexBox('column', 'center', 'center')}
  width: 100vw;
  min-height: 100vh;
`;

export const cardWrap = styled.form`
  margin: 100px 0;
  width: 448px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px;
  background-color: ${theme.colors.gray.f5f6f7};
  box-shadow:
    -24px -24px 48px #ffffff,
    24px 24px 48px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;
export const heading = styled.h1`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
export const input = styled.div`
  margin-top: 32px;
  width: 100%;
  ${theme.MIXINS.flexBox('column', 'flex-start', 'center')};
  position: relative;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    border: none;
    &:focus {
      border-bottom: 1px solid ${theme.colors.primary};
    }
  }

  p {
    position: absolute;
    font-size: 14px;
    color: ${theme.colors.status.failure};
    bottom: -22px;
  }
`;

export const actions = styled.div`
  margin-top: 48px;

  input {
    ${theme.MIXINS.flexBox('column', 'center', 'center')};
    padding: 16px 24px;
    width: 100%;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    transition: 0.3s;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.primary2};
    }
  }
`;

import styled from '@emotion/styled';

export const pageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 48px;

  button {
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
  }

  div {
    font-size: 16px;
    font-weight: 600;
    margin-left: 16px;
  }
`;

export const contentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

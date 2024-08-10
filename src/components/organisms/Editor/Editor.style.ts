import styled from '@emotion/styled';

export const editorWrapper = styled.div`
  background-color: white;
  padding-bottom: 24px;
  border: 1px solid #d9d9d9;

  &:focus,
  &:hover {
    border: 1px solid #4096ff;
    transition: all 0.2s;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';
    line-height: 1.5;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 25rem;
    margin: 0;
  }

  :first-child {
    margin-top: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';
    line-height: 1.5;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 25rem;
    margin: 0;
  }

  :first-child {
    margin-top: 0;
  }

  ::-webkit-scrollbar {
    height: 14px;
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background-clip: padding-box;
    background-color: transparent;
    border: 4px solid transparent;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: #0000;
    border: 4px solid rgba(0, 0, 0, 0);
    border-radius: 8px;
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: #0000001a;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #00000026;
  }

  ::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  button,
  input,
  select,
  textarea {
    background: rgba(61, 37, 20, 0.08);
    border-radius: 0.5rem;
    border: none;
    color: #2e2b29;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.15;
    margin: none;
    padding: 0.375rem 0.625rem;
    transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
  }

  button:hover,
  input:hover,
  select:hover,
  textarea:hover {
    background-color: rgba(61, 37, 20, 0.12);
    color: #110f0e;
  }

  button[disabled],
  input[disabled],
  select[disabled],
  textarea[disabled] {
    background: rgba(61, 37, 20, 0.05);
    color: rgba(53, 38, 28, 0.3);
  }

  button:checked,
  input:checked,
  select:checked,
  textarea:checked {
    accent-color: #1677ff;
  }

  button.primary,
  input.primary,
  select.primary,
  textarea.primary {
    background: #2e2b29;
    color: #fff;
  }

  button.primary:hover,
  input.primary:hover,
  select.primary:hover,
  textarea.primary:hover {
    background-color: #110f0e;
  }

  button.primary[disabled],
  input.primary[disabled],
  select.primary[disabled],
  textarea.primary[disabled] {
    background: rgba(61, 37, 20, 0.05);
    color: rgba(53, 38, 28, 0.3);
  }

  button.is-active,
  input.is-active,
  select.is-active,
  textarea.is-active {
    background: #1677ff;
    color: #fff;
  }

  button.is-active:hover,
  input.is-active:hover,
  select.is-active:hover,
  textarea.is-active:hover {
    background-color: #1677ff;
    color: #fff;
  }

  button:not([disabled]),
  select:not([disabled]) {
    cursor: pointer;
  }

  input[type='text'],
  textarea {
    background-color: unset;
    border: 1px solid rgba(61, 37, 20, 0.12);
    border-radius: 0.5rem;
    color: #2e2b29;
  }

  input[type='text']::-moz-placeholder,
  textarea::-moz-placeholder {
    color: rgba(53, 38, 28, 0.3);
  }

  input[type='text']::placeholder,
  textarea::placeholder {
    color: rgba(53, 38, 28, 0.3);
  }

  input[type='text']:hover,
  textarea:hover {
    background-color: unset;
    border-color: rgba(53, 38, 28, 0.3);
  }

  input[type='text']:focus-visible,
  input[type='text']:focus,
  textarea:focus-visible,
  textarea:focus {
    border-color: #1677ff;
    outline: none;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="Gray" d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.1rem center;
    background-size: 1.25rem 1.25rem;
    padding-right: 1.25rem;
  }

  select:focus {
    outline: 0;
  }

  form {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .hint {
    align-items: center;
    background-color: #fffae5;
    border-radius: 0.5rem;
    border: 1px solid rgba(61, 37, 20, 0.08);
    display: flex;
    flex-direction: row;
    font-size: 0.75rem;
    gap: 0.25rem;
    line-height: 1.15;
    padding: 0.3rem 0.5rem;
  }

  .hint.purple-spinner,
  .hint.error {
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .hint .badge {
    background-color: rgba(61, 37, 20, 0.05);
    border: 1px solid rgba(61, 37, 20, 0.12);
    border-radius: 2rem;
    color: rgba(28, 25, 23, 0.6);
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1;
    padding: 0.25rem 0.5rem;
  }

  .hint.purple-spinner {
    background-color: rgba(88, 5, 255, 0.05);
  }

  .hint.purple-spinner:after {
    content: '';
    background-image: url("data:image/svg+xml;utf8,<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='28px' height='30px' viewBox='0 0 24 30' style='enable-background:new 0 0 50 50;' xml:space='preserve'><rect x='0' y='10' width='6' height='10' fill='%231677ff' rx='3' ry='3'><animateTransform attributeType='xml' attributeName='transform' type='translate' values='0 0; 0 5; 0 -5; 0 0' begin='0' dur='0.6s' repeatCount='indefinite'/></rect><rect x='10' y='10' width='6' height='10' fill='%231677ff' rx='3' ry='3'><animateTransform attributeType='xml' attributeName='transform' type='translate' values='0 0; 0 5; 0 -5; 0 0' begin='0.2s' dur='0.6s' repeatCount='indefinite'/></rect><rect x='20' y='10' width='6' height='10' fill='%231677ff' rx='3' ry='3'><animateTransform attributeType='xml' attributeName='transform' type='translate' values='0 0; 0 5; 0 -5; 0 0' begin='0.4s' dur='0.6s' repeatCount='indefinite'/></rect></svg>");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 1rem;
    width: 1rem;
  }

  .hint.error {
    background-color: #ffebe5;
  }

  .label,
  .label-small,
  .label-large {
    color: #2e2b29;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.15;
  }

  .label-small {
    color: rgba(28, 25, 23, 0.6);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .label-large {
    font-size: 0.875rem;
    font-weight: 700;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(61, 37, 20, 0.12);
    margin: 0;
    width: 100%;
  }

  kbd {
    background-color: rgba(61, 37, 20, 0.08);
    border: 1px solid rgba(61, 37, 20, 0.08);
    border-radius: 0.25rem;
    font-size: 0.6rem;
    line-height: 1.15;
    padding: 0.1rem 0.25rem;
    text-transform: uppercase;
  }

  #app,
  .container {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .control-group {
    align-items: flex-start;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }

  .control-group .sticky {
    position: sticky;
    top: 0;
  }

  [data-node-view-wrapper] > .control-group {
    padding: 0;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
  }

  .switch-group {
    align-items: center;
    background: rgba(61, 37, 20, 0.08);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 0 1 auto;
    justify-content: flex-start;
    padding: 0.125rem;
  }

  .switch-group label {
    align-items: center;
    border-radius: 0.375rem;
    color: rgba(28, 25, 23, 0.6);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 0.75rem;
    font-weight: 500;
    gap: 0.25rem;
    line-height: 1.15;
    min-height: 1.5rem;
    padding: 0 0.375rem;
    transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
  }

  .switch-group label:has(input:checked) {
    background-color: #fff;
    color: #110f0e;
  }

  .switch-group label:hover {
    color: #2e2b29;
  }

  .switch-group label input {
    display: none;
    margin: unset;
  }

  .output-group {
    background-color: rgba(61, 37, 20, 0.05);
    display: flex;
    flex-direction: column;
    font-family: JetBrainsMono, monospace;
    font-size: 0.75rem;
    gap: 1rem;
    margin-top: 2.5rem;
    padding: 1.5rem;
  }

  .output-group label {
    color: #2e2b29;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.15;
  }
`;

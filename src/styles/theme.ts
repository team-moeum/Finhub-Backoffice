const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

const theme = {
  colors: {
    white: '#ffffff',
    purple: {
      400: '#8825ff',
      blue: '#6619c2',
    },
    gray: {
      747474: '#747474',
      eaeaea: '#eaeaea',
      f5f6f7: '#f5f6f7',
      f9fbfc: '#f9fbfc',
    },
    black: '#000000',
    background: {
      pink: '#ee0661',
      orange: '#ff9003',
      yellow: '#ffcc02',
      'sky-blue': '#33cbcb',
      'purple-blue': '#6619c2',
    },
    text: {
      222222: '#222222',
      444444: '#444444',
      888888: '#888888',
    },
    primary: '#006aff',
    primary2: '#599EFF',
    secondary: '#ebedf0',
    status: {
      success: '#00b248',
      failure: '#f44336',
    },
  },
  MIXINS: {
    // flex
    flexBox: (direction = 'row', align = 'center', justify = 'center') => `
      display: flex;
      flex-direction: ${direction};
      align-items: ${align};
      justify-content: ${justify};
    `,

    // positions
    positionCenter: (type = 'absolute') => {
      if (type === 'absolute' || type === 'fixed') {
        return `
          position: ${type};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `;
      }
      return '';
    },

    textEllipsis: (line = 1) => {
      if (line > 1) {
        return `
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: ${line};
          word-wrap: break-word;
          -webkit-box-orient: vertical;
          width: 100%;
        `;
      }
      return `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
    },
  },
  media: {
    custom: customMediaQuery,
    pc: customMediaQuery(1440),
    tablet: customMediaQuery(768),
    mobile: customMediaQuery(576),
  },
};

export default theme;

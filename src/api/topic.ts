const dataSource = [
  {
    id: 1,
    title: 'ETF란',
    category: 'ETF',
    useYN: 'Y',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-01',
    gptContent: [
      {
        id: 1,
        name: '디자이너',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 디자이너입니다',
      },
      {
        id: 2,
        name: 'PM',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 PM입니다',
      },
      {
        id: 3,
        name: '개발자',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 개발자입니다',
      },
    ],
  },
  {
    id: 2,
    title: 'FUND란',
    category: 'FUND',
    useYN: 'N',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-13',
    gptContent: [
      {
        id: 4,
        name: '디자이너',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 디자이너입니다',
      },
      {
        id: 5,
        name: 'PM',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 PM입니다',
      },
      {
        id: 6,
        name: '개발자',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 개발자입니다',
      },
    ],
  },
  {
    id: 3,
    title: 'IRP란',
    category: 'IRP',
    useYN: 'Y',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-14',
    gptContent: [
      {
        id: 7,
        name: '디자이너',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 디자이너입니다',
      },
      {
        id: 8,
        name: 'PM',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 PM입니다',
      },
      {
        id: 9,
        name: '개발자',
        avatar: '/logo.svg',
        content: '이것은 GPT 컨텐츠입니다 이것은 개발자입니다',
      },
    ],
  },
];

const list = ({
  page,
  listSize,
  keyword,
  category,
  useYN,
}: {
  page: number;
  listSize: number;
  keyword: string;
  category: string;
  useYN: string;
}) => {
  const currentPage = page ?? 1;

  let origin =
    category === '전체'
      ? dataSource
      : dataSource.filter((item) => item.category === category);
  origin =
    useYN === '전체' ? origin : origin.filter((item) => item.useYN === useYN);

  const data = origin.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.title.includes(keyword)),
    totalDocuments: origin.length,
  };
};

const show = ({ id }: { id: number }) => {
  return dataSource.find((item) => item.id === id);
};

const create = ({
  title,
  thumbnail,
  category,
  useYN,
}: {
  title: string;
  thumbnail: string;
  category: string;
  useYN: boolean;
}) => {
  const len = dataSource.length;
  const data = {
    id: len + 1,
    title,
    thumbnail,
    category,
    modifiedAt: new Date().toISOString(),
    gptContent: [],
    useYN: useYN ? 'Y' : 'N',
  };

  dataSource.push(data);

  return data;
};

function update({
  id,
  title,
  category,
  thumbnail,
  gptContent,
  useYN,
}: {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  gptContent: {
    id: number;
    name: string;
    avatar: string;
    content: string;
  }[];
  useYN: boolean;
}) {
  const data = {
    id,
    title,
    thumbnail,
    category,
    modifiedAt: new Date().toISOString(),
    gptContent,
    useYN: useYN ? 'Y' : 'N',
  };

  dataSource[id - 1] = data;

  return dataSource;
}

export const topicAPI = {
  list,
  show,
  create,
  update,
};

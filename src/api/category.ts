export const dataSource = [
  {
    id: 1,
    name: 'ETF',
    useYN: 'Y',
    topicList: [
      {
        id: 1,
        title: 'ETF란',
      },
      {
        id: 2,
        title: 'FUND란',
      },
      {
        id: 3,
        title: 'IRP란',
      },
    ],
  },
  {
    id: 2,
    name: 'FUND',
    useYN: 'N',
    topicList: [
      {
        id: 1,
        title: 'ETF란',
      },
      {
        id: 2,
        title: 'FUND란',
      },
      {
        id: 3,
        title: 'IRP란',
      },
    ],
  },
  {
    id: 3,
    name: 'IRP',
    useYN: 'N',
    topicList: [
      {
        id: 1,
        title: 'ETF란',
      },
      {
        id: 2,
        title: 'FUND란',
      },
      {
        id: 3,
        title: 'IRP란',
      },
    ],
  },
];

const list = ({
  page,
  listSize,
  keyword,
  useYN,
}: {
  page: number;
  listSize: number;
  keyword: string;
  useYN: string;
}) => {
  const currentPage = page ?? 1;
  const origin =
    useYN === '전체'
      ? dataSource
      : dataSource.filter((item) => item.useYN === useYN);

  const data = origin.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.name.includes(keyword)),
    totalDocuments: dataSource.length,
  };
};

const show = ({ id }: { id: number }) => {
  return dataSource.find((item) => item.id === id);
};

const create = ({ name, useYN }: { name: string; useYN: boolean }) => {
  const len = dataSource.length;
  const data = {
    id: len + 1,
    name,
    useYN: useYN ? 'Y' : 'N',
    topicList: [
      {
        id: 1,
        title: 'ETF란',
      },
      {
        id: 2,
        title: 'FUND란',
      },
      {
        id: 3,
        title: 'IRP란',
      },
    ],
  };

  dataSource.push(data);

  return data;
};

function update({
  id,
  name,
  useYN,
  topicList,
}: {
  id: number;
  name: string;
  useYN: boolean;
  topicList: { id: number; title: string; categoryId: number }[];
}) {
  const data = {
    id,
    name,
    useYN: useYN ? 'Y' : 'N',
    topicList,
  };

  console.log(data);

  dataSource[id - 1] = data;

  return dataSource;
}

export const categoryAPI = {
  list,
  show,
  create,
  update,
};

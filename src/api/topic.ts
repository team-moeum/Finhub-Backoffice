const dataSource = [
  {
    id: 1,
    title: 'ETF란',
    category: 'ETF',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-01',
  },
  {
    id: 2,
    title: 'FUND란',
    category: 'FUND',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-13',
  },
  {
    id: 3,
    title: 'IRP란',
    category: 'IRP',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-14',
  },
];

const list = ({
  page,
  listSize,
  keyword,
  category,
}: {
  page: number;
  listSize: number;
  keyword: string;
  category: string;
}) => {
  const currentPage = page ?? 1;

  const origin =
    category === '전체'
      ? dataSource
      : dataSource.filter((item) => item.category === category);

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
}: {
  title: string;
  thumbnail: string;
  category: string;
}) => {
  const len = dataSource.length;
  const data = {
    id: len + 1,
    title,
    thumbnail,
    category,
    modifiedAt: new Date().toISOString(),
  };

  dataSource.push(data);

  return data;
};

function update({
  id,
  title,
  category,
  thumbnail,
}: {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
}) {
  const data = {
    id,
    title,
    thumbnail,
    category,
    modifiedAt: new Date().toISOString(),
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

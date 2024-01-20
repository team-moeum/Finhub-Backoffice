const dataSource = [
  {
    id: 1,
    title: 'ETF란',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-01',
  },
  {
    id: 2,
    title: 'FUND란',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-13',
  },
  {
    id: 3,
    title: 'IRP란',
    thumbnail: '/logo.svg',
    modifiedAt: '2024-01-14',
  },
];

const list = ({
  page,
  listSize,
  keyword,
}: {
  page: number;
  listSize: number;
  keyword: string;
}) => {
  const currentPage = page ?? 1;
  const data = dataSource.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.title.includes(keyword)),
    totalDocuments: dataSource.length,
  };
};

const show = ({ id }: { id: number }) => {
  return dataSource.find((item) => item.id === id);
};
const create = ({ title, thumbnail }: { title: string; thumbnail: string }) => {
  const len = dataSource.length;
  const data = {
    id: len + 1,
    title,
    thumbnail,
    modifiedAt: new Date().toISOString(),
  };

  dataSource.push(data);

  return data;
};

function update({
  id,
  title,
  thumbnail,
}: {
  id: number;
  title: string;
  thumbnail: string;
}) {
  const data = {
    id,
    title,
    thumbnail,
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

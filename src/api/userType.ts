const dataSource = [
  {
    id: 1,
    name: '디자이너',
    avatar: '/vite.svg',
  },
  {
    id: 2,
    name: 'PM',
    avatar: '/vite.svg',
  },
  {
    id: 3,
    name: '개발자',
    avatar: '/vite.svg',
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
    list: data.filter((item) => item.name.includes(keyword)),
    totalDocuments: dataSource.length,
  };
};

const show = ({ id }: { id: number }) => {
  return dataSource.find((item) => item.id === id);
};

const create = ({ name, avatar }: { name: string; avatar: string }) => {
  const len = dataSource.length;
  const data = {
    id: len + 1,
    name,
    avatar,
  };

  dataSource.push(data);

  return data;
};

function update({
  id,
  name,
  avatar,
}: {
  id: number;
  name: string;
  avatar: string;
}) {
  const data = {
    id,
    name,
    avatar,
  };

  dataSource[id - 1] = data;

  return dataSource;
}

export const userTypeAPI = {
  list,
  show,
  create,
  update,
};

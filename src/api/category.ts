const dataSource = [
  {
    id: 1,
    name: 'ETF',
  },
  {
    id: 2,
    name: 'FUND',
  },
  {
    id: 3,
    name: 'IRP',
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

const create = ({ name }: { name: string }) => {
  const len = dataSource.length;
  const data = {
    id: len + 1,
    name,
  };

  dataSource.push(data);

  return data;
};

function update({ id, name }: { id: number; name: string }) {
  const data = {
    id,
    name,
  };

  dataSource[id - 1] = data;

  return dataSource;
}

export const categoryAPI = {
  list,
  show,
  create,
  update,
};

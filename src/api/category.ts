export const dataSource = [
  {
    id: 1,
    name: 'ETF',
    useYN: 'Y',
  },
  {
    id: 2,
    name: 'FUND',
    useYN: 'N',
  },
  {
    id: 3,
    name: 'IRP',
    useYN: 'N',
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
  };

  dataSource.push(data);

  return data;
};

function update({
  id,
  name,
  useYN,
}: {
  id: number;
  name: string;
  useYN: boolean;
}) {
  const data = {
    id,
    name,
    useYN: useYN ? 'Y' : 'N',
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

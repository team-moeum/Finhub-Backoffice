import { Flex, Tag, Tooltip, message } from 'antd';
import { FHSelect } from '@finhub/components/atoms/Select';
import { useEffect, useState } from 'react';
import { topicAPI } from '@finhub/api/topic';
import { ITopic } from '@finhub/types/Topic';

export const QuizTopicEditor = ({
  data,
  setter,
}: {
  data: { id: number; title: string }[];
  setter: React.Dispatch<React.SetStateAction<{ id: number; title: string }[]>>;
}) => {
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState<ITopic[]>([]);

  const initRequest = async () => {
    const listData = await topicAPI.list({
      page: 1,
      category: undefined,
      listSize: 20,
      useYN: '전체',
    });

    setTopics(listData.list);
    setTopic(listData.list.length ? listData.list[0].title : '');
  };

  const handleClose = (removedTag: { id: number; title: string }) => {
    const newTopicList = data.filter((topic) => topic.id !== removedTag.id);
    setter(newTopicList);
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);

    const isDuplicated = data.some((item) => item.title === value);
    if (isDuplicated) {
      message.info('존재하는 토픽입니다');
      return;
    }

    const newTopic = topics.find((item) => item.title === value);
    if (newTopic) {
      setter([...data, { id: newTopic.topicId, title: newTopic.title }]);
    }
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <div>
      <FHSelect
        value={topic}
        onChange={handleTopicChange}
        items={topics.map((item) => item.title)}
      />
      <Flex gap="4px" wrap="wrap" align="center" style={{ marginTop: 12 }}>
        {data.map<React.ReactNode>((topic) => {
          const isLongTag = topic.title.length > 20;
          const tagElem = (
            <Tag
              key={topic.id}
              closable
              style={{ userSelect: 'none', height: '100%' }}
              onClose={() => handleClose(topic)}
            >
              <span>
                {isLongTag ? `${topic.title.slice(0, 20)}...` : topic.title}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={topic.title} key={topic.id}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </Flex>
    </div>
  );
};

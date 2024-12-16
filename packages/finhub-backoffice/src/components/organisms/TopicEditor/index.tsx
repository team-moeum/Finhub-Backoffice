import { Flex, Tag, Tooltip, message } from 'antd';
import { FHSelect } from '@finhub/components/atoms/Select';
import { Fragment, useEffect, useState } from 'react';
import { topicAPI } from '@finhub/api/topic';
import { ITopic } from '@finhub/types/Topic';
import { MAX_LIST_SIZE } from '@finhub/api/common';

export const TopicEditor = ({
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
      listSize: MAX_LIST_SIZE,
      useYN: '전체',
    });

    setTopics(listData.list);
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
      setter([...data, { id: newTopic.id, title: newTopic.title }]);
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
            <Fragment key={topic.id}>{tagElem}</Fragment>
          );
        })}
      </Flex>
    </div>
  );
};

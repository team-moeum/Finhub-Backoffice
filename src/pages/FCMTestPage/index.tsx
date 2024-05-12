import React, { useState } from 'react';
import styled from '@emotion/styled';
import { message } from 'antd';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { fcmAPI } from '@finhub/api/fcm';
import { FHSelect } from '@finhub/components/atoms/Select';

export const FCMTestPage = () => {
  const [target, setTarget] = useState('admin');
  const [targetEmail, setTargetEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [view, setView] = useState('');

  const handleChangeTarget = (value: string) => {
    setTarget(value);
  };

  const handleTextChange =
    (type: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      } else if (type === 'content') {
        setContent(value);
      } else if (type === 'view') {
        setView(value);
      }
    };

  const handleSubmit = async () => {
    if (!title) {
      return message.error('제목을 입력해주세요');
    }

    if (target === 'user' && !targetEmail) {
      return message.error('전송 계정의 이메일을 입력해주세요');
    }

    if (!content) {
      return message.error('내용을 입력해주세요');
    }

    try {
      if (window.confirm('전송하시겠습니까?')) {
        await fcmAPI.sendNoti({
          target: target === 'user' ? targetEmail : target,
          title,
          content,
          view,
        });

        message.success('전송되었습니다.');
      }
    } catch {
      message.error('전송 실패입니다.');
    }
  };

  return (
    <CreatePageTemplate label="FCM 테스트">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="배너타입">
          <S.formItemBoxWrapper>
            <FHSelect
              value={target}
              onChange={handleChangeTarget}
              items={['admin', 'all', 'user']}
            />
            {target === 'user' && (
              <FHTextInput
                type="text"
                placeholder="이메일 입력"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
              />
            )}
          </S.formItemBoxWrapper>
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="제목">
          <FHTextInput
            type="text"
            value={title}
            onChange={handleTextChange('title')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="내용">
          <FHTextInput
            type="text"
            value={content}
            onChange={handleTextChange('content')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="화면경로">
          <FHTextInput
            type="text"
            value={view}
            onChange={handleTextChange('view')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          FCM 전송
        </FHButton>
      </S.formItemWrapper>
    </CreatePageTemplate>
  );
};

const S = {
  formItemWrapper: styled.div`
    max-width: 720px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 32px;
  `,
  formItemBoxWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};

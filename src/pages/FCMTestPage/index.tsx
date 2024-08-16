import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { message, Tag } from 'antd';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { fcmAPI, SendNotiRequestType } from '@finhub/api/fcm';
import { FHSelect } from '@finhub/components/atoms/Select';
import { FCM_TYPES } from '@finhub/types/fcm';

const targetOptions = {
  [FCM_TYPES.MEMBER]: 0,
  [FCM_TYPES.ADMIN]: 1,
  [FCM_TYPES.PUSH_ALLOWED_MEMBER]: 2,
  [FCM_TYPES.PUSH_ALL_ADMIN]: 3,
  [FCM_TYPES.ALL]: 4,
};

export const FCMTestPage = () => {
  const [fcmType, setFcmType] = useState({
    label: FCM_TYPES.MEMBER,
    value: targetOptions[FCM_TYPES.MEMBER],
  });
  const [target, setTarget] = useState<string[]>([]);
  const [targetEmail, setTargetEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [view, setView] = useState('');

  const isTypeEmail = useMemo(
    () => [FCM_TYPES.MEMBER, FCM_TYPES.ADMIN].includes(fcmType.label),
    [fcmType],
  );

  const handleChangeType = (value: string) => {
    setFcmType({
      label: value as FCM_TYPES,
      value: targetOptions[value as FCM_TYPES],
    });
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

  const handleAddEmail = () => {
    if (!targetEmail) {
      message.warning('이메일을 입력해주세요.');
      return;
    }
    if (!new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}').test(targetEmail)) {
      message.warning('유효하지 않은 이메일입니다.');
      return;
    }
    if (target.includes(targetEmail)) {
      message.warning('중복된 이메일입니다.');
      return;
    }
    setTarget([...target, targetEmail]);
    setTargetEmail('');
  };

  const handleRemoveEmail = (email: string) => {
    setTarget(target.filter((currentEmail) => currentEmail !== email));
  };

  const handleSubmit = async () => {
    if (!title) {
      return message.error('제목을 입력해주세요');
    }

    if (isTypeEmail && !target.length) {
      return message.error('전송 계정의 이메일을 입력해주세요');
    }

    if (!content) {
      return message.error('내용을 입력해주세요');
    }

    try {
      if (window.confirm('전송하시겠습니까?')) {
        const params: SendNotiRequestType = {
          type: fcmType.value,
          title,
          content,
          view,
        };
        if (isTypeEmail) params.target = target;
        await fcmAPI.sendNoti(params);

        message.success('전송되었습니다.');
      }
    } catch {
      message.error('전송 실패입니다.');
    }
  };

  return (
    <CreatePageTemplate label="FCM 테스트">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="전송타입">
          <S.formItemBoxWrapper>
            <FHSelect
              value={fcmType.label}
              onChange={handleChangeType}
              items={Object.keys(targetOptions)}
            />
            {isTypeEmail && (
              <S.emailInputWrapper>
                <FHTextInput
                  type="email"
                  placeholder="이메일 입력해주세요"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  onPressEnter={handleAddEmail}
                />
                <FHButton onClick={handleAddEmail} type="default">
                  추가
                </FHButton>
              </S.emailInputWrapper>
            )}
            {isTypeEmail && (
              <S.emailTagWrapper>
                {target.map((email) => (
                  <Tag
                    key={email}
                    closable
                    onClose={() => handleRemoveEmail(email)}
                  >
                    {email}
                  </Tag>
                ))}
              </S.emailTagWrapper>
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
  emailInputWrapper: styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
  `,
  emailTagWrapper: styled.div`
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
};

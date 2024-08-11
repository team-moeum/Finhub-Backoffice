import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { message, Space, Typography } from 'antd';
import { feedbackAPI } from '@finhub/api/feedback';
import { FHEditor } from '@finhub/components/organisms/Editor';

export const FeedbackDetailPage = () => {
  const { id } = useParams();
  const feedbackId = Number(id);
  const [context, setContext] = useState('');
  const [email, setEmail] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [appVersion, setAppVersion] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [reply, setReply] = useState(false);

  const initRequest = async () => {
    const data = await feedbackAPI.show({
      id: feedbackId,
    });

    if (data) {
      setContext(
        data.reply === 'T'
          ? data.context
          : `<b>안녕하세요, @@@님.</b>
            <p>
              핀허브 고객센터입니다. 고객님께서 문의해 주신 사항에 대해 답변 드리겠습니다.
            </p>
            <hr />
            <b>고객님의 문의:</b>
            <p>${data.context}</p>
            <b>답변:</b>
            <p>[고객님의 문의에 대한 구체적인 답변]</p>
            <hr />
            <p>
              저희 핀허브를 이용해 주셔서 감사합니다.<br />추가적으로 궁금한 사항이 있으시면
              언제든지 앱 > 메뉴 > 문의하기로 문의 해주시기 바랍니다.<br />항상 고객님의
              의견에 귀 기울이며, 더 나은 서비스를 제공하기 위해 최선을 다하겠습니다.<br />감사합니다.
            </p>
            <br />
            <b>핀허브 고객센터 드림</b>
            <br />
            <p>이메일: support@fin-hub.co.kr</p>`,
      );
      setEmail(data.email ?? '');
      setUserAgent(data.userAgent ?? '');
      setAppVersion(data.appVersion ?? '');
      setReply(data.reply === 'T');

      const fileList = [];
      if (data.fileUrl1) fileList.push(data.fileUrl1);
      if (data.fileUrl2) fileList.push(data.fileUrl2);
      if (data.fileUrl3) fileList.push(data.fileUrl3);
      if (data.fileUrl4) fileList.push(data.fileUrl4);
      setFiles(fileList);
    }
  };

  const handleSubmit = async () => {
    if (window.confirm('VOC 답변을 전송하시겠습니까?')) {
      try {
        await feedbackAPI.send({
          id: feedbackId,
          text: context,
        });
        initRequest();
        message.success('반영되었습니다.');
      } catch {
        message.error('오류 확인부탁드립니다.');
      }
    }
  };

  const handleEditorChange = (value: string) => {
    setContext(value);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="VOC 상세">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="이메일">
          <FHTextInput type="text" readOnly value={email} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="User Agent">
          <FHTextInput type="text" readOnly value={userAgent} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="App Version">
          <FHTextInput type="text" readOnly value={appVersion} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="요청 내용">
          <FHEditor data={context} onChange={handleEditorChange} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="첨부 파일">
          {files.map((url) => (
            <Space key={url} direction="vertical" size="middle">
              <Typography.Link href={url} target="_blank">
                {url}
              </Typography.Link>
            </Space>
          ))}
        </FHFormItem>
      </S.formItemWrapper>
      <S.buttonWrapper>
        <FHButton
          disabled={reply}
          width="100%"
          onClick={handleSubmit}
          type="primary"
        >
          VOC 답변 전송{reply ? '완료' : ''}
        </FHButton>
      </S.buttonWrapper>
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
  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
};

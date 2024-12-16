import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { message } from 'antd';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { useConfirmNavigate } from '@finhub/hooks/useConfirmNavigate';
import { columnAPI } from '@finhub/api/column';
import { FHTextArea } from '@finhub/components/atoms/TextArea';
import { TopicEditor } from '@finhub/components/organisms/TopicEditor';
import { CommentModal } from '@finhub/components/organisms/CommentModal';
import { IComment } from '@finhub/types/Comment';
import { ReportReasonModal } from '@finhub/components/organisms/ReportReasonModal';
import { LoadingTemplate } from '@finhub/components/templates/Loading/Loading';
import { FHEditor } from '@finhub/components/organisms/Editor';

export const ColumnDetailPage = () => {
  const { id } = useParams();
  const columnId = Number(id);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [topicList, setTopicList] = useState<{ id: number; title: string }[]>(
    [],
  );
  const [useYN, setUseYN] = useState(false);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReportReason, setIsOpenReportReason] = useState(false);
  const [loading, setLoading] = useState(false);

  const { onConfirm } = useConfirmNavigate(`/services/columns`);
  const navigate = useNavigate();

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
      } else if (type === 'summary') {
        setSummary(value);
      }
    };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const initRequest = async () => {
    const showData = await columnAPI.show({ id: columnId });

    if (showData) {
      setTitle(showData.title ?? '');
      setSummary(showData.summary ?? '');
      setContent(showData.content ?? '');
      setTopicList(showData.topicList);
      setThumbnail(showData.backgroundUrl ?? '');
      setUseYN(showData.useYN === 'Y');
      setCommentList(showData.commentList);
    }
  };

  const handleSubmit = () => {
    if (!title) {
      alert('칼럼명을 입력해주세요');
      return;
    }

    if (!summary) {
      alert('칼럼요약을 입력해주세요');
      return;
    }

    if (!content) {
      alert('칼럼내용을 입력해주세요');
      return;
    }

    if (!topicList) {
      alert('관련 토픽을 입력해주세요');
      return;
    }

    columnAPI.update({
      id: columnId,
      title,
      summary,
      content,
      topicList: topicList.map((topic) => topic.id),
      useYN: useYN ? 'Y' : 'N',
      backgroundUrl: thumbnail,
      file: thumbnail,
    });

    message.success('반영되었습니다.');
    onConfirm('칼럼목록으로 이동하시겠습니까?');
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  const handleClickSummaryGPT = async () => {
    if (window.confirm('GPT 칼럼 요약을 생성하시겠습니까?')) {
      try {
        setLoading(true);
        const data = await columnAPI.generateSummary({ title });
        message.success('생성되었습니다.');
        setSummary(data.answer);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickContentGPT = async () => {
    if (window.confirm('GPT 칼럼 내용을 생성하시겠습니까?')) {
      try {
        setLoading(true);
        const data = await columnAPI.generateContent({ title });
        message.success('생성되었습니다.');
        setContent(data.answer);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOpenCommentModal = () => {
    setIsOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsOpen(false);
  };

  const handleOpenReportReasonModal = () => {
    setIsOpenReportReason(true);
  };

  const handleCloseReportReasonModal = () => {
    setIsOpenReportReason(false);
  };

  const handleDelete = async () => {
    if (window.confirm('칼럼을 삭제하시겠습니까?')) {
      await columnAPI.remove({ id: columnId });
      message.success('반영되었습니다.');
      navigate(`/services/columns`);
    }
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <LoadingTemplate loading={loading}>
      <CreatePageTemplate label="칼럼 수정">
        <S.formItemWrapper>
          <FHFormItem direction="vertical" label="썸네일">
            <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
          </FHFormItem>
        </S.formItemWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="vertical" label="칼럼명">
            <FHTextInput
              type="text"
              value={title}
              onChange={handleTextChange('title')}
            />
          </FHFormItem>
        </S.formItemWrapper>
        <S.formItemWrapper>
          <S.formRowWrapper>
            <S.rowLabelWrapper>칼럼요약</S.rowLabelWrapper>
            <FHButton type="default" onClick={handleClickSummaryGPT}>
              생성
            </FHButton>
          </S.formRowWrapper>
          <FHTextArea value={summary} onChange={handleTextChange('summary')} />
        </S.formItemWrapper>
        <S.formItemWrapper>
          <S.formRowWrapper>
            <S.rowLabelWrapper>칼럼내용</S.rowLabelWrapper>
            <FHButton type="default" onClick={handleClickContentGPT}>
              생성
            </FHButton>
          </S.formRowWrapper>
          <FHEditor data={content} onChange={handleEditorChange} />
        </S.formItemWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="vertical" label="관련 토픽">
            <TopicEditor data={topicList} setter={setTopicList} />
          </FHFormItem>
        </S.formItemWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="vertical" label="노출여부">
            <FHSwitch value={useYN} onChange={handleUseYNChange} />
          </FHFormItem>
        </S.formItemWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="vertical" label="댓글관리">
            <S.buttonWrapper>
              <FHButton type="default" onClick={handleOpenCommentModal}>
                댓글관리
              </FHButton>
              <FHButton type="default" onClick={handleOpenReportReasonModal}>
                신고사유관리
              </FHButton>
              <Link to="comment/report">
                <FHButton type="default" onClick={() => null}>
                  신고관리
                </FHButton>
              </Link>
            </S.buttonWrapper>
          </FHFormItem>
        </S.formItemWrapper>
        <S.buttonWrapper>
          <FHButton width="100%" onClick={handleDelete} type="default">
            칼럼 삭제
          </FHButton>
          <FHButton width="100%" onClick={handleSubmit} type="primary">
            칼럼 수정
          </FHButton>
        </S.buttonWrapper>
      </CreatePageTemplate>
      <CommentModal
        list={commentList}
        open={isOpen}
        onCancel={handleCloseCommentModal}
      />
      <ReportReasonModal
        open={isOpenReportReason}
        onCancel={handleCloseReportReasonModal}
      />
    </LoadingTemplate>
  );
};

const S = {
  formItemWrapper: styled.div`
    max-width: 720px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 32px;
  `,
  cardWrapper: styled.div`
    width: 100%;
  `,
  rowLabelWrapper: styled.div`
    font-size: 14px;
    font-weight: 500;
  `,
  formRowWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
  `,
  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
};

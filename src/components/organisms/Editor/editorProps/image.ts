import { Slice } from '@tiptap/pm/model';
import { EditorView } from '@tiptap/pm/view';
import { message } from 'antd';
import { commonAPI } from '@finhub/api/common';

const maxFileSize = 10;

function isValidImageFile(file: File): boolean {
  const filesize = parseFloat((file.size / 1024 / 1024).toFixed(4));
  return (
    (file.type === 'image/jpeg' || file.type === 'image/png') &&
    filesize < maxFileSize
  );
}

function showImgErrorMessage(file: File): void {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    message.error('이미지는 jpg, png 포맷이어야 합니다.');
    return;
  }
  message.error('이미지는 10MB이하여야 합니다.');
}

export function onDropImage(
  view: EditorView,
  event: DragEvent,
  _: Slice,
  moved: boolean,
): boolean {
  if (
    moved ||
    !event.dataTransfer ||
    !event.dataTransfer.files ||
    !event.dataTransfer.files[0]
  ) {
    return false;
  }

  const file = event.dataTransfer.files[0];

  if (!isValidImageFile(file)) {
    showImgErrorMessage(file);
    return true;
  }

  commonAPI
    .saveImg(file, 'column')
    .then((response) => {
      if ('s3ImgUrl' in response) {
        const { schema } = view.state;
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });

        if (!coordinates) return true;

        const node = schema.nodes.image.create({ src: response.s3ImgUrl });
        const transaction = view.state.tr.insert(coordinates.pos, node);
        view.dispatch(transaction);
        return true;
      }
    })
    .catch(() => {
      message.error('업로드에 문제가 생겼습니다. 다시 시도해 주세요.');
      return true;
    });

  return true;
}

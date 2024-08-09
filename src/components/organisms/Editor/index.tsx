import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { extensions } from './extensions';
import { Toolbar } from './Toobar';
import { editorProps } from './editorProps';
import * as S from './Editor.style';

export function FHEditor({
  data,
  onChange,
}: {
  data: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    editable: true,
    extensions,
    content: data,
    editorProps,
    onUpdate: ({ editor }) => {
      onChange(editor?.getHTML());
    },
  });

  useEffect(() => {
    editor?.commands.setContent(data);
  }, [editor, data]);

  return (
    <S.editorWrapper>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </S.editorWrapper>
  );
}

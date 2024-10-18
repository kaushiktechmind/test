// components/QuillEditor.tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill CSS

interface QuillEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ onChange, value }) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current === null && quillRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            ['clean'],
          ],
        },
      });

      editorRef.current.on('text-change', () => {
        const content = editorRef.current?.root.innerHTML || '';
        onChange(content);
      });

      editorRef.current.root.innerHTML = value; // Set initial value
    }
  }, [onChange, value]);

  return <div ref={quillRef} style={{ height: '200px' }} />;
};

export default QuillEditor;

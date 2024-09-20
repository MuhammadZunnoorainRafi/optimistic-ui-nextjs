import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import ReactQuill from 'react-quill';
type Props = {
  value: string;
  onChange: (val: string) => void;
};
function Editor({ value, onChange }: Props) {
  return (
    <ReactQuill
      style={{ outline: 'none' }}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}

export default Editor;

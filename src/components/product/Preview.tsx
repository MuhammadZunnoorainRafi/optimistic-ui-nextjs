import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type Props = {
  value: string;
};

function Preview({ value }: Props) {
  return <ReactQuill theme="bubble" value={value} />;
}

export default Preview;

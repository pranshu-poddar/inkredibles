/* eslint-disable react-hooks/exhaustive-deps */
// components/DocViewer.js
'use client'
import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

const DocViewer = ({ docFilePath }:{docFilePath:string}) => {
  const [htmlContent, setHtmlContent] = useState('');

  const convertDocToHtml = async () => {
    try {
      const response = await fetch(docFilePath);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    } catch (error) {
      console.error('Error converting DOC to HTML:', error);
    }
  };

  // Convert DOC to HTML when component mounts
  useEffect(() => {
    convertDocToHtml();
  }, [docFilePath]);

  return (
    <div className='container2 pt-12'>
        <div className='prose-gray prose-p:mb-2' dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default DocViewer;

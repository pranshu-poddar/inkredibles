// components/DocViewer.js
'use client'
import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

const DocViewer = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const docFilePath = "/files/privacy-policy.docx"; // Assuming you have the file path correctly

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
    <div className='prose-gray px-4 py-12 prose-p:mb-2' dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default DocViewer;

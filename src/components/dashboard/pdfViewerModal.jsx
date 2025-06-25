import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

const PdfViewerModal = ({ isOpen, onClose, pdfData, courseId, cloIds }) => {
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(pdfData || '');

  useEffect(() => {
    setContent(pdfData || '');
  }, [pdfData]);

  useEffect(() => {
    if (!isOpen || isEditing || !containerRef.current) return;

    containerRef.current.innerHTML = '';
    let htmlContent;

    if (content.includes('#') || content.includes('*') || content.includes('\n')) {
      htmlContent = marked.parse(content);
    } else {
      htmlContent = `<pre class="plain-text">${content}</pre>`;
    }

    containerRef.current.innerHTML = `<div class="styled-doc">${htmlContent}</div>`;
  }, [isOpen, content, isEditing]);

const downloadAsPdf = async () => {
  // try {
  //   const faculty = JSON.parse(localStorage.getItem("user"));
  //   const facultyId = faculty?.id;

  //   if (!facultyId || !courseId || !cloIds?.length) {
  //     alert("Missing facultyId, courseId, or CLOs");
  //     return;
  //   }

  //   const payload = {
  //     title: "Assignment - " + new Date().toLocaleString(),
  //     type: "Assignment",
  //     questions: content,
  //     courseId,
  //     cloIds,
  //     facultyId,
  //   };

  //   await axios.post(`${import.meta.env.VITE_API_URL}/content`, payload);
  //   console.log("Content saved to backend",payload);
  // } catch (err) {
  //   console.error("Error saving before download:", err);
  //   alert("Failed to save content before downloading.");
  //   return;
  // }

  const element = containerRef.current;
  const opt = {
    margin: 0.5,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };
  html2pdf().from(element).set(opt).save();
};

  const toggleEdit = () => setIsEditing(!isEditing);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white text-black w-[70%] h-[80vh] flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-gray-100">
          <h3 className="text-lg font-semibold">{isEditing ? 'Edit Document' : 'Document Viewer'}</h3>
          <div className="space-x-2">
            <button
              onClick={toggleEdit}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            <button
              onClick={downloadAsPdf}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Download as PDF
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-4">
          {isEditing ? (
            <textarea
              className="w-full h-full p-3 border rounded resize-none text-sm font-mono"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div ref={containerRef} />
          )}
        </div>
      </div>

      <style jsx>{`
        .styled-doc {
          font-family: 'Georgia', serif;
          color: #222;
          line-height: 1.8;
          font-size: 16px;
          white-space: pre-wrap;
        }
        .styled-doc h1, .styled-doc h2, .styled-doc h3, .styled-doc h4 {
          font-weight: bold;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .styled-doc h1 { font-size: 2rem; }
        .styled-doc h2 { font-size: 1.75rem; }
        .styled-doc h3 { font-size: 1.5rem; }
        .styled-doc h4 { font-size: 1.25rem; }
        .styled-doc p {
          margin-bottom: 5px;
          text-indent: 0em;
        }
        .styled-doc strong {
          font-weight: bold;
        }
        .styled-doc em {
          font-style: italic;
        }
        .styled-doc pre {
          background-color: #f4f4f4;
          padding: 1rem;
          border-radius: 0.25rem;
          overflow-x: auto;
        }
        .styled-doc ul, .styled-doc ol {
          padding-left: 0rem;
          margin-bottom: 5px;
        }
        .styled-doc li {
          margin-bottom: 5px;
        }
        .plain-text {
          font-size: 16px;
          font-family: 'Georgia', serif;
          white-space: pre-wrap;
          line-height: 1;
        }
      `}</style>
    </div>
  );
};

export default PdfViewerModal;

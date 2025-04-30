// import React, { useEffect, useRef } from "react";

// const PdfViewerModal = ({ isOpen, onClose, pdfData }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen || !pdfData || !containerRef.current) return;

//     // Clear previous content
//     containerRef.current.innerHTML = '';

//     try {
//       // Create a data URL directly from the plaintext
//       // This assumes pdfData is either a base64 encoded string or actual PDF content
//       let dataUrl;
      
//       // Check if it's already a data URL
//       if (pdfData.startsWith('data:application/pdf;base64,')) {
//         dataUrl = pdfData;
//       } 
//       // Check if it looks like base64 encoded data
//       else if (/^[A-Za-z0-9+/=]+$/.test(pdfData)) {
//         dataUrl = `data:application/pdf;base64,${pdfData}`;
//       } 
//       // Treat as raw text content (e.g., for PDF text representation)
//       else {
//         // Create a text representation container
//         const textContainer = document.createElement('div');
//         textContainer.className = 'p-4 overflow-auto h-full';
        
//         // Format the text content for better readability
//         const preElement = document.createElement('pre');
//         preElement.className = 'whitespace-pre-wrap text-sm';
//         preElement.textContent = pdfData;
        
//         textContainer.appendChild(preElement);
//         containerRef.current.appendChild(textContainer);
//         return;
//       }
      
//       // Create an iframe to display the PDF
//       const iframe = document.createElement('iframe');
//       iframe.src = dataUrl;
//       iframe.className = 'w-full h-full border-0';
//       iframe.title = 'PDF Viewer';
      
//       // Append iframe to container
//       containerRef.current.appendChild(iframe);
//     } catch (error) {
//       console.error('Error displaying PDF:', error);
      
//       // Show error message
//       const errorDiv = document.createElement('div');
//       errorDiv.className = 'p-4 text-red-500';
//       errorDiv.textContent = 'Failed to display PDF data. The format may be unsupported.';
//       containerRef.current.appendChild(errorDiv);
//     }
//   }, [isOpen, pdfData]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white text-black h-[80vh] w-[70%] flex flex-col rounded-lg overflow-hidden">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-medium">PDF Document</h3>
//           <button 
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             ✕
//           </button>
//         </div>
        
//         <div className="flex-1 overflow-hidden" ref={containerRef}>
//           {!pdfData && (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">No PDF data available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfViewerModal;

// import React, { useEffect, useRef } from 'react';
// import { marked } from 'marked';
// import html2pdf from 'html2pdf.js';

// const PdfViewerModal = ({ isOpen, onClose, pdfData }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen || !pdfData || !containerRef.current) return;

//     containerRef.current.innerHTML = ''; // Clear old content

//     const html = marked.parse(pdfData); // Convert Markdown to HTML
//     const styledContent = `
//       <div class="styled-doc">
//         ${html}
//       </div>
//     `;

//     containerRef.current.innerHTML = styledContent;
//   }, [isOpen, pdfData]);

//   const downloadAsPdf = () => {
//     const element = containerRef.current;
//     const opt = {
//       margin:       0.5,
//       filename:     'quiz-document.pdf',
//       image:        { type: 'jpeg', quality: 0.98 },
//       html2canvas:  { scale: 2 },
//       jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
//     };
//     html2pdf().from(element).set(opt).save();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
//       <div className="bg-white text-black w-[70%] h-[80vh] flex flex-col rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b bg-gray-100">
//           <h3 className="text-lg font-semibold">Document Viewer</h3>
//           <div className="space-x-2">
//             <button
//               onClick={downloadAsPdf}
//               className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
//             >
//               Download as PDF
//             </button>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-800 text-xl"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto px-8 py-6" ref={containerRef}>
//           {!pdfData && (
//             <p className="text-center text-gray-500">No content available</p>
//           )}
//         </div>
//       </div>

//       {/* Custom styling applied to markdown HTML */}
//       <style jsx>{`
//         .styled-doc {
//           font-family: Georgia, serif;
//           line-height: 1.6;
//           font-size: 16px;
//           color: #222;
//         }
//         .styled-doc h1, .styled-doc h2, .styled-doc h3 {
//           font-weight: bold;
//           margin-top: 1.5rem;
//           margin-bottom: 0.75rem;
//         }
//         .styled-doc h1 { font-size: 1.75rem; }
//         .styled-doc h2 { font-size: 1.5rem; }
//         .styled-doc h3 { font-size: 1.25rem; }
//         .styled-doc p, .styled-doc li {
//           margin-bottom: 0.75rem;
//         }
//         .styled-doc strong {
//           font-weight: bold;
//         }
//         .styled-doc em {
//           font-style: italic;
//         }
//         .styled-doc pre {
//           background-color: #f4f4f4;
//           padding: 1rem;
//           border-radius: 0.25rem;
//           overflow-x: auto;
//         }
//         .styled-doc ul, .styled-doc ol {
//           padding-left: 1.25rem;
//           margin-bottom: 1rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PdfViewerModal;


import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

const PdfViewerModal = ({ isOpen, onClose, pdfData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !pdfData || !containerRef.current) return;

    containerRef.current.innerHTML = ''; // Clear old content

    let htmlContent;

    if (pdfData.includes('#') || pdfData.includes('*') || pdfData.includes('\n')) {
      // Likely Markdown
      htmlContent = marked.parse(pdfData);
    } else {
      // Plain text
      htmlContent = `<pre class="plain-text">${pdfData}</pre>`;
    }

    containerRef.current.innerHTML = `
      <div class="styled-doc">
        ${htmlContent}
      </div>
    `;
  }, [isOpen, pdfData]);

  const downloadAsPdf = () => {
    const element = containerRef.current;
    const opt = {
      margin:       0.5,
      filename:     'document.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white text-black w-[70%] h-[80vh] flex flex-col rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-100">
          <h3 className="text-lg font-semibold">Document Viewer</h3>
          <div className="space-x-2">
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-10" ref={containerRef}>
          {!pdfData && (
            <p className="text-center text-gray-500">No content available</p>
          )}
        </div>
      </div>

      {/* Styling */}
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

import React, { useState, useEffect, useRef } from 'react';
import { setCurrentPDF } from '../redux/mocktestslice';
import { useDispatch } from 'react-redux';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import './index.css';
import { setpdfDisplayHeight, setpdfDisplayWidth, setpdfHeightInPoints, setpdfWidthInPoints,setoffsetX, setoffsetY } from '../redux/pdfslice';
const PdfViewer = ({ pdfUrl, reloadTrigger }) => {
    const canvasRef = useRef(null);
    const renderTaskRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const pdfViewerRef = useRef(null);

  
  useEffect(() => {
    const fetchPdf = async () => {
      if (!pdfUrl) return;
      const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
      const pdf = await loadingTask.promise;
      setTotalPages(pdf.numPages); 
      renderPage(currentPage, pdf); 
    };
    fetchPdf();
  }, [pdfUrl, currentPage,reloadTrigger]);

   const renderPage = async (pageNumber, pdf) => {
    const page = await pdf.getPage(pageNumber);
     const viewport = page.getViewport({ scale: 1 });
     const canvas = canvasRef.current;
    if (canvasRef.current && pdfViewerRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mainRect = document.querySelector('#root').getBoundingClientRect();
      const offsetX = rect.left - mainRect.left;
      const offsetY = rect.top - mainRect.top;
      const width = canvas.offsetWidth;  
      const height = canvas.offsetHeight;  
      dispatch(setpdfDisplayHeight(height));
      dispatch(setpdfDisplayWidth(width));
      dispatch(setoffsetX(offsetX));
      dispatch(setoffsetY(offsetY));
    } 
     const context = canvas.getContext('2d'); 
     canvas.height = viewport.height;
     canvas.width = viewport.width;
     dispatch(setpdfHeightInPoints(viewport.height));
     dispatch(setpdfWidthInPoints(viewport.width));
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
  
    // Cancel the previous render task if it's still ongoing
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }
  
    // Start a new render task
    renderTaskRef.current = page.render(renderContext);
    await renderTaskRef.current.promise.then(() => {
      // Clear the ref once rendering is completed
      renderTaskRef.current = null;
    }).catch((error) => {
      if (error.name === 'RenderingCancelledException') {
        console.log('Rendering cancelled');
      } else {
        console.error('Render page error:', error);
      }
    });
  }; 

    
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.max(prevPage - 1, 1);
      dispatch(setCurrentPDF({ currentPage: newPage })); 
      return newPage;
    });
  };
  
  const goToNextPage = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.min(prevPage + 1, totalPages);
      dispatch(setCurrentPDF({ currentPage: newPage }));
      return newPage;
    });
  };

  return (
    <div ref={pdfViewerRef} className="pdf-viewer" >
      <canvas ref={canvasRef} className="pdf-canvas" ></canvas>
      <div>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <p>Page {currentPage} of {totalPages}</p>
    </div>
  );
};

export default PdfViewer;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
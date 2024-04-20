import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PdfViewer from './PdfViewer';
function PdfEdit1({filename}) {
  const [text, setText] = useState('');
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
    const [size, setSize] = useState(12);
    const pdfUrl = useSelector((state) => state.mocktest.data.url);
    const currentPage = useSelector((state) => state.mocktest.currentpdf.currentPage);
    const [reloadTrigger, setReloadTrigger] = useState(0); // Initial value
    const navigate = useNavigate();
    
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/edit-pdf', { text, x: Number(x), y: Number(y), size: Number(size),filename:filename,currentPage : currentPage });
        if(response.status === 200)
        {
            setReloadTrigger(reloadTrigger => reloadTrigger + 1);
            navigate('/fileupload');  
        }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text to add" />
        <input type="number" value={currentPage}  placeholder="Current Page" disabled/>
        <input type="number" value={x} onChange={(e) => setX(e.target.value)} placeholder="X Position" />
        <input type="number" value={y} onChange={(e) => setY(e.target.value)} placeholder="Y Position" />
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Font Size" />
        <button type="submit">Modify PDF</button>
          </form>  
          <PdfViewer pdfUrl={pdfUrl} reloadTrigger={reloadTrigger}/>
    </div>
  );
}

export default PdfEdit1;
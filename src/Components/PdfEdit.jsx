import React, { useState,useRef } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { setdragLimitRight, setdragLimitBottom } from '../redux/pdfslice';
import PdfViewer from './PdfViewer';
function PdfEdit({ filename }) {
 
  const [textFields, setTextFields] = useState([]);
  const dispatch = useDispatch();
  const pdfUrl = useSelector((state) => state.mocktest.data.url);
  const offsetX = useSelector((state) => state.pdf.offsetX);
  const offsetY = useSelector((state) => state.pdf.offsetY);
  const pdfHeightInPoints = useSelector((state) => state.pdf.pdfHeightInPoints);
  const pdfWidthInPoints = useSelector((state) => state.pdf.pdfWidthInPoints);
  const pdfDisplayHeight = useSelector((state) => state.pdf.pdfDisplayHeight);
  const pdfDisplayWidth = useSelector((state) => state.pdf.pdfDisplayWidth);
  const dragLimitRight = useSelector((state) => state.pdf.dragLimitRight);
  const dragLimitBottom =  useSelector((state) => state.pdf.dragLimitBottom);
  const currentPage = useSelector((state) => state.mocktest.currentpdf.currentPage);
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const draggableAreaRef = useRef(null);

    const addTextField = () => { 
    const newTextFields = [
      ...textFields,
      { id: textFields.length, text: '', x: offsetX, y: offsetY,xaxis : 0, yaxis:0 , size: 12 },
    ];
    setTextFields(newTextFields);
  };
 
    
  const removeTextField = (id) => {
    const newTextFields = textFields.filter(field => field.id !== id);
    setTextFields(newTextFields);
  };
    
  const handleTextChange = (id, newText) => {
    const newTextFields = textFields.map(field => 
      field.id === id ? { ...field, text: newText } : field
    );
    setTextFields(newTextFields);
  };

  //const pdfHeightInPoints = 780; 
  //const pdfDisplayHeight = 750; 
  //const pdfWidthInPoints = 740; 
  // const pdfDisplayWidth = 1050; 
  //const offsetX = 310;
  //const offsetY = 152; 

  const handleDrag = (e, ui, id) => {
    const { x, y } = ui;  
    const actualX = (x / pdfDisplayWidth) * pdfWidthInPoints;
    const actualY = pdfHeightInPoints - ((y / pdfDisplayHeight) * pdfHeightInPoints);
    const draggableright = draggableAreaRef.current.getBoundingClientRect();
    const mainRect = document.querySelector('#root').getBoundingClientRect();
    const right = mainRect.right - draggableright.right;
    const bottom = mainRect.bottom - draggableright.bottom;
    const dragright = pdfDisplayWidth - right;
    const dragbottom = pdfDisplayHeight - bottom;
    dispatch(setdragLimitRight(dragright));
    dispatch(setdragLimitBottom(dragbottom));
    const newTextFields = textFields.map(field =>
      field.id === id ? { ...field, x: offsetX, y: offsetY,xaxis : actualX,yaxis: actualY } : field
    );
    setTextFields(newTextFields);
  };
    
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const field = textFields.find(field => field.id === id);

    if (field) {
      try {
        const response = await axios.post('http://localhost:3001/edit-pdf', {
          text: field.text,
          x: field.xaxis,
          y: field.yaxis,
          size: field.size,
          filename: filename,
          currentPage: currentPage
        });

        if (response.status === 200) {
          setReloadTrigger(reloadTrigger => reloadTrigger + 1);
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  };

  //740,696

  return (
    <div ref={draggableAreaRef} className="draggable-area">
      <button className="pdf-add-field" onClick={addTextField}>Add Field</button>
      {textFields.map((field,index) => (
        <Draggable key={field.id} bounds={{ left: 0, top: 0, right: dragLimitRight , bottom: dragLimitBottom}} onStop={(e, ui) => handleDrag(e, ui, field.id)}>
          <form className="pdf-container" onSubmit={(e) => handleSubmit(e, field.id)} style={{ left: field.x, top: field.y}}>     
            <input className="pdf-input" type="text" value={field.text} onChange={(e) => handleTextChange(field.id, e.target.value)} placeholder="Text to add" />
            <button className="pdf-button-add" type="submit">Add</button>
            <button className="pdf-button-remove" type="button" onClick={() => removeTextField(field.id)}>X</button>
          </form>  
        </Draggable>
      ))}
      <PdfViewer pdfUrl={pdfUrl} reloadTrigger={reloadTrigger} />
    </div>
  );
}

export default PdfEdit;
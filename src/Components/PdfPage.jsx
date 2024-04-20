import React from "react";
import PdfEdit from "./PdfEdit";
import { useSelector } from 'react-redux';

function PdfPage() {
  const filename = useSelector((state) => state.mocktest.data.filename);
  return (
      <PdfEdit filename={filename} />
  );
}

export default PdfPage;
import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './PDF'; // Import your PDF document component

const PDFView = () => (
    <PDFViewer>
        <MyDocument />
    </PDFViewer>
);

export default PDFView;

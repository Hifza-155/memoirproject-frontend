"use client";

import { PDFViewer } from "@react-pdf/renderer";
import MemoirPDFDocument from "./MemoirPDFDocument";

export default function MemoirPDFViewer() {
  return (
    <PDFViewer
      width="100%"
      height="100%"
      showToolbar
    >
      <MemoirPDFDocument />
    </PDFViewer>
  );
}
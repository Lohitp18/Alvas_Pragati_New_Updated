import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Type for feedback entries
interface Feedback {
  name: string;
  phone: string;
  message: string;
}

const AdminPanel: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  // Fetch feedback from backend
  useEffect(() => {
    fetch('https://alvas-pragati-new-updated.vercel.app/feedback')
      .then(res => res.json())
      .then((data: Feedback[]) => setFeedbackList(data))
      .catch(err => console.error(err));
  }, []);

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback Report", 14, 10);
    (doc as any).autoTable({
      head: [['Name', 'Phone', 'Message']],
      body: feedbackList.map(f => [f.name, f.phone, f.message])
    });
    doc.save('feedback.pdf');
  };

  // Download Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(feedbackList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Feedback");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'feedback.xlsx');
  };

  return (
    <div className="p-6 mt-36">
      <h1 className="text-2xl font-bold mb-4">Admin Feedback Panel</h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Download Excel
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((f, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{f.name}</td>
              <td className="px-4 py-2 border">{f.phone}</td>
              <td className="px-4 py-2 border">{f.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

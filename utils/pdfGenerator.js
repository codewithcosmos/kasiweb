const fs = require('fs');
const PDFDocument = require('pdfkit');

const generateQuotePDF = async (quote) => {
  const doc = new PDFDocument();
  const pdfPath = `./public/quotes/quote_${quote._id}.pdf`;

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Quote for ${quote.name}`, { align: 'center' });
  doc.text(`Service: ${quote.service}`, { align: 'center' });
  doc.text(`Message: ${quote.message}`, { align: 'center' });
  doc.end();

  return pdfPath;
};

module.exports = { generateQuotePDF };

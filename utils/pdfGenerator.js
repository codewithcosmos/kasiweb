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

const generateInvoicePDF = async (invoice) => {
  const doc = new PDFDocument();
  const pdfPath = `./public/invoices/invoice_${invoice._id}.pdf`;

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Invoice for User: ${invoice.userId}`, { align: 'center' });
  invoice.products.forEach(product => {
    doc.text(`Product: ${product.productId.name}, Quantity: ${product.quantity}, Price: ${product.price}`, { align: 'center' });
  });
  doc.text(`Total Amount: ${invoice.totalAmount}`, { align: 'center' });
  doc.end();

  return pdfPath;
};

module.exports = { generateQuotePDF, generateInvoicePDF };

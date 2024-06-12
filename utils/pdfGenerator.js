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

const generateInvoicePDF = async (cart) => {
  const doc = new PDFDocument();
  const pdfPath = `./public/invoices/invoice_${cart._id}.pdf`;

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Invoice`, { align: 'center' });
  cart.items.forEach(item => {
    doc.text(`Product: ${item.productId.name}`, { align: 'left' });
    doc.text(`Quantity: ${item.quantity}`, { align: 'left' });
    doc.text(`Price: ${item.productId.price}`, { align: 'left' });
    doc.text('------------------------------------', { align: 'left' });
  });
  doc.text(`Total Quantity: ${cart.totalQuantity}`, { align: 'left' });
  doc.text(`Total Price: ${cart.totalPrice}`, { align: 'left' });
  doc.end();

  return pdfPath;
};

module.exports = { generateQuotePDF, generateInvoicePDF };

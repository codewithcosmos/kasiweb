const PDFDocument = require('pdfkit');
const fs = require('fs');

const createInvoicePDF = (invoice, path) => {
  let doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(path));

  doc
    .fontSize(20)
    .text('Invoice', { align: 'center' });

  doc
    .fontSize(14)
    .text(`Invoice ID: ${invoice._id}`, { align: 'left' })
    .moveDown()
    .text(`Date: ${invoice.createdAt}`, { align: 'left' })
    .moveDown()
    .text(`Total Price: ${invoice.totalPrice}`, { align: 'left' })
    .moveDown();

  invoice.items.forEach(item => {
    doc
      .fontSize(12)
      .text(`${item.productId.name} - Quantity: ${item.quantity} - Price: ${item.productId.price}`, { align: 'left' });
  });

  doc.end();
};

module.exports = {
  createInvoicePDF
};

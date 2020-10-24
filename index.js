const pdfKit = require('pdfkit');
const pdfTable = require('voilab-pdf-table');
const fitColumn = require('voilab-pdf-table/plugins/fitcolumn');

const genHeader = (doc) => {
    doc.image( './logo-top.png', 50, 40, { width: 80 })
        .fontSize(10)
        .text('Report 1', 450, 55, { align: 'right' })
        .moveDown();

};

const genBody = (doc, data) => {
    const { info } = data;
    const table = new pdfTable(doc, {
        bottomMargin: 20,
        pos: {
            x: 60,
            y: 80
        }
    });

    table.addPlugin(new fitColumn({
        column: 'title'
    }))
        .addPlugin(new fitColumn({
            column: 'done'
        }))
        .addColumns([{
            id: 'title',
            header: 'Title',
            align: 'left'
        }, {
            id: 'done',
            header: 'Done?',
            align: 'left',
            renderer: function(tb, data) {
                return data.done === true ? 'Yes' : 'No';
            }
        }])
        .onPageAdded(function(tb) {
            tb.addHeader();
        }
    );

    table.addBody(info);

    doc.end();

    return doc;
};

const genPdf = (data) => {
    const doc = new pdfKit();

    doc.info = {
        title: 'Gerando PDF com Node.js',
        author: 'Mariana Munari',
        subject: 'PDF study case'
    };

    genHeader(doc);
    genBody(doc, data);

    return doc;
};

module.exports = genPdf;
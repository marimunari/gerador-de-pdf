const genPdf = require('./index');

const data = {
    info: [{
        title: 'Todo 1',
        done: true
    }, {
        title: 'Todo 2',
        done: true
    }, {
        
        title: 'Todo 3',
        done: false
    }]
};

module.exports = (app) => {
    app.get('/pdf', (req, res) => {
        const doc = genPdf(data);
        return doc.pipe(res);
    });
}
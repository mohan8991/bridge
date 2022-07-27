const pdfProcess = require('./pdfProcess');

jest.useFakeTimers();
  test('Validating row count from pdf', () => {
    pdfProcess.processPdf("data/foo.pdf");
    setTimeout(() => {
        expect(pdfProcess.data.length).toBe('104')
    },0)
  });
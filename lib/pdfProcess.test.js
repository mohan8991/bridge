const libPdf = require('./pdfProcess');

test('Validating row count from pdf', async () => {
  let result = await libPdf.processPdf(__dirname + "/test-resource/foo.pdf");
  expect(result.length).toBe(105)
});
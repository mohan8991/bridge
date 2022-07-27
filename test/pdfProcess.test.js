const libPdf = require('../lib/pdfProcess');

  test('Validating row count from pdf', async () => {
    let result = await libPdf.processPdf("test/test-resource/foo.pdf");
    expect(result.length).toBe(105)
  });
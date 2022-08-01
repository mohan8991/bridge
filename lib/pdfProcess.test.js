const {processPdf, sanitize} = require('./pdfProcess');

test('Validating row count from pdf', async () => {
  let result = await processPdf(__dirname + "/test-resource/foo.pdf");
  expect(result.length).toBe(105)
});

test('validate string sanitize', () => {
  expect(sanitize("test\n   ")).toBe("test")
})
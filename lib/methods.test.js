const { handleError } = require("./methods");

test('test error log', () => {
    console.error = jest.fn();
    handleError('error');
    expect(console.error).toHaveBeenCalledWith('error');
})


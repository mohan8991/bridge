const { error } = require("./methods");

test('test error log', () => {
    console.error = jest.fn();
    error('error');
    expect(console.error).toHaveBeenCalledWith('error');
})


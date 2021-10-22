export const test = 'test';
export default test;

// export const test_fn = (foo: string) => {
export const test_fn = (foo: number) => {
  const one = function(bar: number) {
    console.log('test_fn | one');
  }
  one(foo);

  return 'test function, strongly typed';
}

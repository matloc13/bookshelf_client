import ef from './../helper';


it('find total pages', () => {
  expect.assertions(1);
  // const itemTotal = 200;
  // const pageLength = 25;
  expect(ef.findPages(200, 25)).toBe(8)
})

it('finds current range ', () => {
  expect.assertions(267);
  expect(ef.findRange(100, 25, 3)).toBe(`51 of 75`)
  expect(ef.findRange(300, 35, 4)).toBe(`106 of 140`)
})
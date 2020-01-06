import { Column, ColumnOptions } from 'typeorm';
import { RegExpStringTransformer } from './regexp';

export function RegExpColumn(opts: ColumnOptions = {}) {
    opts.type = String;
    opts.transformer = RegExpStringTransformer;
    return Column(opts);
}

/**
  test("entity with RegExpColumn stores regular expression", async function() {
  const thing = new Thing();
  thing.foo = /foo/i;
  const savedThing = await thingRepo.save(thing); // <<< Error here
  expect(savedThing.foo).toEqual(/foo/i);
  const storedThing = await thingRepo.findOne(savedThing.id);
  expect(storedThing.foo).toEqual(/foo/i);
});
*/

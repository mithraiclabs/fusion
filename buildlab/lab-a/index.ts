// check types and run the script
// npx tsc-watch buildlab/lab-a/index.ts --outDir ./buildlab/lab-a/gitignore-generated --onSuccess "node ./buildlab/lab-a/gitignore-generated/index.js"

// check types independently
// npx tsc-watch --project buildlab/tsconfig.json --noEmit

import { test, test_fn } from './typescript_test_fn';

export async function go() {
  try {
    let response = { status: 100 };

    const one = {
      one: 1
    };
    const two = {
      ...one,
      two: 2
    };

    test_fn(123);

    const x = async function(foo: number) {
      try {
        return { status: 200, message: `strongly typed ${foo} (number)` };
      } catch (e) {
        console.log(e);
        return e;
      }
    }

    const y = async function(foo: number) {
    // const y = async function(foo: string) {
      try {
        let response = await x(foo);
        return response;
      } catch (e) {
        console.log(e);
        return e;
      }
    };

    console.log(test, two, await y(234));

    return response;

  } catch (e) {
    console.log(e);

    return e;
  }
}

go();

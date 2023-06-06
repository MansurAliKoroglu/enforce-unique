# enforce-unique

`enforce-unique` is a package that helps you ensure that values are unique before you assign them.

## Installation

```sh
npm install enforce-unique --save
```

## Usage

```ts
import { EnforceUniqueError, UniqueEnforcer } from 'enforce-unique';

const arrayContainsUniqueItems: number[] = [];

const uniqueEnforcer = new UniqueEnforcer();

const pushUnique = (item: number) => {
  try {
    arrayContainsUniqueItems.push(
      uniqueEnforcer.enforce(item)
    )
  } catch (error) {
    if (error instanceof EnforceUniqueError) {
      return 'Item already exists';
    }
  }
};

pushUnique(1);

// logs 'Item already exists'
console.log(pushUnique(1));
```

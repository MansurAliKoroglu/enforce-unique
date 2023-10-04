# enforce-unique

`enforce-unique` is a package that helps you ensure values are unique before you assign them.

## Installation

```sh
npm install enforce-unique --save
```

## Usage

Simplest usage is just providing a value. If the same value is provided before, `enforce` method will throw an `EnforceUniqueError`.

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

Or you can provide a function that returns a value. `enforce` method will run this function until limits are exceeded
and will return the generated value. If limits are exceeded it will throw an `EnforceLimitError`.

```ts
const uniqueEnforcerEmail = new UniqueEnforcer();

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = uniqueEnforcerEmail.enforce(() => {
    return faker.internet.email({firstName, lastName});
  });

  return {
    firstName,
    lastName,
    email,
  };
}

// You can be sure that each user in the list has unique email
const users = []

for (let i = 0; i < 100; i++) {
  users.push(createRandomUser())
}
```

Default limits

```ts
{
  maxTime: 50,
  maxRetries: 50,
}
```

You can provide options object to change the defaults

```ts
const email = uniqueEnforcerEmail.enforce(
  () => {
    return faker.internet.email({firstName, lastName})
  },
  {
    maxTime: 1000,
    maxRetries: 1000,
  },
);
```

You can reset the unique enforcer instance to start over, clearing any previously stored values.

```ts
  const uniqueEnforcer = new UniqueEnforcer();

  const value1 = uniqueEnforcer.enforce('value');

  uniqueEnforcer.reset();

  // There will be no error thrown because of reset.
  const value2 = uniqueEnforcer.enforce('value');
```

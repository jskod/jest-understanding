# React Component
Let's say you have already setup `react app` and have some components as well. You can use `react-test-renderer` to virtually render the component and perform tests on that virtaul rendered component to see if it works as expected or not.

We do that by making an expectataion using `expect()` and passing `tree` i.e. JSON representation of your component, and then calling matcher `toMatchSnapshot()` on it.

When you run test the very first time, it will pass and write a snapshot inside `__snapshots__` folder in current directory. But future tests will always compare your current snapshot to already existing snapshot and will match if they are same. If they `match`, the test will `pass`, otherwise it will `fail`.

> __TL;DR__: Always commit your snapshots along with code and treat `snapshots` as you treat your `code`. 

## What has been modified to make it work?

So far, we were not having any react component inside this project, so I added some `dependencies` and `devDependencies` to make `react` and __react-testing__ work.

__Dependencies__:
- react
- react-dom

__DevDependencies__:
- \@babel/core
- \@babel/preset-env
- \@babel/preset-react
- babel/jest
- react-test-renderer

__react-test-renderer__ is used to render componenets in NodeJS environment (virtual rendering) to test it outside the browser environment.

__babel-jest__ enables `jest` to work with `babel`.

__\@babel/core__, __preset-env__ and __preset-react__ are self describing.

## How to write and perform a test on a Component?

You can see a file named `Link.react.js` in this directory. It's a react component.

```jsx
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}
```

`Link.react.js` renders a link and handles `mouseenter` and `mouseleave` events.

### What test can be written on above Component?

Let's say, we want to test whether component's `class` or `className` changes or not. For that, first we need to `render` the component, in our case, we will use `react-test-renderer` for that and get `tree` of that component i.e. JSON representation of that component. After that write assertions. Have a look at the code below:

```jsx
// Link.react.test.js
import React from 'react';
import Link from './Link.react';
import renderer from 'react-test-renderer';

describe('React Snapshot', () => {
  test('Link changes the class when hovered', () => {
    const component = renderer.create(
      <Link page="http://www.facebook.com">Facebook</Link>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
    // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

Now, run command `yarn test` or `npm test` (in case if you're using `npm`). 

> You can also run test if you have installed `jest` globally by running command `$ yarn global add jest` or `$ npm install -g jest`. To run test for a single file, write command `$ jest Link.react`. `Link.react` will become a `regexp` and will try to match any number of test files having name `Link.react`.

First run will output something like:
```
  React Snapshot
    ✓ Link changes the class when hovered (20ms)

 › 3 snapshots written.
Snapshot Summary
 › 3 snapshots written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   3 written, 3 total
Time:        3.299s
Ran all test suites matching /Link.react/i.
```
And all future test runs will output something like this:
```
React Snapshot
    ✓ Link changes the class when hovered (19ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   3 passed, 3 total
Time:        2.081s
Ran all test suites matching /Link.react/i.
```

> __Tip__: You can delete the `__snapshots__` folder if you want to test from scratch or if you don't want to compare snapshots with previous version.

If you update the code and make any mistake or let's say you remove the code insdie `_onMouseLeave`. And run the test, your test will fail and will give you an output like:
```
React Snapshot
    ✕ Link changes the class when hovered (40ms)

  ● React Snapshot › Link changes the class when hovered

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "React Snapshot Link changes the class when hovered 3".

    - Snapshot
    + Received

    @@ -1,7 +1,7 @@
      <a
    -   className="normal"
    +   className="hovered"
        href="http://www.facebook.com"
        onMouseEnter={[Function]}
        onMouseLeave={[Function]}
      >
        Facebook

      21 |     // re-rendering
      22 |     tree = component.toJSON();
    > 23 |     expect(tree).toMatchSnapshot();
         |                  ^
      24 |   });
      25 | });

      at Object.toMatchSnapshot (6-react-snapshots/Link.react.test.js:23:18)

 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or re-run jest with `-u` to update them.

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   1 failed, 2 passed, 3 total
Time:        5.158s
Ran all test suites matching /Link.react/i.
```

The above output will give you a hint so that you could look into the code where that test failed and fix it. If you made the change intentionally and want to have that in future, like say, you updated the code to make it better, so you'll need to update the snapshot to the `latest version`, if so, run command `yarn|npm test --updateSnapshot` or for short, `yarn|npm test -u`. 
> You can also run `jest -u`, if you have `jest` installed globally.

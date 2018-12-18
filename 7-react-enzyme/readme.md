# Enzyme
`Enzyme` is used to assert or manipulate rendered components for testing purposes. It can be installed in any react project by using either `yarn` or `npm`.

To install it run:
> $ yarn add --dev enzyme

or

> $ npm install --save-dev enzyme

If you're using `react` version below `15.5.0`, you will also need to install  `react-addon-test-utils`.

Once you've installed enzyme, you're good to use it in your tests.

## Using Enzyme
To test a component, let's say we have a following component "Simple checkbox which swaps between two labels".

```jsx
// CheckboxWithLabel.js

import React from 'react';

export default class CheckboxWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    // bind manually because React class components don't auto-bind
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
```

We'll use Enzyme's `shallow renderer` to virtually render this component and make assumptions to test it.

> Before using Enzyme API, you'll need to configure Enzyme adapter. That being said, install `enzyme-adapter-react-16` or `enzyme-adapter-react-15` according to the version of `react` you're using. And configure Enyzme with code `Enzyme.configure({adapter: new Adapter()});`

```jsx
// CheckboxWithLabel.test.js
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxWithLabel from './CheckboxWithLabel';

Enzyme.configure({adapter: new Adapter()});

describe('React Enzyme', () => {
  test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  
    expect(checkbox.text()).toEqual('Off');
  
    checkbox.find('input').simulate('change');
  
    expect(checkbox.text()).toEqual('On');
  });
});
```

Above test code is straight forward. First, we are importing `react and enzyme` and `CheckboxWithLabel` components. Next, we are defining a test block and inside this block we are `shallow rendering` that component and passing `labelOn='On' and labelOff='Off'` props.

Then, we are expecting that checkbox's text to be `Off` initially and then `simulating 'change'` event on the input element and further expecting checkbox's text to be equal `On`.

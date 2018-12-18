import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Foo from './Foo';

Enzyme.configure({adapter: new Adapter()});

describe('<Foo />', () => {
  test('componentDidMount was called on rendering', () => {
    Foo.prototype.componentDidMount = jest.fn();
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).toHaveBeenCalled();
  });

  test('renders title passed to it', () => {
    const wrapper = mount(<Foo title='This is test title' />);
    expect(wrapper.contains('This is test title')).toBe(true);
  });
});

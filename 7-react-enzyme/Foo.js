import React from 'react';

export default class Foo extends React.Component {
  render() {
    return (
      <div className={this.props.className} onClick={this.props.buttonClick}>
        {this.props.title}
      </div>
    );
  }
}
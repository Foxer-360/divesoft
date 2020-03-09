import * as React from 'react';

class ValidationAlert extends React.Component<{}> {

  render() {
    return (
      <div className="alert">{this.props.children}</div>
    );
  }
}

export default ValidationAlert;
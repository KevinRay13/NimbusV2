import React from 'react';

class webHook extends React.Component {
  constructor() {
    super();
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    };
  }
  render() {
    return <div></div>;
  }
}

export default webHook;

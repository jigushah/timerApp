import React from 'react';
import { Card, CardItem, Body } from 'native-base';

class CardComponent extends React.Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
            {this.props.children}
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default CardComponent
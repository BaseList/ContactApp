/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image } from 'react-native';
import Colors from './../../Constants/Colors';

export default class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000)
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.replace('MemberHome');
    }
  }

  test() {
    return this.test();
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          source={require('@Asset/images/btn-messages.png')}
          style={styles.imageStyles}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainColor,
  },
  imageStyles: {
    width: 200,
    height: 200,
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

import React from 'react'
import { StatusBar, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, View, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, FooterTab, Badge } from 'native-base'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as memberActions from './../../Store/Reducers/MemberAction';

import Style from '@Theme/Style'
import Styles from '@Screen/Home/style/Style'
import Colors from '../../Constants/Colors';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
            data:{}
        };
  }

  componentDidMount(){
    this._retrieveList();
  }

  _retrieveList() {
    this.props.actions.retrieveContacts();
  }

  _onPressRow = (_item) => {
    this.props.navigation.navigate(
        'MemberDetail',
        {
            data: {
                detail: _item   
            }
        }
    )
  }

  render() {
      return <Container style={Style.bgMain}>
          <Header style={Style.navigation}>
            <StatusBar backgroundColor={Colors.mainColor} animated barStyle="light-content" />

            <View style={Style.actionBarLeft}>
            </View>
            <View style={Style.actionBarMiddle}>
                <Text style={Style.actionBarText}>{'Contact List'.toUpperCase()}</Text>
            </View>
            <View style={Style.actionBarRight}>
              <Button transparent style={Style.actionBtnRight} onPress={() => {
                    this.props.navigation.replace('MemberAdd')
                }}>
                    <Icon active name='plus' style={Style.actionIcon} type="FontAwesome" />
                </Button>
            </View>
          </Header>

          <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
              <View style={Styles.section}>
                  <FlatList
                      data={this.props.contacts}
                      style={Styles.item}
                      renderItem={({ item, separators }) => (
                          <TouchableHighlight underlayColor='transparent' onPress={() => { this._onPressRow(item) }}>
                              <View style={Styles.record}>
                                  <Image source={{ uri: item.photo }} style={Styles.itemImg} />
                                  <View style={Styles.itemInfo}>
                                      <Text style={Styles.itemTitle}>{item.firstName} {item.lastName}</Text>
                                      <Text style={Styles.itemDesc}>Age: {item.age}</Text>
                                  </View>
                              </View>
                          </TouchableHighlight>
                      )}
                  />
              </View>
          </Content>
      </Container>
  }
}

function mapStateToProps(state, ownProps) {
	return {
        contacts: state.members.contacts.data,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(memberActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
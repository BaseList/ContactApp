import React from 'react'
import { BackHandler, StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation'
import Spinner from 'react-native-loading-spinner-overlay';

import Style from '@Theme/Style'
import Styles from '@Screen/Home/style/StyleDetail'
import Colors from './../../Constants/Colors'


//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ContactDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            spinner: false,
        }
    }

    componentWillMount(){
        const { navigation } = this.props;
        const _data = navigation.getParam('data');
        
        this.setState({
            data: _data.detail
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    isEmpty(myObj){
        for(var key in myObj){
            if(myObj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }

    _onPressEditHandler = () => {
        this.props.navigation.navigate(
            'MemberEdit',
            {
                data: {
                    detail: this.state.data   
                }
            }
        )
    }

    render() {
        return (
            !this.isEmpty(this.state.data)) ? 
        <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor={Colors.mainColor} animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => this.props.navigation.goBack()}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Contact Us'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                    <Button transparent style={Style.actionBtnRight} onPress={() => {
                        this._onPressEditHandler()
                    }}>
                        <Icon active name='edit' style={Style.actionIcon} type="FontAwesome" />
                    </Button>
                </View>
            </Header>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <View style={Styles.profile}>
                    <View  style={Styles.coverImg}>
                    </View>

                    <View style={[Styles.owner, Style.actionBarIn]}>
                        <View style={Styles.ownerBg}>
                            <Image source={{ uri: this.state.data.photo }} style={Styles.ownerAvatarImg} />
                        </View>
                    </View>

                    <View style={[Styles.back, Style.actionBarIn]}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.replace('MemberProfile')
                        }}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </View>
                <View>
                    <List style={Styles.infoTab}>
                        <ListItem style={Styles.infoItem}>
                            <Icon name="map-marker-radius" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                            <View>
                                <Text style={Styles.infoHeader}>{'Full Name'.toUpperCase()}</Text>
                                <Text style={Styles.infoDesc}>{this.state.data.firstName} {this.state.data.lastName}</Text>
                            </View>
                        </ListItem>
                        <ListItem style={Styles.infoItem}>
                            <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                            <View>
                                <Text style={Styles.infoHeader}>{'Age'.toUpperCase()}</Text>
                                <Text style={Styles.infoDesc}>{this.state.data.age}</Text>
                            </View>
                        </ListItem>
                    </List>
                </View>
            </Content>
        </Container>
        :
        <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor={Colors.mainColor} animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => this.props.navigation.goBack()}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Contact Us'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>
            <Spinner
                visible={this.state.spinner}
                textContent={'Mohon tunggu ...'}
                textStyle={Style.spinnerTextStyle}/>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
            </Content>
        </Container>
    }
}
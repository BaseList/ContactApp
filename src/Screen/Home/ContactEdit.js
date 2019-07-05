import React from 'react'
import { BackHandler, StatusBar, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Picker, Platform, SafeAreaView, View, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, FooterTab, Label, Badge } from 'native-base'

import axios from 'axios';
import {API_URL} from './../../Constants/Configs';
import { NavigationActions } from 'react-navigation';

import Spinner from 'react-native-loading-spinner-overlay';

import Style from '@Theme/Style'
import Styles from '@Screen/Home/style/StyleAdd'
import Colors from '../../Constants/Colors';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ContactEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            photo: '',
            memberId: '',
            textType: '1',
            spinner: false,
            data: {}
        };

        this.onfirstNameEditHandle = (firstName) => {
            this.setState({ firstName });
        }

        this.onlastNameEditHandle = (lastName) => {
            this.setState({ lastName });
        }

        this.onageEditHandle = (age) => {
            this.setState({ age });
        }

        this.onphotoEditHandle = (photo) => {
            this.setState({ photo });
        }
    }

    handleBackButton = () => {
        this.props.navigation.replace('MemberHome');
        return true;
    }

    componentWillMount(){
        const { navigation } = this.props;
        const _data = navigation.getParam('data');
        
        this.setState({
            firstName: _data.detail.firstName,
            lastName: _data.detail.lastName,
            age: _data.detail.age,
            photo: _data.detail.photo,
            memberId: _data.detail.id
        });
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    onSubmitHandler(){
        if(this.state.firstName === '' || this.state.lastName === '' || this.state.age === '' || this.state.photo === ''){
            alert('Please fill up all data')
            return;
        }else{
            this.setState({
                spinner: true
            });
            axios.put(`${API_URL}/contact/${this.state.memberId}`,
                {
                    lastName: this.state.lastName,
                    firstName: this.state.firstName,
                    age: this.state.age,
                    photo: this.state.photo
                }
            ).then(res => {
                this.setState({
                    spinner: false
                });
                if(res === 500){
                    setTimeout(() => {
                        alert("Internal Error");
                    }, 100);
                }else if(res === 400){
                    setTimeout(() => {
                        alert('Bad Request');
                    }, 100);
                }else{
                    setTimeout(() => {
                        return this.props.navigation.reset([NavigationActions.navigate({ routeName: 'MemberHome' })], 0)
                    }, 100);
                }
            }).catch(err => {
                this.setState({
                    spinner: false
                });
                setTimeout(() => {
                    alert("Please ensure you have internet connections.");
                }, 100);
            });
        }
    }

    onDeleteHandler(){
        this.setState({
            spinner: true
        });
        axios.delete(`${API_URL}/contact/${this.state.memberId.trim().toString()}`).then(res => {
            this.setState({
                spinner: false
            });
            if(res === 500){
                setTimeout(() => {
                    alert("Internal Error");
                }, 100);
            }else if(res === 400){
                setTimeout(() => {
                    alert('Bad Request');
                }, 100);
            }else{
                setTimeout(() => {
                    return this.props.navigation.reset([NavigationActions.navigate({ routeName: 'MemberHome' })], 0)
                }, 100);
            }
        }).catch(err => {
            this.setState({
                spinner: false
            });
            setTimeout(() => {
                alert(err);
            }, 100);
        });
    }

    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor={Colors.mainColor} animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Edit Contact'.toUpperCase()}</Text>
                </View>
                <View style={[Styles.back, Style.actionBarIn]}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.onDeleteHandler()
                    }}>
                        <Icon active name='recycle' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
            </Header>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading ...'}
                    textStyle={Style.spinnerTextStyle}/>
                <View style={Styles.section}>
                    <View style={Styles.row}>
                        <Label style={Styles.label}>Photo</Label>
                        <TextInput 
                            style={Styles.textInput} 
                            placeholder={'url: https:// your photo url'} 
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType={'next'}
                            onChangeText={this.onphotoEditHandle}
                            value={this.state.photo}/>
                    </View>
                    <View style={Styles.row}>
                        <Label style={Styles.label}>First Name</Label>
                        <TextInput 
                            style={Styles.textInput} 
                            placeholder={'exp: John'} 
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType={'next'}
                            onChangeText={this.onfirstNameEditHandle}
                            value={this.state.firstName}/>
                    </View>
                    <View style={Styles.row}>
                        <Label style={Styles.label}>Last Name</Label>
                        <TextInput 
                            style={Styles.textInput} 
                            placeholder={'exp: Doe'} 
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType={'next'}
                            onChangeText={this.onlastNameEditHandle}
                            value={this.state.lastName}/>
                    </View>
                    <View style={Styles.row}>
                        <Label style={Styles.label}>Age</Label>
                        <TextInput 
                            style={Styles.textInput} 
                            placeholder={'Cth: 18'} 
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType={'next'}
                            keyboardType={'numeric'}
                            onChangeText={this.onageEditHandle}
                            value={this.state.age.toString()}/>
                    </View>
                    
                    <View style={Styles.itemFooter}>
                        <Button iconRight transparent style={Styles.itemBtnActive} onPress={() => {
                            this.onSubmitHandler()
                        }}>
                            <Text style={Styles.itemText}>Update</Text>
                            <Icon name="arrow-forward" type="MaterialIcons" style={Styles.itemIcon} />
                        </Button>
                    </View>

                </View>
            </Content>
        </Container>
    }
}
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,

    AsyncStorage,
    Platform
} from 'react-native';
import Loader from './Loader.js';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { StackActions } from "react-navigation";


 const popAction = StackActions.pop({n: 1});
type Props = {};
var randomString = require('random-string');
import DeviceInfo from 'react-native-device-info';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MyOtp extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        results:[],

    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }

    static navigationOptions = ({ navigation }) => {
        return {
    header: () => null,
            title: 'LOGIN WITH OTP',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#7BAAED',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }






    componentDidMount(){
    //  alert(JSON.stringify(this.props))
        //   this._handlePressLogin()
    }


    login = () => {
        if (this.state.phone == ''){
            alert('Please Enter Mobile number')
        }
      else  if (this.state.phone.length < 10){
            alert('Please Enter valid Mobile number')
        }

           else {
            var x = randomString({
                length: 4,
                numeric: true,
                letters: false,
                special: false,
            });
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'otp_for_login'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: this.state.phone,
                    otp: x,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  

                    this.hideLoading()
                    if (responseJson.status == true) {

                        GLOBAL.otps =  x;
                        GLOBAL.mymobile= this.state.phone;
                        GLOBAL.isScreen = '0';
                        this.props.navigation.replace('NewOtp')
                    } else {
                        alert('Mobile number not registered . Please signup.')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
    otp =  () => {
        this.props.navigation.replace('MyOtp')
    }

    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                <Loader>
                </Loader>
                </View>
            )
        }
        return (

          <SafeAreaView style={styles.AndroidSafeArea}>
                         <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                                             <KeyboardAwareScrollView style = {{backgroundColor:'white',height:window.height}} keyboardShouldPersistTaps='always'>


                                             <TouchableOpacity onPress={() =>  this.props.navigation.dispatch(popAction)
                                             }>
                                             <Image style = {{width :50 ,height: 50,marginTop:10,marginLeft:20,resizeMode: 'contain'}}
                                                    source={require('./arrows.png')}/>
                                                    </TouchableOpacity>

                               <Text style = {{fontFamily:GLOBAL.bold,fontSize:24,color:"#1E1F20",marginTop:73,marginLeft:20}}>
                               Login
                               </Text>
                                   <Text style = {{marginLeft: '5%',width:'90%',color:'#1E1F20',fontSize: 14,marginTop: '4%',fontFamily:GLOBAL.regular,textAlign:'justify'}}>
                        Please enter your mobile number below to receive your otp to login instructions.

                                   </Text>

                                   <View style = {{marginLeft:'5%',width:'90%',marginTop:'6%'}}>



                                   <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:'#1E1F20',marginTop:20}}>
                                   Mobile No.
                                   </Text>

                                    <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F9C057',borderWidth:1,borderRadius:8}}>
                                    <TextInput
                                                      style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                                      maxLength = {10}
                                                      keyboardType="numeric"

                                                      onChangeText={(text) => this.setState({phone:text})}
                                                  />

                                    </View>




                                   </View>





                        <Button
                        containerStyle={{padding:14, height:50,marginTop:40, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginLeft:'5%',width:'90%'}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
                      style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
                            onPress={() => this.login()}>
                            SUBMIT
                        </Button>

                    </KeyboardAwareScrollView>

                </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: '#FAFAFA',
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
})

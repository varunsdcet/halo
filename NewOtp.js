import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image,Modal ,Alert,Platform,FlatList,Dimensions ,TouchableHighlight,TouchableOpacity,ActivityIndicator,  SafeAreaView,
  StatusBar} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';


type Props = {};
import DeviceInfo from "react-native-device-info";
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
const GLOBAL = require('./Global');
import Loader from './Loader.js';
var codes = '';
export default class NewOtp extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        modalVisible: false,
        visible:false,
        visibles:false,
        otpVisible:false,
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    hideLoading() {
        this.setState({loading: false})
    }



    showLoading() {
        this.setState({loading: true})
    }



    componentDidMount(){
        alert(GLOBAL.otps)
    }

    valide = () =>{

//       alert(GLOBAL.mymobile)

        if (codes == ''){
            alert('Please Enter OTP')
        }    else if(GLOBAL.otps==codes){

            const url = GLOBAL.BASE_URL +  'user_detail_after_otp'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    mobile: GLOBAL.mymobile,
                    deviceID: DeviceInfo.getUniqueId(),
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.firebaseToken,
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory:'',
                    has_notch: '',
                    manufacture: '',
                    ip_address: '',
                    voip_token:GLOBAL.voip,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status == true) {
                        this.setState({ results: responseJson.user_detail })

                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                            this.props.navigation.replace('TabNavigator')


                    }
                    this.hideLoading()
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

        }
        else {
            alert('Entered OTP is Invalid.')
        }
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    _onFulfill =(code) => {
        codes = code
        console.log('Pressed!');
if (code == GLOBAL.otps){
  this.setState({otpVisible:true})
}else{
  this.setState({otpVisible:false})
}



        // this.props.navigation.navigate('Otp')

    }



buttonClickListenerss = () =>{
//  alert(GLOBAL.mymobile)
//  alert(GLOBAL.otps)
  const url = GLOBAL.BASE_URL + 'otp_for_login'
  this.showLoading()
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          mobile: GLOBAL.mymobile,
          otp: GLOBAL.otps,


      }),
  }).then((response) => response.json())
      .then((responseJson) => {
          // alert(JSON.stringify(responseJson))

          this.hideLoading()
          if (responseJson.status == true) {

            alert('Otp Resent Successfully')
          } else {
              alert('Mobile number not registered . Please signup.')
          }
      })
      .catch((error) => {
          console.error(error);
      });
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


                                             <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                             }>
                                             <Image style = {{width :50 ,height: 50,marginTop:10,marginLeft:20,resizeMode: 'contain'}}
                                                    source={require('./arrows.png')}/>
                                                    </TouchableOpacity>

                                                    <Text style = {{fontFamily:GLOBAL.bold,fontSize:24,color:"#1E1F20",marginTop:73,marginLeft:20}}>
                                                    Verification
                                                    </Text>
                                                        <Text style = {{marginLeft: '5%',width:'90%',color:'#1E1F20',fontSize: 14,marginTop: '4%',fontFamily:GLOBAL.regular,textAlign:'justify'}}>
                                          Please check you message for a four-digit security code and enter it below.

                                                        </Text>


<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                        <CodeInput
                            ref="codeInputRef1"
                            keyboardType="numeric"

                            className={'border-box'}
                            space={38}
                            codeLength ={4}
                            size={50}

                            activeColor = '#F9C057'
                            inactiveColor =  '#F9C057'
                            onFulfill={(code) => this._onFulfill(code)}
                        />
{this.state.otpVisible == true && (
  <Image style = {{width :30 ,height: 30,marginTop:27,marginRight:20,resizeMode: 'contain'}}
         source={require('./otp.png')}/>
)}

</View>
                        <TouchableOpacity  onPress={() =>  this.buttonClickListenerss()}>

                                <Text style={{color:'#1DA1F2',fontSize:14,fontFamily:GLOBAL.semi,alignSelf:'center',marginTop:20}} >

                               <Text style={{color:'#1E1F20',fontSize:14,fontFamily:GLOBAL.semi}} >
                               Didn'nt get a code?
                               </Text>
                               &nbsp; Send again
                               </Text>
                               </TouchableOpacity>





                               <Button
                               containerStyle={{padding:14, height:50,marginTop:40, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginLeft:'5%',width:'90%'}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
                      style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
                                   onPress={() => this.valide()}>
                                   VERIFY
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

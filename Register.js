import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Platform,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Loader from './Loader.js';
const window = Dimensions.get('window');
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';

type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        password: '',
        email : '',
        mobile : '',
        status : '',
        iPAddress : '',
        loading:'',
        results: [],
        company:'',
          shown :false,

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



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

    }

    toggle = () =>{
      this.setState({shown:!this.state.shown})
    }


    valide = () => {

        if (this.state.username == ''){
            alert('Please Enter Name')
        }
        else if (this.state.mobile == ''){
            alert('Please Enter Mobile')
        }   else if (this.state.email == ''){
            alert('Please Enter Email')
        }

        else if (this.state.company == '') {
            alert('Please Enter Referral Code')
        }

        else {


                const url = GLOBAL.BASE_URL +  'verify_referral'

              //  this.showLoading()
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email : this.state.email,
                        mobile: this.state.mobile,
                        referral_code:this.state.company,
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      //this.hideLoading()
                    //    alert(JSON.stringify(responseJson))
                        if (responseJson.status == true) {
//                            alert(JSON.stringify(responseJson))
                            alert("Referral code applied successfully! Rs. 500 will be credited to your wallet after successfull signup.")
                            GLOBAL.is_refer_verify = "1"
                            GLOBAL.apply_to = responseJson.apply_to
                            GLOBAL.referral_code = this.state.company


                        }else {
                            alert(responseJson.message)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

        }

    }

    login = () => {
       // this.props.navigation.navigate('Otp')


        GLOBAL.myname = this.state.username
        GLOBAL.mymobile= this.state.mobile
        GLOBAL.myemail= this.state.email
        GLOBAL.mypassword= this.state.password
        GLOBAL.mydeviceID= ''
        GLOBAL.mydeviceType= Platform.OS
        GLOBAL.mydeviceToken= ''
        GLOBAL.mymodel_name= ''
        GLOBAL.mycarrier_name= ''
        GLOBAL.mydevice_country= ''
        GLOBAL.mydevice_memory= ''
        GLOBAL.referral_code_other = this.state.company
//EmailValidator.validate("test@email.com");
        if (this.state.username == ''){
            alert('Please Enter Username')
        }
        else if (this.state.mobile == ''){
            alert('Please Enter Mobile')
        }   else if (this.state.mobile.length != 10){
              alert('Please Enter Valid Mobile')
          }

          else if (this.state.email == ''){
            alert('Please Enter Email')
        }
        else if (EmailValidator.validate(this.state.email) == false){
          alert('Please Enter Valid Email')
        }


        else if (this.state.password == '') {
            alert('Please Enter Password')
        }
        else if (this.state.password.length <6) {
            alert('Password must be 6 Chracter Long')
        }

         else {
            var x = randomString({
                length: 4,
                numeric: true,
                letters: false,
                special: false,
            });
            if (this.state.username == ''){
                alert('Please Enter Mobile Number')
            }    else {
                const url = GLOBAL.BASE_URL +  'otp'

                this.showLoading()
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email : this.state.email,
                        mobile: this.state.mobile,
                        otp:x
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        this.hideLoading()
                        if (responseJson.status == true) {
                           // alert(JSON.stringify(responseJson))
                            GLOBAL.otps =  x;
                            GLOBAL.fmobile= this.state.mobile;
                            GLOBAL.isScreen = '0';
                          //  alert(responseJson.msg)
                            this.props.navigation.replace('Otp')
                        }else {
                            alert(responseJson.msg)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    render() {


        let { mobile } = this.state;
        let { email } = this.state;
        let { username } = this.state;
        let { password } = this.state;
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

                                             <KeyboardAwareScrollView style = {{backgroundColor:'#FAFAFA',width:window.width}} keyboardShouldPersistTaps='always'>


                                             <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                             }>
                                             <Image style = {{width :50 ,height: 50,marginTop:10,marginLeft:20,resizeMode: 'contain'}}
                                                    source={require('./arrows.png')}/>
                                                    </TouchableOpacity>

                                                    <Text style = {{fontFamily:GLOBAL.bold,fontSize:24,color:"#1E1F20",marginLeft:20,marginTop:37}}>
                                                  Welcome to Halo Health
                                                    </Text>

                                                    <Text style={styles.createaccount} >

                                                        <Text style={styles.account} >
                                                            Already have an account?
                                                        </Text>
                                                        <Text style={styles.createaccounts}
                                                        onPress={()=> this.props.navigation.navigate('MyOtp')} >
                                                            &nbsp;Login Now
                                                        </Text>

                                                    </Text>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'1%'}}>

                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:'#1E1F20',marginTop:17}}>
                        Name
                        </Text>

                         <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8}}>
                         <TextInput
                                           style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                           placeholder=""
                                           onChangeText={(text) => this.setState({username:text})}
                                       />

                         </View>


                         <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:'#1E1F20',marginTop:17}}>
                         Email
                         </Text>

                          <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8}}>
                          <TextInput
                                            style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                            placeholder=""
                                            onChangeText={(text) => this.setState({email:text})}
                                        />

                          </View>




                          <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:'#1E1F20',marginTop:17}}>
                          Mobile
                          </Text>

                           <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8}}>
                           <TextInput
                                             style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                             placeholder=""
                                             maxLength = {10}
                                             keyboardType="numeric"
                                             onChangeText={(text) => this.setState({mobile:text})}
                                         />

                           </View>


                           <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:'#1E1F20',marginTop:30}}>
                           Password
                           </Text>

                            <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8,flexDirection:'row'}}>
                            <TextInput
                                              style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi,width:'80%'}}
                                              placeholder="Password"
                                              secureTextEntry = {!this.state.shown}
                                              onChangeText={(text) => this.setState({password:text})}
                                          />

                                          {this.state.shown == false && (
                                            <TouchableOpacity onPress={() => this.setState({shown:!this.state.shown})
                                            }>
                                            <Image style = {{width :30 ,height: 30,marginTop:10,resizeMode: 'contain'}}
                                                   source={require('./show.png')}/>
                                                   </TouchableOpacity>
                                          )}

                                          {this.state.shown == true && (
                                            <TouchableOpacity onPress={() => this.setState({shown:!this.state.shown})
                                            }>
                                            <Image style = {{width :30 ,height: 30,marginTop:10,resizeMode: 'contain'}}
                                                   source={require('./hide.png')}/>
                                                   </TouchableOpacity>
                                          )}


                            </View>









                        </View>

                        <Button
                        containerStyle={{padding:14, height:50,marginTop:40, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginLeft:'5%',width:'90%'}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
                      style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
                            onPress={() => this.login()}>
                            SIGN UP
                        </Button>





                        <Text style={styles.createaccount} >

                            <Text style={styles.account} >
                               By clicking Sign Up,you agree to our
                            </Text>
                            <Text style={styles.createaccounts} >
                                &nbsp;Terms and Conditions
                            </Text>
                            <Text style={styles.account} >
                                &nbsp; and that you have  read your
                            </Text>
                            <Text style={styles.createaccounts} >
                                &nbsp;Privacy Policy
                            </Text>
                        </Text>







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
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 0,

        fontSize: 14,

        color : '#262628',
        fontFamily:GLOBAL.regular,



    } ,
    createaccount :{
        marginLeft : 20,
        fontSize: 14,
        textAlign : 'left',
        marginTop : 8,

        color : '#1E1F20',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 14,
        textAlign : 'center',
        marginTop : 30,
        color : '#1DA1F2',




    } ,
})

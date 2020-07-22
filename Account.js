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
    ImageBackground,
    StatusBar,
    AsyncStorage
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
const GLOBAL = require('./Global');
import Loader from './Loader.js';
const window = Dimensions.get('window');
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Account extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        password: '',
        email : '',
        mobile : '',
        status : '',
        image:'',
        iPAddress : '',
         banner:[],
         package:["1","2","3","4","5","6","7","8","9"],
        loading:'',
        results: [],

        image:'',
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

    renderRowItem3=({item,index}) => {



    var k ;



            // var test_included = item.test_included
             var s = "";
            // if (test_included.length == 1){
            //     s = test_included[0]
            // }else {
            //     s = test_included.join(",")
            // }
            return(

<TouchableOpacity onPress={()=> this.props.navigation.navigate('Product')}>
              <View style={{flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width/3 - 20, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


                  <Image style = {{width:window.width/3 - 20,height:100,resizeMode:'contain'}}
                         source={require('./category.png')}/>


                         <View style = {{marginTop:-100,width:window.width/3 - 20,height:100}}>
                         <Image style = {{width:20,height:20,margin:10,marginLeft:20,resizeMode:'contain'}}
                                source={require('./eye.png')}/>

                                <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 12,margin:12,marginLeft:18}}>

                                Health food
 Supplement

                                </Text>

                         </View>

              </View>
              </TouchableOpacity>


            );
        }
        renderRowItem4=({item,index}) => {



        var k ;



                // var test_included = item.test_included
                 var s = "";
                // if (test_included.length == 1){
                //     s = test_included[0]
                // }else {
                //     s = test_included.join(",")
                // }
                return(


                  <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:147, shadowColor: '#D3D3D3',
                      shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
      <View style = {{backgroundColor:'grey',width:147,height:117}}>
      <Image style = {{width:100,height:100,resizeMode:'cover',margin:10,alignSelf:'center'}}
             source={{uri:item.path}}/>
      </View>

      <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 11.8,margin:12,width:130}}>

      Protinex Orginal Powder


      </Text>

      <View style = {{flexDirection:'row',height:50,marginTop:7,justifyContent:'space-between'}}>
      <View>
      <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 10}}>


      MRP&nbsp;
      <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
      ₹595&nbsp;

      </Text>
      <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
      3% off
      </Text>
      </Text>

      <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:15}}>
      ₹575/-
      </Text>
      </View>
      <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:10,marginTop:-5}}
             source={require('./cart.png')}/>
      </View>
                </View>


                );
            }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


_handleStateChange = (state) =>{
  this.showLoading()
  const url = GLOBAL.BASE_URL +  'get_profile'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id":GLOBAL.user_id,




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({image:responseJson.user_details.image})
                        this.setState({results:responseJson.user_details})
                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
}
    componentDidMount(){
       this.props.navigation.addListener('willFocus', this._handleStateChange);



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
        }  else {
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
upload = (type)=>{
  this.RBSheet.close()
  this.props.navigation.navigate('Upload',type)
}
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    _renderItem = ({item, index}) => {
              return (
                    <Image style={{ width: window.width - 40,borderRadius:12, height: 200 ,resizeMode:'stretch'}} source={{ uri: item }} />
              );
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
                                   <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>
                                          <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width,height:110,backgroundColor:'#51AAAE'}}>
                                          <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                          }>
                                          <Image style = {{width :30 ,height: 30,marginTop:8,marginLeft:20,resizeMode: 'contain'}}
                                                 source={require('./arrowsa.png')}/>
                                                 </TouchableOpacity>


                                          </View>


                                          <Image style = {{width:100,height:100,resizeMode:'contain',marginTop:-55,marginLeft:20,borderRadius:50}}
                                                 source={{uri:this.state.image}}/>

                                                 <View style = {{flexDirection:'row',margin:10,marginLeft:20}}>
                                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"#1E1F20",marginTop:10}}>
                                                 {this.state.results.name}
                                                 </Text>
                                                 <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditProfile')}>
                                                 <Image style = {{width :20 ,height: 20,marginTop:13,marginLeft:20,resizeMode: 'contain'}}
                                                        source={require('./edits.png')}/>
                                                        </TouchableOpacity>
                                                 </View>
                                                  <View style = {{flexDirection:'row',margin:10,marginLeft:20}}>
                                                  <Text style = {{fontFamily:GLOBAL.regular,fontSize:12,color:"#46362B",marginTop:-14}}>
                                                  {this.state.results.mobile}
                                                  <Text style = {{fontFamily:GLOBAL.regular,fontSize:12,color:"#46362B",marginTop:-14}}>
                                                        &nbsp; {this.state.results.email}
                                                  </Text>
                                                  </Text>
                                                  </View>

                                             <TouchableOpacity onPress={()=> this.props.navigation.navigate('MyOrder')}>
  <View style = {{flexDirection:'row',margin:10,marginLeft:20,justifyContent:'space-between',width:'100%'}}>
<View style = {{flexDirection:'row'}}>
<Image style = {{width :30 ,height: 30,marginTop:13,resizeMode: 'contain'}}
       source={require('./order.png')}/>

       <View style = {{marginLeft:10}}>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:15,color:"#1D1D26",marginTop:10}}>
       Orders
       </Text>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:11,color:"#747A8D",marginTop:3}}>
       Check your order status
       </Text>

       </View>

</View>
<Image style = {{width :24 ,height: 24,marginTop:20,resizeMode: 'contain',marginRight:35}}
       source={require('./my-account-arr.png')}/>

  </View>
  </TouchableOpacity>

  <View style = {{flexDirection:'row',margin:10,marginLeft:20,justifyContent:'space-between',width:'100%'}}>
<View style = {{flexDirection:'row'}}>
<Image style = {{width :30 ,height: 30,marginTop:13,resizeMode: 'contain'}}
       source={require('./help.png')}/>

       <View style = {{marginLeft:10}}>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:15,color:"#1D1D26",marginTop:10}}>
       Help Center
       </Text>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:11,color:"#747A8D",marginTop:3}}>
       Help regarding your recent purchases
       </Text>

       </View>

</View>
<Image style = {{width :24 ,height: 24,marginTop:20,resizeMode: 'contain',marginRight:35}}
       source={require('./my-account-arr.png')}/>

  </View>


  <View style = {{flexDirection:'row',margin:10,marginLeft:20,justifyContent:'space-between',width:'100%'}}>
<View style = {{flexDirection:'row'}}>
<Image style = {{width :24 ,height: 24,marginTop:13,resizeMode: 'contain'}}
       source={require('./bookmark.png')}/>

       <View style = {{marginLeft:10}}>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:15,color:"#1D1D26",marginTop:10}}>
       Bookmarked
       </Text>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:11,color:"#747A8D",marginTop:3}}>
       Your must loved styles
       </Text>

       </View>

</View>
<Image style = {{width :24 ,height: 24,marginTop:20,resizeMode: 'contain',marginRight:35}}
       source={require('./my-account-arr.png')}/>

  </View>

  <View style = {{flexDirection:'row',margin:10,marginLeft:20,justifyContent:'space-between',width:'100%'}}>
<View style = {{flexDirection:'row'}}>
<Image style = {{width :30 ,height: 30,marginTop:13,resizeMode: 'contain'}}
       source={require('./privacy.png')}/>

       <View style = {{marginLeft:10}}>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:15,color:"#1D1D26",marginTop:10}}>
       Privacy Policy
       </Text>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:11,color:"#747A8D",marginTop:3}}>
       Manage your privacy policy
       </Text>

       </View>

</View>
<Image style = {{width :24 ,height: 24,marginTop:20,resizeMode: 'contain',marginRight:35}}
       source={require('./my-account-arr.png')}/>

  </View>

  <View style = {{flexDirection:'row',margin:10,marginLeft:20,justifyContent:'space-between',width:'100%'}}>
<View style = {{flexDirection:'row'}}>
<Image style = {{width :24 ,height: 24,marginTop:20,resizeMode: 'contain'}}
       source={require('./terms.png')}/>

       <View style = {{marginLeft:10}}>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:15,color:"#1D1D26",marginTop:10}}>
      Terms & Conditions
       </Text>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:11,color:"#747A8D",marginTop:3}}>
       Manage your terms and conditions
       </Text>

       </View>

</View>
<Image style = {{width :24 ,height: 24,marginTop:20,resizeMode: 'contain',marginRight:35}}
       source={require('./my-account-arr.png')}/>

  </View>



<View style = {{alignSelf:'center'}}>
<Text style = {{fontFamily:GLOBAL.regular,fontSize:15,color:"#46362B",marginTop:30,textAlign:'center'}}>
Logout
</Text>

<Text style = {{fontFamily:GLOBAL.regular,fontSize:11,color:"#46362B",marginTop:3}}>
App version 43.7
</Text>

</View>
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
       backgroundColor: '#51AAAE',
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

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
const GLOBAL = require('./Global');
import Loader from './Loader.js';
const window = Dimensions.get('window');
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class OrderDetails extends Component {
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
         banner:[],
          packages:["Relevancy","Discount","Price - Low to High","Price - High to Low"],
         package:["Relevancy","Discount","Price - Low to High","Price - High to Low"],
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

<TouchableOpacity onPress={()=> this.props.navigation.navigate('Medicine')}>
              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 20, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
  <View style = {{flexDirection:'row'}}>
  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#1E1F20",marginTop:10}}>
Order id - <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#747A8D",marginTop:10}}>
PO17061585
</Text>
  </Text>

  </View>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#19AB2B",marginTop:10,marginRight:20}}>
Order Delivered
  </Text>
  </View>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
Crocin 650mg Tablet
  </Text>



  <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>

  <View>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
₹208.25
  </Text>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#747A8D",marginTop:10,marginRight:20}}>
21 Feb 2020, 09:45 AM
  </Text>
  </View>
  <Button
  containerStyle={{padding:8, height:40,marginTop:4,borderWidth:1,borderColor:'#51AAAE', overflow:'hidden', borderRadius:12, backgroundColor: 'white',width:120}}
disabledContainerStyle={{backgroundColor: 'grey'}}
style={{fontSize: 16, color: '#1E1F20',fontFamily:GLOBAL.semi,}}
      onPress={() => this.login()}>
      See Details
  </Button>

  </View>

            </View>



</TouchableOpacity>
            );
        }
        renderRowItem4=({item,index}) => {

                return(

<View>
                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:16,color:"#747A8D",margin:10}}>
                  {item}
                  </Text>
                  <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:20,marginTop:10}}
                         source={require('./cir.png')}/>
                </View>

                <View style = {{backgroundColor:'#EDEEEF',height:1,width:'100%'}}>

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



    componentDidMount(){


      const url = GLOBAL.BASE_URL +  'orders_details'


                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "order_id":this.props.navigation.state.params,
                        "user_id":GLOBAL.user_id,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))

                        if (responseJson.status == true) {
                          this.setState({results:responseJson.list_orders})

                          //  this.ss()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });


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

                                          <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width,height:50,backgroundColor:'#51AAAE'}}>
                                          <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                          }>
                                          <Image style = {{width :30 ,height: 30,marginTop:8,marginLeft:20,resizeMode: 'contain'}}
                                                 source={require('./arrowsa.png')}/>
                                                 </TouchableOpacity>
                                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>
                                                Order Details
                                                 </Text>
                                                 <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                                 }>
                                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                                 </Text>
                                                        </TouchableOpacity>
                                          </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height - 140}} keyboardShouldPersistTaps='always'>
                                          <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 20, shadowColor: '#D3D3D3',
                                              shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


                                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                  <View style = {{flexDirection:'row'}}>
                                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#1E1F20",marginTop:10}}>
                                  Order id - <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#747A8D",marginTop:10}}>
                                {this.state.results.id}
                                  </Text>
                                  </Text>

                                  </View>

                                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#19AB2B",marginTop:10,marginRight:20}}>
                                  {this.state.results.status_name}
                                  </Text>
                                  </View>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10}}>
                                    {this.state.results.name}
                                  </Text>


                                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#747A8D",marginTop:10,marginRight:20}}>
                                1 Strip of 15 tablets
                                  </Text>
                                  </View>



                                  <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>

                                  <View>

                                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
                                  ₹208.25
                                  </Text>

                                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#747A8D",marginTop:10,marginRight:20}}>
                                  21 Feb 2020, 09:45 AM
                                  </Text>
                                  </View>


                                  </View>

                                        </View>



                                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginLeft:20}}>
                                        Sub Total
                                        </Text>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
                                        ₹102.75
                                        </Text>

                                        </View>

                                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginLeft:20}}>
                                      Additional Discount
                                        </Text>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
                                        ₹102.75
                                        </Text>

                                        </View>

                                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginLeft:20}}>
                                      Delivery Charges
                                        </Text>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
                                        ₹102.75
                                        </Text>

                                        </View>

                                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginLeft:20}}>
                                      Total Payable
                                        </Text>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
                                      ₹117.98
                                        </Text>

                                        </View>

                                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#51AAAE",marginTop:10,marginLeft:20}}>
                                      Total Saving
                                        </Text>
                                        <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#51AAAE",marginTop:10,marginRight:20}}>
                                      ₹117.98
                                        </Text>

                                        </View>
<View style = {{marginTop:20,marginLeft:10}}>
<Text style = {{fontFamily:GLOBAL.semi,fontSize:16,color:"#1E1F20",marginTop:10,marginRight:20}}>
Shipping Address:
</Text>
<Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#747A8D",marginTop:10,marginRight:20}}>
{this.state.results.address}
</Text>

</View>

<Text style = {{fontFamily:GLOBAL.semi,fontSize:16,color:"#DA0202",marginTop:10,alignSelf:'center'}}>
Need help with this order ?
</Text>
<Button
containerStyle={{padding:14, height:50,marginTop:40, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginLeft:'5%',width:'90%'}}
disabledContainerStyle={{backgroundColor: 'grey'}}
style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
    onPress={() => this.login()}>
    ORDER AGAIN
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

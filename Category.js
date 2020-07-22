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
import IconWithBadge from './IconWithBadge.js';
import RBSheet from "react-native-raw-bottom-sheet";
const GLOBAL = require('./Global');
import { EventRegister } from 'react-native-event-listeners'
const HomeIconWithBadge = props => {
// You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
return <IconWithBadge    badgeCount={3} />
};
import Loader from './Loader.js';
const window = Dimensions.get('window');
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Category extends Component {
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
         package:["1","2","3","4","5","6","7","8","9"],
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

var a = item.path + item.image
console.log(a)

    var k ;



            // var test_included = item.test_included
             var s = "";
            // if (test_included.length == 1){
            //     s = test_included[0]
            // }else {
            //     s = test_included.join(",")
            // }
            return(

<TouchableOpacity onPress={()=> this.props.navigation.navigate('Product',item.id)}>
              <View style={{flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width/3 - 20, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


                  <Image style = {{width:window.width/3 - 20,height:100,resizeMode:'contain'}}
                         source={require('./category.png')}/>


                         <View style = {{marginTop:-100,width:window.width/3 - 20,height:100}}>
                         <Image style = {{width:20,height:20,margin:10,marginLeft:20,resizeMode:'contain'}}
                                source={require('./eye.png')}/>

                                <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 12,margin:12,marginLeft:18}}>

      {item.name}
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
  const url = GLOBAL.BASE_URL +  'list_of_medicine_category'

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
                      //  this.setState({banner:responseJson.banners})
                        this.setState({package:responseJson.category_list})
                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
}
    componentDidMount(){
      this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
        this.props.navigation.navigate('MyCart')
       })
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

                                          <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width,height:50,backgroundColor:'#51AAAE'}}>
                                          <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                          }>
                                          <Image style = {{width :30 ,height: 30,marginTop:8,marginLeft:20,resizeMode: 'contain'}}
                                                 source={require('./arrowsa.png')}/>
                                                 </TouchableOpacity>
                                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>
                                                 Category
                                                 </Text>

                                                 <View style = {{flexDirection:'row'}}>
                                                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Medicine')
                                                 }>
                                                 <Image style = {{width :24 ,height: 24,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                                        source={require('./search.png')}/>
                                                        </TouchableOpacity>

  <HomeIconWithBadge/>
                                                        </View>
                                          </View>


                                          <View style = {{backgroundColor:'#F5F6F7',height:window.height -70}}>

                                          <View style = {{width:window.width - 30,backgroundColor:'#FFFFFF',borderRadius:12,height:170,alignSelf:'center',marginTop:15}}>
                                          <Text style = {{fontFamily:GLOBAL.bold,marginLeft:20,fontSize:12,color:"#747A8D",marginTop:15}}>
                                          DON’T HAVE TIME?
                                          </Text>
                                          <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:20,color:"#1E1F20",marginTop:4}}>
                                          Quick Order
                                          </Text>
                                          <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:12,color:"#747A8D",marginTop:4}}>
                                          Upload doctor’s prescription and we will
add the medicines for you!
                                          </Text>

                                          <Button

                                          containerStyle={{padding:5,marginTop:10,alignSelf:'flex-end',marginRight:20,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:120,height:40,fontFamily:GLOBAL.semi,borderRadius:12}}
                                              style={{fontSize: 20, color: 'white',fontFamily:GLOBAL.semi,}}
    onPress={() => this.RBSheet.open()}
                                              styleDisabled={{color: 'red'}}>
                                            Upload
                                          </Button>
                                          </View>

                                          <Text style = {{color:'black',fontFamily:GLOBAL.semi,fontSize: 20,margin:20}}>

                                          Shop By Categories

                                          </Text>
                                          <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                                                                 data={this.state.package}
                                                                  numColumns={3}

                                                                 keyExtractor={this._keyExtractor}
                                                                 renderItem={this.renderRowItem3}

                                                       />

                                                       <RBSheet
         ref={ref => {
           this.RBSheet = ref;
         }}
         height={300}
         duration={250}
         customStyles={{
           container: {
             justifyContent: "center",
             alignItems: "center",
             backgroundColor:'transparent'
           }
         }}
       >
         <View style = {{width:window.width ,height:300,backgroundColor:'#F3F2F2',borderTopLeftRadius:22,borderTopRightRadius:22}}>
 <View style = {{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}>
 <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:16,color:"#1D1D26",marginTop:12}}>
Upload Prescription
 </Text>

 <TouchableOpacity onPress={() => this.RBSheet.close()
 }>
 <Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,resizeMode: 'contain'}}
        source={require('./cross.png')}/>
        </TouchableOpacity>
 </View>

 <View style = {{flexDirection:'row'}}>
 <TouchableOpacity onPress={() => this.upload("0")
 }>
 <View style = {{margin:30,backgroundColor:'white',height:50,paddingRight:20,borderRadius:12,flexDirection:'row'}}>

 <Image style = {{width :30 ,height: 30,marginTop:10,marginLeft:14,resizeMode: 'contain'}}
        source={require('./camera.png')}/>
        <Text style = {{fontFamily:GLOBAL.semi,marginLeft:6,fontSize:16,color:"#1D1D26",marginTop:15}}>
      Camera
        </Text>
 </View>

 </TouchableOpacity>

 <TouchableOpacity onPress={() => this.upload("1")
 }>
 <View style = {{marginLeft:10,marginTop:30,backgroundColor:'white',height:50,paddingRight:20,borderRadius:12,flexDirection:'row'}}>

 <Image style = {{width :30 ,height: 30,marginTop:10,marginLeft:14,resizeMode: 'contain'}}
        source={require('./gallery.png')}/>
        <Text style = {{fontFamily:GLOBAL.semi,marginLeft:6,fontSize:16,color:"#1D1D26",marginTop:15}}>
      Gallery
        </Text>
 </View>
 </TouchableOpacity>
</View>
 <View style = {{marginTop:10,marginLeft:30,backgroundColor:'white',height:50,width:'80%',borderRadius:12,flexDirection:'row'}}>

 <Image style = {{width :30 ,height: 30,marginTop:10,marginLeft:12,resizeMode: 'contain'}}
        source={require('./pres.png')}/>
        <Text style = {{fontFamily:GLOBAL.semi,marginLeft:6,fontSize:16,color:"#1D1D26",marginTop:15}}>
      Past Uploaded Prescription
        </Text>
 </View>

         </View>



       </RBSheet>
                                          </View>

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

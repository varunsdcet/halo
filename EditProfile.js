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
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
const options = {
  title: 'Select and Take Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
import Loader from './Loader.js';
const window = Dimensions.get('window');
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class EditProfile extends Component {
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
          flag:"0",
        dob:'',
         banner:[],
          packages:["Relevancy","Discount","Price - Low to High","Price - High to Low"],
         package:["Relevancy","Discount","Price - Low to High","Price - High to Low"],
        loading:'',
        results: [],
        gender:'',
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
              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width/2 - 20, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
  <View style = {{backgroundColor:'grey',width:window.width/2 - 20,height:117}}>
  <Image style = {{width:100,height:100,resizeMode:'cover',margin:10,alignSelf:'center'}}
         source={{uri:item.path}}/>
  </View>

  <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 12,margin:12}}>

  Protinex Orginal Powder


  </Text>

  <View style = {{flexDirection:'row',height:50,marginTop:-7,justifyContent:'space-between'}}>
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

  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
  ₹575/-
  </Text>
  </View>
  <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:10,marginTop:12}}
         source={require('./cart.png')}/>
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
                            this.setState({username:responseJson.user_details.name})
                            this.setState({mobile:responseJson.user_details.mobile})
                              this.setState({email:responseJson.user_details.email})
                                this.setState({gender:responseJson.user_details.gender})
                                  this.setState({dob:responseJson.user_details.dob})
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

save = () =>{
  this.showLoading()
              const url = GLOBAL.BASE_URL +  'update_profile'
              const data = new FormData();
              data.append('user_id', GLOBAL.user_id);
              data.append('flag',this.state.flag);
                data.append('name',this.state.username);
                  data.append('gender',this.state.gender);
                    data.append('dob',this.state.dob);



              // you can append anyone.
              data.append('image', {
                  uri: this.state.image,
                  type: 'image/jpeg', // or photo.type
                  name: 'image.png'
              });
              fetch(url, {
                  method: 'post',
                  body: data,
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  }

              }).then((response) => response.json())
                  .then((responseJson) => {
                             this.hideLoading()
                      this.props.navigation.goBack()






                  });




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

    picker = () => {
      ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
this.setState({flag:"1"})
    this.setState({
      image: source,
    });
  }
});
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
                                                 Edit Profile
                                                 </Text>
                                                 <TouchableOpacity onPress={() => this.save()
                                                 }>
                                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"#F9C057",marginTop:10,marginRight:20}}>
                                                 Save
                                                 </Text>
                                                        </TouchableOpacity>
                                          </View>


                                        <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>
<View style = {{flexDirection:'row',alignSelf:'center'}}>
                                        <Image style = {{width:100,height:100,resizeMode:'contain',marginTop:55,alignSelf:'center',borderRadius:50}}
                                               source={{uri:this.state.image}}/>
                                               <TouchableOpacity onPress={() => this.picker()
                                               }>
                                               <Image style = {{width :30 ,height: 30,marginTop:115,marginLeft:-20,resizeMode: 'contain'}}
                                                      source={require('./cam.png')}/>

                                                      </TouchableOpacity>

                                                      </View>


                                                      <View style = {{flexDirection:'row',marginTop:70,justifyContent:'space-between'}}>
                                                      <Text style = {{fontFamily:GLOBAL.semi,fontSize:17,color:"#898A8F",marginTop:10,marginLeft:32}}>
                                                      Name
                                                      </Text>
                                                      <TextInput
                                                                        style={{height: 40,marginRight:32,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                                                        placeholder=""
                                                                        value = {this.state.username}
                                                                        onChangeText={(text) => this.setState({username:text})}
                                                                    />

                                                      </View>


                                                      <View style = {{flexDirection:'row',marginTop:0,justifyContent:'space-between'}}>
                                                      <Text style = {{fontFamily:GLOBAL.semi,fontSize:17,color:"#898A8F",marginTop:10,marginLeft:32}}>
                                                      Email
                                                      </Text>
                                                      <TextInput
                                                                        style={{height: 40,marginRight:32,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                                                        placeholder=""
                                                                        value = {this.state.email}
                                                                        onChangeText={(text) => this.setState({email:text})}
                                                                    />

                                                      </View>

                                                      <View style = {{flexDirection:'row',marginTop:0,justifyContent:'space-between'}}>
                                                      <Text style = {{fontFamily:GLOBAL.semi,fontSize:17,color:"#898A8F",marginTop:10,marginLeft:32}}>
                                                      Mobile No
                                                      </Text>
                                                      <TextInput
                                                                        style={{height: 40,marginRight:32,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                                                        placeholder=""
                                                                        value = {this.state.mobile}
                                                                        onChangeText={(text) => this.setState({mobile:text})}
                                                                    />

                                                      </View>


                                                      <View style = {{flexDirection:'row',marginTop:0,justifyContent:'space-between'}}>
                                                      <Text style = {{fontFamily:GLOBAL.semi,fontSize:17,color:"#898A8F",marginTop:10,marginLeft:32}}>
                                                      Gender
                                                      </Text>
                                                      <TextInput
                                                                        style={{height: 40,marginRight:32,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                                                        placeholder="Enter"
                                                                        value = {this.state.gender}
                                                                        onChangeText={(text) => this.setState({gender:text})}
                                                                    />

                                                      </View>


                                                      <View style = {{flexDirection:'row',marginTop:0,justifyContent:'space-between'}}>
                                                      <Text style = {{fontFamily:GLOBAL.semi,fontSize:17,color:"#898A8F",marginTop:10,marginLeft:32}}>
                                                      Dob
                                                      </Text>
                                                      <DatePicker
         style={{width: 200}}
         date={this.state.dob}
         mode="date"
         showIcon = {false}
         placeholder="select date"
         format="YYYY-MM-DD"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         customStyles={{
           dateIcon: {
             position: 'absolute',
             left: 0,
             top: 4,
             marginLeft: 0
           },
           dateInput: {
             marginLeft: 36
           }
           // ... You can check the source to find the other keys.
         }}
         onDateChange={(dob) => {this.setState({dob: dob})}}
       />

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

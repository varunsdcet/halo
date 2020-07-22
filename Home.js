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
import NetInfo from "@react-native-community/netinfo";
const GLOBAL = require('./Global');
import RBSheet from "react-native-raw-bottom-sheet";
import Loader from './Loader.js';
const window = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
import { EventRegister } from 'react-native-event-listeners'
type Props = {};
var randomString = require('random-string');

const HomeIconWithBadge = props => {
// You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
return <IconWithBadge    badgeCount={3} />
};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Home extends Component {
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
        connected:true,
        location:'',
         banner:[],
         package:[],
         medicine_array:[],
          selected:[],
          selectedIndex:0,
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

    detail = (item) =>{
      GLOBAL.diagnostic = item
      this.props.navigation.navigate('DiagnosticTestDetail',item.id)
    }
    add = (item,index) =>{
      console.log(JSON.stringify(item))

      this.setState({selected:item})
      this.setState({selectedIndex:index})
      this.RBSheet.open()
    }
    diagnose = (item) =>{
      if (item.discount_price == "0.00"){
        GLOBAL.amount = item.base_price
      }else{
          GLOBAL.amount = item.discount_price
      }
GLOBAL.diagnostic = item
// {item.discount_price == "0.00" && (

      GLOBAL.packageId = item.id
      this.props.navigation.navigate('ManageAddress',"1")
    }

    renderRowItem3=({item,index}) => {





    var k = ""
              if (item.discount_price != "0.00" ){
                k =  item.discount_percent.toFixed(2).toString()
              }

            // var test_included = item.test_included
             var s = "";
            // if (test_included.length == 1){
            //     s = test_included[0]
            // }else {
            //     s = test_included.join(",")
            // }
            return(

<TouchableOpacity onPress={()=> this.detail(item)}>
              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 100, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
<View style = {{flexDirection:'row'}}>

<Image style = {{width:30,height:30,resizeMode:'contain',margin:10}}
       source={require('./hand.png')}/>
       <View>
       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 18,margin:12,width:window.width - 200}}>

      {item.package_name}

       </Text>
       <View style = {{flexDirection:'row'}}>
       <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10}}
              source={require('./tick.png')}/>
              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginTop:-10,marginLeft:10,fontSize: 12,width:window.width - 200}}>

             By {item.lab_name}

              </Text>
       </View>
       <View style = {{flexDirection:'row',marginTop:16}}>
       <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10}}
              source={require('./tick.png')}/>
              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginTop:-10,marginLeft:10,fontSize: 12,width:window.width - 200}}>

            Includes {item.includes} Tests

              </Text>
       </View>
       </View>
</View>

<View style = {{flexDirection:'row',height:50,width:300,marginTop:7,justifyContent:'space-between'}}>

<View>
{item.discount_price != "0.00" && (
  <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 10}}>


  MRP&nbsp;
  <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
  ₹{item.base_price}&nbsp;

  </Text>
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
  {k}% off
  </Text>
  </Text>
)}

{item.discount_price != "0.00" && (
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
₹{item.discount_price}/-
</Text>
)}

{item.discount_price == "0.00" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:20}}>
  ₹{item.base_price}/-
  </Text>
)}

</View>
<Button
containerStyle={{padding:5, height:40,marginTop:4, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginRight:'10%',width:110}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
     onPress={() => this.diagnose(item)}
                      style={{fontSize: 20, color: 'white',fontFamily:GLOBAL.semi,}}>
  Book Now
</Button>
</View>

              </View>

</TouchableOpacity>
            );
        }
        renderRowItem4=({item,index}) => {
var k = ""
          if (item.discount_price != "0.00" ){
            k =  item.discount_percent.toFixed(2).toString()
          }

//toFixed(2)

        var k ;



                // var test_included = item.test_included
                 var s = "";
                // if (test_included.length == 1){
                //     s = test_included[0]
                // }else {
                //     s = test_included.join(",")
                // }
                return(

<TouchableOpacity onPress={()=> this.props.navigation.navigate('ProductDetail',item.id)}>
                  <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:147, shadowColor: '#D3D3D3',
                      shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
      <View style = {{backgroundColor:'#DFDFDF',width:147}}>
      <Image style = {{width:100,height:100,resizeMode:'contain',marginTop:10,alignSelf:'center'}}
             source={{uri:item.image}}/>
      </View>

      <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 11.8,margin:12,width:130}}>

      {item.name}


      </Text>

      <View style = {{flexDirection:'row',height:50,marginTop:7,justifyContent:'space-between'}}>
      <View>
      {item.discount_price != "0.00" && (
        <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 10}}>


        MRP&nbsp;
        <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
        ₹{item.base_price}&nbsp;

        </Text>
        <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
        {k}% off
        </Text>
        </Text>
      )}

  {item.discount_price != "0.00" && (
      <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
      ₹{item.discount_price}/-
      </Text>
    )}

    {item.discount_price == "0.00" && (
        <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
        ₹{item.base_price}/-
        </Text>
      )}
      </View>

      {item.is_cart == 0 && (


        <TouchableOpacity onPress={() => this.add(item,index)
        }>
      <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:10,marginTop:-5}}
             source={require('./cart.png')}/>
</TouchableOpacity>

           )}
      </View>
                </View>
</TouchableOpacity>

                );
            }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

_handleStateChange = (state) =>{
    this.valide()
}

getlog = (position)=>{


             var s = position.coords.latitude
             var e = position.coords.longitude
             GLOBAL.lat = s.toString()
             GLOBAL.long = e.toString()

             const url =  GLOBAL.BASE_URL  + 'lat_long_address'

             fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },


                 body: JSON.stringify({
                     "latitude": GLOBAL.lat,
                     "longitude":GLOBAL.long,





                 }),
             }).then((response) => response.json())
                 .then((responseJson) => {




                     if (responseJson.status == true) {
                     //  alert(JSON.stringify(responseJson.address))


                         this.setState({location:responseJson.address})


                     }else{
                         this.setState({location:''})
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
      Geolocation.requestAuthorization();
     Geolocation.getCurrentPosition((position) =>{
       this.getlog(position)


     })
       this.props.navigation.addListener('willFocus', this._handleStateChange);
      const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  this.setState({connected:state.isConnected})
});
      this.valide()

    }

    toggle = () =>{
      this.setState({shown:!this.state.shown})
    }



valide = () =>{
  this.showLoading()
  const url = GLOBAL.BASE_URL +  'home_user'

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
                        this.setState({banner:responseJson.banners})
                        this.setState({package:responseJson.package})
                        this.setState({medicine_array:responseJson.medicine_array})
                        GLOBAL.delivery = responseJson.delivery_charge
                        //medicine_array
                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
}


valides = () => {

  var a = ""

if (this.state.selected.discount_price != "0.00"){
a =  this.state.selected.discount_price
}else{
a =  this.state.selected.base_price
}






  this.showLoading()
  const url = GLOBAL.BASE_URL +  'add_to_cart_medicine'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "product_id":this.state.selected.id,
                    "user_id":GLOBAL.user_id,
                    "options":'',
                    "order_price":a,




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
                  this.hideLoading()

                    if (responseJson.status == true) {

                      var as =     this.state.banner[this.state.selectedIndex]
                      as.is_cart = 1


                      this.state.banner[this.state.selectedIndex] = as
                      this.setState({banner:this.state.banner})
                    }else{
                      alert(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
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

        if(this.state.connected == false){
                 return(
                     <View style={{flex:1}}>

                     <Image source={require('./cat.png')}
                            style  = {{width:'60%', height:120,alignSelf:'center',marginLeft:15,marginRight:15,resizeMode:'contain',marginTop:'40%'}}
                     />
                     <Text style = {{margin:20,textAlign:'center',color:'black',fontFamily:GLOBAL.medium}}>
        {GLOBAL.internet}
                     </Text>

                     <Button
                         style={{padding:12,marginTop:34,borderWidth:1,borderColor:'#F9C057',fontSize: 20, color: '#F9C057',marginLeft:'5%',width:200,alignSelf:'center',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                         styleDisabled={{color: 'red'}}
                         onPress={() => this.valide()}>
                         Try Again
                     </Button>
                     </View>
                 )
             }

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


                                          <View style = {{backgroundColor:'#51AAAE',width:window.width,height:130,borderBottomLeftRadius:60,borderBottomRightRadius:60}}>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<View style = {{flexDirection:'row'}}>
<Image style = {{margin:20,width:18,height:18,resizeMode:'contain'}}
       source={require('./location.png')}/>
       <Text style = {{color:'white',fontFamily:GLOBAL.semi,fontSize: 15,margin:20,marginLeft:-10,width:window.width - 160}}>

          {this.state.location}


       </Text>

</View>

<View style = {{flexDirection:'row'}}>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Medicine')}>
<Image style = {{margin:20,width:18,height:18,resizeMode:'contain'}}
       source={require('./search.png')}/>
       </TouchableOpacity>

    <HomeIconWithBadge/>



</View>

</View>
                                          </View>

<View style = {{width:window.width ,marginTop:-45 ,height:80,alignSelf:'center',flexDirection:'row',justifyContent:'space-between'}}>

<TouchableOpacity onPress={()=> this.props.navigation.navigate('Category')}>
<View>
<Image style = {{margin:10,width:100,height:110,marginTop:-10}}
       source={require('./medicine.png')}/>

       <Text style = {{color:'#333348',fontFamily:GLOBAL.bold,fontSize: 14,marginTop:-40,marginLeft:22}}>

           Medicines


       </Text>

       <Text style = {{color:'#898A8F',fontFamily:GLOBAL.bold,fontSize: 11,marginLeft:22,width:80,textAlign:'center'}}>

       Order Medicine to home

       </Text>
       </View>
</TouchableOpacity>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Diagnostic')}>
       <View>
       <Image style = {{margin:10,width:100,height:110,marginTop:-10}}
              source={require('./lab.png')}/>

              <Text style = {{color:'#333348',fontFamily:GLOBAL.bold,fontSize: 14,marginTop:-40,marginLeft:27}}>

                  Diagnostic


              </Text>

              <Text style = {{color:'#898A8F',fontFamily:GLOBAL.bold,fontSize: 11,marginLeft:24,width:80,textAlign:'center'}}>

              Book test at  Doorstep

              </Text>
              </View>
</TouchableOpacity>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Article')}>
              <View>
              <Image style = {{margin:10,width:100,height:110,marginTop:-10}}
                     source={require('./art.png')}/>

                     <Text style = {{color:'#333348',fontFamily:GLOBAL.bold,fontSize: 14,marginTop:-40,marginLeft:40,}}>

                         Articles


                     </Text>

                     <Text style = {{color:'#898A8F',fontFamily:GLOBAL.bold,fontSize: 11,marginLeft:27,width:80,textAlign:'center'}}>

                     Show your article

                     </Text>
                     </View>
                     </TouchableOpacity>
</View>
<View style = {{marginLeft:20,width:window.width - 40,marginTop:60}}>
<Carousel style = {{alignSelf:'center'}}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.banner}
                        renderItem={this._renderItem}
                        sliderWidth={window.width -40 }
                        itemWidth={window.width - 40 }
                      />
                      </View>

                      <View style = {{marginLeft:20,width:window.width - 40,marginTop:10,height:219,backgroundColor:'#FFFFFF',borderRadius:8}}>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
<Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 18,margin:12}}>

Popular Packages

</Text>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('DiagnosticTest')}>
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,fontSize: 12,margin:12}}>

View All

</Text>
</TouchableOpacity>
</View>
<FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                       data={this.state.package}
                       horizontal

                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderRowItem3}

             />

                      </View>


                      <View style = {{marginLeft:20,width:window.width - 40,marginTop:10,height:269,backgroundColor:'#FFFFFF',borderRadius:8}}>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
<Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 18,margin:12}}>

Our Products

</Text>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Product',"0")}>
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,fontSize: 12,margin:12}}>

View All

</Text>
</TouchableOpacity>
</View>
<FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10}}
                       data={this.state.medicine_array}
                       horizontal

                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderRowItem4}

             />

                      </View>

<Text style ={{height:130}}>

</Text>
                    </KeyboardAwareScrollView>
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

                   <View style = {{width:window.width,height:350,backgroundColor:'transparent'}}>
                   <View style = {{width:40,backgroundColor:'white',height:40,marginTop:30,borderRadius:20,alignSelf:'center'}}>
                   <TouchableOpacity onPress={() => this.RBSheet.close()
                   }>
                   <Image style = {{width :14 ,height: 14,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
                   source={require('./cross.png')}/>
                   </TouchableOpacity>
                   </View>

                   <View style = {{width:window.width,height:300,marginTop:30 ,backgroundColor:'white',borderTopLeftRadius:22,borderTopRightRadius:22}}>
                   <View style = {{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}>
                   <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:16,color:"#747A8D",marginTop:12}}>
                   ADD TO CART
                   </Text>
                   </View>

                   <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                   <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 18,marginTop:12,marginLeft:12}}>

                   {this.state.selected.name}


                   </Text>
                   <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginRight:14,fontSize: 14,marginTop:14}}>


                   MRP&nbsp;
                   {this.state.selected.discount_price == "0.00" && (
                   <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
                   ₹{this.state.selected.base_price}/-
                   </Text>
                   )}

                   {this.state.selected.discount_price != "0.00" && (
                   <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
                   ₹{this.state.selected.discount_price}/-
                   </Text>
                   )}

                   </Text>

                   </View>



                   <View style = {{flexDirection:'row',marginTop:2,width:window.width,height:60,justifyContent:'space-between'}}>
                   <View>

                   <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
                   TOTAL AMOUNT
                   </Text>
                   {this.state.selected.discount_price == "0.00" && (
                   <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 18,marginTop:2}}>
                   ₹{this.state.selected.base_price}/-
                   </Text>
                   )}
                   {this.state.selected.discount_price != "0.00" && (
                   <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 18,marginTop:2}}>
                   ₹{this.state.selected.discount_price}/-
                   </Text>
                   )}
                   </View>

                   <Button
                   style={{padding:8,marginTop:10,fontSize: 14, color: 'white',backgroundColor:'#F9C057',width:140,height:35,fontFamily:GLOBAL.semi,borderRadius:4,marginRight:20}}
                   styleDisabled={{color: 'red'}}
                   onPress={() => this.valides()}>
                   ADD TO CART
                   </Button>
                   </View>
                   </View>

                   </View>

                   </RBSheet>
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

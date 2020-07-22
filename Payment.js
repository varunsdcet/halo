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
import NetInfo from "@react-native-community/netinfo";
const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import Loader from './Loader.js';
const window = Dimensions.get('window');
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
import {NavigationActions,StackActions} from 'react-navigation';
var randomString = require('random-string');

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Payment extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        password: '',
        email : '',
        mobile : '',
        total:'',
        status : '',
        iPAddress : '',
         banner:[],
         package:[],
         time:[],
        loading:'',
        results: [],
        promo:'',
        amount:'',
        delivery:'0.00',
        discount:'0.00',
        card:false,
        cash:false,
        company:'',
          shown :false,
            connected:true,

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
    selection = (item,index) => {

      for (var i = 0 ; i< this.state.time.length ; i ++){
        this.state.time[i].selected = 0
        this.setState({time:this.state.time})
      }
    var a = this.state.time[index]
    if (a.selected == 1){
      a.selected  = ""
    }else{

        a.selected  = 1
        this.setState({promo:this.state.time[index].heading})

var value =  this.state.time[index].value
var type  = this.state.time[index].discount_type
var discount = ""
if (type == "percentage"){
  discount = this.state.amount * value/100
}else{
  discount = value
}

var ds = parseInt(discount)
var es = parseInt(this.state.amount)
var d = es - ds
this.setState({total:d.toString()})

this.setState({discount:discount})
      //  GLOBAL.time = a.time
    }
    this.state.time[index] = a
    this.setState({time:this.state.time})
    }
    renderRowItem3=({item,index}) => {



            return(


              <TouchableOpacity onPress={() => this.selection(item,index)
                       }>
              <View style = {{width:window.width - 30,marginLeft:10,borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,borderColor:'#F9C057'}}>

<View style = {{flexDirection:'row'}}>
    {item.selected == "" && (
      <Image style = {{width:20,height:20,resizeMode:'contain',marginRight:12,marginTop:12,marginLeft:6}}
             source={require('./radios.png')}/>
           )}
{item.selected != "" && (
<Image style = {{width:20,height:20,resizeMode:'contain',marginRight:12,marginTop:12,marginLeft:6}}
     source={require('./radio.png')}/>

)}

<View>
  {item.selected == "" && (
  <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 18,margin:12,width:130,}}>

  {item.heading}


  </Text>
  )}
  {item.selected != "" && (
              <Text style = {{color:'#000000',fontFamily:GLOBAL.semi,fontSize: 18,margin:12}}>

              {item.heading} Applied


              </Text>
            )}
            <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 12,margin:12,marginTop:-5,width:130,}}>

            {item.description}


            </Text>
            </View>
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


                  <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:100, shadowColor: '#D3D3D3',
                      shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>

      <Image style = {{width:100,height:100,resizeMode:'cover',margin:10,alignSelf:'center'}}
             source={{uri:item.path}}/>


      <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 11.8,margin:12,width:130}}>

      SRL Labs


      </Text>


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


      this.setState({package:GLOBAL.diagnostic})

console.log(GLOBAL.diagnostic.base_price)
this.setState({delivery:GLOBAL.delivery})


  this.setState({amount:GLOBAL.amount})
  this.setState({total:GLOBAL.total})

  if (this.props.navigation.state.params == "2"){
    if (GLOBAL.diagnostic.discount_price != "0.00" ){

      var c = parseInt(GLOBAL.delivery) + parseInt(GLOBAL.diagnostic.discount_price) - parseInt(GLOBAL.discount)
      this.setState({amount:GLOBAL.diagnostic.discount_price})
          this.setState({total:c.toString()})
    }else{
      alert(GLOBAL.diagnostic.base_price)
        var c = parseInt(GLOBAL.delivery) + parseInt(GLOBAL.diagnostic.base_price) - parseInt(GLOBAL.discount)
      this.setState({amount:GLOBAL.diagnostic.base_price})
        this.setState({total:c})
    }
  }







      const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  this.setState({connected:state.isConnected})
});
      this.valide()

    }



    valide = () => {

      const url = GLOBAL.BASE_URL +  'coupan_list'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "module":"dignose",
                        "user_id":GLOBAL.user_id,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))

                        if (responseJson.status == true) {

var s = responseJson.lists
var times = []
                          for (var i = 0; i < s.length; i++){
                            var c = {
                           id : s[i].id,
                           heading:s[i].heading,
                           description:s[i].description,
                           discount_type :s[i].discount_type,
                           value :s[i].value,
                           selected:'',
                            }
                            times.push(c)
                          }


          this.setState({time:times})


          //amount
      }

                          //  this.ss()
                        else{
                            this.setState({time:[]})
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });




    }


    renderRowItem3s=({item,index}) => {



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
              <View style={{flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width/4, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


                  <Image style = {{width:window.width/4,height:100,resizeMode:'contain'}}
                         source={require('./category.png')}/>


                         <View style = {{marginTop:-100,width:window.width/4,height:100}}>
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
    _renderItem = ({item, index}) => {
              return (
                    <Image style={{ width: window.width - 40,borderRadius:12, height: 200 ,resizeMode:'stretch'}} source={{ uri: item }} />
              );
          }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }


    goHome = () =>{
      GLOBAL.total = ""
      GLOBAL.discount = ""
      GLOBAL.amount = ""
      this.dialogComponent.dismiss()
      this.props
     .navigation
     .dispatch(StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: 'TabNavigator',
           params: { someParams: 'parameters goes here...' },
         }),
       ],
     }))
    }
login = () =>{
var b = ""
if (this.state.card == true){
  b = "online"
}else{
  b = "cash"
}



  var c = `${GLOBAL.addid.address},${GLOBAL.addid.landmark},${GLOBAL.addid.city_state},${GLOBAL.addid.pincode}`;
  if (this.props.navigation.state.params == "1"){
    this.showLoading()
    const url = GLOBAL.BASE_URL +  'add_permanent_booking'

              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },


                  body: JSON.stringify({
                    "for":"3",
"module":"medicine",
"user_id":GLOBAL.user_id,
"name":GLOBAL.addid.name,
"mobile":GLOBAL.addid.mobile,
"address_details":c,
"coupan_code":"",
"coupan_code_id":"",
"total_amount":this.state.total,
"from_payment_gateway":"0",
"discount_amount":GLOBAL.discount,
"deliver_or_collection_charge":this.state.delivery,
"payment_mode":b




                  }),
              }).then((response) => response.json())
                  .then((responseJson) => {
                    console.log(JSON.stringify(responseJson))

                      if (responseJson.status == true) {

  this.hideLoading()
  this.dialogComponent.show()
        //amount
    }

                        //  this.ss()
                      else{

                      }
                  })
                  .catch((error) => {
                      console.error(error);
                      this.hideLoading()
                  });
  }else if (this.props.navigation.state.params == "2"){

console.log(GLOBAL.user_id,GLOBAL.addid.name,GLOBAL.addid.mobile,GLOBAL.packageId,GLOBAL.time,GLOBAL.date,GLOBAL.coupan,GLOBAL.coupanid,GLOBAL.total,GLOBAL.discount)

    this.showLoading()
    const url = GLOBAL.BASE_URL +  'add_permanent_booking'

              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },


                  body: JSON.stringify({
                    "for":"1",
"module":"dignose",
"user_id":GLOBAL.user_id,
"name":GLOBAL.addid.name,
"mobile":GLOBAL.addid.mobile,
"package_id":GLOBAL.packageId,
"booking_time":GLOBAL.time,
"booking_date":GLOBAL.date,
"gender":'',
"age":'',
"email":'',
"address_details":c,
"coupan_code":GLOBAL.coupan,
"coupan_code_id":GLOBAL.coupanid,
"total_amount":this.state.total,
"from_payment_gateway":"0",
"discount_amount":GLOBAL.discount,
"deliver_or_collection_charge":this.state.delivery,
"payment_mode":b




                  }),
              }).then((response) => response.json())
                  .then((responseJson) => {
                    console.log(JSON.stringify(responseJson))

                      if (responseJson.status == true) {

  this.hideLoading()
        //amount
        this.dialogComponent.show()
    }

                        //  this.ss()
                      else{

                      }
                  })
                  .catch((error) => {
                      console.error(error);
                      this.hideLoading()
                  });
  }else if (this.props.navigation.state.params == "4"){

console.log(GLOBAL.user_id,GLOBAL.addid.name,GLOBAL.addid.mobile,GLOBAL.packageId,GLOBAL.time,GLOBAL.date,GLOBAL.coupan,GLOBAL.coupanid,GLOBAL.total,GLOBAL.discount)

    this.showLoading()
    const url = GLOBAL.BASE_URL +  'add_permanent_booking'

              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },


                  body: JSON.stringify({
                    "for":"4",
"module":"medicine",
"user_id":GLOBAL.user_id,
"name":GLOBAL.addid.name,
"mobile":GLOBAL.addid.mobile,
"address_details":c,
"coupan_code":GLOBAL.coupan,
"coupan_code_id":GLOBAL.coupanid,
"total_amount":this.state.amount,
"from_payment_gateway":"0",
"discount_amount":"0",
"product_id":GLOBAL.prod.id,
"product_options":'',
"quantity":GLOBAL.quantity,
"order_price":this.state.total,
"deliver_or_collection_charge":this.state.delivery,
"payment_mode":b




                  }),
              }).then((response) => response.json())
                  .then((responseJson) => {
                    console.log(JSON.stringify(responseJson))

                      if (responseJson.status == true) {

  this.hideLoading()
        //amount
        this.dialogComponent.show()
    }

                        //  this.ss()
                      else{

                      }
                  })
                  .catch((error) => {
                      console.error(error);
                      this.hideLoading()
                  });

}
}

setcard= () =>{
  this.setState({card:!this.state.card})
    this.setState({cash:false})
}

setcash = () =>{
  this.setState({cash:!this.state.cash})
    this.setState({card:false})
}

    render() {



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
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10,marginLeft:-30}}>
                              Payment
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                }>
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>
                                       </TouchableOpacity>
                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height - 140}} keyboardShouldPersistTaps='always'>





                                             <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#000000",marginTop:10,marginLeft:10}}>
Payment Options
                                             </Text>

                                             <TouchableOpacity onPress={() => this.setcard()
                                                      }>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<View style = {{flexDirection:'row'}}>
{this.state.card == false && (
  <Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,marginLeft:20,resizeMode: 'contain'}}
  source={require('./radios.png')}/>
)}

{this.state.card == true && (
  <Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,marginLeft:20,resizeMode: 'contain'}}
  source={require('./radio.png')}/>
)}
<Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#000000",marginTop:14,marginLeft:10}}>
Debit / Credit Card / Netbanking
</Text>
</View>

<Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,marginLeft:20,resizeMode: 'contain'}}
source={require('./card.png')}/>

</View>
</TouchableOpacity>

                                             <TouchableOpacity onPress={() => this.setcash()
                                                      }>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<View style = {{flexDirection:'row'}}>
{this.state.cash == false && (
<Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,marginLeft:20,resizeMode: 'contain'}}
source={require('./radios.png')}/>
)}
{this.state.cash == true && (
<Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,marginLeft:20,resizeMode: 'contain'}}
source={require('./radio.png')}/>
)}

<Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#000000",marginTop:14,marginLeft:10}}>
Cash on Delivery
</Text>
</View>
<Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,marginLeft:20,resizeMode: 'contain'}}
source={require('./cash.png')}/>
</View>
</TouchableOpacity>





<View>

<Text style={{marginLeft : '5%',marginTop:10,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

PAYMENT DETAILS
</Text>

<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

MRP Total
</Text>
<Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

₹{this.state.amount}
</Text>
</View>

<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
{this.props.navigation.state.params != "2" && (
  <Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

  Delivery Charges
  </Text>
)}
{this.props.navigation.state.params == "2" && (

<Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

Sample Collection Charges
</Text>
)}
<Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

₹{this.state.delivery}
</Text>
</View>

<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

Additional Discount
</Text>
<Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

₹{GLOBAL.discount}
</Text>
</View>

<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

Total Amount
</Text>
<Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

₹{this.state.total}
</Text>
</View>

</View>





<Button
    style={{padding:12,marginTop:40,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
    styleDisabled={{color: 'red'}}
    onPress={() => this.login()}>
  PLACE TO ORDER
</Button>



                    </KeyboardAwareScrollView>
                    <DialogComponent
                                                                           dialogStyle = {{backgroundColor:'transparent'}}
                                                                           dialogTitle={<DialogTitle title="Dialog Title" />}
                                                                           dismissOnTouchOutside={false}
                                                                           dismissOnHardwareBackPress={true}
                                                                           ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
                                                                       >
                                                                           <View style = {{width :window.width - 60,borderRadius:20,height:400 ,alignSelf:'center',backgroundColor:'white',flexDirection:'column'}}>

                                                                           <Image style = {{width :200 ,height: 200,marginTop:8,resizeMode: 'contain',alignSelf:'center'}}
                                                                                  source={require('./star.png')}/>

                                                                               <Text style = {{margin:15,color:'#080040',fontFamily:GLOBAL.bold,fontSize:24,alignSelf:'center' }}>
                                                                               Your order is successfully!
                                                                               </Text>




                                                                               <View style = {{backgroundColor:'white',}}>

                                                                                            <Button
                                                                                                style={{padding:6,marginTop:34,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:22,marginTop:3,marginBottom:6}}
                                                                                                styleDisabled={{color: 'red'}}
                                                                                                onPress={() =>      this.goHome()}>
                                                                                                GO TO HOME
                                                                                            </Button>

                                                                               </View>
                                                                           </View>
                                                                       </DialogComponent>

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

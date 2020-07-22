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
import Loader from './Loader.js';
const window = Dimensions.get('window');
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Order extends Component {
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
        selectedIndex:'',
        couponid:'',
        couponName:'',
         banner:[],
         package:[],
         time:[],
        loading:'',
        results: [],
        promo:'',
        amount:'',
        discount:'0.00',
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

apply =  () =>{
  var value =  this.state.time[this.state.selectedIndex].value
  var type  = this.state.time[this.state.selectedIndex].discount_type
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
GLOBAL.coupan = this.state.time[this.state.selectedIndex].heading
GLOBAL.coupanid = this.state.time[this.state.selectedIndex].id
  this.setState({discount:discount})
  this.RBSheet.close()
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

        this.setState({selectedIndex:index})


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

login = () =>{
  GLOBAL.amount = this.state.amount
  GLOBAL.discount = this.state.discount
  GLOBAL.total =  this.state.total
  this.props.navigation.navigate('Payment',"2")
}
    hideLoading() {
        this.setState({loading: false})
    }



    componentDidMount(){

      this.setState({package:GLOBAL.diagnostic})

console.log(GLOBAL.diagnostic.base_price)

if (GLOBAL.diagnostic.discount_price != "0.00" ){
  this.setState({amount:GLOBAL.diagnostic.discount_price})
      this.setState({total:GLOBAL.diagnostic.discount_price})
}else{
  this.setState({amount:GLOBAL.diagnostic.base_price})
    this.setState({total:GLOBAL.diagnostic.base_price})
}






      const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  this.setState({connected:state.isConnected})
});
      this.valide()

    }



    valide = () => {
    console.log(GLOBAL.user_id)

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

exitclose = () =>{
  this.setState({discount:"0.00"})
  this.setState({amount:GLOBAL.amount})
  this.setState({total:GLOBAL.amount})
  GLOBAL.coupan = ""
  GLOBAL.coupanid = ""

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
                              Order
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                }>
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>
                                       </TouchableOpacity>
                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height - 70}} keyboardShouldPersistTaps='always'>







                                                           <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 15,width:window.width - 30, shadowColor: '#D3D3D3',
                                                               shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
                                             <View style = {{flexDirection:'row'}}>

                                             <Image style = {{width:30,height:30,resizeMode:'contain',margin:10}}
                                                    source={{uri:this.state.package.package_image}}/>
                                                    <View>
                                                    <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 18,margin:12,width:window.width - 40}}>

                                                  {this.state.package.package_name}

                                                    </Text>
                                                    <View style = {{flexDirection:'row'}}>
                                                    <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10}}
                                                           source={require('./tick.png')}/>
                                                           <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginTop:-10,marginLeft:10,fontSize: 12,width:window.width - 200}}>

                                                          {this.state.package.lab_name}

                                                           </Text>
                                                    </View>
                                                    <View style = {{flexDirection:'row',marginTop:16}}>
                                                    <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10}}
                                                           source={require('./tick.png')}/>
                                                           <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginTop:-10,marginLeft:10,fontSize: 12,width:window.width - 200}}>

                                                         Includes {this.state.package.includes} Tests

                                                           </Text>
                                                    </View>
                                                    </View>
                                             </View>

                                             <View style = {{flexDirection:'row',height:50,width:window.width-40,marginTop:7,justifyContent:'space-between'}}>
                                             <View>
                                             {this.state.package.discount_price != "0.00" && (
                                             <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 10}}>


                                             MRP&nbsp;
                                             <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
                                             ₹{this.state.package.base_price}&nbsp;

                                             </Text>
                                             <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
                                             3% off
                                             </Text>
                                             </Text>
                                           )}
{this.state.package.discount_price != "0.00" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:15}}>
  ₹{this.state.package.discount_price}/-
  </Text>
)}
{this.state.package.discount_price == "0.00" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:15}}>
  ₹{this.state.package.base_price}/-
  </Text>
)}

                                             </View>
                                             <Button
                                                 style={{padding:5,marginTop:2,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:120,height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                                                 styleDisabled={{color: 'red'}}>
                                               Book Now
                                             </Button>
                                             </View>

                                                           </View>




                                                           <View style = {{flexDirection:'row'}}>
                                                           <Text style={{marginLeft : '5%',marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

                                                           Sample Pickup Address
                                                           </Text>


                                                           </View>

                                                           <View>

                                                           <Text style={{fontSize:14,fontFamily:GLOBAL.regular,color:'#747A8D',width:'60%',marginLeft:'5%',marginTop:2}} multiline={true}>
                                                        {GLOBAL.currentAddress.address}</Text>
                                                        <Text style={{fontSize:14,fontFamily:GLOBAL.regular,color:'#747A8D',width:'60%',marginLeft:'5%',marginTop:2}} multiline={true}>
                                                     {GLOBAL.currentAddress.landmark}</Text>

                                                           </View>


{this.state.discount == "0.00" && (
  <TouchableOpacity onPress={() => this.RBSheet.open()
  }>
  <View style = {{}}>
  <Text style={{marginLeft : '5%',marginTop:10,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :'60%',}}>

 PROMO CODE
  </Text>

  <View style = {{flexDirection:'row',marginTop:40}}>

  <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10,marginLeft:10}}
         source={require('./radios.png')}/>

<View>
         <Text style={{marginLeft : '5%',marginTop:-16,fontSize : 14,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :'60%',}}>

        Apply Promo Code
         </Text>

         <Text style={{marginLeft : '5%',marginTop:1,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :window.width - 20,}}>

        Get flat discount on prescription medicines
         </Text>
         </View>

  </View>


  </View>

</TouchableOpacity>
)}


{this.state.discount != "0.00" && (

<View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>

<View style = {{flexDirection:'row'}}>
<Image style = {{width:16,height:16,resizeMode:'contain',marginTop:0,marginLeft:10}}
       source={require('./circles.png')}/>
       <View>
       <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
       <Text style={{marginLeft : '5%',marginTop:0,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.bold,}}>

       {this.state.time[this.state.selectedIndex].heading}
       </Text>
       <TouchableOpacity onPress={() => this.exitclose()
       }>
       <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:0,marginRight:80}}
              source={require('./cross.png')}/>

            </TouchableOpacity>
       </View>
       <Text style={{marginLeft : '5%',marginTop:0,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :window.width - 20,}}>

       Flat {this.state.time[this.state.selectedIndex].value} {this.state.time[this.state.selectedIndex].discount_type} off on medicine terms & conditions
 Apply.
       </Text>
       </View>

</View>

<View>


</View>

</View>


)}



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

<Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

Additional Discount
</Text>
<Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

₹{this.state.discount}
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
                                                    APPLY PROMO CODE
                                                    </Text>

                                                    <TouchableOpacity onPress={() => this.RBSheet.close()
                                                    }>
                                                    <Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                                    source={require('./cross.png')}/>
                                                    </TouchableOpacity>
                                                    </View>


                                                    <View style = {{flexDirection:'row'}}>
                                                    <TextInput
                                                    placeholder="Enter Promocode"
  placeholderTextColor="black"
  value = {this.state.promo}
                                                                      style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi,width:window.width -100}}

                                                                      onChangeText={(text) => this.setState({promo:text})}
                                                                  />

                                                                  <TouchableOpacity onPress={() => this.apply()
                                                                  }>
                                                                  <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:16,color:"#F9C057",marginTop:12}}>
                                                                  APPLY
                                                                  </Text>
                                                                  </TouchableOpacity>

                                                    </View>


                                                    <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10,marginBottom:10}}
                                                                           data={this.state.time}


                                                                           keyExtractor={this._keyExtractor}
                                                                           renderItem={this.renderRowItem3}

                                                                 />
                                                    </View>



                                                    </RBSheet>


  <Text style = {{height:100}}>

  </Text>
                    </KeyboardAwareScrollView>
                    <View style = {{flexDirection:'row',width:window.width - 20,margin:10,borderColor:'#F9C057',borderWidth:1,backgroundColor:'white',height:50,position:'absolute',bottom:0}}>

           <Text style={{marginLeft : '5%',marginTop:10,fontSize : 18,color :'#F9C057', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

           ₹{this.state.total}/-
           </Text>

           <Button
           style={{padding:4,fontSize: 14,marginTop:10,fontWeight:'bold', color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:100,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
           styleDisabled={{color: 'red'}}
           onPress={() => this.login()}>
           BOOK NOW
           </Button>
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

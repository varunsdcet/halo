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
import RBSheet from "react-native-raw-bottom-sheet";
import Loader from './Loader.js';
const window = Dimensions.get('window');
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Medicine extends Component {
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

<TouchableOpacity onPress={()=> this.props.navigation.navigate('ProductDetail',item.id)}>
              <View style={{backgroundColor:'white',color :'white',flexDirection:'row' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 30,marginTop:10, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


  <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 12,marginTop:12,marginLeft:12}}>
{item.name}


  </Text>

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

    SearchFilterFunction(text){
          console.log(GLOBAL.user_id+'----'+ GLOBAL.lat+'----'+GLOBAL.long+'----'+text)

          const url =  GLOBAL.BASE_URL  + 'search_by_discover'

          fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },


              body: JSON.stringify({
                  "user_id":GLOBAL.user_id,
                  "keyword":text,





              }),
          }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson)




                  if (responseJson.status == true) {
                      this.setState({banner:responseJson.lists})



                  }else{
                      this.setState({results:[]})
                  }
              })
              .catch((error) => {
                  console.error(error);
                  this.hideLoading()
              });


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

      var a = ""

if (this.state.selected.is_discount == "1"){
  a =  this.state.selected.discount_price
}else{
    a =  this.state.selected.price
}
      // {this.state.results.is_discount == "1" && (
      //   <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
      //   ₹{this.state.results.price}&nbsp;
      //
      //   </Text>
      // )}
//{this.state.results.is_cart == 0 && (

      this.showLoading()
      const url = GLOBAL.BASE_URL +  'add_to_cart_medicine'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "product_id":this.props.navigation.state.params,
                        "user_id":GLOBAL.user_id,
                        "options":'',
                        "order_price":a,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))
                      this.hideLoading()

                        if (responseJson.status == true) {
                          this.state.results.is_cart == 1
                          this.setState({results:this.state.results})

                          //  this.ss()
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
                                                 Search
                                                 </Text>
                                                 <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                                 }>
                                                 <Image style = {{width :24 ,height: 24,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                                        source={require('./search.png')}/>
                                                        </TouchableOpacity>
                                          </View>


                                          <View style = {{backgroundColor:'#F5F6F7',height:window.height -90}}>

                                          <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                                                               <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                                                                      source={require('./search.png')}/>

                                                               <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45}}
                                                                          placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                                                          onChangeText={(text) => this.SearchFilterFunction(text)}
                                                                          value={this.state.height}

                                                                           placeholder={"Search"}/>





                                                           </View>


                                          <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                                                                 data={this.state.banner}
                                                                  numColumns={1}

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

Protinex Orginal Powder


</Text>
<Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginRight:14,fontSize: 14,marginTop:14}}>


MRP&nbsp;
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
₹575/-
</Text>
</Text>

</View>
<Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 15,marginTop:5}}>
Strip of 15 tablets
</Text>

<View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width}}>
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,fontSize: 14,marginTop:12,marginLeft:12}}>

Remove


</Text>

<View style = {{flexDirection:'row',justifyContent:'space-around',marginRight:30}}>
<TouchableOpacity onPress={() => this.RBSheet.close()
}>
<Image style = {{width :30 ,height: 30,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
       source={require('./minuss.png')}/>
       </TouchableOpacity>
       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 14,marginTop:15,marginLeft:12}}>

      2


       </Text>

       <TouchableOpacity onPress={() => this.RBSheet.close()
       }>
       <Image style = {{marginLeft:12,width :30 ,height: 30,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
              source={require('./pluss.png')}/>
              </TouchableOpacity>
</View>




</View>
<View style = {{flexDirection:'row',marginTop:2,width:window.width,height:60,justifyContent:'space-between'}}>
<View>

<Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
TOTAL AMOUNT
</Text>

<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 18,marginTop:2}}>
₹575.00/-
</Text>
</View>

<Button
    style={{padding:8,marginTop:10,fontSize: 14, color: 'white',backgroundColor:'#F9C057',width:140,height:35,fontFamily:GLOBAL.semi,borderRadius:4,marginRight:20}}
    styleDisabled={{color: 'red'}}
    onPress={() => this.valide()}>
  ADD TO CART
</Button>
</View>
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

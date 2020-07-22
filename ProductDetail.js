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
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');
import HTML from 'react-native-render-html';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ProductDetail extends Component {
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
         package:[],
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


              <View style={{backgroundColor:'white',color :'white',flexDirection:'column',borderWidth:1 ,margin: 10,height:82,borderRadius :6,borderColor:'#F9C057',marginLeft : 10,width:119, shadowColor: '#D3D3D3',
                }}>




       <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 14,margin:5}}>

    {item.label}

       </Text>


       <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,fontSize: 14,margin:5,marginTop:20}}>

    ₹{item.value}/-

       </Text>


              </View>


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



    componentDidMount(){
      this.showLoading()
      const url = GLOBAL.BASE_URL +  'medicine_details'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "product_id":this.props.navigation.state.params,
                        "user_id":GLOBAL.user_id,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))
                      this.hideLoading()

                        if (responseJson.status == true) {
                            this.setState({banner:responseJson.products_detail.gallery})
                            this.setState({package:responseJson.package})
                            this.setState({image:responseJson.products_detail.image})
                            this.setState({results:responseJson.products_detail})
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



    }


logins = () => {
  var a = ""

if (this.state.results.is_discount == "1"){
a =  this.state.results.discount_price
}else{
a =  this.state.results.price
}
GLOBAL.amount = a
GLOBAL.packageId = this.props.navigation.state.params
this.props.navigation.navigate('SingleProduct')
//this.props.navigation.navigate('ManageAddress',"4")
}

    login = () => {
      var a = ""

if (this.state.results.is_discount == "1"){
  a =  this.state.results.discount_price
}else{
    a =  this.state.results.price
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

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    _renderItem = ({item, index}) => {
      var c = item.path + item.image
              return (
                    <Image style={{ width: window.width,borderRadius:12, height: 350 ,resizeMode:'stretch'}} source={{ uri: c }} />
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
                                Product Detail
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                }>
                                <Image style = {{width :24 ,height: 24,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                       source={require('./search.png')}/>
                                       </TouchableOpacity>
                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>





<View style = {{width:window.width ,marginTop:0}}>
{this.state.banner.length != 0 && (
  <Carousel style = {{alignSelf:'center'}}
                          ref={(c) => { this._carousel = c; }}
                          data={this.state.banner}
                          renderItem={this._renderItem}
                          sliderWidth={window.width }
                          itemWidth={window.width  }
                        />
)}

{this.state.banner.length == 0 && (
                      <Image style={{ width: window.width,borderRadius:12, height: 350 ,resizeMode:'stretch'}} source={{ uri: this.state.image }} />


)}

                      </View>


                      <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width, shadowColor: '#D3D3D3',
                          shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


                    <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 14,marginTop:12,marginLeft:12}}>

                    {this.state.results.name}


                    </Text>
                    <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,fontSize: 14,marginTop:4,marginLeft:12}}>

                    {this.state.results.content}


                    </Text>

                    <View style = {{flexDirection:'row',height:50,marginTop:7,justifyContent:'space-between'}}>
                    <View>
                    <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 10}}>


                    MRP&nbsp;
                    {this.state.results.is_discount == "1" && (
                      <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
                      ₹{this.state.results.price}&nbsp;

                      </Text>
                    )}
                    {this.state.results.is_discount == "1" && (
                    <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:15}}>
                    ₹{this.state.results.discount_price}/-
                    </Text>
                  )}

                  {this.state.results.is_discount != "1" && (
                  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:15}}>
                  ₹{this.state.results.price}/-
                  </Text>
                )}
                {this.state.results.is_discount == "1" && (
                    <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
                    {this.state.results.percent}% off
                    </Text>
                  )}
                    </Text>


                    </View>

                    </View>
                    <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,marginLeft:12,marginTop:-30,marginBottom:10,fontSize: 10}}>
                  (*Inclusive of all taxes)
                    </Text>

<View style = {{flexDirection:'row',justifyContent:'space-between',marginBottom:10,marginLeft:10}}>
<Button
containerStyle={{padding:12, height:45,marginTop:4, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginRight:'10%',width:150}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
onPress={() => this.logins()}
                      style={{fontSize: 14, color: 'white',fontFamily:GLOBAL.semi,}}>
  BUY NOW
</Button>
  {this.state.results.is_cart == 0 && (
                    <Button
                        style={{padding:12,marginTop:4,marginRight:20,fontSize: 14, color: '#1E1F20',borderWidth:1,borderColor:'#51AAAE',marginLeft:'5%',width:150,height:45,fontFamily:GLOBAL.bold,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                      ADD TO CART
                    </Button>
                  )}


                    </View>

                    <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 14,margin:12}}>

                  Pack Size

                    </Text>
{this.state.results.length != 0 && this.state.results.addons.length !=0 && (
  <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                         data={this.state.results.addons[0].json_values}
                         horizontal

                         keyExtractor={this._keyExtractor}
                         renderItem={this.renderRowItem3}

               />
)}


                    </View>

                      <View style = {{marginLeft:20,width:window.width - 40,marginTop:10,height:219,backgroundColor:'#FFFFFF',borderRadius:8}}>
<View >
<Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 17,margin:12}}>

About this Item

</Text>
   <HTML html={this.state.results.description} imagesMaxWidth={Dimensions.get('window').width } />
</View>

                      </View>




                      <Text style = {{height:100}}>

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

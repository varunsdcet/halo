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

export default class DiagnosticTestDetail extends Component {
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
        amount:'',
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

    renderRowItem3=({item,index}) => {



            return(


              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 30, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
<View style = {{flexDirection:'row'}}>

<Image style = {{width:30,height:30,resizeMode:'contain',margin:10}}
       source={require('./hand.png')}/>
       <View>
       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 18,margin:12,width:window.width - 40}}>

      {item.package_name}

       </Text>
       <View style = {{flexDirection:'row'}}>
       <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10}}
              source={require('./tick.png')}/>
              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginTop:-10,marginLeft:10,fontSize: 12,width:window.width - 200}}>

             By Niramaya PathLabs

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

<View style = {{flexDirection:'row',height:50,width:window.width-40,marginTop:7,justifyContent:'space-between'}}>
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
<Button
    style={{padding:5,marginTop:2,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:120,height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
    styleDisabled={{color: 'red'}}>
  Book Now
</Button>
</View>

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
      const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  this.setState({connected:state.isConnected})
});
      this.valide()

    }



    valide = () => {
      this.showLoading()

      const url = GLOBAL.BASE_URL +  'package_details'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "id":this.props.navigation.state.params,
                        "user_id":GLOBAL.user_id,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                  //    console.log(JSON.stringify(responseJson))
this.hideLoading()
                        if (responseJson.status == true) {
      if (responseJson.details.length != 0){
          this.setState({package:responseJson.details[0]})

          if (responseJson.details[0].discount_price == "0.00"){
            this.setState({amount:responseJson.details[0].base_price})
          }else{
              this.setState({amount:responseJson.details[0].discount_price})
          }
          //amount
      }

                          //  this.ss()
                        }else{
                            this.setState({package:[]})
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });




    }
login = () =>{
  GLOBAL.packageId = this.props.navigation.state.params
  this.props.navigation.navigate('ManageAddress',"1")
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
    render() {
var  renderedButtons = <Text style={{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize:14,marginTop:5,marginLeft:12,height:40}}>
</Text>
var  renderedButtonss = <Text style={{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize:14,marginTop:5,marginLeft:12,height:40}}>
</Text>
if (this.state.package.length == 0 ){

}else{
  var test_included = this.state.package.get_includes.heading
  var test_includeds =  ""
console.log(test_includeds)
   renderedButtons =  this.state.package.get_includes.heading.map((b, index) => {
var c = this.state.package.get_includes.details_[index]

//test_includeds = c
// var cc;
console.log(c)

if( typeof c !== 'undefined' ) {
  if( c.indexOf(',') != -1 ){

      test_includeds = c.split(',');
  }
  else{
    test_includeds = [c]
  }

    // foo could get resolved and it's defined
}




         return <View>
         <Text style={{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize:14,marginTop:5,marginLeft:12,height:40}}>
{b}



</Text>


<View >
      {test_includeds.map((prop,index) => {
        console.log(prop)
        return (
          <Text style={{color:'#747A8D',fontFamily:GLOBAL.regular,fontSize:14,marginTop:5,marginLeft:12,height:40}}>
{index + 1} {prop}



 </Text>
        );
     })}
    </View>

</View>
         ;
       })
}



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
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>
                                Diagnostic Test Detail
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                }>
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>
                                       </TouchableOpacity>
                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>







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





                                                           <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 15,width:window.width - 30, shadowColor: '#D3D3D3',
                                                               shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>

                                                               <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 14,margin:12,width:window.width - 40}}>

                                                                  {this.state.package.package_name}

                                                               </Text>

                                                               <View style = {{height:1,width:window.width - 20 ,backgroundColor:'#EFEFF4',marginTop:4}}>
                                                               </View>
                                                               <View style = {{width:window.width -20}}>
               <HTML html={this.state.package.description} imagesMaxWidth={Dimensions.get('window').width } />
               </View>
                                                               </View>


                                                               <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 15,width:window.width - 30, shadowColor: '#D3D3D3',
                                                                   shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>

                                                                   <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 14,margin:12,width:window.width - 40}}>

                                                                Includes {this.state.package.includes} Tests

                                                                   </Text>

                                                                   <View style = {{height:1,width:window.width - 20 ,backgroundColor:'#EFEFF4',marginTop:4}}>
                                                                   </View>

{renderedButtons}

                                                                   </View>

                                                                   <View style = {{flexDirection:'row',width:window.width - 20,margin:10,borderColor:'#F9C057',borderWidth:1,backgroundColor:'white',height:50}}>

                                                       <Text style={{marginLeft : '5%',marginTop:10,fontSize : 18,color :'#F9C057', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

                                                       ₹{this.state.amount}/-
                                                       </Text>

                                                       <Button
                                                       style={{padding:4,fontSize: 14,marginTop:10,fontWeight:'bold', color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:100,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                                                       styleDisabled={{color: 'red'}}
                                                       onPress={() => this.login()}>
                                                       BOOK NOW
                                                       </Button>
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

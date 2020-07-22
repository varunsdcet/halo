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
import IconWithBadge from './IconWithBadge.js';
import { EventRegister } from 'react-native-event-listeners';
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

export default class DiagnosticTest extends Component {
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



mypackage = (ids,item) =>{
  GLOBAL.diagnostic = item
  this.props.navigation.navigate('DiagnosticTestDetail',ids)
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

<TouchableOpacity onPress={()=> this.mypackage(item.id,item)}>
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

<View style = {{flexDirection:'row',height:50,width:window.width-40,marginTop:7,justifyContent:'space-between'}}>
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
containerStyle={{padding:5, height:40,marginTop:2, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginRight:'10%',width:110}}
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

    diagnose = (item) =>{
      GLOBAL.packageId = item.id
      GLOBAL.diagnostic = item
        GLOBAL.packageId = item.id
      this.props.navigation.navigate('ManageAddress',"1")
    }

    componentDidMount(){
      this.showLoading()
      const url = GLOBAL.BASE_URL +  'dignose_package_list'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "limit_from":"0",
                        "user_id":GLOBAL.user_id,
                        "cat_id":"0"




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      this.hideLoading()
                      console.log(JSON.stringify(responseJson))

                        if (responseJson.status == true) {

                            this.setState({package:responseJson.package_list})
                          //  this.ss()
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
                                Diagnostic Test
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
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>






                      <View style = {{marginLeft:0,width:window.width ,marginTop:10,height:window.height - 70,backgroundColor:'#FFFFFF',borderRadius:8}}>

<FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                       data={this.state.package}


                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderRowItem3}

             />

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

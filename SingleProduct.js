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

export default class SingleProduct extends Component {
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
        amount:'',
        total:'',
        results: [],
        company:'',
        quantity:'1',
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


    add = (item) =>{



  var a = parseInt(this.state.quantity) + 1
  this.setState({quantity:a})
  setTimeout(() => {
          // write your functions
          this.calc()
      },5000);



    }
    minus = (item) =>{



var a = parseInt(this.state.quantity) - 1
this.setState({quantity:a})

setTimeout(() => {
        // write your functions
        this.calc()
    },5000);
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


calc = () =>{
var a = ""

//alert(JSON.stringify(GLOBAL.prod))
  if (GLOBAL.prod.discount_price == "0.00"){
  a = GLOBAL.prod.price
  }else{
    a =   GLOBAL.prod.discount_price
  }

  var k = parseInt(this.state.quantity) * parseInt(a)

  this.setState({total:k.toString()})
}

    componentDidMount(){

if (GLOBAL.prod.discount_price == "0.00"){
  this.setState({amount:GLOBAL.prod.base_price})
}else{
    this.setState({amount:GLOBAL.prod.discount_price})
}
this.calc()
    //  {item.discount_price == "0.00" && (




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


login = () =>{
  GLOBAL.quantity = this.state.quantity
  GLOBAL.amount = this.state.total
  GLOBAL.total =  this.state.total
  GLOBAL.discount = "0"
  this.props.navigation.navigate('ManageAddress',"4")
}

    render() {

var item = GLOBAL.prod
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
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height - 70}} keyboardShouldPersistTaps='always'>





                                             <View style={{backgroundColor:'white',color :'white',flexDirection:'row' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 30,marginTop:10, shadowColor: '#D3D3D3',
                                                 shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
                                         <View style = {{backgroundColor:'#f1f1f1',width:80,height:80}}>
                                         <Image style = {{width:60,height:60,resizeMode:'cover',margin:10,alignSelf:'center'}}
                                         source={{uri:item.image}}/>
                                         </View>

                                         <View>

                                         <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 12,marginTop:12,marginLeft:12}}>

                                         {item.name}


                                         </Text>
                                         <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 12,marginTop:5}}>

                                         </Text>
                                         <View style = {{flexDirection:'row',height:40,marginTop:1,justifyContent:'space-between',width:window.width - 100}}>
                                         <View >
                                         {item.discount_price != "0.00" && (


                                         <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginLeft:10,fontSize: 10}}>


                                         MRP&nbsp;
                                         <Text style = {{color:'#F08080',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>
                                         ₹{item.price}&nbsp;

                                         </Text>
                                         <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
                                         {item.percent}% off
                                         </Text>
                                         </Text>

                                         )}

                                         {item.discount_price == "0.00" && (
                                         <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
                                         ₹{item.price}/-
                                         </Text>
                                         )}
                                         {item.discount_price != "0.00" && (
                                         <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
                                         ₹{item.discount_price}/-
                                         </Text>
                                         )}


                                         </View>

                                         <View style = {{flexDirection:'row',justifyContent:'space-around',marginRight:30}}>
                                         <TouchableOpacity onPress={() => this.minus(GLOBAL.prod)
                                         }>
                                         <Image style = {{width :12 ,height: 12,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
                                          source={require('./minus.png')}/>
                                          </TouchableOpacity>
                                          <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 14,marginTop:9,marginLeft:12}}>

                                         {this.state.quantity}


                                          </Text>

                                          <TouchableOpacity onPress={() => this.add(GLOBAL.prod)
                                          }>
                                          <Image style = {{marginLeft:12,width :12 ,height: 12,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
                                                 source={require('./plus.png')}/>
                                                 </TouchableOpacity>
                                         </View>



                                         </View>
                                           </View>


                                           </View>










                      <Text style = {{height:100}}>

                      </Text>
                    </KeyboardAwareScrollView>
                    <View style = {{flexDirection:'row',width:window.width - 20,margin:10,borderColor:'#F9C057',borderWidth:1,backgroundColor:'white',height:50,position:'absolute',bottom:100}}>

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

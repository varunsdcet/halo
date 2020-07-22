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
    Share,
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
        connected:true,
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
    _fancyShareMessage=(item)=>{
  var a = `${item}`;


      Share.share({
              message:a
          },{
              tintColor:'green',
              dialogTitle:'Share this app via....'
          }
      ).then(this._showResult);
  }
likeHome = (key,user)=>{
  var url = ""
  if (user == "0"){
     url = GLOBAL.BASE_URL +  'like_articles'
  }else{
     url = GLOBAL.BASE_URL +  'dislike_articles'
  }


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "article_id":key,
                    "user_id":GLOBAL.user_id,




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))

                    if (responseJson.result == true) {


                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

}
    _onPressButton = (item, index) => {
      this.likeHome(item.article_id,item.is_user_like);

      var s = this.state.banner[index];
      if (item.is_user_like == "0") {
        s.is_user_like = "1";
        s.total_likes = parseInt(item.total_likes) + 1;
      } else {
        s.is_user_like = "0";
        s.total_likes = parseInt(item.total_likes) - 1;
      }
      this.state.banner[index] = s;

      this.setState({ banner: this.state.banner });
    };
commentd = (item) =>{
  GLOBAL.comment = item
  this.props.navigation.navigate('CommentList',item.article_id)
}
    renderRowItem3=({item,index}) => {


            return(


              <View style={{color :'white',flexDirection:'column',borderWidth:0 ,margin: 10,height:'auto',borderRadius :6,marginLeft : 10,height:600,width:window.width-20, shadowColor: '#D3D3D3',
                }}>

                <View style = {{flexDirection:'row'}}>

                <Image style = {{width:37,height:37,resizeMode:'contain',margin:10,borderRadius:5}}
                       source={{uri:item.author_image}}/>

                       <View>
                       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 14,margin:12}}>

                        {item.title}


                       </Text>

                       <Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,fontSize: 13,margin:12,marginTop:-3}}>

                      {item.author_name}


                       </Text>

                       </View>


                </View>



                <View style = {{backgroundColor:'#DADADA',height:1,width:window.width,marginTop:20}}>

                </View>

                    <HTML html={item.subheading} imagesMaxWidth={Dimensions.get('window').width} />

                <Image style = {{width:window.width,height:250,borderRadius:5}}
                       source={{uri:item.image}}/>

                       <View style = {{flexDirection:'row'}}>
                       <Image style = {{width :25 ,height: 25,marginTop:8,resizeMode: 'contain'}}
                              source={require('./likes.png')}/>
                              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 12,margin:12,marginTop:16}}>

                            {item.total_likes}


                              </Text>
                       </View>
                       <View style = {{backgroundColor:'#DADADA',height:1,width:window.width,marginTop:10}}>

                       </View>

                       <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
                       <TouchableOpacity
                                        onPress={() => this._onPressButton(item, index)}
                                      >
                       <View style = {{flexDirection:'row'}}>
                       {item.is_user_like == "0" && (
                         <Image style = {{width :25 ,height: 25,marginTop:8,resizeMode: 'contain'}}
                                source={require('./like.png')}/>
                       )}
                       {item.is_user_like != "0" && (
                         <Image style = {{width :25 ,height: 25,marginTop:8,resizeMode: 'contain'}}
                                source={require('./like-filled.png')}/>
                       )}

                              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 14,marginLeft:6,marginTop:15}}>

                          Likes


                              </Text>

                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                                        onPress={() => this.commentd(item)}
                                      >
                       <View style = {{flexDirection:'row'}}>
                       <Image style = {{width :25 ,height: 25,marginTop:12,resizeMode: 'contain'}}
                              source={require('./comment.png')}/>
                              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 14,marginLeft:6,marginTop:14}}>

                          Comment


                              </Text>

                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                                        onPress={() => this._fancyShareMessage(item.url)}
                                      >
                       <View style = {{flexDirection:'row'}}>
                       <Image style = {{width :25 ,height: 25,marginTop:12,resizeMode: 'contain'}}
                              source={require('./share.png')}/>
                              <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 14,marginLeft:6,marginTop:16}}>

                          Share


                              </Text>

                       </View>
                       </TouchableOpacity>
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




valide = ()=>{

  this.showLoading()
  const url = GLOBAL.BASE_URL +  'article_home'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "limit_from":"0",
                    "user_id":GLOBAL.user_id,




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
this.hideLoading()
                    if (responseJson.result == true) {
                        this.setState({banner:responseJson.news})

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
                    <Image style={{ width: window.width,borderRadius:12, height: 350 ,resizeMode:'stretch'}} source={{ uri: item }} />
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

                         <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width,height:50,backgroundColor:'#51AAAE'}}>
                         <TouchableOpacity onPress={() => this.props.navigation.goBack()
                         }>
                         <Image style = {{width :30 ,height: 30,marginTop:8,marginLeft:20,resizeMode: 'contain'}}
                                source={require('./arrowsa.png')}/>
                                </TouchableOpacity>
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10,marginRight:28}}>
                                Articles
                                </Text>

                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>

                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>









                    <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                                           data={this.state.banner}

                                           keyExtractor={this._keyExtractor}
                                           renderItem={this.renderRowItem3}

                                 />








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

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
import {NavigationActions,StackActions} from 'react-navigation';
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
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

export default class ManageAddress extends Component {
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
         delivery:'0',
         userDetail:[],
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

_handleStateChange = ()=>{
  this.valide()
}

    componentDidMount(){
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




valide = ()=>{

  this.showLoading()
  const url = GLOBAL.BASE_URL +  'list_user_address'

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

                      var k = responseJson.user_saved_address


var array = [];
                      for (var i = 0; i < responseJson.user_saved_address.length; i ++){
                        var c =  responseJson.user_saved_address[i]


                        c.is_selected = "";
                        array.push(c)
                      }
    console.log(JSON.stringify(array))
                        this.setState({userDetail:array})

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
delete = (item,index)=> {

  const url = GLOBAL.BASE_URL +  'delete_address'

  this.showLoading()
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id : GLOBAL.user_id,
          id: item.id,

      }),
  }).then((response) => response.json())
      .then((responseJson) => {

          this.hideLoading()
          if (responseJson.status == true) {
            var array = [...this.state.userDetail]; // make a separate copy of the array

             if (index !== -1) {
               array.splice(index, 1);
               this.setState({userDetail: array});
             }
          }else {
            this.setState({userDetail: []});

          }
      })
      .catch((error) => {
          console.error(error);
      });
}
    check = () => {


var c = `${GLOBAL.addid.address},${GLOBAL.addid.landmark},${GLOBAL.addid.city_state},${GLOBAL.addid.pincode}`;

      if (this.props.navigation.state.params == "0"){
        const url = GLOBAL.BASE_URL +  'add_medicine_query'

        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id : GLOBAL.user_id,
                name: GLOBAL.addid.name,
                mobile:GLOBAL.addid.mobile,
                images:GLOBAL.mid,
                address :c
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {
this.dialogComponent.show()
                }else {
                    alert(responseJson.msg)
                }
            })
            .catch((error) => {
                console.error(error);
            });

      }else if (this.props.navigation.state.params == "1"){
        GLOBAL.currentAddress = this.state.userDetail[0]
          this.props.navigation.navigate('SelectTime')
      }
      else if (this.props.navigation.state.params == "4"){

          this.props.navigation.navigate('Payment',"4")
      }

      else{
        this.props.navigation.navigate('Payment',"1")
      }

//currentAddress

      //  this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }

    selection = (item,index) => {


for (var i = 0 ; i<this.state.userDetail.length ; i++){
  this.state.userDetail[i].is_selected = ""
  this.setState({userDetail:this.state.userDetail})
}

var a = this.state.userDetail[index]
if (a.is_selected == ""){
  a.is_selected  = "Y"
  GLOBAL.addid = a
}else{
    a.is_selected  = ""
}
this.state.userDetail[index] = a
this.setState({userDetail:this.state.userDetail})


}
    renderItem=({item,index}) => {
      console.log(JSON.stringify(item))

  return(

    <TouchableOpacity onPress= {()=>this.selection(item,index)}>
    <View style={{backgroundColor:'white',color :'white', flex: 1 ,marginBottom: 10,width : window.width , borderWidth: 1,borderColor:'#e1e1e1'
                 }}>




  <View style = {{flexDirection:'row'}}>

  {item.is_selected == "" && (
    <Image
        source={require('./radios.png')}
        style={{width: 26, height: 26,marginLeft:20,marginTop:22,resizeMode:'contain'}}


    />
  )}
  {item.is_selected != "" && (
    <Image
        source={require('./radio.png')}
        style={{width: 26, height: 26,marginLeft:20,marginTop:22,resizeMode:'contain'}}


    />
  )}


   <View>
   <View style = {{flexDirection:'row',marginTop:20}}>
           <Text style={{fontSize:20,fontFamily:GLOBAL.semi,color:'black',width:window.width - 150,marginLeft:'5%',marginRight:20,marginTop:5,lineHeight:24}}>{item.name}</Text>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('EditAdress',item)}>
           <Image
               source={require('./edit.png')}
               style={{width: 18, height: 18,marginLeft:20,marginTop:2,resizeMode:'contain'}}


           />
           </TouchableOpacity>
</View>
           <Text style={{fontSize:14,fontFamily:GLOBAL.regular,color:'#747A8D',width:'60%',marginLeft:'5%',marginTop:2}} multiline={true}>{item.address}
{item.landmark}</Text>
<View style = {{flexDirection:'row'}}>
<Text style={{fontSize:14,fontFamily:GLOBAL.regular,color:'#747A8D',width:window.width - 120,marginLeft:'5%',marginBottom:'5%',marginTop:2}} multiline={true}>{item.mobile}</Text>
<TouchableOpacity onPress={()=>this.delete(item,index)}>
<Image
    source={require('./delete.png')}
    style={{width: 18, height: 18,marginLeft:20,marginTop:2,resizeMode:'contain'}}


/>
</TouchableOpacity>
</View>



         </View>
         </View>
         </View>
  </TouchableOpacity>


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
                                Select Address
                                </Text>

                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>

                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>





                                             {this.state.userDetail.length == 0 && (
                                               <Text style = {{alignSelf:'center',textAlign:'center',color:'black',fontFamily:GLOBAL.medium,fontSize: 14,margin:10,marginTop:180,marginBottom:12,lineHeight:32}}>
                                                 You don't have any addresees saved.Saving address helps you checkout faster.
                                               </Text>
                                             )}

                                             {this.state.userDetail.length == 0 && (
                                               <Button
                                                   style={{marginLeft:28, borderStyle: 'dotted',borderWidth: 1,paddingTop: 10 ,fontSize: 14,backgroundColor:'rgba(249,192,87,0.2)', color: '#000000',fontFamily:GLOBAL.semi,marginTop:30,height:45,width:window.width - 56,borderColor:'#F9C057'}}
                                                   styleDisabled={{color: 'red'}}
                                                   onPress={() => this.props.navigation.navigate('AddAdress')}>
                                                   Add New Address
                                               </Button>
    )}




<FlatList style={{width:'100%'}}
                                                 data={this.state.userDetail}

                                                 keyExtractor={this._keyExtractor}
                                                 renderItem={this.renderItem}
                                                 />

                                                        {this.state.userDetail.length != 0 && (
                                                 <Button
                                                     style={{marginLeft:28, borderStyle: 'dotted',borderWidth: 1,paddingTop: 10 ,fontSize: 14,backgroundColor:'rgba(249,192,87,0.2)', color: '#000000',fontFamily:GLOBAL.semi,marginTop:30,height:45,width:window.width - 56,borderColor:'#F9C057'}}
                                                     styleDisabled={{color: 'red'}}
                                                     onPress={() => this.props.navigation.navigate('AddAdress')}>
                                                     Add New Address
                                                 </Button>
                                               )}



                                                 {this.state.userDetail.length != 0 && (
                                                          <Button
                                                              style={{marginLeft:28,paddingTop: 10 ,fontSize: 16,backgroundColor:'#F9C057', color: 'white',fontFamily:GLOBAL.bold,marginTop:30,height:45,width:window.width - 56,borderRadius:30}}
                                                              styleDisabled={{color: 'red'}}
                                                              onPress={() => this.check()}>
                                                              SUBMIT
                                                          </Button>
                                                        )}




                      <Text style = {{height:100}}>

                      </Text>


                    </KeyboardAwareScrollView>
                    <DialogComponent
                                                                           dialogStyle = {{backgroundColor:'transparent'}}
                                                                           dialogTitle={<DialogTitle title="Dialog Title" />}
                                                                           dismissOnTouchOutside={true}
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

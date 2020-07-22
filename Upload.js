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
import ImagePicker from 'react-native-image-picker';
import NetInfo from "@react-native-community/netinfo";
const GLOBAL = require('./Global');
import Loader from './Loader.js';
const window = Dimensions.get('window');
const options = {
  title: 'Upload Prescription',

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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

export default class Upload extends Component {
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
         path:'',
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
_handlePress() {



       var imgid = ""

       for (var i = 0; i< this.state.banner.length ; i ++){
           imgid = imgid + this.state.banner[i].image + '|'
       }
       if (imgid == ""){

       } else{
           imgid = imgid.slice(0,-1)

       }
GLOBAL.mid = imgid
this.props.navigation.navigate('ManageAddress',"0")
     }
selectedFirstd  = (item) => {
     this.showLoading()

       const url = GLOBAL.BASE_URL + 'delete_images_medicine'

       fetch(url, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },


           body: JSON.stringify({


               "user_id": GLOBAL.user_id,
               "id":item.id


           }),
       }).then((response) => response.json())
           .then((responseJson) => {

this.hideLoading()
//                alert(JSON.stringify(responseJson))

               //  this.rajorPay()
               if (responseJson.status == true) {

                   this.setState({banner:responseJson.list_of_images})

               } else {


               }
           })
           .catch((error) => {
               console.error(error);
               this.hideLoading()
           });

   }
    renderRowItem3=({item,index}) => {

var d = this.state.path + item.image
console.log(d)
            return(


              <View style={{color :'white',height:100,flexDirection:'column',borderWidth:1 ,margin: 10,borderRadius :20,marginLeft : 10,width:window.width/4,borderColor:'#51AAAE', shadowColor: '#D3D3D3',
                }}>

                <View style = {{flexDirection:'row'}}>

                <Image style = {{width:window.width/4,height:100}}
                       source={{uri:d}}/>

                       <View style = {{backgroundColor:'#F9C057',height:20,width:20,marginTop:0,marginLeft:-20,borderTopRightRadius:30}}>

                       <TouchableOpacity style = {{width :20 ,height :20,position:'absolute',right:2}} onPress={() => this.selectedFirstd(item)
                                    }>

                       <Image source={require('./crosss.png')}
                              style  = {{width:10, height:10,alignSelf:'center',margin:6,resizeMode:'contain',}}
                       />
                       </TouchableOpacity>

                       </View>


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
  const url = GLOBAL.BASE_URL +  'list_upload_images_medicine'

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

this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({banner:responseJson.list})
                        this.setState({path:responseJson.path})

                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
}
    login = () => {

      if (this.props.navigation.state.params == "0"){
        ImagePicker.launchCamera(options, (response) => {
     // Same code as in above section!


     this.showLoading()
                 const url = GLOBAL.BASE_URL +  'image_attchment_upload_medicine'
                 const data = new FormData();
                 data.append('user_id', GLOBAL.user_id);
                 data.append('flag',1);


                 // you can append anyone.
                 data.append('image', {
                     uri: response.uri,
                     type: 'image/jpeg', // or photo.type
                     name: 'image.png'
                 });
                 fetch(url, {
                     method: 'post',
                     body: data,
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     }

                 }).then((response) => response.json())
                     .then((responseJson) => {
                                this.hideLoading()
                         this.setState({banner:responseJson.images})






                     });



     });
      }else{
        ImagePicker.launchImageLibrary(options, (response) => {
     // Same code as in above section!


     this.showLoading()
                 const url = GLOBAL.BASE_URL +  'image_attchment_upload_medicine'
                 const data = new FormData();
                 data.append('user_id', GLOBAL.user_id);
                 data.append('flag',1);


                 // you can append anyone.
                 data.append('image', {
                     uri: response.uri,
                     type: 'image/jpeg', // or photo.type
                     name: 'image.png'
                 });
                 fetch(url, {
                     method: 'post',
                     body: data,
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     }

                 }).then((response) => response.json())
                     .then((responseJson) => {
                                this.hideLoading()
                         this.setState({banner:responseJson.images})






                     });



     });
      }
       // this.props.navigation.navigate('Otp')



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
                                 Upload Prescription
                                </Text>

                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>

                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>




<View style = {{flexDirection:'row'}}>
<Image style = {{width :50 ,height: 50,marginTop:20,marginLeft:20,resizeMode: 'contain'}}
       source={require('./upload-pres.png')}/>
                                             <Text style = {{fontFamily:GLOBAL.semi,fontSize:16,color:"#1D1D26",marginTop:20,marginLeft:20}}>
                                          Please upload images of your prescription
                                             </Text>

</View>


<Button
    style={{padding:12,marginTop:40,fontSize: 20,borderWidth:1,borderColor:'#51AAAE',borderRadius:12, color: 'black',backgroundColor:'transparent',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
    styleDisabled={{color: 'red'}}
    onPress={() => this.login()}>
    Upload More Prescription
</Button>

                    <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10,marginBottom:10}}
                                           data={this.state.banner}
                                           numColumns = {3}

                                           keyExtractor={this._keyExtractor}
                                           renderItem={this.renderRowItem3}

                                 />








                                 <Button
                                     style={{padding:12,position:'absolute',top:40,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                                     styleDisabled={{color: 'red'}}
                                     onPress={() => this._handlePress()}>
                                     SUBMIT
                                 </Button>
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

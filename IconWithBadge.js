import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
    ScrollView,
    ActivityIndicator,

    ImageBackground, Image, Dimensions,
} from 'react-native';


const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
;
const window = Dimensions.get('window');
import { EventRegister } from 'react-native-event-listeners'
const GLOBAL = require('./Global');
import {NavigationActions,StackActions, DrawerActions} from 'react-navigation';
const styles = StyleSheet.create({
    wrapper: {
    },
    AndroidSafeArea: {
        flex: 0,
        backgroundColor: GLOBAL.COLOR.PURPLE,
        paddingTop: Platform.OS === "android" ? 0 : 0
    },
    container: {
        flex:1,
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
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default class IconWithBadge extends Component {
    state = {
        selectedIndex: 0,
        userDetail:[],
        gallery:[],
        zip:'',
        landmark:'',
        loading:false,
        address:'',
        notif:'',
        area :'',
        FlatListItems:[],


    };

selection = (index) => {


  if (index == 4){
    this.props.navigation.navigate('ContactUs')
  }else if(index == 6){
      this.props.navigation.navigate('Refer')
  }
  else if(index == 9){

        this.navigateToScreen1('Login')
  }
}
hideLoading() {
       this.setState({loading: false})
   }



   showLoading() {
       this.setState({loading: true})
   }
navigateToScreen1 = (route) =>  {


      Alert.alert('Logout!','Are you sure you want to Logout?',
          [{text:"Cancel"},
              {text:"Yes", onPress:()=>this._YesLogout()
              },
          ],
          {cancelable:false}
      )

  }
_YesLogout=()=>{

//        const url = GLOBAL.BASE_URL +  'logout'
// //      this.showLoading()
//       fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     user_id : GLOBAL.userid,
//   }),
// }).then((response) => response.json())
//     .then((responseJson) => {

// //    alert(JSON.stringify(responseJson))
//   //     this.hideLoading()
//        if (responseJson.status == true) {
      AsyncStorage.removeItem('userID');

      this.props
          .navigation
          .dispatch(StackActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({
                      routeName: 'Login',
                      params: { someParams: 'parameters goes here...' },
                  }),
              ],
          }))




      //    }else {
      //        alert('Something Went Wrong.')
      //    }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
  }
    renderRowItem2 = (itemData) => {

        return (
    <TouchableOpacity onPress= {()=>this.selection(itemData.index)}>
            <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 2,borderRadius :9,width : window.width - 30,flexDirection:'row',
              justifyContent:'space-between'}}>

                <View style = {{flexDirection:'row',width:'90%'}}>
                <Image   source={itemData.item.image}
                         style  = {{width:30, height:30,resizeMode:'stretch',margin:10
                         }}

                />
                <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginLeft:6,marginTop:14,color:GLOBAL.COLOR.GREY}}>
                    {itemData.item.name}

                </Text>
                </View>

                  <Image   source={require('./arrows.png')}
                           style  = {{width:15, height:15,resizeMode:'contain',marginRight:8,marginTop:16
                           }}

                  />















            </View>
            </TouchableOpacity>

        )
    }
    getCart = ()=>{
         
        }





moun = () =>{
  const url = GLOBAL.BASE_URL +  'list_cart_medicine'

                    fetch(url, {
                        method: 'POST',
                        headers: {

          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                       
                            user_id : GLOBAL.user_id


                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {
console.log(JSON.stringify(responseJson.total_cart_value))
//alert(JSON.stringify(responseJson))


                            if (responseJson.status == true) {
                             this.setState({notif:responseJson.total_cart_value})


                            }else {
                               
                            }

                        })
                        .catch((error) => {
                            console.error(error);
                        });
}
    componentDidMount(){
      this.listener = EventRegister.addEventListener('myCustomEvents', (data) => {
            this.moun()
      })
  this.moun()
    //  this.props.navigation.addListener('willFocus', this._handleStateChange);


    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

buttonClickListener = () =>{
  if (this.state.address == ''){
    alert('Please Enter Address')
  } else if (this.state.landmark == ''){
      alert('Please Enter Landmark')
    }else if (this.state.zip == ''){
        alert('Please Enter ZipCode')
      }else{
        const url = GLOBAL.BASE_URL +  'add_address'

                          fetch(url, {
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/json',
        'x-api-key':GLOBAL.header,
                              },
                              body: JSON.stringify({
                                  user_id:GLOBAL.user_id,
        location:this.state.address,
        landmark:this.state.landmark,
        pincode:this.state.zip,
        latitude:'',
        longitude:'',



                              }),
                          }).then((response) => response.json())
                              .then((responseJson) => {





                                  if (responseJson.status == true) {
                                    alert('Address Add Successfully')

                                  }else {
                                      alert('Unable to get Connect You. Please try again after Sometime.')
                                  }
                              })
                              .catch((error) => {
                                  console.error(error);
                              });
      }
}

delete = (item,index) =>{
  const url = GLOBAL.BASE_URL +  'remove_address'

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
  'x-api-key':GLOBAL.header,
                        },
                        body: JSON.stringify({
                            user_id:GLOBAL.user_id,
  address_id:item.id,




                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {
    alert(JSON.stringify(responseJson))





                            if (responseJson.status == true) {
    var array = [...this.state.userDetail]; // make a separate copy of the array

  if (index !== -1) {
    array.splice(index, 1);
    this.setState({userDetail: array});
  }

                              alert('Address Delete Successfully')

                            }else {
                                alert('Unable to get Connect You. Please try again after Sometime.')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
}









_renderItem ({item, index}) {
        return (
            <View >

            <Image
               style={{width: window.width, height: 200}}
               source={{uri: item.file_url}}
             />

             <View style = {{position:'absolute',width: window.width, height: 200,top:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
             </View>

            </View>
        );
    }

add = (item) =>{
  if (GLOBAL.userID == "0"){

      Alert.alert('TenonPrime','You seem to be an unregistered User. To Book  service with us,kindly Register First',
          [{text:"Cancel"},
              {text:"Yes", onPress:()=>this._YesLogout()
              },
          ],
          {cancelable:false}
        )
    //  alert('You seem to be an unregistered User. To Book  service with us,kindly Register First')
      return
    }


  const url = GLOBAL.BASE_URL +  'add_to_cart'

                    fetch(url, {
                        method: 'POST',
                        headers: {
           'x-api-key':GLOBAL.header,
          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quantity:"1",
                            service_id :item.service_id,
                            user_id : GLOBAL.userID


                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {




                            if (responseJson.status == true) {
                             
var states = this.state.userDetail
states.is_cart = 1
states.cart_quantity = "1"
states.cart_id = responseJson.cart_id
this.state.userDetail = states
this.setState({userDetail:this.state.userDetail})

                            }else {
                                alert('Unable to get Connect You. Please try again after Sometime.')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });


}


    render(){
      const { name, badgeCount, color, size } = this.props;
  return (
    <TouchableOpacity onPress={()=> EventRegister.emit('myCustomEvent', 'it works!!!')}>
  <View style={{ width: 40, height: 40, margin: 5 }}>
  <Image style = {{width :24 ,height: 24,marginTop:12,marginRight:20,resizeMode: 'contain'}}
         source={require('./carts.png')}/>

         <View style = {{backgroundColor:'white',width:30,height:30,borderRadius:15,marginTop:-40,marginLeft:-20}}>

  <Text style={{ color: 'black', fontSize: 16,textAlign:'center', fontWeight: 'bold',marginTop:5 }}>
{this.state.notif}
  </Text>
  </View>


  </View>
  </TouchableOpacity>

        );
    }
}

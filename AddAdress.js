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

    ImageBackground, Image, Dimensions,
} from 'react-native';
import Loader from './Loader.js';
import AsyncStorage from '@react-native-community/async-storage';


import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import {NavigationActions,StackActions, DrawerActions} from 'react-navigation';
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#51AAAE",
  paddingTop: Platform.OS === "android" ? 0 : 0
 },
    wrapper: {
    },
    AndroidSafeArea: {
        flex: 0,
        backgroundColor: GLOBAL.COLOR.PURPLE,
        paddingTop: Platform.OS === "android" ? 0 : 0
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

export default class AddAdress extends Component {
    state = {
        selectedIndex: 0,
        userDetail:[],
        zip:'',
        landmark:'',
        address:'Select Address',
        name:'',
        mobile:'',
        city:'',
        loading:false,
        disable : false,
        speciality : [








        ]

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
showLoading() {
    this.setState({loading: true})
}


hideLoading() {
    this.setState({loading: false})
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

 _handleStateChange = (state) =>{

   this.setState({address:GLOBAL.currLoc})
   const url = GLOBAL.BASE_URL +  'get_profile'

                     fetch(url, {
                         method: 'POST',
                         headers: {
     'x-api-key':GLOBAL.header,
        'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({
                             user_id:'1',


                         }),
                     }).then((response) => response.json())
                         .then((responseJson) => {






                             if (responseJson.status == true) {
                               this.setState({userDetail:responseJson.user})

                             }else {
                               //  alert('Unable to get Connect You. Please try again after Sometime.')
                             }
                         })
                         .catch((error) => {
                             console.error(error);
                         });
 }

    componentDidMount(){
      GLOBAL.currLoc = ""
this.props.navigation.addListener('willFocus', this._handleStateChange);
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
      }else if (this.state.zip.length < 6){
          alert('Please Enter valid  ZipCode')
        }
      else{



              const url = GLOBAL.BASE_URL +  'add_address'

              this.showLoading()
              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      user_id : GLOBAL.user_id,
                      name:this.state.name,
                      mobile:this.state.mobile,
                      address: this.state.address,
                      landmark:this.state.landmark,
                      pincode : this.state.zip,
                      city_state: this.state.city,
                      gender:'',
                      latitude: GLOBAL.lat,
                      longitude:GLOBAL.long,
                  }),
              }).then((response) => response.json())
                  .then((responseJson) => {
                      this.hideLoading()
                      if (responseJson.status == true) {

                        this.props.navigation.goBack()
                      }else {
                          alert(responseJson.msg)
                      }
                  })
                  .catch((error) => {
                      console.error(error);
                  });


              //  this.setState({isSecure :!this.state.isSecure})

      }
}


    render(){
      if(this.state.loading){
          return(
              <View style={styles.container}>
                  <Loader>
                  </Loader>
              </View>
          )
      }
        return (
          <SafeAreaView style={styles.container}>
                          <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                          <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width,height:50,backgroundColor:'#51AAAE'}}>
                          <TouchableOpacity onPress={() => this.props.navigation.goBack()
                          }>
                          <Image style = {{width :30 ,height: 30,marginTop:8,marginLeft:20,resizeMode: 'contain'}}
                                 source={require('./arrowsa.png')}/>
                                 </TouchableOpacity>
                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10,marginRight:28}}>
                                 Add Address
                                 </Text>

                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                 </Text>

                          </View>

                <KeyboardAwareScrollView
                keyboardShouldPersistTaps = 'always'

                style={{ backgroundColor: 'white',marginTop:0,height:window.height - 70 }} >


                <Text style={{fontSize:16,fontFamily:GLOBAL.bold,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>ADDRESS DETAILS</Text>



                <Text style={{fontSize:15,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>Name</Text>

                             <TextInput
                               style={{fontSize:18,fontFamily:GLOBAL.semi,marginLeft:'5%',color:'#1E1F20',width:'72%',height:50,marginTop:5}}
                               placeholder="Enter Name"
                               placeholderTextColor= {GLOBAL.COLOR.GREY}

                               onChangeText={(name) => this.setState({name})}
                               value={this.state.name}
                               />


                               <View style={{borderBottomWidth:1,borderBottomColor:'#E0E1E2',width:'90%',alignSelf:'center'}}>
                                               </View>

                                               <Text style={{fontSize:15,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>City</Text>

                                                            <TextInput
                                                              style={{fontSize:18,fontFamily:GLOBAL.semi,marginLeft:'5%',color:'#1E1F20',width:'72%',height:50,marginTop:5}}
                                                              placeholder="Enter City"
                                                              placeholderTextColor= {GLOBAL.COLOR.GREY}

                                                              onChangeText={(city) => this.setState({city})}
                                                              value={this.state.city}
                                                              />


                                                              <View style={{borderBottomWidth:1,borderBottomColor:'#E0E1E2',width:'90%',alignSelf:'center'}}>
                                                                              </View>

                <Text style={{fontSize:15,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>Address</Text>
  <TouchableOpacity onPress= {()=>this.props.navigation.navigate('Location')}>
  <View style = {{height:50}}>
                             <Text
                               style={{fontSize:18,fontFamily:GLOBAL.semi,marginLeft:'5%',color:'#1E1F20',height:'auto',marginTop:5,width:'72%',height:45}}>
                              {this.state.address}
                               </Text>
                               </View>
                               </TouchableOpacity>


                               <View style={{borderBottomWidth:1,borderBottomColor:'#E0E1E2',width:'90%',alignSelf:'center'}}>
                                               </View>

                                               <Text style={{fontSize:15,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>Landmark</Text>

                                                            <TextInput
                                                              style={{fontSize:18,fontFamily:GLOBAL.semi,marginLeft:'5%',color:'#1E1F20',width:'72%',height:50,marginTop:5}}
                                                              placeholder="Enter Landmark"
                                                              placeholderTextColor= {GLOBAL.COLOR.GREY}

                                                              onChangeText={(landmark) => this.setState({landmark})}
                                                              value={this.state.landmark}
                                                              />


                                                              <View style={{borderBottomWidth:1,borderBottomColor:'#E0E1E2',width:'90%',alignSelf:'center'}}>
                                                                              </View>

                                                                              <Text style={{fontSize:15,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>Zip Code</Text>

                                                                                           <TextInput
                                                                                             style={{fontSize:18,fontFamily:GLOBAL.semi,marginLeft:'5%',color:'#1E1F20',width:'72%',height:50,marginTop:5}}
                                                                                             placeholder="Enter ZipCode"
                                                                                             placeholderTextColor= {GLOBAL.COLOR.GREY}
                                                                                             keyboardType ='numeric'
                                                                                             maxLength={6}


                                                                                             onChangeText={(zip) => this.setState({zip})}
                                                                                             value={this.state.zip}
                                                                                             />


                                                                                             <View style={{borderBottomWidth:1,borderBottomColor:'#E0E1E2',width:'90%',alignSelf:'center'}}>
                                                                                                             </View>

                                                                                                             <Text style={{fontSize:15,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:'5%',marginTop:'5%'}}>Mobile No</Text>

                                                                                                                          <TextInput
                                                                                                                            style={{fontSize:18,fontFamily:GLOBAL.semi,marginLeft:'5%',color:'#1E1F20',width:'72%',height:50,marginTop:5}}
                                                                                                                            placeholder="Enter Mobile No"
                                                                                                                            placeholderTextColor= {GLOBAL.COLOR.GREY}
 maxLength={10}
                                                                                                                            onChangeText={(mobile) => this.setState({mobile})}
                                                                                                                            value={this.state.mobile}
                                                                                                                            />


                                                                                                                            <View style={{borderBottomWidth:1,borderBottomColor:'#E0E1E2',width:'90%',alignSelf:'center'}}>
                                                                                                                                            </View>

                                                                                                             {(this.state.zip =="" || this.state.address == "" ||this.state.landmark == "") && (
                                                                                                               <Button
                                                                                                                   style={{marginLeft:28,paddingTop: 13 ,fontSize: 15,backgroundColor:'#7B2672', color: 'white',fontFamily:GLOBAL.medium,marginTop:100,height:45,width:window.width - 56,borderRadius:30}}
                                                                                                                   styleDisabled={{color: 'red'}}
                                                                                                                   disabled = {true}
                                                                                                                   styleDisabled = {{color:'white',backgroundColor:'grey'}}
                                                                                                                   onPress={() => this.buttonClickListener()}>
                                                                                                                   SAVE ADDRESS
                                                                                                               </Button>
                                                                                                             ) }


                                                                                                             {(this.state.zip !="" && this.state.address != "" && this.state.landmark != "") && (
                                                                                                               <Button
                                                                                                                   style={{marginLeft:28,paddingTop: 13 ,fontSize: 15,backgroundColor:'#F9C057', color: 'white',fontFamily:GLOBAL.medium,marginTop:100,height:45,width:window.width - 56,borderRadius:30}}
                                                                                                                   styleDisabled={{color: 'red'}}
                                                                                                                   disabled = {false}
                                                                                                                   styleDisabled = {{color:'white',backgroundColor:'grey'}}
                                                                                                                   onPress={() => this.buttonClickListener()}>
                                                                                                                   SAVE ADDRESS
                    <Text style = {{height:100}}>
                    </Text>                                                                                           </Button>
                                                                                                             ) }
                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}

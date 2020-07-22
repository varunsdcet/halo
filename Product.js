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
import IconWithBadge from './IconWithBadge.js';
const GLOBAL = require('./Global');
import { EventRegister } from 'react-native-event-listeners'
import RBSheet from "react-native-raw-bottom-sheet";
import Loader from './Loader.js';
const HomeIconWithBadge = props => {
// You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
return <IconWithBadge    badgeCount={3} />
};
const window = Dimensions.get('window');
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Product extends Component {
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
        limit:'0',
         banner:[],
         selected:[],
         selectedIndex:0,

         package:["","discount","low to high","high to low"],
        loading:'',
        results: [],
        company:'',
        packages :[
           {
             selected :'',
            type:'Relevancy'
          },
          {
            selected :'',
           type:'Discount'
         },
          {
             selected :'',
            type:'Price - Low to High'
          },
          {
             selected :'',
            type:'Price - High to Low'
          },



        ],
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

    add = (item,index) =>{

      this.setState({selected:item})
      this.setState({selectedIndex:index})
      this.RBSheet.open()
    }
ss  = (item) =>{
  GLOBAL.prod = item
  this.props.navigation.navigate('ProductDetail',item.id)
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

<TouchableOpacity onPress={()=> this.ss(item)}>
              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width/2 - 20, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
  <View style = {{backgroundColor:'#DFDFDF',width:window.width/2 - 20,height:117}}>
  <Image style = {{width:100,height:100,resizeMode:'cover',margin:10,alignSelf:'center'}}
         source={{uri:item.image}}/>
  </View>

  <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 12,margin:12}}>

  {item.name}


  </Text>

  <View style = {{flexDirection:'row',height:50,marginTop:-7,justifyContent:'space-between'}}>
  <View>

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
  {item.is_cart == 0 && (


    <TouchableOpacity onPress={() => this.add(item,index)
    }>
    <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:10,marginTop:12}}
           source={require('./cart.png')}/>


</TouchableOpacity>
  )}

  </View>
            </View>



</TouchableOpacity>
            );
        }
        renderRowItem4=({item,index}) => {

                return(
    <TouchableOpacity onPress= {()=>this.selection(item,index)}>
<View>
                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:16,color:"#747A8D",margin:10}}>
                  {item.type}
                  </Text>


                  {item.selected == "" && (
                    <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:20,marginTop:10}}
                           source={require('./cir.png')}/>
                  )}
                  {item.selected != "" && (
                    <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:20,marginTop:10}}
                           source={require('./radio.png')}/>
                  )}

                </View>

                <View style = {{backgroundColor:'#EDEEEF',height:1,width:'100%'}}>

                </View>
</View>
</TouchableOpacity>
                );
            }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

_handleStateChange = (state) =>{



  this.showLoading()

  const url = GLOBAL.BASE_URL +  'medicine_products_list'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "category_id":GLOBAL.categoryId,
                    "user_id":GLOBAL.user_id,
                    "type":GLOBAL.sele,
                    "brands":GLOBAL.brandId,
                    "tags":GLOBAL.tagName,
                    "limit_from":this.state.limit




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  this.hideLoading()
                  console.log(JSON.stringify(responseJson))

                    if (responseJson.status == true) {
                        this.setState({banner:responseJson.products_list_s})
    this.setState({limit:responseJson.limit_from})
                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

}

valides = () =>{

  var limit = parseInt(this.state.limit)


      var pass  = limit + 6
  const url = GLOBAL.BASE_URL +  'medicine_products_list'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "category_id":GLOBAL.categoryId,
                    "user_id":GLOBAL.user_id,
                    "type":GLOBAL.sele,
                    "brands":GLOBAL.brandId,
                    "tags":GLOBAL.tagName,
                    "limit_from":pass.toString()




                }),
            }).then((response) => response.json())
                .then((responseJson) => {

                  console.log(JSON.stringify(responseJson))

                    if (responseJson.status == true) {

                     const interest = [...this.state.banner, ...responseJson.products_list_s];


                        this.setState({banner:interest})
      this.setState({limit:responseJson.limit_from})
                      //  this.ss()
                    }
                })
                .catch((error) => {
                    console.error(error);

                });

}

    componentDidMount(){
      this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
        this.props.navigation.navigate('MyCart')
       })
  GLOBAL.categoryId  = this.props.navigation.state.params
      GLOBAL.sele = ""
       this.props.navigation.addListener('willFocus', this._handleStateChange);


    }

    toggle = () =>{
      this.setState({shown:!this.state.shown})
    }


    valide = () => {
 EventRegister.emit('myCustomEvents', 'it works!!!')
      var a = ""

if (this.state.selected.is_discount == "1"){
  a =  this.state.selected.discount_price
}else{
    a =  this.state.selected.price
}






      this.showLoading()
      const url = GLOBAL.BASE_URL +  'add_to_cart_medicine'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "product_id":this.state.selected.id,
                        "user_id":GLOBAL.user_id,
                        "options":'',
                        "order_price":a,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))
                      this.hideLoading()

                        if (responseJson.status == true) {

                          var as =     this.state.banner[this.state.selectedIndex]
                          as.is_cart = 1


                          this.state.banner[this.state.selectedIndex] = as
                          this.setState({banner:this.state.banner})
                        }else{
                          alert(responseJson.message)
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
    hiss = () =>{

      this.showLoading()

      const url = GLOBAL.BASE_URL +  'medicine_products_list'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "category_id":GLOBAL.categoryId,
                        "user_id":GLOBAL.user_id,
                        "type":GLOBAL.sele,
                        "brands":GLOBAL.brandId,
                        "tags":GLOBAL.tagName,
                        "limit_from":0




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      this.hideLoading()
                      console.log(JSON.stringify(responseJson))

                        if (responseJson.status == true) {
                            this.setState({banner:responseJson.products_list_s})
        this.setState({limit:responseJson.limit_from})
                          //  this.ss()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });
      this.dialogComponent.dismiss()
    }
    renderFooter = () => {
     //it will show indicator at the bottom of the list when data is loading otherwise it returns null
     if (!this.state.loading) return null;
     return (
         <ActivityIndicator
             style={{ color: '#000' }}
         />
     );
  };
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selection = (item,index) => {

GLOBAL.sele = ""
for (var i = 0 ; i<this.state.packages.length ; i++){
  this.state.packages[i].selected = ""
  this.setState({packages:this.state.packages})
}



var a = this.state.packages[index]
if (a.selected == ""){
  a.selected  = "Y"
GLOBAL.sele  = this.state.package[index]
}else{
    a.selected  = ""
}
this.state.packages[index] = a
this.setState({packages:this.state.packages})


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
                                                 Products
                                                 </Text>

                                                 <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                                 <TouchableOpacity onPress={() => this.props.navigate('Medicine')
                                                 }>
                                                 <Image style = {{width :24 ,height: 24,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                                        source={require('./search.png')}/>
                                                        </TouchableOpacity>

                                                    <HomeIconWithBadge/>

                                                        </View>
                                          </View>


                                          <View style = {{backgroundColor:'#F5F6F7',height:window.height -90}}>




                                          <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                                                                 data={this.state.banner}
                                                                  numColumns={2}

                                                                 keyExtractor={this._keyExtractor}
                                                                 renderItem={this.renderRowItem3}
                                                                 extraData={this.state}
                 ListFooterComponent={this.renderFooter.bind(this)}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => this.valides()}

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

{this.state.selected.name}


</Text>
<Text style = {{color:'#747A8D',fontFamily:GLOBAL.regular,marginRight:14,fontSize: 14,marginTop:14}}>


MRP&nbsp;
{this.state.selected.is_discount == "0" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
  ₹{this.state.selected.price}/-
  </Text>
)}

{this.state.selected.is_discount != "0" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
  ₹{this.state.selected.discount_price}/-
  </Text>
)}

</Text>

</View>



<View style = {{flexDirection:'row',marginTop:2,width:window.width,height:60,justifyContent:'space-between'}}>
<View>

<Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 14,marginTop:2}}>
TOTAL AMOUNT
</Text>
{this.state.selected.is_discount == "0" && (
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 18,marginTop:2}}>
₹{this.state.selected.price}/-
</Text>
)}
{this.state.selected.is_discount != "0" && (
<Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 18,marginTop:2}}>
₹{this.state.selected.discount_price}/-
</Text>
)}
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


                                          <View style = {{position:'absolute',bottom:200,width:280,borderRadius:20,height:50,flexDirection:'row',justifyContent:'space-around',backgroundColor:'white',alignSelf:'center',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84}}>
<TouchableOpacity onPress={() =>   this.dialogComponent.show()
}>

<View style = {{height:40,justifyContent:'center',marginLeft:30}}>
<Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#747A8D",marginTop:10}}>
Sort
</Text>
</View>
</TouchableOpacity>
<View style = {{height:50,justifyContent:'center',width:1,backgroundColor:'grey'}}>

</View>
<TouchableOpacity onPress={() =>   this.props.navigation.navigate('Filter')
}>
<View style = {{height:40,justifyContent:'center',marginRight:30}}>
<Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#747A8D",marginTop:10}}>
Filter
</Text>
</View>
</TouchableOpacity>

                                          </View>
                                          <DialogComponent
                                                                                                 dialogStyle = {{backgroundColor:'transparent'}}
                                                                                                 dialogTitle={<DialogTitle title="Dialog Title" />}
                                                                                                 dismissOnTouchOutside={true}
                                                                                                 dismissOnHardwareBackPress={true}
                                                                                                 ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
                                                                                             >
                                                                                                 <View style = {{width :window.width - 60,borderRadius:20,height:300 ,alignSelf:'center',backgroundColor:'white',flexDirection:'column'}}>



                                                                                                     <Text style = {{margin:15,color:'#1B202B',fontFamily:GLOBAL.bold,fontSize:24,alignSelf:'center' }}>
                                                                                                     Sort By
                                                                                                     </Text>




                                                                                                     <View style = {{backgroundColor:'white',}}>
                                                                                                     <FlatList style = {{marginLeft:5}}
                                                                                                                            data={this.state.packages}


                                                                                                                            keyExtractor={this._keyExtractor}
                                                                                                                            renderItem={this.renderRowItem4}

                                                                                                                  />

                                                                                                                  <Button
                                                                                                                      style={{padding:6,marginTop:34,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4,marginTop:3,marginBottom:6}}
                                                                                                                      styleDisabled={{color: 'red'}}
                                                                                                                      onPress={() =>      this.hiss()}>
                                                                                                                      Apply
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

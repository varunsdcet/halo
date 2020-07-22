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
import RBSheet from "react-native-raw-bottom-sheet";
import Loader from './Loader.js';
const window = Dimensions.get('window');
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MyCart extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        password: '',
        email : '',
        mobile : '',
        status : '',
           time:[],
           discount:'0.00',
           total:'',
           promo:'',
        iPAddress : '',
        selectedIndex:'',
        amount:'',
         banner:[],
          packages:[],
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


add = (item,index) =>{


  var fetchs =   parseInt(item.quantity) + 1



  this.showLoading()

  const url = GLOBAL.BASE_URL +  'update_medicine_quantity'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id":GLOBAL.user_id,
                    "cart_id":item.cart_id,
                    "quantity":fetchs.toString(),
                    "price":item.order_price




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
this.hideLoading()
                    if (responseJson.status == true) {

  this.setState({amount:responseJson.sum_total})
                      var quantity = this.state.package[index]
                      quantity.quantity = parseInt(item.quantity) + 1
                      this.state.package[index] = quantity
                      this.setState({package:this.state.package})


            this.apply()

                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });


}

selection = (item,index) => {

  for (var i = 0 ; i< this.state.time.length ; i ++){
    this.state.time[i].selected = 0
    this.setState({time:this.state.time})
  }
var a = this.state.time[index]
if (a.selected == 1){
  a.selected  = ""
}else{

    a.selected  = 1
    this.setState({promo:this.state.time[index].heading})

    this.setState({selectedIndex:index})


  //  GLOBAL.time = a.time
}
this.state.time[index] = a
this.setState({time:this.state.time})
}

delete = (item,index) =>{
  this.showLoading()

  const url = GLOBAL.BASE_URL +  'delete_cart_medicine'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id":GLOBAL.user_id,
                    "cart_id":item.cart_id,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
this.hideLoading()
                    if (responseJson.status == true) {

                      var array = [...this.state.package]; // make a separate copy of the array
  this.setState({amount:responseJson.sum_total})
                        if (index !== -1) {
                          array.splice(index, 1);
                          this.setState({package: array});
                        }



                this.apply()

                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
}

minus = (item,index) =>{



if (item.quantity == "1"){
  this.delete(item,index)
  return
}

  var fetchs =   parseInt(item.quantity) - 1



  this.showLoading()

  const url = GLOBAL.BASE_URL +  'update_medicine_quantity'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id":GLOBAL.user_id,
                    "cart_id":item.cart_id,
                    "quantity":fetchs.toString(),
                    "price":item.order_price




                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
this.hideLoading()
                    if (responseJson.status == true) {

  this.setState({amount:responseJson.sum_total})
                      var quantity = this.state.package[index]
                      quantity.quantity = parseInt(item.quantity) - 1
                      this.state.package[index] = quantity
                      this.setState({package:this.state.package})



          this.apply()

                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });


}


renderRowItem3s=({item,index}) => {



        return(


          <TouchableOpacity onPress={() => this.selection(item,index)
                   }>
          <View style = {{width:window.width - 30,marginLeft:10,borderStyle: 'dotted',
borderWidth: 1,
borderRadius: 1,borderColor:'#F9C057'}}>

<View style = {{flexDirection:'row'}}>
{item.selected == "" && (
  <Image style = {{width:20,height:20,resizeMode:'contain',marginRight:12,marginTop:12,marginLeft:6}}
         source={require('./radios.png')}/>
       )}
{item.selected != "" && (
<Image style = {{width:20,height:20,resizeMode:'contain',marginRight:12,marginTop:12,marginLeft:6}}
 source={require('./radio.png')}/>

)}

<View>
{item.selected == "" && (
<Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 18,margin:12,width:130,}}>

{item.heading}


</Text>
)}
{item.selected != "" && (
          <Text style = {{color:'#000000',fontFamily:GLOBAL.semi,fontSize: 18,margin:12}}>

          {item.heading} Applied


          </Text>
        )}
        <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 12,margin:12,marginTop:-5,width:130,}}>

        {item.description}


        </Text>
        </View>
</View>

          </View>
</TouchableOpacity>


        );
    }


 // apply = () =>{
 //   var amount = this.state.amount
 //   var ds = this.state.discount
 //   var s = parseInt(amount) - parseInt(ds)
 //   this.setState({total:s})
 // }

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
    ₹{item.base_price}&nbsp;

    </Text>
    <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:20,fontSize: 10}}>
    {item.percent}% off
    </Text>
    </Text>

  )}

  {item.discount_price == "0.00" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
  ₹{item.base_price}/-
  </Text>
  )}
  {item.discount_price != "0.00" && (
  <Text style = {{color:'#51AAAE',fontFamily:GLOBAL.semi,marginLeft:10,fontSize: 12,marginTop:2}}>
  ₹{item.discount_price}/-
  </Text>
  )}


  </View>

    <View style = {{flexDirection:'row',justifyContent:'space-around',marginRight:30}}>
    <TouchableOpacity onPress={() => this.minus(item,index)
    }>
    <Image style = {{width :12 ,height: 12,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
           source={require('./minus.png')}/>
           </TouchableOpacity>
           <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 14,marginTop:9,marginLeft:12}}>

        {item.quantity}


           </Text>

           <TouchableOpacity onPress={() => this.add(item,index)
           }>
           <Image style = {{marginLeft:12,width :12 ,height: 12,marginTop:12,resizeMode: 'contain',alignSelf:'center'}}
                  source={require('./plus.png')}/>
                  </TouchableOpacity>
    </View>



  </View>
            </View>

            <TouchableOpacity onPress={() => this.delete(item,index)
            }>
            <Image style = {{width :12 ,height: 12,position:'absolute',top:5,right:30,resizeMode: 'contain'}}
                   source={require('./delete.png')}/>
                   </TouchableOpacity>
            </View>




            );
        }
        renderRowItem4=({item,index}) => {

                return(

<View>
                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style = {{fontFamily:GLOBAL.semi,fontSize:16,color:"#747A8D",margin:10}}>
                  {item}
                  </Text>
                  <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:20,marginTop:10}}
                         source={require('./cir.png')}/>
                </View>

                <View style = {{backgroundColor:'#EDEEEF',height:1,width:'100%'}}>

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
      this.valide()
      this.showLoading()

      const url = GLOBAL.BASE_URL +  'list_cart_medicine'

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
                          //  this.setState({banner:responseJson.banners})
                            this.setState({package:responseJson.list})
                            this.setState({amount:responseJson.sum_total})
                            this.setState({discount:"0.00"})
                            this.setState({total:responseJson.sum_total})
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

        if (this.state.username == ''){
            alert('Please Enter Name')
        }
        else if (this.state.mobile == ''){
            alert('Please Enter Mobile')
        }   else if (this.state.email == ''){
            alert('Please Enter Email')
        }

        else if (this.state.company == '') {
            alert('Please Enter Referral Code')
        }

        else {


                const url = GLOBAL.BASE_URL +  'verify_referral'

              //  this.showLoading()
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email : this.state.email,
                        mobile: this.state.mobile,
                        referral_code:this.state.company,
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      //this.hideLoading()
                    //    alert(JSON.stringify(responseJson))
                        if (responseJson.status == true) {
//                            alert(JSON.stringify(responseJson))
                            alert("Referral code applied successfully! Rs. 500 will be credited to your wallet after successfull signup.")
                            GLOBAL.is_refer_verify = "1"
                            GLOBAL.apply_to = responseJson.apply_to
                            GLOBAL.referral_code = this.state.company


                        }else {
                            alert(responseJson.message)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

        }

    }

    login = () => {
      GLOBAL.amount = this.state.amount
      GLOBAL.discount = this.state.discount
      GLOBAL.total =  this.state.total
      this.props.navigation.navigate('ManageAddress',"2")
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
                    <Image style={{ width: window.width - 40,borderRadius:12, height: 200 ,resizeMode:'stretch'}} source={{ uri: item }} />
              );
          }

          exitclose = () =>{
             this.setState({selectedIndex:''})
            this.setState({discount:"0.00"})
            this.setState({amount:GLOBAL.amount})
            this.setState({total:GLOBAL.amount})
            GLOBAL.coupan = ""
            GLOBAL.coupanid = ""

          }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    valide = () => {

      const url = GLOBAL.BASE_URL +  'coupan_list'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "module":"medicine",
                        "user_id":GLOBAL.user_id,




                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))

                        if (responseJson.status == true) {

var s = responseJson.lists
var times = []
                          for (var i = 0; i < s.length; i++){
                            var c = {
                           id : s[i].id,
                           heading:s[i].heading,
                           description:s[i].description,
                           discount_type :s[i].discount_type,
                           value :s[i].value,
                           selected:'',
                            }
                            times.push(c)
                          }


          this.setState({time:times})


          //amount
      }

                          //  this.ss()
                        else{
                            this.setState({time:[]})
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });




    }
    apply =  () =>{
      // alert(this.state.selectedIndex)
      // // if (this.state.selectedIndex == ""){
      //   return
      // // }


      if (this.state.selectedIndex.length == 0){
alert('hi')
      }else{
        var value =  this.state.time[this.state.selectedIndex].value
        var type  = this.state.time[this.state.selectedIndex].discount_type
        var discount = ""
        if (type == "percentage"){
          discount = this.state.amount * value/100
        }else{
          discount = value
        }

        var ds = parseInt(discount)
        var es = parseInt(this.state.amount)
        var d = es - ds
        this.setState({total:d.toString()})
      GLOBAL.coupan = this.state.time[this.state.selectedIndex].heading
      GLOBAL.coupanid = this.state.time[this.state.selectedIndex].id

    //  this.setState({selectedIndex:''})
        this.setState({discount:discount})
        this.RBSheet.close()
      }

      alert(this.state.selectedIndex)

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
                                                 MyCart
                                                 </Text>
                                                 <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                                 }>
                                                 <Image style = {{width :24 ,height: 24,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                                        source={require('./search.png')}/>
                                                        </TouchableOpacity>
                                          </View>

                       <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height - 70}} keyboardShouldPersistTaps='always'>
                                          <View style = {{backgroundColor:'#F5F6F7'}}>




                                          <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                                                                 data={this.state.package}
                                                                  numColumns={1}

                                                                 keyExtractor={this._keyExtractor}
                                                                 renderItem={this.renderRowItem3}

                                                       />



                                                       {this.state.discount == "0.00" && (
                                                         <TouchableOpacity onPress={() => this.RBSheet.open()
                                                         }>
                                                         <View style = {{}}>
                                                         <Text style={{marginLeft : '5%',marginTop:10,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :'60%',}}>

                                                        PROMO CODE
                                                         </Text>

                                                         <View style = {{flexDirection:'row',marginTop:40}}>

                                                         <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:-10,marginLeft:10}}
                                                                source={require('./radios.png')}/>

                                                       <View>
                                                                <Text style={{marginLeft : '5%',marginTop:-16,fontSize : 14,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :'60%',}}>

                                                               Apply Promo Code
                                                                </Text>

                                                                <Text style={{marginLeft : '5%',marginTop:1,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :window.width - 20,}}>

                                                               Get flat discount on prescription medicines
                                                                </Text>
                                                                </View>

                                                         </View>


                                                         </View>

                                                       </TouchableOpacity>
                                                       )}


                                                       {this.state.discount != "0.00" && (

                                                       <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>

                                                       <View style = {{flexDirection:'row'}}>
                                                       <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:0,marginLeft:10}}
                                                              source={require('./circles.png')}/>
                                                              <View>
                                                              <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                                              <Text style={{marginLeft : '5%',marginTop:0,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.bold,}}>

                                                              {this.state.time[this.state.selectedIndex].heading}
                                                              </Text>
                                                              <TouchableOpacity onPress={() => this.exitclose()
                                                              }>
                                                              <Image style = {{width:16,height:16,resizeMode:'contain',marginTop:0,marginRight:80}}
                                                                     source={require('./cross.png')}/>

                                                                   </TouchableOpacity>
                                                              </View>
                                                              <Text style={{marginLeft : '5%',marginTop:0,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.bold,width :window.width - 20,}}>

                                                              Flat {this.state.time[this.state.selectedIndex].value} {this.state.time[this.state.selectedIndex].discount_type} off on medicine terms & conditions
                                                        Apply.
                                                              </Text>
                                                              </View>

                                                       </View>

                                                       <View>


                                                       </View>

                                                       </View>


                                                       )}

                          <View>

                          <Text style={{marginLeft : '5%',marginTop:10,fontSize : 12,color :'#747A8D', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

                          PAYMENT DETAILS
                          </Text>

                          <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                          <Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

                          MRP Total
                          </Text>
                          <Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

                          ₹{this.state.amount}
                          </Text>
                          </View>



                          <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                          <Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

                          Additional Discount
                          </Text>
                          <Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

                          ₹{this.state.discount}
                          </Text>
                          </View>

                          <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                          <Text style={{marginLeft : '5%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :'80%',}}>

                          Total Amount
                          </Text>
                          <Text style={{marginRight : '2%',marginTop:10,fontSize : 14,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,}}>

                          ₹{this.state.total}
                          </Text>
                          </View>

                          </View>





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
                                                <View style = {{width:window.width ,height:300,backgroundColor:'#F3F2F2',borderTopLeftRadius:22,borderTopRightRadius:22}}>
                                                <View style = {{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}>
                                                <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:16,color:"#1D1D26",marginTop:12}}>
                                                APPLY PROMO CODE
                                                </Text>

                                                <TouchableOpacity onPress={() => this.RBSheet.close()
                                                }>
                                                <Image style = {{width :20 ,height: 20,marginTop:12,marginRight:20,resizeMode: 'contain'}}
                                                source={require('./cross.png')}/>
                                                </TouchableOpacity>
                                                </View>


                                                <View style = {{flexDirection:'row'}}>
                                                <TextInput
                                                placeholder="Enter Promocode"
                          placeholderTextColor="black"
                          value = {this.state.promo}
                                                                  style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi,width:window.width -100}}

                                                                  onChangeText={(text) => this.setState({promo:text})}
                                                              />

                                                              <TouchableOpacity onPress={() => this.apply()
                                                              }>
                                                              <Text style = {{fontFamily:GLOBAL.semi,marginLeft:20,fontSize:16,color:"#F9C057",marginTop:12}}>
                                                              APPLY
                                                              </Text>

                                                              </TouchableOpacity>

                                                </View>


                                                <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10,marginBottom:10}}
                                                                       data={this.state.time}


                                                                       keyExtractor={this._keyExtractor}
                                                                       renderItem={this.renderRowItem3s}

                                                             />
                                                </View>



                                                </RBSheet>



                                          </View>

</KeyboardAwareScrollView>

<View style = {{flexDirection:'row',width:window.width - 20,margin:10,borderColor:'#F9C057',borderWidth:1,backgroundColor:'white',height:50,position:'absolute',bottom:0}}>

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

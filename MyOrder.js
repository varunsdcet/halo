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
import Loader from './Loader.js';
const window = Dimensions.get('window');
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import * as EmailValidator from 'email-validator';
import Button from 'react-native-button';
import Carousel from 'react-native-snap-carousel';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MyOrder extends Component {
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
        limit:"0",
         banner:[],
          packages:["Relevancy","Discount","Price - Low to High","Price - High to Low"],
         package:["Relevancy","Discount","Price - Low to High","Price - High to Low"],
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

<TouchableOpacity onPress={()=> this.props.navigation.navigate('OrderDetails',item.id)}>
              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 20, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>


  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
  <View style = {{flexDirection:'row'}}>
  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#1E1F20",marginTop:10}}>
Order id - <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#747A8D",marginTop:10}}>
{item.id}
</Text>
  </Text>

  </View>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#19AB2B",marginTop:10,marginRight:20}}>
{item.status_name}
  </Text>
  </View>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
{item.name}
  </Text>



  <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>

  <View>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:10,marginRight:20}}>
₹{item.total_price}
  </Text>

  <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#747A8D",marginTop:10,marginRight:20}}>
{item.added_on}
  </Text>
  </View>
  <Button
  containerStyle={{padding:8, height:40,marginTop:4,borderWidth:1,borderColor:'#51AAAE', overflow:'hidden', borderRadius:12, backgroundColor: 'white',width:120}}
disabledContainerStyle={{backgroundColor: 'grey'}}
style={{fontSize: 16, color: '#1E1F20',fontFamily:GLOBAL.semi,}}
      onPress={() => this.login()}>
      See Details
  </Button>

  </View>

            </View>



</TouchableOpacity>
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

      const url = GLOBAL.BASE_URL +  'order_history'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "user_id":GLOBAL.user_id,
                        "limit_from":"0",





                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))

                        if (responseJson.status == true) {
                            this.setState({banner:responseJson.list_orders})

                            this.setState({limit:responseJson.limit_from})
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
      var limit = parseInt(this.state.limit)
          var pass  = limit + 6

      const url = GLOBAL.BASE_URL +  'order_history'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },


                    body: JSON.stringify({
                        "user_id":GLOBAL.user_id,
                        "limit_from":pass.toString(),





                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log(JSON.stringify(responseJson))
//             const interest = [...this.state.banner, ...responseJson.products_list_s];
                        if (responseJson.status == true) {
 const interest = [...this.state.banner, ...responseJson.list_orders];
                          this.setState({banner:interest})

                      
                            this.setState({limit:responseJson.limit_from})
                          //  this.ss()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });



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
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
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
                                                 My Order
                                                 </Text>
                                                 <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                                 }>
                                                 <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                                 </Text>
                                                        </TouchableOpacity>
                                          </View>


                                          <View style = {{backgroundColor:'#F5F6F7',height:window.height -90}}>




                                          <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:-10,marginBottom:10}}
                                                                 data={this.state.banner}
                                                                 keyExtractor={this._keyExtractor}
                                                                 renderItem={this.renderRowItem3}
                                                                 extraData={this.state}
                                                                 ListFooterComponent={this.renderFooter.bind(this)}
                                                                            onEndReachedThreshold={0.5}
                                                                            onEndReached={() => this.valide()}


                                                       />
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

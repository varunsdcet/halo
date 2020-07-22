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

export default class Filter extends Component {
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
          packages:[],
         package:[],
         tag :[],
         brand:[],
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
    selection = (item,index) => {


  for (var i = 0 ; i<this.state.package.length ; i++){
  this.state.package[i].is_selected = ""
  this.setState({package:this.state.package})
  }

  var a = this.state.package[index]
  if (a.is_selected == ""){
  a.is_selected  = "Y"

  }else{
    a.is_selected  = ""
  }
  this.state.package[index] = a

  this.setState({package:this.state.package})


  }

  selections = (item,index) => {




var a = this.state.brand[index]
if (a.is_selected == ""){
a.is_selected  = "Y"

}else{
  a.is_selected  = ""
}
this.state.brand[index] = a

this.setState({brand:this.state.brand})


}
selectionss = (item,index) => {




var a = this.state.tag[index]
if (a.is_selected == ""){
a.is_selected  = "Y"

}else{
a.is_selected  = ""
}
this.state.tag[index] = a

this.setState({tag:this.state.tag})


}

    renderRowItem3=({item,index}) => {




            return(

  <TouchableOpacity onPress= {()=>this.selection(item,index)}>
              <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin:4,borderRadius :15,marginLeft: 10,borderColor:'red'}}>

{item.is_selected == "" && (
  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#B8BBC6",margin:5,padding:2}}>
{item.name}
  </Text>
)}

{item.is_selected != "" && (
  <Text style = {{fontFamily:GLOBAL.semi,fontSize:13,color:"#F9C057",margin:5,padding:2}}>
{item.name}
  </Text>
)}

            </View>

</TouchableOpacity>


            );
        }
        renderRowItem4=({item,index}) => {

                return(
  <TouchableOpacity onPress= {()=>this.selections(item,index)}>
<View>
                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style = {{fontFamily:GLOBAL.regular,fontSize:16,color:"black",margin:10}}>
                  {item.name}
                  </Text>

                  {item.is_selected == "" && (
                    <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:20,marginTop:10}}
                           source={require('./cir.png')}/>
                  )}
                  {item.is_selected != "" && (
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
            renderRowItem5=({item,index}) => {

                    return(
<TouchableOpacity onPress= {()=>this.selectionss(item,index)}>
    <View>
                      <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                        <Text style = {{fontFamily:GLOBAL.regular,fontSize:16,color:"black",margin:10}}>
                        {item.name}
                        </Text>

                        {item.is_selected == "" && (
                          <Image style = {{width:22,height:22,resizeMode:'contain',marginRight:20,marginTop:10}}
                                 source={require('./cir.png')}/>
                        )}
                        {item.is_selected != "" && (
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



    componentDidMount(){

      const url = GLOBAL.BASE_URL +  'filter_list'

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

                        if (responseJson.status == true) {



                          var array = [];
                                                for (var i = 0; i < responseJson.category_list.length; i ++){
                                                  var c =  responseJson.category_list[i]


                                                  c.is_selected = "";
                                                  array.push(c)
                                                }



                            this.setState({package:array})

                            var arrays = [];
                                                  for (var i = 0; i < responseJson.brands_list.length; i ++){
                                                    var cs =  responseJson.brands_list[i]


                                                    cs.is_selected = "";
                                                    arrays.push(cs)
                                                  }




                            this.setState({brand:arrays})




                            var arrayss = [];
                                                  for (var i = 0; i < responseJson.tags_list.length; i ++){
                                                    var css =  responseJson.tags_list[i]
                    css.is_selected = "";
                                                    arrayss.push(css)
                                                  }







                            this.setState({tag:arrayss})
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




finalselection = () =>{
  //package
  var a = ""
  for (var i = 0; i< this.state.package.length; i++){
    if (this.state.package[i].is_selected != ""){
      a = this.state.package[i].id
    }
  }



  var b = ""
  for (var i = 0; i< this.state.brand.length; i++){
    if (this.state.brand[i].is_selected != ""){
      b = b +  this.state.brand[i].id + ','
    }
  }


  if (b != ""){
  b =   b.substring(0, b.length - 1);
  }


  var c = ""
  for (var i = 0; i< this.state.tag.length; i++){
    if (this.state.tag[i].is_selected != ""){
      c = c +  this.state.tag[i].name + ','
    }
  }


  if (c != ""){
  c =   c.substring(0, c.length - 1);
  }

  GLOBAL.brandId = b
GLOBAL.categoryId = a
GLOBAL.tagName = c



//brandId
this.props.navigation.goBack()
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

                                          <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width,height:50,backgroundColor:'white'}}>
                                          <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                          }>
                                          <Text style = {{fontFamily:GLOBAL.bold,fontSize:17,color:"#1E2432",marginTop:10,marginLeft:20}}>
                                          Reset
                                          </Text>
                                                 </TouchableOpacity>
                                                 <Text style = {{fontFamily:GLOBAL.bold,fontSize:17,color:"#1E2432",marginTop:10}}>
                                                 Filters
                                                 </Text>
                                                 <TouchableOpacity onPress={() => this.finalselection()
                                                 }>
                                                 <Text style = {{fontFamily:GLOBAL.bold,fontSize:17,color:"#F9C057",marginTop:10,marginRight:10}}>
                                                 Done
                                                 </Text>
                                                        </TouchableOpacity>
                                          </View>

                                             <KeyboardAwareScrollView style = {{backgroundColor:'white',height:window.height}} keyboardShouldPersistTaps='always'>
                                          <View style = {{backgroundColor:'#F5F6F7'}}>


                                          <Text style = {{fontFamily:GLOBAL.bold,fontSize:15,marginLeft:16,color:"#B8BBC6",marginTop:10,marginRight:10}}>
                                          CATEGORY
                                          </Text>

                                          <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10}}
                                                                 data={this.state.package}
                                                                  numColumns={4}

                                                                 keyExtractor={this._keyExtractor}
                                                                 renderItem={this.renderRowItem3}

                                                       />
                                                       <Text style = {{fontFamily:GLOBAL.bold,fontSize:15,marginLeft:16,color:"#B8BBC6",marginTop:10,marginRight:10}}>
                                                       BRANDS
                                                       </Text>
                                                       <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10}}
                                                                              data={this.state.brand}


                                                                              keyExtractor={this._keyExtractor}
                                                                              renderItem={this.renderRowItem4}

                                                                    />

                                                                    <Text style = {{fontFamily:GLOBAL.bold,fontSize:15,marginLeft:16,color:"#B8BBC6",marginTop:10,marginRight:10}}>
                                                                    Product Tags
                                                                    </Text>
                                                                    <FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10}}
                                                                                           data={this.state.tag}


                                                                                           keyExtractor={this._keyExtractor}
                                                                                           renderItem={this.renderRowItem5}

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
       backgroundColor: 'white',
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

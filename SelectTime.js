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
let customDatesStyles = [];
const GLOBAL = require('./Global');
import Loader from './Loader.js';
const window = Dimensions.get('window');
import moment from 'moment';
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';

type Props = {};




import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SelectTime extends Component {
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
         time:[],
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

      for (var i = 0 ; i< this.state.time.length ; i ++){
        this.state.time[i].selected = 0
        this.setState({time:this.state.time})
      }
    var a = this.state.time[index]
    if (a.selected == 1){
      a.selected  = 0
    }else{
        a.selected  = 1
        GLOBAL.time = a.time
    }
    this.state.time[index] = a
    this.setState({time:this.state.time})
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

              <TouchableOpacity onPress={() => this.selection(item,index)
                       }>
              <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

{item.selected == "" && (
  <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 14,margin:12,width:130}}>

  {item.time}


  </Text>
)}
{item.selected != "" && (
              <Text style = {{color:'#000000',fontFamily:GLOBAL.semi,fontSize: 14,margin:12,width:130}}>

              {item.time}


              </Text>
            )}
            {item.selected == "" && (
              <Image style = {{width:20,height:20,resizeMode:'contain',marginRight:12}}
                     source={require('./radios.png')}/>
                   )}
    {item.selected != "" && (
      <Image style = {{width:20,height:20,resizeMode:'contain',marginRight:12}}
             source={require('./radio.png')}/>

    )}

              </View>
</TouchableOpacity>

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

    calculateDay(date){


             const url = GLOBAL.BASE_URL +  'dignose_times_slots'

             fetch(url, {
                 method: 'POST',
                 headers: {

                      'Content-Type': 'application/json',
                 },


                 body: JSON.stringify({

                     "select_date":date,




                 }),
             }).then((response) => response.json())
                 .then((responseJson) => {


var times = [];
                     if (responseJson.status == true) {
                    
                       GLOBAL.delivery = responseJson.price
console.log(JSON.stringify(responseJson.time_slots))
var s = responseJson.time_slots

for (var i = 0; i < s.length; i++){
  var c = {
 time : `${s[i].start} - ${s[i].end}`,
 selected:''
  }
  times.push(c)
}


                         this.setState({time:times})


                     }else{
                         this.setState({time: []})
                     }
                 })
                 .catch((error) => {
                     console.error(error);
                     this.hideLoading()
                 });

         }
         dates = (date)=>{
                  var t = new Date( date );
                  var s = moment(t).format('YYYY-MM-DD')
                  GLOBAL.date = s
          //        alert(GLOBAL.date)
                  this.calculateDay(s)
              }
    componentDidMount(){

      var s = moment().format('YYYY-MM-DD')
          GLOBAL.date = s
          GLOBAL.time = '';

            let startDate = moment();
            for (let i=0; i<10; i++) {
                customDatesStyles.push({
                    startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                    dateNameStyle: styles.dateNameStyle,
                    dateNumberStyle: styles.dateNumberStyle,

                    // Random color...
                    dateContainerStyle: {shadowOpacity: 1.0,
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
                });
            }
            var date = new Date()
            var s = moment(date).format('YYYY-MM-DD')

            this.calculateDay(s)






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

    render() {


      let datesWhitelist = [{
   start: moment().subtract(0, 'days'), // yesterday
   end: moment().add(30, 'days')  // tomorrow
 }];
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
                                Select Time Slot
                                </Text>
                                <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"white",marginTop:10}}>

                                </Text>

                         </View>
                                             <KeyboardAwareScrollView style = {{backgroundColor:'#f1f1f1',width:window.width,height:window.height}} keyboardShouldPersistTaps='always'>


<View style = {{flexDirection:'row'}}>
<Image style = {{width :20 ,height: 20,marginTop:20,marginLeft:20,resizeMode: 'contain'}}
       source={require('./calender.png')}/>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:18,color:"#1E1F20",marginTop:20,marginLeft:20}}>
       Order

       </Text>
</View>


<View style = {{marginTop:20}}>
                                             <CalendarStrip

                                                              calendarAnimation={{type: 'sequence', duration: 30}}
                                                              daySelectionAnimation={{type: 'background', duration: 300, highlightColor: GLOBAL.COLOR
                                                            .PURPLE}}
                                                              style={{height:120, paddingTop: 15}}
                                                              calendarHeaderStyle={{color: 'black'}}
                                                              calendarColor={'white'}
                                                              minDate={moment().subtract(0, 'days')}
                                                               maxDate={moment().add(30, 'days')}
                                                              highlightDateNameStyle={{color:'white',backgroundColor:'#F9C057'}}
                                                              highlightDateNumberStyle  ={{color:'#F9C057'}}
                                                              disabledDateNumberStyle={{ color: 'grey' }}
                                                     datesWhitelist={datesWhitelist}

                                                              iconContainer={{flex: 0.1}}
                                                              onDateSelected={(date)=> this.dates(date)}
                                                          />

</View>


<View style = {{flexDirection:'row'}}>
<Image style = {{width :20 ,height: 20,marginTop:20,marginLeft:20,resizeMode: 'contain'}}
       source={require('./time.png')}/>
       <Text style = {{fontFamily:GLOBAL.semi,fontSize:14,color:"#1E1F20",marginTop:16,marginLeft:20,width:'80%'}}>
       Select time when you want the person to collect the sample.

       </Text>
</View>


<FlatList style = {{marginLeft:5,width:window.width - 10,marginTop:10,marginBottom:10}}
                       data={this.state.time}


                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderRowItem3}

             />
{this.state.time.length != 0 && (
  <Button
      style={{padding:12,marginTop:40,fontSize: 20, color: 'white',backgroundColor:'#F9C057',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
      styleDisabled={{color: 'red'}}
      onPress={() => this.props.navigation.navigate('Order')}>
      SUBMIT
  </Button>
)}


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

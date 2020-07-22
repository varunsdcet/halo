import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image, TouchableOpacity,
} from 'react-native';

import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import PageControl from 'react-native-page-control';

import SwiperFlatList from 'react-native-swiper-flatlist';
var titlr = ["Book Diagnostic","Take a medicine","Feel healthy"]
var array = ["Set up a reminder to take the medicine on time and to make another visit to a doctor","Set up a reminder to take the medicine on time and to make another visit to a doctor","Great job! Now that you followed the treatment you are fit and healthy again! ","Consult Doctors via Video/Audio and Live chat"]
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const window = Dimensions.get('window');
type Props = {};
const GLOBAL = require('./Global');
export default class Slider extends Component<Props> {
    state = {
        value: '',
        index :'',
        title:'',
    }
    static navigationOptions = ({ navigation }) => {
        return {
            swipeEnabled: false,
            gesturesEnabled: false,
            header: () => null
        }
    }

    buttonClickListener = () =>{
        this.props.navigation.replace('Landing')
    }

    renders  = (index) => {
        this.setState({value:array[index]})
        this.setState({index:index})
        this.setState({title:titlr[index]})
    }


    _handlePress = () =>{
        this.props.navigation.replace('Login')
    }
    render(){
        return (

            <View style={{width: '100%', height: '100%',flex: 1, flexDirection: 'column' ,backgroundColor :'white'}}>


                <View style={{width :window.width,height :window.height}}>



                    <View style = {{position:'absolute',top:0,width :'100%' ,height : window.height }}>
                        <SwiperFlatList
                            autoplay
                            autoplayDelay={2}
                            autoplayLoop
                            index={0}
                            showPagination = {false}
                            onChangeIndex ={ (index) => this.renders(index.index) }
                        >
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>

                            <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 32,margin:20,marginTop:91,textAlign: 'center'}}>

                                {this.state.title}


                            </Text>
                                <Image style = {styles.text}
                                       source={require('./hows.png')}/>
                                       <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 16,margin:30,marginTop:50,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                            <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 32,margin:20,marginTop:91,textAlign: 'center'}}>

                                {this.state.title}


                            </Text>
                                <Image style = {styles.text}
                                       source={require('./howss.png')}/>
                                       <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 16,margin:30,marginTop:90,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>

                            <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.bold,fontSize: 32,margin:20,marginTop:91,textAlign: 'center'}}>

                                {this.state.title}


                            </Text>
                              <Image style = {styles.text}
                                       source={require('./howsss.png')}/>
                                       <Text style = {{color:'#747A8D',fontFamily:GLOBAL.semi,fontSize: 16,margin:30,marginTop:90,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>



                        </SwiperFlatList>

                    </View>


                </View>


                <View style = {{position:'absolute',bottom:0,height:170,width:'100%',backgroundColor:'transparent',borderRadius:20}}>
                <PageControl
                    style={{width :100 ,marginTop:0,alignSelf:'center'}}
                    numberOfPages={3}
                    currentPage={this.state.index}
                    hidesForSinglePage
                    pageIndicatorTintColor='#F9C057'
                    currentPageIndicatorTintColor='#51AAAE'
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:8, height:8}}
                    onPageIndicatorPress={this.onItemTap}
                />





                    <View style = {{marginTop:40,marginLeft:10,width:window.width - 20}}>

{this.state.index != 2 && (
  <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')
           }>
  <Image style = {{width:60,height:60,alignSelf:'center'}}
         source={require('./button.png')}/>
         </TouchableOpacity>
)}
{this.state.index == 2 && (

  <Button
  containerStyle={{padding:14, height:50, overflow:'hidden', borderRadius:12, backgroundColor: '#F9C057',marginLeft:'5%',width:'90%'}}
disabledContainerStyle={{backgroundColor: 'grey'}}
style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
                         onPress={() => this.props.navigation.navigate('Register')}>
                      DONE
                     </Button>



)}



                    </View>


                </View>





            </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {

        marginLeft : 50,
        marginTop :75,
        width: window.width - 50,
        height:window.height - 250,
        resizeMode:'contain',


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },

    child: {
        height: window.height * 0.7,
        width:window.width,
        justifyContent: 'center'
    },
    text: {
        resizeMode:'contain',
        height: 156.35,
        width:299.56,
        marginLeft:38,
        width:window.width - 76,
        marginTop:80


    }
})

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,


    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';

import { DrawerActions } from 'react-navigation';
const GLOBAL = require('./Global');
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
type props={};
export default class Home extends Component<Props>{
    state = {
        location: '',

    };
    onPressFemale(){
        //   this.props.navigation.navigate('Duration')
    }
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
    render(){
        return(

          <SafeAreaView style={styles.container}>
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
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={"search"}
                    listViewDisplayed="false"
                    fetchDetails={true}
                    renderDescription={row =>
                        row.description || row.formatted_address || row.name

                    }
                    onPress={(data, details = null) => {


                        GLOBAL.lat =  details.geometry.location.lat
                        GLOBAL.long =  details.geometry.location.lng
                        GLOBAL.currLoc =  data.description

                        this.props.navigation.goBack()



                    }}
                    getDefaultValue={() => {
                        return ""; // text input default value
                    }}
                    query={{
                        key: "AIzaSyBWX-QNm_gVzt6U2K6xeU4cmF5dkX8XUQ0",
                        language: "en", // language of the results
                        types: "(cities)" // default: 'geocode'
                    }}
                    styles={{
                        description: {
                            fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb"
                        }
                    }}
                    enablePoweredByContainer={true}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: ""
                    }}
                    filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                    ]}
                    debounce={200}
                />
            </SafeAreaView>
        );
    }
}
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

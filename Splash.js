import React, {Component} from 'react';
import { SafeAreaView,StyleSheet,TextInput,Text, View,Image, Linking,Button ,Alert,Dimensions ,TouchableOpacity,Animated,  Easing,AppState,ImageBackground} from 'react-native';
const window = Dimensions.get('window');
import Loader from 'react-native-mask-loader';
type Props = {};
import AsyncStorage from '@react-native-community/async-storage';
const GLOBAL = require('./Global');
export default class Splash extends Component {
    constructor(props) {

        super(props)
         this._image = require('./logo.png');
        this.state = {
          appReady: false,
             rootKey: Math.random(),
        }
        // this.RotateValueHolder = new Animated.Value(0);
        //  this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));

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



    proceed=()=>{
            var value =  AsyncStorage.getItem('userID');
        value.then((e)=> {
            if (e == '' || e == null ){
              this.props.navigation.replace('Slider')
            }else {
                GLOBAL.user_id = e






                var values =  AsyncStorage.getItem('name');
                values.then((f)=> {
                    GLOBAL.myname = f

                })

                var valuess =  AsyncStorage.getItem('email');
                valuess.then((f)=> {
                    GLOBAL.myemail = f

                })
                var values2 =  AsyncStorage.getItem('mobile');
                values2.then((f)=> {
                    GLOBAL.mymobile = f
                })


                this.props.navigation.replace('TabNavigator')
            }
        })

    }

    componentDidMount() {
       this.resetAnimation();
       setTimeout(()=>{
    this.proceed()
}, 2000);
     }

     resetAnimation() {
       this.setState({
         appReady: false,
         rootKey: Math.random()
       });

       setTimeout(() => {
         this.setState({
           appReady: true,
         });

    //  this.props.navigation.navigate('Slider')
       }, 1000);
     }


    render() {

        return (

          <View key={this.state.rootKey} style={styles.root}>
       <Loader
         isLoaded={this.state.appReady}
         imageSource={require('./logo.png')}
         style = {{width:300}}
         backgroundStyle={styles.loadingBackgroundStyle}
       >

       </Loader>
     </View>

        );
    }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#51AAAE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBackgroundStyle: {

    backgroundColor: '#51AAAE',
  },
});

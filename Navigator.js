import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';


import {Platform, StyleSheet,TouchableOpacity,Image, Text, View,Dimensions ,Button, Share} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Splash from './Splash.js';
import Slider from './Slider.js';
import MyOtp from './MyOtp.js';
const window = Dimensions.get('window');
import NewOtp from './NewOtp.js';
import Upload from './Upload.js';
import AddAdress  from './AddAdress.js';
import Location  from './Location.js';
import Register from './Register.js';
import Home from './Home.js';
import CommentList from './CommentList.js';
import Category from './Category.js';
import Product from './Product.js';
import Filter from './Filter.js';
import Account from './Account.js';
import ManageAddress from './ManageAddress.js';
import Medicine from './Medicine.js';
import Article from './Article.js';
import ReplyList from './ReplyList.js';
import ProductDetail from './ProductDetail.js';
import Diagnostic from './Diagnostic.js';
import DiagnosticTest from './DiagnosticTest.js';
import DiagnosticTestDetail from './DiagnosticTestDetail.js';
import Otp from './Otp.js';
import SingleProduct from './SingleProduct.js';
import PastUpload from './PastUpload.js';
import MyCart from './MyCart.js';
import EditAdress from './EditAdress.js';
import DiagnosticCategory from './DiagnosticCategory.js';
import SelectTime from './SelectTime.js';
import Order from './Order.js';
import Payment from './Payment.js';
import EditProfile  from './EditProfile.js';
import MyOrder  from './MyOrder.js';
import OrderDetails  from './OrderDetails.js';
import React, {Component} from 'react';


const TabNavigator = createBottomTabNavigator({
        Home: { screen: Home,
            navigationOptions : {
                title:'Home',

                tabBarLabel: 'Home',

                swipeEnabled: false,
                gesturesEnabled: false,
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./home.png')
                        : require('./homes.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },


        Article: { screen: Article ,
            navigationOptions : {
                title:'Article',
                tabBarLabel: 'Article',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./articles.png')
                        : require('./article.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },

        Account: { screen: Account ,
            navigationOptions : {
                title:'Account',
                tabBarLabel: 'Account',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./users.png')
                        : require('./user.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },







    },


    {
        defaultNavigationOptions: ({ navigation }) => ({
 header :null,
            swipeEnabled: false,
            gesturesEnabled: false,
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'#D90000',
            },
            headerTintColor :'black',

            tabBarIcon: () => (
                <Image
                    source={require('./home.png')}
                    style={{width:20, height:20}}
                />
            )
        }),
        tabBarOptions: {
          borderTopLeftRadius:21,
              borderTopRightRadius:21,
              backgroundColor:"#000000",
             position:'absolute',
             bottom: 0,
             padding:10,
             width: window.width,
             height: 54,
             zIndex: 8 ,

            swipeEnabled: false,
            gesturesEnabled: false,
            activeTintColor: '#51AAAE',
            inactiveTintColor: 'black',
            inactiveBackgroundColor:'white',
            activeBackgroundColor:'white',
            showIcon:'true'
        },

    }
);

const StackNavigator = createStackNavigator({

    Splash:{screen:Splash},
    TabNavigator: { screen: TabNavigator,
navigationOptions: ({ navigation }) => ({
header:null,
}),
},
ManageAddress:{screen:ManageAddress},

          Slider:{screen:Slider},
          Otp:{screen:Otp},
          MyOtp:{screen:MyOtp},
          NewOtp:{screen:NewOtp},
            Register:{screen:Register},
            DiagnosticCategory:{screen:DiagnosticCategory},
            MyCart:{screen:MyCart},
            Medicine:{screen:Medicine},
            PastUpload:{screen:PastUpload},
              AddAdress:{screen:AddAdress},
            ProductDetail:{screen:ProductDetail},
            Category:{screen:Category},
CommentList:{screen:CommentList},
            Product:{screen:Product},
            Filter:{screen:Filter},
            EditAdress:{screen:EditAdress},
            DiagnosticTest:{screen:DiagnosticTest},
              SelectTime:{screen:SelectTime},
            Diagnostic:{screen:Diagnostic},

            DiagnosticTestDetail:{screen:DiagnosticTestDetail},
            Article:{screen:Article},
            ReplyList:{screen:ReplyList},
            Location:{screen:Location},
            Order:{screen:Order},
            Payment:{screen:Payment},
            Upload:{screen:Upload},
            EditProfile:{screen:EditProfile},
              MyOrder:{screen:MyOrder},
              OrderDetails:{screen:OrderDetails},
              SingleProduct:{screen:SingleProduct},



    },

   // {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
//LabourLaw

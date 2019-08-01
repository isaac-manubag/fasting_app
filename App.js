import React from 'react';
import { AppRegistry, StatusBar, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store, { persistor } from './src/redux';
import Application from './src/components/Application';
import Rehydrating from './src/components/Rehydrating';
import { name as appName } from './app.json';
import bgMessaging from './bgMessaging';
import NavigationService from './NavigationService';
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const store = Store();

export default class FastingApp extends React.Component {
  async componentDidMount() {
    // this.checkPermission();
    // this.createNotificationListeners();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  showAlert(a, b, data) {
    console.table({
      a,
      b,
    });
    console.table(data);
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });

    /*
     * If your app is in background, you can listen for when a notification
     * is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body, data } = notificationOpen.notification;
        NavigationService.navigate('STATISTICS');
        this.showAlert(title, body, data);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being
     * clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      NavigationService.navigate('STATISTICS');
      this.showAlert(title, body, data);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  componentWillUnmount() {
    console.log('top level index unmounted');
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Provider store={store}>
        <PersistGate loading={<Rehydrating />} persistor={persistor}>
          <Application />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => FastingApp);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);

import React from 'react';
import { ScrollView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import NotiComponent from '../../components/Notification';

const Notification = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const notifications = [
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
    { text: 'It’s time to complete your daily exercise!', isRead: false, time: '1 minutes ago' },
    { text: 'It’s time to complete your daily exercise!', isRead: true, time: '' },
  ];
  return (
    <View>
      <Searchbar
        placeholder="find somthing"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          marginTop: 20,
          borderRadius: 80,
          backgroundColor: 'rgba(230, 230, 230, 0.70);',
          width: 200,
          height: 40,
          alignSelf: 'center',

        }}
        inputStyle={{
          fontSize: 12,
          color: 'black',
          textAlign: 'left',
          alignSelf: 'center',
        }}

      />
      <ScrollView className='px-5 mt-[20px]'>
        {notifications.map((notification, index) => (
          <NotiComponent
            text={notification.text}
            isRead={notification.isRead}
            time={notification.time}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default Notification
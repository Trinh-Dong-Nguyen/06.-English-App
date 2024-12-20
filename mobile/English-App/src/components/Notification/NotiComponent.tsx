import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';


interface NotiComponentProps {
  text: string;
  isRead: boolean;
  time: string;
}

const NotiComponent: React.FC<NotiComponentProps> = ({ text, isRead, time }) => {
  return (
    <TouchableOpacity className='mt-3' style={[styles.container, isRead && styles.read]}>
      <Text style={styles.text}>{text}</Text>
      <Text className='text-[#EF5DA8] text-[10px] font-normal absolute top-0 right-5'>{time}</Text>
      {!isRead ? <View style={styles.unreadIndicator} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '99%',
    height: 50,
    backgroundColor: '#E4E2FC',
    borderRadius: 10,
    padding: 10,
  },
  read: {
    opacity: 0.5,
  },
  text: {
    color: '#5D5FEF',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  unreadIndicator: {
    position: 'absolute',
    top: -6,
    right: -5,
    width: 16,
    height: 16,
    backgroundColor: '#EF5DA8',
    borderRadius: 8,
  },
  blurOverlay: {
    flex: 1,
  },
});

export default NotiComponent;
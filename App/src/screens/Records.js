import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default ({ navigation }) => {
  const records = useSelector((state) => state.records);

  return (
    <View style={styles.container}>
      <View style={styles.records}>
        <Text>{'User'}</Text>
        <Text>{'Level'}</Text>
        <Text>{'Time'}</Text>
      </View>
      {records.map((record, idx) => {
        return (
          <View style={styles.records} key={idx}>
            <Text>{record.username}</Text>
            <Text>{record.level}</Text>
            <Text>{`${record.time.mins}:${record.time.secs}`}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding:40
    // justifyContent: 'center',
  },
  records: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

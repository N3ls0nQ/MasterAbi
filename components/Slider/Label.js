import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const Label = ({e}) => {

  const theme = useTheme();


  return (
    <View style={[styles.root, {backgroundColor: theme.colors.primary}]}>
      <Text style={styles.text}>{e.oneMarkerValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 30,
    alignItems: 'center',
    padding: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default memo(Label);
import React from 'react';
import { Linking, Text, View } from 'react-native';
import { styles } from './styles';

export function Copyright() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feito com ♥ pelo</Text>
      <Text
        style={[styles.text, { textDecorationLine: 'underline' }]}
        onPress={() =>
          Linking.canOpenURL('http://google.com').then((supported) => {
            if (supported) {
              Linking.openURL('http://google.com');
            } else {
              console.log("Don't know how to open URI: http://google.com");
            }
          })
        }
      >
        {` `}@geovannemoro
      </Text>
    </View>
  );
}

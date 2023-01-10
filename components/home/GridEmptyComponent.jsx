import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib";
import LottieView from "lottie-react-native";
import {
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export const GridEmptyComponent = () => {
  return (
    <View center marginT-s10>
      <LottieView
        loop
        autoPlay
        style={{
          width: wp(60),
          height: wp(60),
        }}
        source={require("../../assets/crreatenew.json")}
      />

      <Text textColor style={styles.textStyle} >
        create your first note
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 25,
        fontFamily: "light"
    }
});

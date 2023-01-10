import React from "react";
import { StyleSheet, Image } from "react-native";
import { View, Button, Text } from "react-native-ui-lib";
import { ROUTES } from "../config/routes";
import { useTheme } from "@react-navigation/native";
import { useAuthStore } from "../zustand/stores/auth";
import logo from "../assets/icon.png";

const Intro = (props) => {
  const { colors } = useTheme();

  const goToApp = useAuthStore((state) => state.goToApp);

  return (
    <View flex center style={{ backgroundColor: colors.background }}>
      <Image
        source={logo}
        style={{
          height: 200,
          width: 200,
          resizeMode: "cover",
          marginTop: -50,
        }}
      />

      <Text textColor heading style={{ fontFamily: "regular" }}>
        Light Notes
      </Text>

      <View marginV-s5 paddingH-s10>
        <Text textColor center style={{ fontFamily: "light", fontSize: 20 }}>
          Type, anotate, create checklist and draw notes.
        </Text>
      </View>

      <Button onPress={goToApp} label="LETS GET STARTED" marginT-s4 intro />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Intro;

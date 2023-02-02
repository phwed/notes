import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  StatusBar,
  Platform,
  ScrollView,
  LayoutAnimation,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import {
  View,
  Text,
  BorderRadiuses,
  Spacings,
  TouchableOpacity,
  Incubator,
  Button,
  Dialog,
  Colors,
  PanningProvider,
} from "react-native-ui-lib";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default DeleteDialog = ({ visible, onDismiss, onConfirm, onCancel }) => {
  const { colors } = useTheme();

  return (
    <Dialog
      useSafeArea
    //   height={hp(30)}
      width={wp(80)}
      visible={visible}
      onDismiss={onDismiss}
      containerStyle={{ backgroundColor: colors.card, borderRadius: 15 }}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <View paddingV-s6 paddingH-s6>
        <Text
          marginB-s4
          style={{ color: colors.text, fontFamily: "semiBold", fontSize: 20 }}
        >
          Are you sure you want to delete this note?
        </Text>
        <View row centerH spread marginT-s7>
          <Button
            backgroundColor={Colors.$backgroundDangerHeavy}
            borderRadius={10}
            onPress={onCancel}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </Button>
          <Button
            backgroundColor={Colors.$backgroundSuccessHeavy}
            borderRadius={10}
            onPress={onConfirm}
          >
            <Text style={{ color: "white" }}>Confirm</Text>
          </Button>
        </View>
      </View>
    </Dialog>
  );
};

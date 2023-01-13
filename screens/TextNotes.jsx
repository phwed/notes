import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  StatusBar,
  Platform,
  ScrollView,
  LayoutAnimation,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  View,
  Text,
  BorderRadiuses,
  Spacings,
  TouchableOpacity,
} from "react-native-ui-lib";
import { Container } from "../components/containers";
import { HeaderActions } from "../components/text/HeaderActions";
import { FooterActions } from "../components/text/FooterActions";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { COLORS } from "../config/colors";
import { useSettingsStore } from "../zustand/stores/settings";
import { DescriptionInput, TitleInput } from "../components/forms";
import { formatDate } from "../utils/formatDate";

const TextNotes = (props) => {
  const { colors } = useTheme();
  const appTheme = useSettingsStore((state) => state.appTheme);

  const bgColors = {
    THEME: colors.card,
    GREEN: COLORS.GREEN,
    HOT_PINK: COLORS.HOT_PINK,
    ORANGE: COLORS.ORANGE,
    PRIMARY: COLORS.PRIMARY,
    SECONDARY: COLORS.SECONDARY,
  };

  const [bgColor, setBgColor] = React.useState(bgColors.THEME);

  const bottomSheetModalRef = React.useRef(null);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = React.useMemo(() => ["20%", "50%", "70%"], []);

  const handleCloseModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const [text, setText] = React.useState("");
  const [prevValues, setPrevValues] = React.useState([]);
  const [nextValues, setNextValues] = React.useState([]);

  const handleTextChange = (newText) => {
    setPrevValues([...prevValues, text]);
    setText(newText);
    setNextValues([]);
  };

  const handleUndo = () => {
    if (prevValues.length > 0) {
      const prevValue = prevValues[prevValues.length - 1];
      setText(prevValue);
      setPrevValues(prevValues.slice(0, -1));
      setNextValues([text, ...nextValues]);
    }
  };

  const handleRedo = () => {
    if (nextValues.length > 0) {
      const nextValue = nextValues[0];
      setText(nextValue);
      setPrevValues([...prevValues, text]);
      setNextValues(nextValues.slice(1));
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bgColor,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
      }}
    >
      <HeaderActions
        color={
          bgColor === bgColors.THEME
            ? colors.text
            : bgColor === bgColors.SECONDARY
            ? COLORS.TEXT_DARK
            : COLORS.TEXT_LIGHT
        }
        onBack={() => {
          handleCloseModalPress();
          props.navigation.goBack();
        }}
        onUndo={() => {
          if (prevValues.length === 0) {
            return;
          }
          handleUndo();
        }}
        onRedo={() => {
          if (nextValues.length === 0) {
            return;
          }
          handleRedo();
        }}
        onSave={() => alert("save")}
      />
      <View flex padding-page marginT-s2>
        <TitleInput placeholder={"Title"} />

        <View marginT-s5>
          <Text textColor> {formatDate(new Date())}</Text>
        </View>

        <View marginT-s5 row>
          <View
            style={{
              paddingHorizontal: 2,
              backgroundColor: COLORS.PRIMARY,
              borderRadius: 5,
              marginLeft: 4,
              marginRight: 10,
            }}
          />
          <DescriptionInput
            placeholder="Description"
            value={text}
            onChangeText={handleTextChange}
          />
        </View>
      </View>
      <FooterActions
        onPress={handlePresentModalPress}
        color={
          bgColor === bgColors.THEME
            ? colors.text
            : bgColor === bgColors.ORANGE
            ? COLORS.TEXT_DARK
            : bgColor === bgColors.SECONDARY
            ? COLORS.TEXT_DARK
            : COLORS.TEXT_LIGHT
        }
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableOverDrag={false}
        index={1}
        snapPoints={snapPoints}
        enableDismissOnClose
        handleStyle={{
          backgroundColor: colors.sheet,
          borderTopRightRadius: 200,
          borderTopLeftRadius: 200,
          borderColor: colors.border,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
        backgroundStyle={{
          backgroundColor: colors.sheet,
          borderTopRightRadius: 200,
          borderTopLeftRadius: 200,
          borderColor: colors.sheet,
        }}
      >
        <View flex style={{ backgroundColor: colors.sheet }} padding-page>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {Object.values(bgColors).map((i, _) => (
              <TouchableOpacity
                key={_}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  borderColor: "white",
                  borderWidth: 1,
                  backgroundColor: i,
                }}
                onPress={() => setBgColor(i)}
              />
            ))}
          </View>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TextNotes;

// dependencies
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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// zustand
import { useSettingsStore } from "../zustand/stores/settings";

// utils & configs
import { formatDate } from "../utils/formatDate";
import { COLORS } from "../config/colors";

// custom
import { DescriptionInput, TitleInput } from "../components/forms";
import { Container } from "../components/containers";
import { HeaderActions } from "../components/text/HeaderActions";
import { FooterActions } from "../components/text/FooterActions";
import { Iconsax } from "../components/icons/Iconsax";
import CardAction from "../components/text/CardAction";
import { useNotesStore } from "../zustand/stores/notes";
import { ACTION_TYPES } from "../config/actionTypes";
import DeleteDialog from "../components/dialogs/DeleteDialog";

const TextNotes = (props) => {
  const { colors } = useTheme();
  const appTheme = useSettingsStore((state) => state.appTheme);
  const deleteNotes = useNotesStore((state) => state.deleteNotes);
  const resetActionType = useNotesStore((state) => state.resetActionType);
  const actionType = useNotesStore((state) => state.actionType);

  const bgColors = {
    THEME: colors.card,
    GREEN: COLORS.GREEN,
    HOT_PINK: COLORS.HOT_PINK,
    ORANGE: COLORS.ORANGE,
    PRIMARY: COLORS.PRIMARY,
    SECONDARY: COLORS.SECONDARY,
  };

  const [bgColor, setBgColor] = React.useState(
    props.route.params?.color ?? bgColors.THEME
  );
  const [enableEditing, setEnableEditing] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  const bottomSheetModalRef = React.useRef(null);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = React.useMemo(() => ["45%", "45%", "45%"], []);

  const handleCloseModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const [title, setTitle] = React.useState(props.route.params?.title ?? "");
  const [desc, setDesc] = React.useState(props.route.params?.description ?? "");
  const [prevValues, setPrevValues] = React.useState([]);
  const [nextValues, setNextValues] = React.useState([]);

  const handleTextChange = (newText) => {
    setPrevValues([...prevValues, desc]);
    setDesc(newText);
    setNextValues([]);
  };

  const handleUndo = () => {
    if (prevValues.length > 0) {
      const prevValue = prevValues[prevValues.length - 1];
      setDesc(prevValue);
      setPrevValues(prevValues.slice(0, -1));
      setNextValues([desc, ...nextValues]);
    }
  };

  const handleRedo = () => {
    if (nextValues.length > 0) {
      const nextValue = nextValues[0];
      setDesc(nextValue);
      setPrevValues([...prevValues, desc]);
      setNextValues(nextValues.slice(1));
    }
  };

  const handleDelete = () => {
    deleteNotes(props.route.params?.id);
  };

  // side effects
  React.useEffect(() => {
    if (actionType === ACTION_TYPES.DELETE_NOTES) {
      resetActionType();
      setShowDialog(false);
      handleCloseModalPress();
      props.navigation.goBack();
    }
  }, [actionType]);

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
        onMore={handlePresentModalPress}
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
        <TitleInput
          placeholder={"Title"}
          value={title}
          onChangeText={(value) => {
            setTitle(value);
          }}
          color={
            bgColor === bgColors.THEME
              ? colors.text
              : bgColor === bgColors.SECONDARY
              ? COLORS.TEXT_DARK
              : COLORS.TEXT_LIGHT
          }
          onPressIn={handleCloseModalPress}
          editable={enableEditing}
        />

        <View marginV-s5>
          <Text
            textColor
            style={{
              color:
                bgColor === bgColors.THEME
                  ? colors.text
                  : bgColor === bgColors.SECONDARY
                  ? COLORS.TEXT_DARK
                  : COLORS.TEXT_LIGHT,
            }}
          >
            {formatDate(new Date())} | {desc.trim().length} characters{" "}
          </Text>
        </View>

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View row>
            {/* <View
            style={{
              paddingHorizontal: 2,
              backgroundColor: COLORS.PRIMARY,
              borderRadius: 5,
              marginLeft: 4,
              marginRight: 10,
            }}
          /> */}
            <DescriptionInput
              placeholder="Description"
              value={desc}
              onChangeText={handleTextChange}
              color={
                bgColor === bgColors.THEME
                  ? colors.text
                  : bgColor === bgColors.SECONDARY
                  ? COLORS.TEXT_DARK
                  : COLORS.TEXT_LIGHT
              }
              editable={enableEditing}
              onPressIn={handleCloseModalPress}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>

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

          <View flex paddingT-s2>
            <CardAction
              icon={enableEditing ? "icon-book" : "icon-edit-2"}
              label={enableEditing ? "Enable Read Mode" : "Enable Edit Mode"}
              onAction={() => setEnableEditing(!enableEditing)}
            />
            <CardAction
              icon="icon-trash"
              label="Delete"
              onAction={() => setShowDialog(true)}
            />
            <CardAction icon="icon-tag-2" label="Labels" />
          </View>

          <View row centerH marginV-s1>
            <Text style={{ color: COLORS.TEXT_LIGHT }} marginL-s3>
              {formatDate(new Date())} | {desc.trim().length} characters{" "}
            </Text>
          </View>
        </View>
      </BottomSheetModal>

      <DeleteDialog
        visible={showDialog}
        onDismiss={() => setShowDialog(false)}
        onCancel={() => setShowDialog(false)}
        onConfirm={() => handleDelete()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TextNotes;

// dependencies
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Avatar,
  Incubator,
  Spacings,
  BorderRadiuses,
} from "react-native-ui-lib";
import { StatusBar, Platform, ScrollView, LayoutAnimation } from "react-native";
import SwitchWithIcons from "react-native-switch-with-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { createNotifications } from "react-native-notificated";
import { MasonryFlashList } from "@shopify/flash-list";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// zustand
import { useSettingsStore } from "../zustand/stores/settings";

// assets
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";
import logo from "../assets/icon.png";

// custom
import { Input } from "../components/forms";
import { Container, Row } from "../components/containers";
import { COLORS } from "../config/colors";
import { ACTIONS, BUTTON } from "../constants/actions";
import { ACTION_TYPES } from "../config/actionTypes";
import { NOTES } from "../constants/notes";
import { GridEmptyComponent } from "../components/home/GridEmptyComponent";
import { GridItem } from "../components/home/GridItem";
import { If } from "@kanzitelli/if-component";
import { useTheme } from "@react-navigation/native";
import { useAuthStore } from "../zustand/stores/auth";
import { NOTE_TYPE } from "../constants/notes";
import { ROUTES } from "../config/routes";
import { useNotesStore } from "../zustand/stores/notes";
import { Iconsax } from "../components/icons/Iconsax";

const { useNotifications } = createNotifications();

const Home = (props) => {
  // HOOKS
  const { changeTheme } = useSettingsStore();
  const appTheme = useSettingsStore((state) => state.appTheme);
  const notes = useNotesStore((state) => state?.notes);
  const actionType = useNotesStore((state) => state?.actionType);
  const deleteNotes = useNotesStore((state) => state?.deleteNotes);
  const resetActionType = useNotesStore((state) => state?.resetActionType);
  const goToAuth = useAuthStore((state) => state.goToAuth);
  const { notify } = useNotifications();
  const { colors } = useTheme();

  // STATES
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [filter, setFilter] = React.useState("");

  // MOUNT EFFECTS
  React.useEffect(() => {
    setData(notes);
  }, [actionType, notes]);

  // REFS
  const list = React.useRef(null);
  const bottomSheetModalRef = React.useRef(null);

  // MEMOS
  const snapPoints = React.useMemo(() => ["55%", "55%"], []);

  // CALLBACKS
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // FUNCTIONS
  const filteredData = data?.filter((item) =>
    item.type.toLowerCase().includes(filter)
  );

  const removeItem = (id) => {
    deleteNotes(id);
  };

  // SIDEEFFECTS
  React.useEffect(() => {
    if (actionType === ACTION_TYPES.DELETE_NOTES) {
      notify("success", {
        params: {
          title: "Note deleted",
        },
        config: {
          duration: 800,
        },
      });
      list.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      resetActionType();
    }
  }, [actionType]);

  return (
    <Container
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
      }}
    >
      {/* HEADER */}
      <View spread row centerV paddingH-s5 marginB-s2>
        <Text subHeading style={{ color: colors.text }}>
          Notes
        </Text>

        <SwitchWithIcons
          value={appTheme === "dark" ? true : false}
          onValueChange={changeTheme}
          icon={{
            true: moon,
            false: sun,
          }}
          trackColor={{
            true: COLORS.CARD_DARK,
            false: COLORS.GRAY,
          }}
          thumbColor={{
            true: COLORS.WHITE,
            false: COLORS.WHITE,
          }}
          iconColor={{ true: COLORS.DARK, false: COLORS.DARK }}
        />
      </View>

      {/* SEARCH */}
      <View
        row
        centerV
        marginH-s3
        marginT-s3
        padding-s2
        style={{
          overflow: "hidden",
          borderRadius: 1000,
          backgroundColor: colors.card,
        }}
      >
        <TouchableOpacity paddingL-10 onPress={handlePresentModalPress}>
          <Iconsax
            name="icon-setting-3"
            size={25}
            color={appTheme === "dark" ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK}
          />
        </TouchableOpacity>
        <View flex paddingH-s4>
          <Input placeholder="Search your notes" />
        </View>
        <View marginR-s2>
          <Avatar
            source={logo}
            size={35}
            onPress={() => goToAuth()}
            backgroundColor={"transparent"}
          />
        </View>
      </View>
      {/* BODY */}
      <If
        _={loading}
        _then={<View flex padding-page center></View>}
        _else={
          <View flex paddingT-s5>
            <MasonryFlashList
              showsVerticalScrollIndicator={false}
              estimatedItemSize={200}
              ref={list}
              data={filteredData}
              numColumns={2}
              keyExtractor={(item) => {
                return item.id.toString();
              }}
              ItemSeparatorComponent={() => <View padding-s2 />}
              ListEmptyComponent={GridEmptyComponent}
              renderItem={({ item, index }) => (
                <GridItem
                  item={item}
                  index={index}
                  onDelete={() => removeItem(item.id)}
                  onMove={() => {
                    removeItem(item.id);
                  }}
                  onItemPress={() => {
                    switch (item.type) {
                      case NOTE_TYPE.TEXT:
                        props.navigation.navigate(ROUTES.TEXT_NOTES, {
                          ...item,
                        });
                        break;
                      case NOTE_TYPE.DOODLE:
                        props.navigation.navigate(ROUTES.DOODLES);
                        break;
                      case NOTE_TYPE.IMAGE:
                        props.navigation.navigate(ROUTES.IMAGE_NOTES);
                        break;
                      case NOTE_TYPE.CHECKLIST:
                        props.navigation.navigate(ROUTES.CHECKLIST);
                        break;
                      default:
                        break;
                    }
                  }}
                />
              )}
              contentContainerStyle={{
                paddingBottom: 20,
                paddingLeft: Spacings.s3,
              }}
            />
          </View>
        }
      />

      {/* BOTTOM SHEET */}
      <BottomSheetModal
        enableOverDrag={false}
        ref={bottomSheetModalRef}
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
        }}
      >
        <View
          flex
          style={{ backgroundColor: colors.sheet }}
          padding-page
          paddingB-s3
        >
          <View paddingV-s3 paddingH-s1 marginB-s2>
            <Text style={{ fontSize: 25, color: COLORS.WHITE }}>Filter</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: filter === "" ? COLORS.SUCCESS : null,
            }}
            paddingV-s3
            paddingH-s5
            br30
            marginB-s2
            onPress={() => {
              setFilter("");
              handleCloseModalPress();
              list.current?.prepareForLayoutAnimationRender();
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: COLORS.WHITE,
              }}
            >
              All Notes
            </Text>
          </TouchableOpacity>

          <View marginB-s5>
            {Object.keys(NOTE_TYPE).map((i, _) => (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    NOTE_TYPE[i] === filter ? COLORS.SUCCESS : null,
                }}
                paddingV-s3
                paddingH-s5
                br30
                key={_}
                marginB-s2
                onPress={() => {
                  setFilter(NOTE_TYPE[i]);
                  handleCloseModalPress();
                  list.current?.prepareForLayoutAnimationRender();
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.WHITE,
                  }}
                >
                  {NOTE_TYPE[i] === NOTE_TYPE.TEXT
                    ? "Text Notes"
                    : NOTE_TYPE[i] === NOTE_TYPE.IMAGE
                    ? "Image Notes"
                    : NOTE_TYPE[i] === NOTE_TYPE.DOODLE
                    ? "Doodles"
                    : "Checklist"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheetModal>

      {/* FLOATING MENU */}
      <FloatingAction
        actions={ACTIONS}
        onPressItem={(name) => {
          switch (name) {
            case BUTTON.TEXT_NOTE:
              props.navigation.navigate(ROUTES.TEXT_NOTES);
              break;
            case BUTTON.DRAW_NOTES:
              props.navigation.navigate(ROUTES.DOODLES);
              break;
            case BUTTON.PHOTO_NOTE:
              props.navigation.navigate(ROUTES.IMAGE_NOTES);
              break;
            case BUTTON.CHECKLIST:
              props.navigation.navigate(ROUTES.CHECKLIST);
              break;
            default:
              break;
          }
        }}
        color={COLORS.PRIMARY}
        showBackground={false}
      />
    </Container>
  );
};

export default Home;

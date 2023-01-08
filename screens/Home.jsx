// dependencies
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Avatar,
  Incubator,
  GridList,
  Spacings,
  BorderRadiuses,
} from "react-native-ui-lib";
import { StatusBar, Platform, ScrollView, LayoutAnimation } from "react-native";
import SwitchWithIcons from "react-native-switch-with-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { createNotifications } from "react-native-notificated";
import { MasonryFlashList } from "@shopify/flash-list";
import { widthPercentageToDP } from "react-native-responsive-screen";

// zustand
import { useSettingsStore } from "../zustand/stores/settings";

// assets
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";

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

const { useNotifications } = createNotifications();

const Home = () => {
  const { changeTheme, resetActionType } = useSettingsStore();
  const appTheme = useSettingsStore((state) => state.appTheme);
  const { notify } = useNotifications();
  const [loading, setLoading] = React.useState(false);
  const list = React.useRef(null);

  const [data, setData] = React.useState(NOTES);

  const removeItem = (item) => {
    setData(
      data.filter((dataItem) => {
        return dataItem !== item;
      })
    );

    // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
    list.current?.prepareForLayoutAnimationRender();
    // After removing the item, we can start the animation.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <Container
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
      }}
    >
      {/* HEADER */}
      <View spread row centerV paddingH-s5 marginB-s2>
        <Text subHeading textColor>
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
        padding-s1
        bg-cardBg
        style={{ overflow: "hidden", borderRadius: 1000 }}
      >
        <TouchableOpacity paddingL-10>
          <MaterialCommunityIcons
            name="tune-vertical"
            size={25}
            color={appTheme === "dark" ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK}
          />
        </TouchableOpacity>
        <View flex paddingH-s4>
          <Input placeholder="Search your notes" />
        </View>
        <Avatar
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/AOh-ky106MrUOL4BTaWP0uHpHcTEZrIjpsYSeFD-MdXDB7s=s64-c-mo",
          }}
          size={45}
        />
      </View>
      {/* BODY */}
      <If
        _={loading}
        _then={<View flex padding-page center></View>}
        _else={
          <View flex  paddingT-s5 >
            <MasonryFlashList
              showsVerticalScrollIndicator={false}
              estimatedItemSize={200}
              ref={list}
              data={data}
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
                  onDelete={() => removeItem(item)}
                />
              )}
              contentContainerStyle={{
                paddingBottom:20,
                paddingLeft: Spacings.s3,
              }}
            />
          </View>
        }
      />
      {/* FLOATING MENU */}
      <FloatingAction
        actions={ACTIONS}
        onPressItem={(name) => {
          switch (name) {
            case BUTTON.TEXT_NOTE:
              alert("text note");
              break;
            case BUTTON.DRAW_NOTES:
              alert("draw note");
              break;
            case BUTTON.PHOTO_NOTE:
              alert("photo note");
              break;
            case BUTTON.CHECKLIST:
              alert("check list");
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

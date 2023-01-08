import React from "react";
import {
  View,
  Text,
  Spacings,
  BorderRadiuses,
  AnimatedImage,
  ActivityIndicator,
  TouchableOpacity,
  Checkbox,
} from "react-native-ui-lib";
import { StyleSheet, Image, Pressable } from "react-native";
import { If } from "@kanzitelli/if-component";
import { NOTES, NOTE_TYPE } from "../../constants/notes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { ZoomInEasyUp } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { useSettingsStore } from "../../zustand/stores/settings";
import { COLORS } from "../../config/colors";

export const GridItem = ({ item, onDelete, ...props }) => {
  const appTheme = useSettingsStore((state) => state.appTheme);

  const [selected, setSelected] = React.useState(0);
  const [showDelete, setShowDelete] = React.useState(false);

  return (
    <Animated.View entering={ZoomInEasyUp}>
      <Pressable
        onLongPress={() => {
          setSelected(item.id);
          setShowDelete(true);
        }}
      >
        <View
          key={props.index}
          br30
          style={[
            styles.container,
            {
              backgroundColor: item.color
                ? item.color
                : appTheme === "light"
                ? COLORS.WARNING
                : COLORS.CARD_DARK,
              zIndex: -1,
            },
          ]}
        >
          {/* HEADER ONLY IMAGE */}
          {/* ------------------------------------------------- */}
          <If
            _={item?.type === NOTE_TYPE.IMAGE && item?.image}
            _then={
              <AnimatedImage
                source={{ uri: item?.image }}
                style={styles.image}
              />
            }
          />
          {/* ------------------------------------------------- */}

          {/* HEADER DOODLE ONLY */}
          {/* ------------------------------------------------- */}
          <If
            _={item.type === NOTE_TYPE.DOODLE}
            _then={
              <AnimatedImage
                source={{ uri: item?.doodle }}
                style={styles.image}
              />
            }
          />
          {/* ------------------------------------------------- */}

          {/* CONTENT */}
          {/* ------------------------------------------------- */}
          <View padding-page>
            {/* title */}
            <If
              _={item?.title}
              _then={
                <Text
                  style={[
                    styles.title,
                    {
                      color: item?.color
                        ? COLORS.TEXT_LIGHT
                        : appTheme === "dark"
                        ? COLORS.TEXT_LIGHT
                        : COLORS.TEXT_DARK,
                    },
                  ]}
                  marginB-s4
                >
                  {item.title}
                </Text>
              }
            />
            {/* description */}
            <If
              _={item?.description}
              _then={
                <Text
                  style={[
                    styles.description,
                    {
                      color: item?.color ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK,
                    },
                  ]}
                  marginB-s4
                >
                  {item.description}
                </Text>
              }
            />

            {/* checklist */}
            <If
              _={item.type === NOTE_TYPE.CHECKLIST && item?.list}
              _then={
                <View marginB-s4>
                  {item?.list?.map((i, _) => (
                    <View row center marginB-s2 key={_}>
                      <Checkbox
                        size={10}
                        marginR-s2
                        color={
                          item?.color ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK
                        }
                        value={i.completed}
                      />
                      <Text
                        style={[
                          styles.list,
                          {
                            textDecorationLine: i.completed
                              ? "line-through"
                              : "none",
                            color: item?.color
                              ? COLORS.TEXT_LIGHT
                              : COLORS.TEXT_DARK,
                          },
                        ]}
                      >
                        {i.action}
                      </Text>
                    </View>
                  ))}
                </View>
              }
            />

            {/* footer */}
            <View center row style={styles.row}>
              <Text
                style={[
                  styles.label,
                  {
                    color: item?.color ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK,
                    borderColor: item?.color
                      ? COLORS.TEXT_LIGHT
                      : COLORS.TEXT_DARK,
                  },
                ]}
              >
                {item.label}
              </Text>
              <Text
                style={[
                  styles.date,
                  { color: item?.color ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK },
                ]}
              >
                {item.createdAt}
              </Text>
            </View>
          </View>
          {/* ------------------------------------------------- */}

          {/* DELETE MENU */}
          {/* ------------------------------------------------- */}
          <If
            _={showDelete && selected === item.id}
            _then={
              <View style={[styles.delete]}>
                <TouchableOpacity onPress={() => setShowDelete(false)}>
                  <AntDesign name="back" color="white" size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                  <AntDesign name="delete" color="white" size={20} />
                </TouchableOpacity>
              </View>
            }
          />
          {/* ------------------------------------------------- */}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: wp(45),
  },

  title: {
    fontSize: 18,
    fontFamily: "medium",
  },

  description: {
    fontSize: 15,
    fontFamily: "light",
  },

  row: {
    justifyContent: "flex-start",
  },

  image: {
    height: 200,
    width: wp(45),
    resizeMode: "cover",
    borderRadius: BorderRadiuses.br30,
  },

  label: {
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: COLORS.TEXT_DARK,
    fontSize: 10,
    marginRight: 20,
    fontFamily: "light",
  },

  date: {
    fontSize: 10,
    color: COLORS.TEXT_DARK,
    fontFamily: "light",
  },

  delete: {
    backgroundColor: COLORS.ERROR,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  list: {
    fontSize: 12,
    color: COLORS.TEXT_DARK,
    fontFamily: "extraLight",
  },
});

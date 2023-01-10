import React from "react";
import {
  View,
  Text,
  Spacings,
  BorderRadiuses,
  AnimatedImage,
  TouchableOpacity,
  Checkbox,
} from "react-native-ui-lib";
import {
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  PanResponder,
} from "react-native";
import { If } from "@kanzitelli/if-component";
import { NOTES, NOTE_TYPE } from "../../constants/notes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, {
  BounceInUp,
  withSpring,
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { useSettingsStore } from "../../zustand/stores/settings";
import { COLORS } from "../../config/colors";

export const GridItem = ({
  item,
  onDelete,
  onItemPress,
  onMove,
  index,
  deleteMode,
}) => {
  const appTheme = useSettingsStore((state) => state.appTheme);

  const [selected, setSelected] = React.useState(0);
  const [showDelete, setShowDelete] = React.useState(false);

  const pressed = useSharedValue(false);
  const startingPosition = 1;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },

    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },

    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pressed.value ? 1.7 : 1 }],
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    // <PanGestureHandler
    //   onGestureEvent={ eventHandler}
    //   onHandlerStateChange={({ nativeEvent }) => {
    //     if (nativeEvent.state === State.END) {
    //     //  deleteMode && onMove();
    //     }
    //   }}
    // >
    <Animated.View entering={BounceInUp} style={[uas]}>
      <Pressable
        onLongPress={() => {
          setSelected(item.id);
          setShowDelete(true);
        }}
        onPress={() => {
          setShowDelete(false);
          if (!showDelete) {
            onItemPress();
          }
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      >
        <View
          key={index}
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
                containerStyle={{
                  backgroundColor: COLORS.WARNING,
                  borderRadius: BorderRadiuses.br30,
                }}
                loader={<ActivityIndicator color={COLORS.INFO} />}
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
                  numberOfLines={
                    item.type === (NOTE_TYPE.IMAGE || NOTE_TYPE.DOODLE) ? 2 : 6
                  }
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
                  {
                    color: item?.color ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK,
                  },
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
                <TouchableOpacity
                  flex
                  center
                  onPress={() => setShowDelete(false)}
                >
                  <AntDesign name="back" color="white" size={20} />
                </TouchableOpacity>

                <TouchableOpacity flex center onPress={onDelete}>
                  <AntDesign name="delete" color="white" size={20} />
                </TouchableOpacity>
              </View>
            }
          />
          {/* ------------------------------------------------- */}
        </View>
      </Pressable>
    </Animated.View>
    // </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: wp(45),
  },

  title: {
    fontSize: 16,
    fontFamily: "medium",
  },

  description: {
    fontSize: 14,
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
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    fontSize: 12,
    color: COLORS.TEXT_DARK,
    fontFamily: "extraLight",
  },
});

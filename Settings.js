import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

const CONTENT = [
  {
    isExpanded: false,

    category_name: "Milk",

    subcategory: [
      { id: 1, val: "Cow Milk -> 3 days" },

      { id: 2, val: "Plant Milk -> 5 days" },
    ],
  },

  {
    isExpanded: false,

    category_name: "Cheese",

    subcategory: [
      { id: 3, val: "Cheese -> 6 days " },

      { id: 4, val: "White cheese -> 2 days" },

      { id: 5, val: "Cottage cheese -> 2 days" },

      { id: 6, val: "Ricotta -> 5 days" },

      { id: 7, val: "Mozarella -> 2 days" },

      { id: 8, val: "Blue cheese -> 8 days" },
    ],
  },

  {
    isExpanded: false,

    category_name: "Yogurt",

    subcategory: [
      { id: 9, val: "Yogurt -> 1 day" },

      { id: 10, val: "Fruit jogurt -> 2 days" },
    ],
  },

  {
    isExpanded: false,

    category_name: "Cream",

    subcategory: [
      { id: 11, val: "Cream -> 2 days" },

      { id: 12, val: "Sour cream -> 2 days" },
    ],
  },

  {
    isExpanded: false,

    category_name: "Butter",

    subcategory: [{ id: 9, val: "Butter -> 2 weeks" }],
  },
];

const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setlayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setlayoutHeight(null);
    } else {
      setlayoutHeight(0);
    }
  }, [item.isExpanded]);
  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={onClickFunction}>
        <Text style={styles.itemText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: "hidden",
        }}
      >
        {item.subcategory.map((item, key) => (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>
              {key}. {item.val}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const Settings = () => {
  const [multiSelect, setmultiSelect] = useState(false);
  const [listDataSource, setlistDataSource] = useState(CONTENT);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]["isExpanded"] = !array[index]["isExpanded"];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
          : (array[placeindex]["isExpanded"] = false)
      );
    }
    setlistDataSource(array);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            Expiration date of dairy products
          </Text>
          <TouchableOpacity onPress={() => setmultiSelect(!multiSelect)}>
            <Text style={styles.headerButton}>
              {multiSelect
                ? "Enable Single \n Expand"
                : "Enable Multiple \n Expand"}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              item={item}
              onClickFunction={() => {
                updateLayout(key);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  headerButton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  item: {
    backgroundColor: "slateblue",
    padding: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#c8c8c8",
    width: "100%",
  },
});

export default Settings;

import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { categories } from "../services/fakeStoreApi";
import { cardShadow, colors } from "../styles/theme";

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => onSelectCategory("")}
        style={[styles.filter, !selectedCategory && styles.activeFilter]}
      >
        <Text
          style={[styles.filterText, !selectedCategory && styles.activeText]}
        >
          Todos
        </Text>
      </TouchableOpacity>

      {categories.map((category) => {
        const active = selectedCategory === category;

        return (
          <TouchableOpacity
            activeOpacity={0.75}
            key={category}
            onPress={() => onSelectCategory(category)}
            style={[styles.filter, active && styles.activeFilter]}
          >
            <Text style={[styles.filterText, active && styles.activeText]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 16,
  },
  filter: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    ...cardShadow,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.primarySoft,
    fontSize: 14,
    fontWeight: "800",
  },
  activeText: {
    color: colors.white,
  },
});

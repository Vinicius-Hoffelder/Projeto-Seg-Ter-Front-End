import { StyleSheet, Text, TextInput, View } from "react-native";

import { cardShadow, colors } from "../styles/theme";

export default function AppInput({ label, style, ...inputProps }) {
  return (
    <View style={[styles.group, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#94A3B8"
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 14,
  },
  label: {
    color: colors.primarySoft,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...cardShadow,
  },
});

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { cardShadow, colors } from "../styles/theme";

export default function LoadingState({ message = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    margin: 20,
    padding: 24,
    ...cardShadow,
  },
  message: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },
});

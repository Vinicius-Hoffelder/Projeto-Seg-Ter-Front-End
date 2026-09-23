import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { cardShadow, colors } from "../styles/theme";

export default function AppButton({
  children,
  disabled = false,
  onPress,
  style,
  variant = "primary",
}) {
  const secondary = variant === "secondary";

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        secondary ? styles.secondaryButton : styles.primaryButton,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          secondary ? styles.secondaryText : styles.primaryText,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 13,
    ...cardShadow,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.55,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.primary,
  },
});

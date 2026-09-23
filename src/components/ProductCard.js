import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { formatPriceInReal } from "../services/fakeStoreApi";
import { cardShadow, colors } from "../styles/theme";

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.78} onPress={onPress} style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          resizeMode="contain"
          source={{ uri: product.image }}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formatPriceInReal(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 14,
    padding: 14,
    ...cardShadow,
  },
  imageBox: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    height: 90,
    justifyContent: "center",
    marginRight: 14,
    width: 90,
  },
  image: {
    height: 72,
    width: 72,
  },
  content: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
  },
  price: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 8,
  },
});

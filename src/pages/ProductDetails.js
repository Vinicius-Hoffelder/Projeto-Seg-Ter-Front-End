import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import LoadingState from "../components/LoadingState";
import { formatPriceInReal, getProductById } from "../services/fakeStoreApi";
import { cardShadow, colors } from "../styles/theme";

export default function ProductDetails({ route }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { productId } = route.params;

  useEffect(() => {
    let isActive = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setErrorMessage("");

        // A tela de detalhes tambem consulta a API, agora pelo id recebido.
        const data = await getProductById(productId);

        if (isActive) {
          setProduct(data);
        }
      } catch (_error) {
        if (isActive) {
          setProduct(null);
          setErrorMessage("Nao foi possivel carregar o produto.");
          Alert.alert("Erro", "Nao foi possivel carregar o produto.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [productId]);

  if (loading) {
    return <LoadingState message="Carregando produto..." />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {product ? (
        <View style={styles.card}>
          <View style={styles.imageBox}>
            <Image
              resizeMode="contain"
              source={{ uri: product.image }}
              style={styles.image}
            />
          </View>

          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.category}>{product.category}</Text>

          <Text style={styles.sectionTitle}>Descricao</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Preco</Text>
          <Text style={styles.price}>{formatPriceInReal(product.price)}</Text>
        </View>
      ) : (
        <Text style={styles.error}>
          {errorMessage || "Produto nao encontrado."}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: 20,
    paddingBottom: 38,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    ...cardShadow,
  },
  imageBox: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 14,
    height: 250,
    justifyContent: "center",
    marginBottom: 18,
  },
  image: {
    height: 220,
    width: "100%",
  },
  name: {
    color: colors.text,
    fontSize: 23,
    fontWeight: "900",
    lineHeight: 29,
  },
  category: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 22,
  },
  description: {
    color: colors.primarySoft,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  price: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 6,
  },
  error: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    color: colors.danger,
    fontSize: 16,
    fontWeight: "900",
    padding: 18,
    textAlign: "center",
    ...cardShadow,
  },
});

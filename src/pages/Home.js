import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import CategoryFilter from "../components/CategoryFilter";
import LoadingState from "../components/LoadingState";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/fakeStoreApi";
import { cardShadow, colors } from "../styles/theme";

export default function Home({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const user = route.params?.user;

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setErrorMessage("");

        // Com categoria vazia, a tela carrega todos os produtos.
        const data = await getProducts(selectedCategory);

        if (isActive) {
          setProducts(data);
        }
      } catch (_error) {
        if (isActive) {
          setProducts([]);
          setErrorMessage("Nao foi possivel carregar os produtos.");
          Alert.alert("Erro", "Nao foi possivel carregar os produtos.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [selectedCategory]);

  function renderHeader() {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.title}>Produtos da loja</Text>
        <Text style={styles.subtitle}>
          Ola, {user?.name?.firstname || user?.username || "aluno"}. Filtre por
          categoria ou veja todos os produtos disponiveis.
        </Text>

        <CategoryFilter
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {selectedCategory ? (
          <AppButton
            onPress={() => setSelectedCategory("")}
            style={styles.clearButton}
            variant="secondary"
          >
            Limpar filtro
          </AppButton>
        ) : null}

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {loading ? (
        <LoadingState message="Carregando produtos..." />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={products}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          }
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <ProductCard
              onPress={() =>
                navigation.navigate("ProductDetails", { productId: item.id })
              }
              product={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  list: {
    padding: 20,
    paddingBottom: 38,
  },
  listHeader: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
    ...cardShadow,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
    marginTop: 8,
  },
  clearButton: {
    marginTop: 2,
  },
  error: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 14,
    textAlign: "center",
  },
  emptyText: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
    padding: 18,
    textAlign: "center",
    ...cardShadow,
  },
});

import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import LoadingState from "../components/LoadingState";
import { loginWithFakeStore } from "../services/fakeStoreApi";
import { cardShadow, colors } from "../styles/theme";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Preencha username e password.");
      Alert.alert("Login", "Preencha username e password.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // A API so autentica usuarios que existem no endpoint /users.
      const session = await loginWithFakeStore(username.trim(), password);
      navigation.replace("Home", { user: session.user });
    } catch (_error) {
      setErrorMessage("Usuario ou senha invalidos.");
      Alert.alert("Erro no login", "Usuario ou senha invalidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Fake Store</Text>
          <Text style={styles.subtitle}>
            Entre com um usuario existente da Fake Store API.
          </Text>

          <AppInput
            autoCapitalize="none"
            label="Username"
            onChangeText={setUsername}
            placeholder="Digite o username"
            value={username}
          />

          <AppInput
            label="Password"
            onChangeText={setPassword}
            placeholder="Digite a senha"
            secureTextEntry
            value={password}
          />

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          {loading ? (
            <LoadingState message="Autenticando..." />
          ) : (
            <AppButton onPress={handleLogin}>Entrar</AppButton>
          )}

          <Text style={styles.tip}>
            Para conferir usuarios disponiveis, acesse
            https://fakestoreapi.com/users.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    ...cardShadow,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
    marginTop: 8,
    textAlign: "center",
  },
  error: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  tip: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 18,
    textAlign: "center",
  },
});

import { ScrollView, StyleSheet, Text, View } from "react-native";

import grupo from "../data/grupo";
import { cardShadow, colors } from "../styles/theme";

export default function GroupInfo() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Desenvolvedores do app</Text>
        <Text style={styles.description}>
          Aplicativo desenvolvido para praticar consumo de API, autenticacao,
          listagem com filtro, detalhes de produto e navegacao entre telas.
        </Text>
      </View>

      {grupo.map((membro) => (
        <View key={membro.id} style={styles.memberCard}>
          <Text style={styles.memberName}>{membro.nome}</Text>
          <Text style={styles.memberRa}>RA: {membro.ra}</Text>
        </View>
      ))}
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
    marginBottom: 16,
    padding: 18,
    ...cardShadow,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  memberCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
    ...cardShadow,
  },
  memberName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  memberRa: {
    color: colors.primarySoft,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8,
  },
});

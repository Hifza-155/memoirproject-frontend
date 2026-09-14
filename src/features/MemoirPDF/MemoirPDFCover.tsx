// PDF cover component
import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface MemoirPDFCoverProps {
  memoirTitle: string;
  personName: string;
  years?: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FBF8F1",
    padding: 48,
    color: "#351A23",
    fontFamily: "Times-Roman",
  },

  border: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#80612F",
    padding: 28,
    justifyContent: "space-between",
  },

  topLabel: {
    textAlign: "center",
    fontSize: 9,
    letterSpacing: 2,
    color: "#80612F",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  smallTitle: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#713C48",
    marginBottom: 18,
    textAlign: "center",
  },

  name: {
    fontSize: 34,
    textAlign: "center",
    color: "#351A23",
    marginBottom: 12,
  },

  divider: {
    width: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#B99555",
    marginBottom: 16,
  },

  memoirTitle: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#713C48",
    textAlign: "center",
  },

  years: {
    marginTop: 10,
    fontSize: 10,
    color: "#80612F",
    letterSpacing: 2,
  },

  footer: {
    textAlign: "center",
    fontSize: 8,
    color: "#80612F",
    letterSpacing: 1,
  },
});

export default function MemoirPDFCover({
  memoirTitle,
  personName,
  years,
}: MemoirPDFCoverProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.border}>
        <Text style={styles.topLabel}>SPECIAL MEMORIAL EDITION</Text>

        <View style={styles.center}>
          <Text style={styles.smallTitle}>A LIFE REMEMBERED</Text>

          <Text style={styles.name}>{personName}</Text>

          <View style={styles.divider} />

          <Text style={styles.memoirTitle}>{memoirTitle}</Text>

          {years && <Text style={styles.years}>{years}</Text>}
        </View>

        <Text style={styles.footer}>MEMORIES PRESERVED WITH LOVE</Text>
      </View>
    </Page>
  );
}
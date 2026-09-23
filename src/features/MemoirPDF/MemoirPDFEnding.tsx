import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface MemoirPDFEndingProps {
  personName: string;
  years?: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FBF8F1",
    padding: 48,
    fontFamily: "Times-Roman",
    color: "#351A23",
  },

  border: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#80612F",
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#80612F",
    marginBottom: 22,
    textAlign: "center",
  },

  title: {
    fontSize: 28,
    color: "#351A23",
    marginBottom: 20,
    textAlign: "center",
  },

  divider: {
    width: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#B99555",
    marginBottom: 28,
  },

  quote: {
    maxWidth: 390,
    fontSize: 15,
    lineHeight: 1.7,
    color: "#4A3028",
    textAlign: "center",
    marginBottom: 30,
  },

  personName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#351A23",
    marginBottom: 5,
    textAlign: "center",
  },

  years: {
    fontSize: 9,
    color: "#80612F",
    letterSpacing: 1,
    marginBottom: 28,
    textAlign: "center",
  },

  closing: {
    maxWidth: 370,
    fontSize: 10,
    lineHeight: 1.6,
    color: "#80612F",
    textAlign: "center",
  },

  footer: {
    position: "absolute",
    bottom: 38,
    left: 54,
    right: 54,
    textAlign: "center",
    fontSize: 8,
    color: "#80612F",
    letterSpacing: 1,
  },
});

export default function MemoirPDFEnding({
  personName,
  years,
}: MemoirPDFEndingProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.border}>
        <Text style={styles.eyebrow}>A LIFE REMEMBERED</Text>

        <Text style={styles.title}>The Story Continues</Text>

        <View style={styles.divider} />

        <Text style={styles.quote}>
          People we love never truly leave us. They remain in the stories we
          tell, the laughter we remember and the love we carry forward.
        </Text>

        <Text style={styles.personName}>{personName}</Text>

        {years && <Text style={styles.years}>{years}</Text>}

        <Text style={styles.closing}>
          This memoir is not an ending. It is a place where memories can
          continue to live,be remembered and be shared for generations to
          come.
        </Text>

        <Text style={styles.footer}>
          REMEMBERED WITH LOVE · CARRIED IN OUR HEARTS
        </Text>
      </View>
    </Page>
  );
}
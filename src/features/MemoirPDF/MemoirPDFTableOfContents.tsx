import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface TOCItem {
  title: string;
  page: number;
}

interface MemoirPDFTableOfContentsProps {
  items: TOCItem[];
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
  },

  header: {
    marginBottom: 38,
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#80612F",
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    color: "#351A23",
  },

  divider: {
    marginTop: 16,
    width: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#B99555",
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 18,
  },

  itemTitle: {
    fontSize: 12,
    color: "#713C48",
  },

  dots: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#D8CFC4",
    marginHorizontal: 8,
    marginBottom: 2,
  },

  pageNumber: {
    fontSize: 10,
    color: "#80612F",
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

export default function MemoirPDFTableOfContents({
  items,
}: MemoirPDFTableOfContentsProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.border}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CONTENTS</Text>

          <Text style={styles.title}>Table of Contents</Text>

          <View style={styles.divider} />
        </View>

        {items.map((item) => (
          <View key={`${item.title}-${item.page}`} style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>

            <View style={styles.dots} />

            <Text style={styles.pageNumber}>{item.page}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          MEMORIES PRESERVED WITH LOVE
        </Text>
      </View>
    </Page>
  );
}
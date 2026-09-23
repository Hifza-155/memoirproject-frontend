import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface WrittenMemory {
  id: string;
  contributor: {
    name: string;
    relationship: string;
    storyDate: string;
  };
  paragraphs: string[];
}

interface MemoirPDFWrittenMemoryProps {
  title: string;
  memories: WrittenMemory[];
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
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#80612F",
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    color: "#351A23",
    marginBottom: 18,
  },

  divider: {
    width: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#B99555",
    marginBottom: 22,
  },

  memoryBlock: {
    marginBottom: 18,
  },

  contributorName: {
    fontSize: 11,
    color: "#351A23",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },

  contributorInfo: {
    fontSize: 8,
    color: "#80612F",
    marginBottom: 9,
  },

  content: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#4A3028",
  },

  paragraph: {
    marginBottom: 7,
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

export default function MemoirPDFWrittenMemory({
  title,
  memories,
}: MemoirPDFWrittenMemoryProps) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.border}>
        <Text style={styles.eyebrow}>WRITTEN MEMORY</Text>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.divider} />

        {memories.map((memory) => (
          <View key={memory.id} style={styles.memoryBlock}>
            <Text style={styles.contributorName}>
              {memory.contributor.name}
            </Text>

            <Text style={styles.contributorInfo}>
              {memory.contributor.relationship} · {memory.contributor.storyDate}
            </Text>

            {memory.paragraphs.map((paragraph, index) => (
              <Text key={index} style={[styles.content, styles.paragraph]}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          MEMORIES PRESERVED WITH LOVE
        </Text>
      </View>
    </Page>
  );
}
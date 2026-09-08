import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface MediaMemory {
  id: string;
  contributor: {
    name: string;
    relationship: string;
    storyDate: string;
  };
  media: {
    id: string;
    type: "image" | "video";
    src: string;
    caption?: string;
  }[];
  story?: string;
}

interface MemoirPDFMediaMemoryProps {
  title: string;
  memories: MediaMemory[];
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
    marginBottom: 20,
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
    marginBottom: 12,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    maxWidth: 440,
    maxHeight: 500,
    objectFit: "contain",
  },

  videoPlaceholder: {
    width: 440,
    height: 260,
    borderWidth: 1,
    borderColor: "#D8CFC4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  videoText: {
    fontSize: 12,
    color: "#713C48",
  },

  caption: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#80612F",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 8,
  },

  story: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#4A3028",
    marginTop: 8,
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

export default function MemoirPDFMediaMemory({
  title,
  memories,
}: MemoirPDFMediaMemoryProps) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.border}>
        <Text style={styles.eyebrow}>MEDIA MEMORY</Text>

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

            {memory.media.map((item) => (
              <View key={item.id}>
                {item.type === "image" && item.src ? (
                  <View style={styles.imageContainer}>
                    <Image src={item.src} style={styles.image} />
                  </View>
                ) : (
                  <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoText}>Video Memory</Text>
                  </View>
                )}

                {item.caption && (
                  <Text style={styles.caption}>{item.caption}</Text>
                )}
              </View>
            ))}

            {memory.story && (
              <Text style={styles.story}>{memory.story}</Text>
            )}
          </View>
        ))}

        <Text style={styles.footer}>
          MEMORIES PRESERVED WITH LOVE
        </Text>
      </View>
    </Page>
  );
}
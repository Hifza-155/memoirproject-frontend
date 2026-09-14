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

  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  mediaCard: {
    width: "48%",
    marginBottom: 16,
  },

  imageContainer: {
    width: "100%",
    height: 145,
    backgroundColor: "#F3EEE6",
    borderWidth: 1,
    borderColor: "#D8CFC4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  videoPlaceholder: {
    width: "100%",
    height: 145,
    backgroundColor: "#F3EEE6",
    borderWidth: 1,
    borderColor: "#D8CFC4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  videoText: {
    fontSize: 12,
    color: "#713C48",
    marginBottom: 4,
  },

  videoSubtext: {
    fontSize: 8,
    color: "#80612F",
  },

  caption: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: "#80612F",
    textAlign: "left",
    marginTop: 4,
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
    <>
      {memories.map((memory) => (
        <Page key={memory.id} size="A4" style={styles.page}>
          <View style={styles.border}>
            <Text style={styles.eyebrow}>MEDIA MEMORY</Text>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.divider} />

            <View style={styles.memoryBlock}>
              <Text style={styles.contributorName}>
                {memory.contributor.name}
              </Text>

              <Text style={styles.contributorInfo}>
                {memory.contributor.relationship} ·{" "}
                {memory.contributor.storyDate}
              </Text>

              <View style={styles.mediaGrid}>
                {memory.media.map((item) => (
                  <View key={item.id} style={styles.mediaCard}>
                    {item.type === "image" && item.src ? (
                      <View style={styles.imageContainer}>
                        <Image
                          src={item.src}
                          style={styles.image}
                        />
                      </View>
                    ) : (
                      <View style={styles.videoPlaceholder}>
                        <Text style={styles.videoText}>
                          ▶ Video Memory
                        </Text>

                        <Text style={styles.videoSubtext}>
                          A moment captured in motion
                        </Text>
                      </View>
                    )}

                    {item.caption && (
                      <Text style={styles.caption}>
                        {item.caption}
                      </Text>
                    )}
                  </View>
                ))}
              </View>

              {memory.story && (
                <Text style={styles.story}>{memory.story}</Text>
              )}
            </View>

            <Text style={styles.footer}>
              MEMORIES PRESERVED WITH LOVE
            </Text>
          </View>
        </Page>
      ))}
    </>
  );
}
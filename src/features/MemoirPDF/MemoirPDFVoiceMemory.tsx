import { Page, StyleSheet, Text, View, Svg, Path } from "@react-pdf/renderer";

interface VoiceMemory {
  id: string;
  contributor: {
    name: string;
    relationship: string;
    storyDate: string;
  };
  duration: string;
  transcript: string;
}

interface MemoirPDFVoiceMemoryProps {
  title: string;
  memories: VoiceMemory[];
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
    marginBottom: 10,
  },

  voiceNote: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 58,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D8CFC4",
    borderRadius: 29,
    marginBottom: 14,
  },

  micCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#713C48",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  playButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  playIcon: {
    fontSize: 12,
    color: "#80612F",
  },

  waveform: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
  },

  waveShort: {
    width: 2,
    height: 8,
    backgroundColor: "#B99555",
  },

  waveMedium: {
    width: 2,
    height: 16,
    backgroundColor: "#B99555",
  },

  waveTall: {
    width: 2,
    height: 27,
    backgroundColor: "#B99555",
  },

  duration: {
    fontSize: 8,
    color: "#80612F",
    marginLeft: 8,
  },

  transcriptionLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#80612F",
    marginBottom: 10,
  },

  transcript: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#4A3028",
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

export default function MemoirPDFVoiceMemory({
  title,
  memories,
}: MemoirPDFVoiceMemoryProps) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.border}>
        <Text style={styles.eyebrow}>VOICE MEMORY</Text>

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

            <View style={styles.voiceNote}>
              <View style={styles.micCircle}>
                <Svg width="20" height="24" viewBox="0 0 24 24">
                  <Path
                    d="M12 15C14.2 15 16 13.2 16 11V6C16 3.8 14.2 2 12 2C9.8 2 8 3.8 8 6V11C8 13.2 9.8 15 12 15Z"
                    fill="#B99555"
                  />
                  <Path
                    d="M19 11C19 14.87 15.87 18 12 18C8.13 18 5 14.87 5 11"
                    fill="none"
                    stroke="#B99555"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M12 18V22M9 22H15"
                    fill="none"
                    stroke="#B99555"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>

              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>

              <View style={styles.waveform}>
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
                <View style={styles.waveMedium} />
                <View style={styles.waveShort} />
                <View style={styles.waveTall} />
                <View style={styles.waveMedium} />
                <View style={styles.waveShort} />
                <View style={styles.waveTall} />
                <View style={styles.waveMedium} />
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
                <View style={styles.waveShort} />
                <View style={styles.waveMedium} />
                <View style={styles.waveTall} />
              </View>

              <Text style={styles.duration}>{memory.duration}</Text>
            </View>

            <Text style={styles.transcriptionLabel}>
              TRANSCRIPTION
            </Text>

            <Text style={styles.transcript}>
              {memory.transcript}
            </Text>
          </View>
        ))}

        <Text style={styles.footer}>
          MEMORIES PRESERVED WITH LOVE
        </Text>
      </View>
    </Page>
  );
}
import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);

  const zodiacSigns = [
    {
      name: "Aries",
      dates: "Mar 21 - Apr 19",
      symbol: "♈",
      element: "Fire",
      traits: "Courageous, energetic, willful, pioneering",
    },
    {
      name: "Taurus",
      dates: "Apr 20 - May 20",
      symbol: "♉",
      element: "Earth",
      traits: "Patient, reliable, devoted, persistent",
    },
    {
      name: "Gemini",
      dates: "May 21 - Jun 20",
      symbol: "♊",
      element: "Air",
      traits: "Adaptable, versatile, communicative, witty",
    },
    {
      name: "Cancer",
      dates: "Jun 21 - Jul 22",
      symbol: "♋",
      element: "Water",
      traits: "Tenacious, highly imaginative, loyal, emotional",
    },
    {
      name: "Leo",
      dates: "Jul 23 - Aug 22",
      symbol: "♌",
      element: "Fire",
      traits: "Creative, passionate, generous, warm-hearted",
    },
    {
      name: "Virgo",
      dates: "Aug 23 - Sep 22",
      symbol: "♍",
      element: "Earth",
      traits: "Loyal, analytical, kind, hardworking",
    },
    {
      name: "Libra",
      dates: "Sep 23 - Oct 22",
      symbol: "♎",
      element: "Air",
      traits: "Peaceful, fair, diplomatic, gracious",
    },
    {
      name: "Scorpio",
      dates: "Oct 23 - Nov 21",
      symbol: "♏",
      element: "Water",
      traits: "Passionate, stubborn, resourceful, brave",
    },
    {
      name: "Sagittarius",
      dates: "Nov 22 - Dec 21",
      symbol: "♐",
      element: "Fire",
      traits: "Optimistic, loves freedom, adventurous, generous",
    },
    {
      name: "Capricorn",
      dates: "Dec 22 - Jan 19",
      symbol: "♑",
      element: "Earth",
      traits: "Responsible, disciplined, self-controlled",
    },
    {
      name: "Aquarius",
      dates: "Jan 20 - Feb 18",
      symbol: "♒",
      element: "Air",
      traits: "Progressive, original, independent, humanitarian",
    },
    {
      name: "Pisces",
      dates: "Feb 19 - Mar 20",
      symbol: "♓",
      element: "Water",
      traits: "Compassionate, artistic, intuitive, gentle",
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#2D1B69", dark: "#1A0F3D" }}
      headerImage={
        <ThemedView style={styles.mysticHeader}>
          <ThemedText style={styles.mysticSymbol}>✨</ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.mysticTitle}>
          Mystic Library
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          📚 Ancient Wisdom & Mystical Knowledge 📚
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.contentContainer}>
        <Collapsible title="🔮 Fortune Telling Methods">
          <ThemedText style={styles.sectionText}>
            Throughout history, mystics have used various methods to divine the
            future and understand the present.
          </ThemedText>
          <ThemedView style={styles.methodCard}>
            <ThemedText style={styles.methodTitle}>
              Crystal Ball Gazing
            </ThemedText>
            <ThemedText style={styles.methodDescription}>
              The crystal ball acts as a window to the subconscious mind,
              revealing hidden truths and future possibilities through symbolic
              visions.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.methodCard}>
            <ThemedText style={styles.methodTitle}>Tarot Reading</ThemedText>
            <ThemedText style={styles.methodDescription}>
              Ancient cards that reflect the archetypal journey of life,
              offering guidance through symbolic imagery and intuitive
              interpretation.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.methodCard}>
            <ThemedText style={styles.methodTitle}>Astrology</ThemedText>
            <ThemedText style={styles.methodDescription}>
              The study of celestial bodies and their influence on human
              affairs, revealing personality traits and life patterns.
            </ThemedText>
          </ThemedView>
        </Collapsible>

        <Collapsible title="⭐ Zodiac Signs & Elements">
          <ThemedText style={styles.sectionText}>
            Discover your astrological sign and understand the elements that
            shape your personality and destiny.
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.zodiacContainer}
          >
            {zodiacSigns.map((sign, index) => (
              <TouchableOpacity
                key={index}
                style={styles.zodiacCard}
                onPress={() =>
                  setSelectedZodiac(
                    selectedZodiac === sign.name ? null : sign.name
                  )
                }
              >
                <ThemedText style={styles.zodiacSymbol}>
                  {sign.symbol}
                </ThemedText>
                <ThemedText style={styles.zodiacName}>{sign.name}</ThemedText>
                <ThemedText style={styles.zodiacDates}>{sign.dates}</ThemedText>
                {selectedZodiac === sign.name && (
                  <ThemedView style={styles.zodiacDetails}>
                    <ThemedText style={styles.zodiacElement}>
                      Element: {sign.element}
                    </ThemedText>
                    <ThemedText style={styles.zodiacTraits}>
                      {sign.traits}
                    </ThemedText>
                  </ThemedView>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Collapsible>

        <Collapsible title="🌙 Moon Phases & Energy">
          <ThemedText style={styles.sectionText}>
            The moon's cycles influence our emotions and energy levels.
            Understanding these phases can enhance your mystical practice.
          </ThemedText>
          <ThemedView style={styles.moonPhaseCard}>
            <ThemedText style={styles.moonPhaseTitle}>New Moon 🌑</ThemedText>
            <ThemedText style={styles.moonPhaseDescription}>
              A time for new beginnings, setting intentions, and planting seeds
              for the future.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.moonPhaseCard}>
            <ThemedText style={styles.moonPhaseTitle}>Full Moon 🌕</ThemedText>
            <ThemedText style={styles.moonPhaseDescription}>
              Peak energy for manifestation, completion, and releasing what no
              longer serves you.
            </ThemedText>
          </ThemedView>
        </Collapsible>

        <Collapsible title="🔮 Daily Mystical Practices">
          <ThemedText style={styles.sectionText}>
            Simple practices to enhance your spiritual connection and intuition.
          </ThemedText>
          <ThemedView style={styles.practiceCard}>
            <ThemedText style={styles.practiceTitle}>
              Morning Meditation
            </ThemedText>
            <ThemedText style={styles.practiceDescription}>
              Start your day with 10 minutes of quiet reflection to set positive
              intentions.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.practiceCard}>
            <ThemedText style={styles.practiceTitle}>
              Crystal Cleansing
            </ThemedText>
            <ThemedText style={styles.practiceDescription}>
              Cleanse your crystals under running water or moonlight to restore
              their energy.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.practiceCard}>
            <ThemedText style={styles.practiceTitle}>
              Gratitude Journal
            </ThemedText>
            <ThemedText style={styles.practiceDescription}>
              Write down three things you're grateful for each day to attract
              more abundance.
            </ThemedText>
          </ThemedView>
        </Collapsible>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mysticHeader: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(230, 184, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#E6B8FF",
    position: "absolute",
    bottom: -50,
    left: "50%",
    marginLeft: -75,
  },
  mysticSymbol: {
    fontSize: 60,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  mysticTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E6B8FF",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#B8A9FF",
  },
  contentContainer: {
    flex: 1,
  },
  sectionText: {
    fontSize: 16,
    color: "#B8A9FF",
    lineHeight: 24,
    marginBottom: 15,
  },
  methodCard: {
    backgroundColor: "rgba(45, 27, 105, 0.3)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6B8FF",
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E6B8FF",
    marginBottom: 5,
  },
  methodDescription: {
    fontSize: 14,
    color: "#B8A9FF",
    lineHeight: 20,
  },
  zodiacContainer: {
    marginVertical: 10,
  },
  zodiacCard: {
    backgroundColor: "rgba(45, 27, 105, 0.3)",
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6B8FF",
    minWidth: 100,
  },
  zodiacSymbol: {
    fontSize: 30,
    marginBottom: 5,
  },
  zodiacName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#E6B8FF",
    textAlign: "center",
  },
  zodiacDates: {
    fontSize: 10,
    color: "#B8A9FF",
    textAlign: "center",
  },
  zodiacDetails: {
    marginTop: 10,
    alignItems: "center",
  },
  zodiacElement: {
    fontSize: 10,
    color: "#E6B8FF",
    fontWeight: "bold",
  },
  zodiacTraits: {
    fontSize: 9,
    color: "#B8A9FF",
    textAlign: "center",
    marginTop: 3,
  },
  moonPhaseCard: {
    backgroundColor: "rgba(45, 27, 105, 0.3)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6B8FF",
  },
  moonPhaseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E6B8FF",
    marginBottom: 5,
  },
  moonPhaseDescription: {
    fontSize: 14,
    color: "#B8A9FF",
    lineHeight: 20,
  },
  practiceCard: {
    backgroundColor: "rgba(45, 27, 105, 0.3)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6B8FF",
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E6B8FF",
    marginBottom: 5,
  },
  practiceDescription: {
    fontSize: 14,
    color: "#B8A9FF",
    lineHeight: 20,
  },
});

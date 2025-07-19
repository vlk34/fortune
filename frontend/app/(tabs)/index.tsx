import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [selectedFortune, setSelectedFortune] = useState<string | null>(null);

  const fortuneCategories = [
    {
      title: "Love & Relationships",
      icon: "💕",
      description: "Discover what the stars have in store for your heart",
      fortunes: [
        "A mysterious stranger will enter your life when you least expect it",
        "Your current relationship will deepen with honest communication",
        "Love is closer than you think - open your heart to new possibilities",
        "The universe is aligning to bring you your soulmate",
      ],
    },
    {
      title: "Career & Success",
      icon: "💼",
      description: "Unlock your professional destiny and hidden talents",
      fortunes: [
        "A major career opportunity awaits you in the next moon cycle",
        "Your hard work will be recognized by those who matter most",
        "Trust your instincts - they will guide you to success",
        "A mentor will appear to help you reach new heights",
      ],
    },
    {
      title: "Health & Wellness",
      icon: "🌿",
      description: "Reveal the path to your physical and spiritual well-being",
      fortunes: [
        "Your body is speaking to you - listen to its wisdom",
        "A new wellness practice will transform your life",
        "The healing energy of nature will restore your vitality",
        "Your inner strength will overcome any health challenges",
      ],
    },
    {
      title: "Travel & Adventure",
      icon: "✈️",
      description: "Journey into the unknown and discover your destiny",
      fortunes: [
        "An unexpected journey will lead to life-changing discoveries",
        "The road less traveled holds your greatest adventure",
        "A distant land calls your name - answer its call",
        "Your next destination will reveal your true purpose",
      ],
    },
  ];

  const getRandomFortune = (category: any) => {
    const randomIndex = Math.floor(Math.random() * category.fortunes.length);
    return category.fortunes[randomIndex];
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#2D1B69", dark: "#1A0F3D" }}
      headerImage={
        <ThemedView style={styles.crystalBall}>
          <ThemedText style={styles.crystalBallText}>🔮</ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.mysticalTitle}>
          Mystic Fortune
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          🔮 Unveil Your Destiny 🔮
        </ThemedText>
      </ThemedView>

      {selectedFortune ? (
        <ThemedView style={styles.fortuneContainer}>
          <ThemedText style={styles.fortuneText}>{selectedFortune}</ThemedText>
          <TouchableOpacity
            style={styles.newFortuneButton}
            onPress={() => setSelectedFortune(null)}
          >
            <ThemedText style={styles.buttonText}>
              🔮 Read Another Fortune
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ScrollView style={styles.categoriesContainer}>
          <ThemedText style={styles.categoriesTitle}>
            Choose Your Destiny Path:
          </ThemedText>
          {fortuneCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => setSelectedFortune(getRandomFortune(category))}
            >
              <ThemedText style={styles.categoryIcon}>
                {category.icon}
              </ThemedText>
              <ThemedView style={styles.categoryContent}>
                <ThemedText type="subtitle" style={styles.categoryTitle}>
                  {category.title}
                </ThemedText>
                <ThemedText style={styles.categoryDescription}>
                  {category.description}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  mysticalTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E6B8FF",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#B8A9FF",
  },
  crystalBall: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(230, 184, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#E6B8FF",
    position: "absolute",
    bottom: -50,
    left: "50%",
    marginLeft: -100,
  },
  crystalBallText: {
    fontSize: 80,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#E6B8FF",
  },
  categoryCard: {
    flexDirection: "row",
    backgroundColor: "rgba(45, 27, 105, 0.3)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E6B8FF",
  },
  categoryIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E6B8FF",
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: "#B8A9FF",
    lineHeight: 20,
  },
  fortuneContainer: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "rgba(45, 27, 105, 0.3)",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E6B8FF",
    margin: 20,
  },
  fortuneText: {
    fontSize: 20,
    textAlign: "center",
    color: "#E6B8FF",
    lineHeight: 28,
    marginBottom: 30,
    fontStyle: "italic",
  },
  newFortuneButton: {
    backgroundColor: "#E6B8FF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "#2D1B69",
    fontSize: 16,
    fontWeight: "bold",
  },
});

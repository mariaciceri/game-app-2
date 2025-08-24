import React from "react";
import { View, Text, StyleSheet } from "react-native";
import  { Colors } from "@/constants/Colors";
import PlayStationPage from "../screens/PlayStationAccountLink";
import XboxPage from "../screens/XboxAccountLink";
import SteamPage from "../screens/SteamAccountLink";


export default function Accounts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected Accounts</Text>
      <Text style={styles.description}>Manage your connected accounts here.</Text>

      <PlayStationPage />
      <XboxPage />
      <SteamPage />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
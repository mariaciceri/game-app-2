import { Image, ImageBackground, Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=647&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/logo.png')} />
      <Text style={styles.explanationText}>EXPLANATION TEXT GOES HERE</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  explanationText: {
    backgroundColor: Colors.light,
    fontSize: 16,
    textAlign: 'center',
    marginTop: '30%',
    padding: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: '20%',
  },
});
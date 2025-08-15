import { Image, ImageBackground, StyleSheet, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=647&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/logo.png')} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: '20%',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  buttonOne: {
    width: '100%',
    height: '10%',
    backgroundColor: 'lightblue',
  },
  buttonTwo: {
    width: '100%',
    height: '10%',
    backgroundColor: 'darkturquoise',
  },
  buttonPlace: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});
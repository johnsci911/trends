import { Button, Text, View } from "react-native";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      <Button onPress={() => navigation.navigate('Login Screen')} title="Go to Login Page" />
    </View>
  )
}

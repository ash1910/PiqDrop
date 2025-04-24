import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

const COLORS = {
  primary: '#38A169',
  background: '#FFFFFF',
  text: '#000000',
  subtitle: '#888888',
  inputBorder: '#CCCCCC',
  iconBackground: '#F0F0F0',
  facebook: '#1877F2',
  google: '#DB4437',
};

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.logo} />
        <Text style={styles.title}>PiqDrop</Text>
        <Text style={styles.subtitle}>Making delivery simple</Text>
      </View>

      <Text style={styles.loginText}>Login</Text>
      <Text style={styles.accessText}>Access your account to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Ionicons name="eye-outline" size={20} color={COLORS.subtitle} />
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
            color={COLORS.primary}
          />
          <Text>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" style={styles.loginButton} onPress={() => {}}>
        Login
      </Button>

      <Text style={styles.orText}>Or</Text>

      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="facebook" size={24} color={COLORS.facebook} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="google" size={24} color={COLORS.google} />
        </TouchableOpacity>
      </View>

      <View style={styles.signUpRow}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.subtitle,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  accessText: {
    color: COLORS.subtitle,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    color: COLORS.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotText: {
    color: COLORS.primary,
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.subtitle,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: COLORS.iconBackground,
    padding: 10,
    borderRadius: 10,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: COLORS.primary,
  },
});

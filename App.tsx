import React, { useState } from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Текущий экран
  const [page, setPage] = useState('Login');

  // Данные
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Показывать/скрывать пароль
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);



  const handleBack = () => {
    if (page === 'Login') {
      return;
    }

    if (page === 'Forget') {
      setPage('Login');
    }

    if (page === 'Verify') {
      setPage('Forget');
    }

    if (page === 'Reset') {
      setPage('Verify');
    }
  };

  

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert('Ошибка', 'Введите номер телефона и пароль');
      return;
    }

    Alert.alert('Вход', 'Попытка входа');
  };

  

  const handleForgotPassword = () => {
    setPage('Forget');
  };


  const handleSendCode = () => {
    if (!phone) {
      Alert.alert('Ошибка', 'Введите номер телефона');
      return;
    }

    setPage('Verify');
  };

  

  const handleCodeChange = (value:string, index:number) => {
    // Оставляем только цифры
    const number = value.replace(/[^0-9]/g, '');

    const newCode = [...code];
    newCode[index] = number.slice(-1);

    setCode(newCode);
  };

  

  const handleVerify = () => {
    const enteredCode = code.join('');

    if (enteredCode.length !== 4) {
      Alert.alert('Ошибка', 'Введите код из 4 цифр');
      return;
    }

    // Для примера правильный код — 7854
    if (enteredCode !== '7854') {
      Alert.alert('Ошибка', 'Неверный код');
      return;
    }

    setPage('Reset');
  };



  const handleResetPassword = () => {
    if (password.length < 8) {
      Alert.alert(
        'Ошибка',
        'Пароль должен содержать минимум 8 символов'
      );
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert(
        'Ошибка',
        'Пароли не совпадают'
      );
      return;
    }

    Alert.alert(
      'Готово',
      'Пароль успешно изменён',
      [
        {
          text: 'Войти',
          onPress: () => {
            setPassword('');
            setRepeatPassword('');
            setCode(['', '', '', '']);
            setPage('Login');
          },
        },
      ]
    );
  };

  
  if (page === 'Forget') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.container}>

          <Pressable
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <View style={styles.centerContent}>

            <Text style={styles.title}>
              Восстановление пароля
            </Text>

            <Text style={styles.subtitleCenter}>
              Введите свой номер телефона, чтобы
              {'\n'}
              восстановить пароль
            </Text>

            {/* Телефон */}

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>
                📞
              </Text>

              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+7 (700) 555 77 55"
                placeholderTextColor="#AAA9B2"
                keyboardType="phone-pad"
              />
            </View>

            {/* Продолжить */}

            <Pressable
              style={styles.mainButton}
              onPress={handleSendCode}
            >
              <Text style={styles.mainButtonText}>
                Продолжить
              </Text>
            </Pressable>

          </View>
        </View>
      </SafeAreaView>
    );
  }

  

  if (page === 'Verify') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.container}>

          <Pressable
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <View style={styles.centerContent}>

            <Text style={styles.title}>
              Подтвердить номер
            </Text>

            <Text style={styles.subtitleCenter}>
              Мы только что отправили код на
              {'\n'}
              <Text style={styles.phoneText}>
                {phone || '+7 (700) 555 77 55'}
              </Text>
            </Text>

            {/* Код */}

            <View style={styles.codeContainer}>

              {code.map((item, index) => (
                <TextInput
                  key={index}
                  style={styles.codeInput}
                  value={item}
                  onChangeText={(value) =>
                    handleCodeChange(value, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}

            </View>

            {/* Продолжить */}

            <Pressable
              style={styles.mainButton}
              onPress={handleVerify}
            >
              <Text style={styles.mainButtonText}>
                Продолжить
              </Text>
            </Pressable>

            {/* Повторно отправить */}

            <Pressable
              style={styles.resendButton}
              onPress={() =>
                Alert.alert(
                  'Код отправлен',
                  'Новый код отправлен на ваш номер'
                )
              }
            >
              <Text style={styles.resendText}>
                Отправить код еще раз
              </Text>
            </Pressable>

          </View>
        </View>
      </SafeAreaView>
    );
  }


  if (page === 'Reset') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.container}>

          <Pressable
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <View style={styles.centerContent}>

            <Text style={styles.title}>
              Сбросить пароль
            </Text>

            <Text style={styles.subtitleCenter}>
              Не менее 8 символов, с
              {'\n'}
              прописными и строчными буквами
            </Text>

            {/* Новый пароль */}

            <View style={styles.inputContainer}>

              <Text style={styles.inputIcon}>
                🔒
              </Text>

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
                placeholderTextColor="#AAA9B2"
                secureTextEntry={!showPassword}
              />

              <Pressable
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >
                <Text style={styles.eye}>
                  {showPassword ? '👁' : '👁‍🗨'}
                </Text>
              </Pressable>

            </View>

            {/* Повтор пароля */}

            <View style={styles.inputContainer}>

              <Text style={styles.inputIcon}>
                🔒
              </Text>

              <TextInput
                style={styles.input}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="Повторить пароль"
                placeholderTextColor="#AAA9B2"
                secureTextEntry={!showRepeatPassword}
              />

              <Pressable
                onPress={() =>
                  setShowRepeatPassword(!showRepeatPassword)
                }
              >
                <Text style={styles.eye}>
                  {showRepeatPassword ? '👁' : '👁‍🗨'}
                </Text>
              </Pressable>

            </View>

            {/* Продолжить */}

            <Pressable
              style={styles.mainButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.mainButtonText}>
                Продолжить
              </Text>
            </Pressable>

          </View>
        </View>
      </SafeAreaView>
    );
  }

 

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>

        {/* Кнопка назад */}

        <Pressable
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>
            ←
          </Text>
        </Pressable>

        {/* Заголовок */}

        <Text style={styles.title}>
          Привет, с возвращением!
        </Text>

        <Text style={styles.subtitle}>
          Войдите в свой аккаунт.
        </Text>

        {/* Телефон */}

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            📞
          </Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Номер телефона"
            placeholderTextColor="#AAA9B2"
            keyboardType="phone-pad"
          />

        </View>

        {/* Пароль */}

        <View style={styles.inputContainer}>

          <Text style={styles.inputIcon}>
            🔒
          </Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Пароль"
            placeholderTextColor="#AAA9B2"
            secureTextEntry={!showPassword}
          />

          <Pressable
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Text style={styles.eye}>
              {showPassword ? '👁' : '👁‍🗨'}
            </Text>
          </Pressable>

        </View>

        {/* Забыли пароль */}

        <Pressable
          style={styles.forgotButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotText}>
            Забыли пароль?
          </Text>
        </Pressable>

        {/* Войти */}

        <Pressable
          style={styles.mainButton}
          onPress={handleLogin}
        >
          <Text style={styles.mainButtonText}>
            Войти
          </Text>
        </Pressable>

        {/* Регистрация */}

        <View style={styles.registerContainer}>

          <Text style={styles.registerText}>
            У вас нет аккаунта?
          </Text>

          <Pressable
            onPress={() =>
              Alert.alert(
                'Регистрация',
                'Здесь будет экран регистрации'
              )
            }
          >
            <Text style={styles.registerLink}>
              Зарегистрироваться
            </Text>
          </Pressable>

        </View>

      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 38,
  },

  backButtonText: {
    fontSize: 32,
    color: '#1B1923',
    fontWeight: '300',
  },

  title: {
    color: '#1B1923',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31,
  },

  subtitle: {
    color: '#AAA9B2',
    fontSize: 16,
    marginTop: 3,
    marginBottom: 28,
  },

  subtitleCenter: {
    color: '#AAA9B2',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 28,
  },

  centerContent: {
    marginTop: 60,
  },

  inputContainer: {
    width: '100%',
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    paddingHorizontal: 17,
    marginBottom: 14,
  },

  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.65,
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#1B1923',
    fontSize: 16,
  },

  eye: {
    fontSize: 19,
    opacity: 0.5,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 25,
  },

  forgotText: {
    color: '#B000E8',
    fontSize: 15,
    fontWeight: '600',
  },

  mainButton: {
    width: '100%',
    height: 62,
    backgroundColor: '#B000E8',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  registerContainer: {
    alignItems: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#AAA9B2',
    fontSize: 14,
    marginBottom: 4,
  },

  registerLink: {
    color: '#B000E8',
    fontSize: 15,
    fontWeight: '600',
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 28,
  },

  codeInput: {
    width: 54,
    height: 58,
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    color: '#1B1923',
    fontSize: 24,
    fontWeight: '700',
  },

  phoneText: {
    color: '#1B1923',
    fontWeight: '600',
  },

  resendButton: {
    alignItems: 'center',
    marginTop: 25,
  },

  resendText: {
    color: '#AAA9B2',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

});
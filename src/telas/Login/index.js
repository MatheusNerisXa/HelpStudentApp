import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../servicos/requisicoesFirebase';
import estilos from './estilos';
import { Alerta } from '../../componentes/Alerta';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  useEffect(() => {
    async function checarUsuarioLogado() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          navigation.replace('Principal');
        }
      } catch (e) {
        console.error('Error checking for logged in user:', e);
      }
    }
    checarUsuarioLogado();
  }, [navigation]);
  

  async function realizarLogin() {
    if (email === '') {
      setMensagemError('O email é obrigatório!');
      setStatusError('email');
    } else if (senha === '') {
      setMensagemError('A senha é obrigatória!');
      setStatusError('senha');
    } else {
      const resultado = await logar(email, senha);
      if (resultado === 'erro') {
        setStatusError('firebase');
        setMensagemError('Email ou senha não conferem');
      } else {
        await AsyncStorage.setItem('token', resultado.token);
        navigation.replace('Principal');
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        error={statusError === 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
        error={statusError === 'senha'}
        messageError={mensagemError}
      />

      <Alerta mensagem={mensagemError} error={statusError === 'firebase'} setError={setStatusError} />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao onPress={() => navigation.navigate('Cadastro')}>CADASTRAR USUÁRIO</Botao>
    </View>
  );
}

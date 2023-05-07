import React, { useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { Alerta } from '../../componentes/Alerta';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../service/requisicoesFirebase';
import estilos from './estilos';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  async function realizarLogin(){
    if(email == ''){
      setMensagemError('O campo e-mail é obrigatório!');
      setStatusError('email');
    } else if (senha == ''){
      setMensagemError('O campo senha é obrigatório!');
      setStatusError('senha');
    } else {
      const resultado = await logar(email,senha);
      if(resultado == 'erro'){
        setStatusError('firebase')
        setMensagemError('Email ou senha inválidos!')
      }
      else {
        navigation.navigate('Principal')
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />
      
      <Alerta
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}

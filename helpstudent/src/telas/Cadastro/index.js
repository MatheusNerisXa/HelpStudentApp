import React, { useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../service/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';
import { alteraDados } from '../../utils/comum';

export default function Cadastro({ navigation }) {  

  const [dados, setDados] = useState({
    email: '',
    senha: '',
    confirmaSenha: ''
  })

  

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  async function realizaCadastro(){
    if(dados.email == ''){
      setMensagemError('Preencha com o seu email');
      setStatusError('email');
    } else if (dados.senha == ''){
      setMensagemError('Digite sua senha');
      setStatusError('senha');
    } else if (dados.confirmaSenha == ''){
      setMensagemError('Confirme sua senha');
      setStatusError('confirmaSenha');
    } else if (dados.confirmaSenha != dados.senha){
      setMensagemError('As senhas não conferem');
      setStatusError('confirmaSenha');
    } else{
     const resultado =  await cadastrar(dados.email,dados.senha);
     setStatusError('firebase')
     if(resultado == 'sucesso'){
      setMensagemError('Usuário cadastrado com sucesso!')
     } else {
      setMensagemError(resultado)
     }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={dados.email}
        onChangeText={valor => alteraDados('email', valor, dados, setDados)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={valor => alteraDados('senha', valor, dados, setDados)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={valor => alteraDados('confirmaSenha', valor, dados, setDados)}
        secureTextEntry
        error={statusError == 'confirmaSenha'}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />

      <Botao onPress={() => realizaCadastro()}>CADASTRAR</Botao>
    </View>
  );
}

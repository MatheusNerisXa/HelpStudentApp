import React, { useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../service/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';
import { alteraDados, verificaEntradaVazia } from '../../utils/comum';
import { entradas } from './entradas';


export default function Cadastro({ navigation }) {  

  const [dados, setDados] = useState({
    email: '',
    senha: '',
    confirmaSenha: ''
  })

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  function verificaSenhaIgual(){
    return dados.senha != dados.confirmaSenha
  }

  async function realizaCadastro(){
    if(verificaEntradaVazia(dados, setDados)) return
    if(dados.senha != dados.confirmaSenha){
      setStatusError(true)
      setMensagemError('As senhas não conferem')
      return
    }
    const resultado  = await cadastrar(dados.email, dados.senha);
    if(resultado != 'sucesso'){
      setStatusError(true)
      setMensagemError(resultado)
    }
  }

  return (
    <View style={estilos.container}>
       {
      entradas.map((entrada) => {
        return (
          <EntradaTexto
            key={entrada.id}
            {...entrada}
            value={dados[entrada.name]}
            onChangeText={valor => alteraDados(entrada.name,valor,dados,setDados)}
            error={entrada.name != 'confirmaSenha' ? false : verificaSenhaIgual() && dados.confirmaSenha != ''}
            />
          )
      })
     }

      <Alerta
        mensagem={mensagemError}
        error={statusError}
        setError={setStatusError}
      />

      <Botao onPress={() => realizaCadastro()}>CADASTRAR</Botao>
    </View>
  );
}

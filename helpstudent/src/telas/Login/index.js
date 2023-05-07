import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Botao from '../../componentes/Botao';
import { Alerta } from '../../componentes/Alerta';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../service/requisicoesFirebase';
import estilos from './estilos';
import loading  from '../../../assets/loading.gif'
import { auth } from '../../config/firebase';
import { entradas } from './entradas';
import { alteraDados, verificaEntradaVazia} from '../../utils/comum';

export default function Login({ navigation }) {
  
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  })

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(
      usuario =>{
        if(usuario){
          navigation.replace('Principal')
        }
        setCarregando(false)
    })
    return () => estadoUsuario();
  }, [])


  async function realizarLogin(){
    if(verificaEntradaVazia(dados, setDados)) 
    return
    const resultado = await logar(dados.email,dados.senha)
    if(resultado == 'erro'){
      setStatusError(true)
      setMensagemError('E-mail ou senha inválidos')
      return
    }
    navigation.replace('Principal')
  }

  if(carregando){
     return (
      <View style={estilos.containerLoading}>
          <Image source={loading}
           style={estilos.imagem}
          />
      </View>
     )
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
            />
          )
      })
     }
      
      <Alerta
        mensagem={mensagemError}
        error={statusError}
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

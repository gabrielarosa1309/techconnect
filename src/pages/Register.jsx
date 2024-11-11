import React, { useState } from 'react'
import Background, { BgType } from '../../Components/Background'
import { BtnTitle, Paragraph, Title } from '../../Components/Fonts'
import GlassBox from './components/GlassBox'
import Spacing from '../../Components/Spacing'
import Input from '../../Components/Input'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button, { NavigateButton } from '../../Components/Button'
import { octokit } from '../../utils/githubkey'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Logo, LogoMobile } from '../../Components/Logo'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register({ setUser }) {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [url, setUrl] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  const registerSucessfull = () => toast("Cadastri efetuado com sucesso!");

  const validateUser = (e) => {
    setMessage(undefined)
    e.preventDefault();

    setIsLoading(true)

    if (password !== confirmPassword) {
      setMessage("As senhas informadas não coincidem")
      setIsLoading(false)
      return;
    }

    octokit.request("GET /users/{username}", {
      username: url,
      headers: {
        'X-GitHub-Api-Version': "2022-11-28"
      }
    }).then(async response => {

      const userExists = await checkIfUserExists();

      if (!userExists) {
        console.log(response.data)
        registerUser(response.data)
      } else {
        setIsLoading(false)
        setMessage('Usuário já cadastrado em nosso sistema, para acessar o sistema, realize o login.')
      }
    }).catch(error => {
      setIsLoading(false)
      setMessage('Usuário não encontrado, tente novamente.')
    })
  }

  const checkIfUserExists = async () => {
    return fetch(`http://localhost:3000/user?login=${url.toLowerCase()}`)
      .then(response => response.json())
      .then(response => {
        if (response.length > 0) {
          return true
        }
        return false
      }).catch(error => {
        setIsLoading(false)
        setMessage('Não foi possível encontrar o usuário')
      })
  }

  const registerUser = async (user) => {
    try {
      const data = {
        id: uuid(),
        name: user.name,
        login: user.login.toLowerCase(),
        password: password,
        photo: user.avatar_url
      };

      fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify(data)
      })

      setUser(data);
      registerSucessfull()
      navigate('/home', { replace: true })
    } catch (error) {
      console.log(error);

      setIsLoading(false)
      setMessage('Não foi possível efetuar o cadastro, tente novamente')
    }
    setIsLoading(false)
  }

  return (
    <Background bgType={BgType.auth}>

      <div className="flex flex-col justify-center w-full h-full">
        <Logo/>
        <div className='px-[200px] max-lg:px-0 py-4 max-lg:py-0 flex flex-col items-center max-lg:h-full'>

          <Spacing height={10} styles={'max-lg:hidden'} />
          <GlassBox>
            <LogoMobile />
            <Title>Cadastrar</Title>
            <Spacing height={10} />
            <form
              onSubmit={validateUser}
            >
              <Input
                label={'Usuário do GitHub'}
                placeholder={'Usuário do GitHub'}
                icon={faUser}
                onChange={(e) => {
                  setUrl(e.target.value)
                }}
                textValue={url}
              />
              <Spacing height={10} />
              <Input
                label={'Senha'}
                placeholder={'Senha'}
                icon={faLock}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                textValue={password}
                iconEye={showPassword? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
              />
              <Spacing height={10} />
              <Input
                label={'Confirme a senha'}
                placeholder={'Confirme a senha'}
                icon={faLock}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                textValue={confirmPassword}
                iconEye={showPassword? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
              />
              {message ? <Spacing height={10} /> : <></>}
              <Paragraph styles={'text-red-600'}>{message}</Paragraph>
              <Spacing height={20} />
              <Button isLoading={isLoading}><BtnTitle>Cadastrar</BtnTitle></Button>

            </form>
            <Spacing height={40} />
            <NavigateButton normalText='Já tem uma conta?' linkText='Logar-se' onClick={() => {
              navigate('/')
            }} />
          </GlassBox>
        </div>
      </div>
    </Background>
  )
}

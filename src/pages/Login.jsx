import Background from "../../Components/Background";
import Button, { NavigateButton } from "../../Components/Button"
import Input from "../../Components/Input"
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BtnTitle, Paragraph, Title } from "../../Components/Fonts";
import Spacing from "../../Components/Spacing";
import { Logo, LogoMobile } from "../../Components/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GlassBox from "./components/GlassBox";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = ({ setUser }) => {
    const navigate = useNavigate()

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginSucessfull = () => toast("Login realizado com sucesso!");

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch(`http://localhost:3000/user?login=${login.toLowerCase()}`);
            const users = await response.json();

            if (users.length === 0) {
                setMessage("Usuário não encontrado.");
                setIsLoading(false);
                return;
            }

            const user = users[0];

            if (user.password === password) {
                setUser(user);
                localStorage.setItem("userSection", JSON.stringify(user))
                loginSucessfull()
                navigate('/home', { replace: true,  });
            } else {
                setMessage("Senha incorreta.");
            }
        } catch (error) {
            console.error(error);
            setMessage(`Erro ao tentar realizar login: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Background >
            <div className="flex flex-col justify-center w-full h-full">
                <Logo />
                <div className='px-[200px] max-lg:px-0 py-4 max-lg:py-0 flex flex-col items-center max-lg:h-full'>
                    <Spacing height={10} styles={'max-lg:hidden'} />
                        <Title desktopSize={30}>Login</Title>
                        <Spacing height={40} />
                        <form
                            onSubmit={handleLogin}
                        >
                            <Input
                                label={'Usuário do GitHub'}
                                icon={faUser}
                                onChange={(e) => setLogin(e.target.value)}
                                textValue={login}
                            />
                            <Spacing height={20} />
                            <Input
                                label={'Senha'}
                                icon={faLock}
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                textValue={password}
                                iconEye={showPassword? faEye : faEyeSlash}
                                onClick={togglePasswordVisibility}
                            />
                            <Spacing height={20} />
                            {message && <Paragraph styles={'text-red-600'}>{message}</Paragraph>}
                            <Spacing height={20} />
                            <Button isLoading={isLoading}><BtnTitle>Login</BtnTitle></Button>
                        </form>
                        <Spacing height={40} />
                        <NavigateButton normalText='Não tem uma conta?' linkText='Cadastre-se' onClick={() => {
                            navigate('/cadastro')
                        }} />
                </div>
            </div>
        </Background>
    )
}
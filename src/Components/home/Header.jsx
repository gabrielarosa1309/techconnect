import logo from "../../../assets/images/logo.png";
import { Paragraph } from "../../../Components/Fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import context from "../../../context/context";
import { useNavigate } from "react-router-dom";

const Header = ({setIsOpenNews, isOpenNews}) => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(context);

    const logout = () => {
        try {
            const data = {
                ...user,
                lastAccess: new Date().toLocaleString(),
            }

            fetch("http://localhost:3000/usuarios/" + user.id, {
                method: "PUT",
                body: JSON.stringify(data),
            })

            setUser({})
            localStorage.clear()
            navigate("/")
        } catch (error) {
            alert("Não foi possivel realizar o logout")
        }
    }

    return (
        <header className="flex flex-1 py-[15px] px-[5%] max-lg:bg-opacity-5 max-lg:backdrop-blur-lg justify-between items-center max-lg:bg-[#d4d4d4]">

            <img className="h-16 max-lg:hidden" src={logo} alt="Logo tech connect"></img>
            <div className="flex items-center gap-8 max-lg:justify-between max-lg:w-full">

                <a className="flex items-center gap-2" href={`https://github.com/${user.login}`} target='_blank' rel="noreferrer">
                    <img className="w-[65px] rounded-full" src={user.photo} alt="foto de perfil" />
                    <Paragraph styles={"text-[16px] lg:hidden"}>{user.login}</Paragraph>
                </a>

                <div className="flex gap-3">
                    <button className="flex gap-3 items-center" onClick={logout} >

                        <FontAwesomeIcon style={{ color: "white", fontSize: "25px", textAlign: "center", paddingTop: "5px" }} icon={faRightToBracket} />

                        <Paragraph styles={"text-[20px] max-lg:hidden"}>Sair</Paragraph>

                    </button>
                    <button className="flex gap-3 items-center" onClick={() => setIsOpenNews(!isOpenNews)}>
                        <FontAwesomeIcon style={{ color: "white", fontSize: "25px", textAlign: "center", paddingTop: "5px" }} icon={faGlobe} className="lg:hidden" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;
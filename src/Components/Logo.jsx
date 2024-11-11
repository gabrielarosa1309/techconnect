import logo from "../assets/images/logo.png"
import logoMobile from "../assets/images/LogoMobile.svg"

export const Logo = () => {
    return (
        <div className='flex justify-center items-center'>
            <img src={logo} className="max-lg:hidden block w-[30%]" alt="" />

        </div>
    )
}

export const LogoMobile = () => {
    return (
        <div className='flex justify-center items-center'>

            <img src={logoMobile} className="lg:hidden w-[60%] " alt="" />
        </div>
    )
}
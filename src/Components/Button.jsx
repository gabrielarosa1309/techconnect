import React from 'react'
import { Puff } from 'react-loader-spinner'


export const ButtonType = {
    filled: "filled",
    outlined: "outlined"
}

export default function Button({ children, type = ButtonType.filled, styles, isLoading, buttonType = 'submit', onClick, fontSize = "30px" }) {

    const styleType = {
        filled: "bg-[#9040FA] text-complementary-white border-2 border-[#9040FA]",
        outlined: "bg-complementary-transparent text-[#9040FA] border-2 border-[#9040FA]"
    }

    return (
        <button
            disabled={isLoading}
            type={buttonType}
            onClick={onClick}
            className={`flex items-center justify-center w-full py-4 px-4 rounded-[5px] ${type === ButtonType.filled ? styleType.filled : styleType.outlined} ${styles}`}
        >
            {isLoading ? <Puff height={'20px'} width={'20px'} color='#fff' visible={true} /> :
                <span style={{ fontSize: fontSize }}>{children}</span>
            }

        </button>
    )
}

export const NavigateButton = ({ normalText = '', linkText = '', onClick }) => {
    return (
        <div className='flex items-center justify-center gap-2'>
            <h2 className="max-lg:text-[18px] text-[20px] text-[#FCFCFC] text-center">{normalText}</h2>
            <button onClick={onClick}>
                <h2 className="max-lg:text-[18px] text-[20px] text-[#FCFCFC] text-center underline">{linkText}</h2>
            </button>
        </div>

    )
}
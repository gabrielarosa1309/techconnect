import React from 'react'

export default function GlassBox({ children, styles, }) {
  return (
    <div className={`relative rounded-xl py-5 px-[40px] h-max max-lg:h-full w-full ${styles} max-lg:rounded-none`}>
      {/* Fundo com blur e opacity */}
      <div className='absolute inset-0 bg-[#d4d4d4] w-full bg-opacity-5 backdrop-blur-lg rounded-xl z-0 max-lg:rounded-none'></div>
      {/* Conteúdo da caixa */}
      <div className={`relative z-10`}>
        {children}
      </div>
    </div>
  )
}
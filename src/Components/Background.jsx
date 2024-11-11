import React from 'react'
import blend1 from '../assets/icons/blend1.svg'

export const BgType = {
    auth: "auth",
    home: "home"
}

export default function Background({ children, bgType = BgType.auth, isHidden = false }) {
    return (
        <div className='w-screen h-screen relative overflow-hidden'>
            {/* Background layer */}
            <div className='bg-bg-auth absolute inset-0 bg-cover bg-no-repeat z-[-20]'>
                {
                    bgType === BgType.auth ?
                        <img src={blend1} alt="" className='absolute max-lg:h-36 overflow-hidden top-[-80%] right-[-40%] rotate-[220deg] -z-10' />
                        :
                        <img src={blend1} alt="" className='absolute lg:hidden max-lg:right-[-10%] max-lg:top-[-10%] max-lg:rotate-0 overflow-hidden top-[-80%] right-[-40%] rotate-[220deg] -z-10' />
                }

                {
                    bgType === BgType.auth ?
                        <img src={blend1} alt="" className='absolute overflow-hidden top-[45%] left-[-20%] max-lg:left-[-60%] min-w-[1200px] -z-10' />
                        :
                        <img src={blend1} alt="" className='absolute overflow-hidden top-[25%] left-[-10%] max-lg:left-[-10%] max-lg:top-[65%] -z-10' />
                }
            </div>

            {/* Scrollable children */}
            <div className={`relative w-full h-full ${bgType === BgType.auth ? 'overflow-y-auto' : isHidden ? 'overflow-y-auto' : 'overflow-y-hidden'} lg:overflow-y-auto overflow-x-hidden overflow-y-auto`}>
                {children}
            </div>
        </div>
    )
}

import React from 'react'

export function Title({ children, styles, mobileSize = 28, desktopSize = 30 }) {
    return (
        <h1 className={`text-[30px] max-lg:text-[28px] font-semibold text-center text-complementary-white ${styles}`}>
            {children}
        </h1>
    )
}

export function BtnTitle({ children, styles, mobileSize = 28, desktopSize = 25 }) {
    return (
        <h1 className={`text-[${desktopSize}px] max-lg:text-[${mobileSize}px] font-semibold text-center text-complementary-white ${styles}`}>
            {children}
        </h1>
    )
}

export function Paragraph({ children, styles, size = 20 }) {
    return (
        <p className={`text-[${size}px] font-normal text-center text-complementary-white ${styles}`}>
            {children}
        </p>
    )
}

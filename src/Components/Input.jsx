import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paragraph } from './Fonts';

export default function Input({ id, label, textValue, onChange, width = 300, styles, type = 'text', icon, placeholder, styles2, defaultValue, iconEye, onClick}) {
    return (
        <div className={`w-full ${styles}`}>
            <label className='max-lg:text-[18px] text-[25px] py-1 block text-base font-sans mb-1 text-complementary-white' htmlFor={id}>{label}</label>

            <div className={`border-complementary-white border rounded-[12px] w-full flex items-center justify-center ${styles2}`}>


                 {
                    icon ?
                        <div className='py-1  ml-8'>
                            <FontAwesomeIcon icon={icon} style={{ color: 'white', fontSize: '25px' }} />
                        </div>
                        :
                        <></>
                }

                <input
                    id={id}
                    type={type}
                    required
                    value={textValue}
                    onChange={onChange}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    autoComplete='off'
                    className='px-[30px] py-5 w-full outline-none text-complementary-white bg-transparent caret-white placeholder-complementary-white'
                />

{
                    iconEye ?
                        <button  
                        type="button"  
                        className='py-1 ml-8 mr-5'
                        onClick={onClick}  
                        >
                            <FontAwesomeIcon icon={iconEye} style={{ color: 'white', fontSize: '25px' }} />
                        </button>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export function InputFile({ icon, onChange, id }) {
    return (
        <button type='button'>
            <label htmlFor="input-file" className='flex gap-[20%] cursor-pointer'>
                <FontAwesomeIcon className="text-[#FCFCFC] text-[30px]" icon={icon} />
                <Paragraph>Mídia</Paragraph>
            </label>
            <input type="file" id={id} accept=".jpg, .jpeg, .png, .gif"  className='hidden' onChange={onChange}/>
        </button>
    )
}
export function InputFileEdit({ icon, onChange, id}) {
    return (
        <button type='button'>
            <label htmlFor="input-file-edit" className='flex gap-[20%] cursor-pointer'>
                <FontAwesomeIcon className="text-[#FCFCFC] text-[30px]" icon={icon} />
                <Paragraph>Mídia</Paragraph>
            </label>
            <input type="file" id={id} accept=".jpg, .jpeg, .png, .gif"  className='hidden' onChange={onChange}/>
        </button>
    )
}


import React from 'react'
import styles from '../Styles/button.module.css'

export default function CustomButton({ children, onClick, className='bg-[#202020] w-[140px]', disabled }) {
  return (
    <button className={`${styles.button22} ${className} ${disabled? 'cursor-not-allowed' : ''}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
  )
}
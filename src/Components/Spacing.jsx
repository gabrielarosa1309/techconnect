import React from 'react'

export default function Spacing({width = 0, height = 0, styles}) {
  return (
    <div className={`${styles}`} style={{width: width, height: height}}></div>
  )
}

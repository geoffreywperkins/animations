'use client'

import { useState } from 'react'
import Canvas from './components/Canvas'
import { ANIMATION_TYPE_TO_DISPLAY_NAME, DEFAULT_ANIMATION } from './globalConstants'
import { animationType } from './globalTypes'

const v = Object.keys(ANIMATION_TYPE_TO_DISPLAY_NAME)

export default function Home() {
  const [selectedAnimation, setSelectedAnimation] = useState<animationType>(DEFAULT_ANIMATION)

  return (
    <div>
      <Canvas selectedAnimation={selectedAnimation} />
      <div id='button-container' className='fixed top-0 left-0 z-10'>
        {
          (Object.keys(ANIMATION_TYPE_TO_DISPLAY_NAME) as animationType[]).map((key) => (
            <button
              key={key}
              className="p-2"
              onClick={() => setSelectedAnimation(key)}
              disabled={key === selectedAnimation}
            >
              {ANIMATION_TYPE_TO_DISPLAY_NAME[key]}
            </button>
          ))
        }
      </div>
    </div>
  )
}

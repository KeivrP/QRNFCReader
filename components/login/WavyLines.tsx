import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const WavyLines = () => {
    return (
        <View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                transform: [{ translateY: -96 }],
                zIndex: 0
            }}
        >
            <Svg width="100%" height={80} viewBox="0 0 320 80">
                {/* Capa principal de ondas */}
                <Path d="M-40 40 C 20 -20 60 60 100 40 C 140 0 180 80 220 40 C 260 0 300 80 340 40C 380 0 420 80 460 40" stroke="#c6925e"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Capa secundaria para profundidad */}
                <Path d="M-60 50 C 0 10 40 70 80 50 C 120 30 160 90 200 50 C 240 10 280 90 320 50 C 360 10 400 90 440 50" stroke="#c6925e"
                    strokeWidth={1.5}
                    strokeOpacity={0.4}
                    strokeLinecap="round"
                    fill="none"
                /> 
            </Svg>
        </View>

    )
}

export default WavyLines
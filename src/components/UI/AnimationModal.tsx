import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import ConeAnimation from '../animations/ConeAnimation'
import CylinderAnimation from '../animations/CylinderAnimation'

const TITLES = {
    cone: 'Stożek z trójkąta',
    cylinder: 'Walec z prostokąta',
}

const ANIMATION_MAP = {
    cone: ConeAnimation,
    cylinder: CylinderAnimation,
}

const CLOSE_ANIM_TIME = 250

export default function AnimationModal({ shapeId, onClose }) {
    const [progress, setProgress] = useState(0)
    const [playing, setPlaying] = useState(false)

    const [closing, setClosing] = useState(false)
    const [show, setShow] = useState(false)

    const rafRef = useRef(null)
    const lastRef = useRef(null)
    const DURATION = 3000

    // 👉 wejście animacja
    useEffect(() => {
        requestAnimationFrame(() => setShow(true))
    }, [])

    // 👉 animacja progressu
    useEffect(() => {
        if (playing) {
            lastRef.current = performance.now() - progress * DURATION

            const tick = (now) => {
                const elapsed = now - lastRef.current
                const p = Math.min(elapsed / DURATION, 1)

                setProgress(p)

                if (p < 1) {
                    rafRef.current = requestAnimationFrame(tick)
                } else {
                    setPlaying(false)
                }
            }

            rafRef.current = requestAnimationFrame(tick)
        }

        return () => cancelAnimationFrame(rafRef.current)
    }, [playing])

    function handlePlayPause() {
        if (progress >= 1) {
            setProgress(0)
            setPlaying(true)
            return
        }

        setPlaying(p => !p)
    }

    function handleReset() {
        setPlaying(false)
        setProgress(0)
    }

    function handleClose() {
        setClosing(true)

        setTimeout(() => {
            onClose()
        }, CLOSE_ANIM_TIME)
    }

    const AnimComponent = ANIMATION_MAP[shapeId]

    return (
        <>
            {/* overlay */}
            <div
                onClick={handleClose}
                className={`modal-overlay ${show && !closing ? 'show' : 'hide'}`}
            />

            {/* modal */}
            <div className={`modal ${show && !closing ? 'show' : 'hide'}`}>

                {/* header */}
                <div className="modal-header">
                    <span className="modal-title">
                        {TITLES[shapeId]}
                    </span>

                    <button
                        onClick={handleClose}
                        className="modal-close"
                    >
                        ✕
                    </button>
                </div>

                {/* scena */}
                <div style={{ flex: 1 }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        {AnimComponent && <AnimComponent progress={progress} />}
                    </Canvas>
                </div>

                {/* controls */}
                <div className="modal-controls">

                    <button onClick={handlePlayPause} className="btn-play">
                        {playing ? (
                            <svg width="10" height="12" viewBox="0 0 10 12">
                                <rect x="0" y="0" width="3" height="12" fill="rgba(79,142,247,0.9)" />
                                <rect x="7" y="0" width="3" height="12" fill="rgba(79,142,247,0.9)" />
                            </svg>
                        ) : (
                            <svg width="10" height="12" viewBox="0 0 10 12">
                                <path d="M0 0L10 6L0 12Z" fill="rgba(79,142,247,0.9)" />
                            </svg>
                        )}
                    </button>

                    <button onClick={handleReset} className="btn-reset">
                        ↺
                    </button>

                    <div className="progress-wrapper">

                        <div style={{ flex: 1, height: 3, background: 'rgba(79,142,247,0.1)', borderRadius: 2, position: 'relative' }}>
                            <div style={{
                                height: '100%', borderRadius: 2,
                                background: 'rgba(79,142,247,0.7)',
                                width: `${progress * 100}%`,
                                transition: playing ? 'none' : 'width 0.1s',
                            }} />
                            <input
                                type="range" min={0} max={1} step={0.001}
                                value={progress}
                                onChange={e => { setPlaying(false); setProgress(parseFloat(e.target.value)) }}
                                style={{
                                    position: 'absolute', inset: '-8px 0',
                                    opacity: 0, cursor: 'pointer', width: '100%',
                                }}
                            />
                        </div>

                    </div>

                    <span className="progress-text">
                        {Math.round(progress * 100)}%
                    </span>
                </div>
            </div>
        </>
    )
}
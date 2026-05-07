import { useState } from 'react'

const CONTROLS = {
    tetrahedron: [
        { key: 'radius', label: 'Promień', min: 0.5, max: 5, step: 0.1, default: 1.75 },
    ],
    cube: [
        { key: 'size', label: 'Rozmiar', min: 0.5, max: 5, step: 0.1, default: 1.6 },
    ],
    cuboid: [
        { key: 'width',  label: 'Szerokość', min: 0.5, max: 5, step: 0.1, default: 3 },
        { key: 'height', label: 'Wysokość',  min: 0.5, max: 5, step: 0.1, default: 1 },
        { key: 'depth',  label: 'Głębokość', min: 0.5, max: 5, step: 0.1, default: 1.4 },
    ],
    sphere: [
        { key: 'radius', label: 'Promień', min: 0.5, max: 5, step: 0.1, default: 1.5 },
    ],
    cone: [
        { key: 'radius', label: 'Promień podstawy', min: 0.5, max: 5, step: 0.1, default: 1.25 },
        { key: 'height', label: 'Wysokość',         min: 0.5, max: 6, step: 0.1, default: 2.5 },
    ],
    cylinder: [
        { key: 'radius', label: 'Promień', min: 0.5, max: 5, step: 0.1, default: 0.9 },
        { key: 'height', label: 'Wysokość', min: 0.5, max: 6, step: 0.1, default: 2.5 },
    ],
    prizm: [
        { key: 'width',  label: 'Szerokość', min: 0.5, max: 5, step: 0.1, default: 1 },
        { key: 'height', label: 'Wysokość',  min: 0.5, max: 6, step: 0.1, default: 3 },
        { key: 'depth',  label: 'Głębokość', min: 0.5, max: 5, step: 0.1, default: 1.25 },
    ],
    pyramid: [
        { key: 'radius', label: 'Promień podstawy', min: 0.5, max: 5, step: 0.1, default: 1.25 },
        { key: 'height', label: 'Wysokość',         min: 0.5, max: 6, step: 0.1, default: 2.5 },
        { key: 'sides', label: 'Boki w podstawie',         min: 3, max: 64, step: 1, default: 5 },
    ],
}

export function getDefaults(shapeId) {
    const obj = {};
    (CONTROLS[shapeId] || []).forEach(c => {
        obj[c.key] = c.default
    })
    return obj
}

export default function Controls({ activeShape, params, onChange }) {
    const controls = CONTROLS[activeShape] || []
    const [open, setOpen] = useState(true)

    return (
        <div className="controls-panel">
            <div className="controls-header" onClick={() => setOpen(o => !o)}>
                <span className="controls-title">parametry</span>
                <svg
                    width="12" height="8" viewBox="0 0 14 8" fill="none"
                    style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s' }}
                >
                    <path d="M1 1L7 7L13 1" stroke="rgba(79,142,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            {open && (
                <div className="controls-body">
                    {controls.map(ctrl => (
                        <div key={ctrl.key} className="control-row">
                            <div className="control-label-row">
                                <span className="control-label">{ctrl.label}</span>
                                <span className="control-value">{Number(params[ctrl.key]).toFixed(ctrl.step < 1 ? 2 : 0)}</span>
                            </div>
                            <input
                                type="range"
                                min={ctrl.min}
                                max={ctrl.max}
                                step={ctrl.step}
                                value={params[ctrl.key]}
                                onChange={e => onChange(ctrl.key, parseFloat(e.target.value))}
                                className="control-slider"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
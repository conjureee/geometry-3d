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
        { key: 'radius', label: 'Promień', min: 0.5, max: 5, step: 0.1, default: 1 },
    ],
    cone: [
        { key: 'radius', label: 'Promień podstawy', min: 0.5, max: 5, step: 0.1, default: 1.25 },
        { key: 'height', label: 'Wysokość', min: 0.5, max: 6, step: 0.1, default: 2.5 },
    ],
    cylinder: [
        { key: 'radius', label: 'Promień', min: 0.5, max: 5, step: 0.1, default: 0.9 },
        { key: 'height', label: 'Wysokość', min: 0.5, max: 6, step: 0.1, default: 2.5 },
    ],
    prism: [
        { key: 'radius', label: 'Promień', min: 0.5, max: 5, step: 0.1, default: 1.25 },
        { key: 'height', label: 'Wysokość', min: 0.5, max: 6, step: 0.1, default: 2.5 },
        { key: 'sides',  label: 'Boki w podstawie', min: 3, max: 16, step: 1, default: 5 },
    ],
    pyramid: [
        { key: 'radius', label: 'Promień podstawy', min: 0.5, max: 5, step: 0.1, default: 1.25 },
        { key: 'height', label: 'Wysokość', min: 0.5, max: 6, step: 0.1, default: 2.5 },
        { key: 'sides',  label: 'Boki w podstawie', min: 3, max: 16, step: 1, default: 5 },
    ],
}

const OVERLAYS = {
    cube: [
        { key: 'showEdges', label: 'krawędzie ścian', color: null, default: true },
        { key: 'showFaceDiagonals', label: 'przekątne ścian', color: 'rgba(255,180,80,0.8)', default: false, maxCount: 12 },
        { key: 'showBodyDiagonals', label: 'przekątne bryły', color: 'rgba(255,80,80,0.8)', default: false, maxCount: 4 },
    ],
    cuboid: [
        { key: 'showEdges', label: 'krawędzie ścian', color: null, default: true },
        { key: 'showFaceDiagonals', label: 'przekątne ścian', color: 'rgba(255,180,80,0.8)', default: false, maxCount: 12 },
        { key: 'showBodyDiagonals', label: 'przekątne bryły', color: 'rgba(255,80,80,0.8)', default: false, maxCount: 4 },
    ],
    prism: [
        { key: 'showEdges', label: 'krawędzie ścian',    color: null, default: true },
        { key: 'showBaseDiagonals', label: 'przekątne podstawy', color: 'rgba(255,80,80,0.8)', default: false },
        { key: 'showInclined', label: 'ostrosłup pochylony', default: false },
        // { key: 'showFaceDiagonals', label: 'przekątne ścian', color: 'rgba(255,170,50,0.8)', default: false, maxCount: 2 },
        // { key: 'showBodyDiagonals', label: 'przekątne bryły', color: 'rgba(200,7,7,0.9)', default: false }
    ],
    pyramid: [
        { key: 'showEdges', label: 'krawędzie ścian', color: null, default: true },
        { key: 'showHeight', label: 'wysokość', color: 'rgba(80,255,120,0.8)', default: true },
        { key: 'showBaseDiagonals', label: 'przekątne podstawy', color: 'rgba(255,80,80,0.8)', default: false },
        { key: 'showInclined', label: 'ostrosłup pochylony', default: false }
    ],
    tetrahedron: [
        { key: 'showEdges', label: 'krawędzie ścian', color: null, default: true },
        { key: 'showHeight', label: 'wysokość bryły', color: 'rgba(80,255,120,0.8)', default: false },
        { key: 'showFaceHeights', label: 'wysokości ścian', color: 'rgba(100,200,255,0.85)', default: false, maxCount: 4 },
    ],
    cone: [
        { key: 'showRadius', label: 'promień podstawy', color: 'rgba(255,200,50,0.8)', default: true },
        { key: 'showHeight', label: 'wysokość', color: 'rgba(80,255,120,0.8)', default: true },
    ],
    cylinder: [
        { key: 'showRadius', label: 'promień podstawy', color: 'rgba(255,200,50,0.8)', default: true },
        { key: 'showHeight', label: 'wysokość', color: 'rgba(80,255,120,0.8)', default: true },
    ],
    sphere: [
        { key: 'showEdges', label: 'siatka sfery', color: null, default: false },
        { key: 'showEquator', label: 'równik', color: 'rgba(255,200,50,0.8)', default: true },
        { key: 'showRadius', label: 'promień', color: 'rgba(80,255,120,0.8)', default: true },
    ],
}

export function getDefaults(shapeId) {
    const obj = {}
    ;(CONTROLS[shapeId] || []).forEach(c => { obj[c.key] = c.default })
    return obj
}

export function getOverlayDefaults(shapeId) {
    const obj = {}
    ;(OVERLAYS[shapeId] || []).forEach(o => {
        obj[o.key] = o.default
        if (o.maxCount !== undefined) obj[o.key + 'Count'] = o.maxCount
    })
    return obj
}

export default function Controls({activeShape, params, onChange, overlays, onOverlayChange, crossSection, onCrossSectionChange, embedded = false}) {

    const controls = CONTROLS[activeShape] || []
    const overlayDefs = OVERLAYS[activeShape] || []

    const [open, setOpen] = useState(true)
    const [csOpen, setCsOpen] = useState(true)

    const showCrossSection = activeShape === 'prism'

    const radius = params?.radius ?? 1.25
    const height = params?.height ?? 2.5
    const sides  = params?.sides  ?? 5

    const { posMin, posMax } = (() => {
        if (!crossSection?.plane || activeShape !== 'prism') return { posMin: -radius, posMax: radius }
        if (crossSection.plane === 'XZ') return { posMin: -(height / 2), posMax: height / 2 }
        const xs = [], zs = []
        for (let i = 0; i < sides; i++) {
            const a = (i / sides) * Math.PI * 2
            xs.push(Math.sin(a) * radius)
            zs.push(Math.cos(a) * radius)
        }
        if (crossSection.plane === 'XY') return { posMin: Math.min(...xs), posMax: Math.max(...xs) }
        return { posMin: Math.min(...zs), posMax: Math.max(...zs) }
    })()

    return (
        <div className={embedded ? 'controls-panel-embedded' : 'controls-panel'}>
            <div className="controls-header" onClick={() => setOpen(o => !o)}>
                <span className="controls-title">parametry</span>
                <svg width="12" height="8" viewBox="0 0 14 8" fill="none"
                     style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s' }}>
                    <path d="M1 1L7 7L13 1" stroke="rgba(79,142,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            <div className={`controls-body-wrapper ${open ? "open" : ""}`}>
                <div className="controls-body">
                    {controls.map(ctrl => (
                        <div key={ctrl.key} className="control-row">
                            <div className="control-label-row">
                                <span className="control-label">{ctrl.label}</span>
                                <span className="control-value">
                                    {Number(params[ctrl.key]).toFixed(ctrl.step < 1 ? 2 : 0)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={ctrl.min} max={ctrl.max} step={ctrl.step}
                                value={params[ctrl.key]}
                                onChange={e => onChange(ctrl.key, parseFloat(e.target.value))}
                                className="control-slider"
                            />
                        </div>
                    ))}

                    {overlayDefs.length > 0 && <div className="controls-divider" />}

                    {overlayDefs.map(ov => (
                        <div key={ov.key}>
                            <label className="control-checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={overlays?.[ov.key] ?? ov.default}
                                    onChange={e => onOverlayChange(ov.key, e.target.checked)}
                                />
                                <span className="control-label" style={ov.color ? { color: ov.color } : {}}>
                                    {ov.label}
                                </span>
                            </label>

                            {ov.maxCount !== undefined && (overlays?.[ov.key] ?? ov.default) && (
                                <div className="control-row" style={{ marginTop: 6 }}>
                                    <div className="control-label-row">
                                    <span className="control-label" style={{ fontSize: 10, opacity: 0.6 }}>
                                        ilość widocznych
                                    </span>
                                    <span className="control-value">
                                        {overlays?.[ov.key + 'Count'] ?? ov.maxCount}
                                    </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={ov.maxCount}
                                        step={1}
                                        value={overlays?.[ov.key + 'Count'] ?? ov.maxCount}
                                        onChange={e => onOverlayChange(ov.key + 'Count', parseInt(e.target.value))}
                                        className="control-slider"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showCrossSection && crossSection && (
                <>
                    <div className="controls-header" onClick={() => setCsOpen(o => !o)} style={{ marginTop: '8px' }}>
                        <span className="controls-title">przekroje</span>
                        <svg width="12" height="8" viewBox="0 0 14 8" fill="none"
                             style={{ transform: csOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s' }}>
                            <path d="M1 1L7 7L13 1" stroke="rgba(79,142,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>

                    <div className={`controls-body-wrapper ${csOpen ? "open" : ""}`}>
                        <div className="controls-body">
                            <div className="control-row">
                                <label className="toggle-row">
                                    <span className="control-label">Włącz przekrój</span>
                                    <input type="checkbox" checked={crossSection.enabled}
                                           onChange={e => onCrossSectionChange('enabled', e.target.checked)}
                                           className="toggle-checkbox" />
                                </label>
                            </div>

                            {crossSection.enabled && (
                                <>
                                    <div className="control-row">
                                        <span className="control-label">Płaszczyzna</span>
                                        <div className="button-group">
                                            {['XY', 'XZ', 'YZ'].map(p => (
                                                <button key={p}
                                                        className={`plane-button ${crossSection.plane === p ? 'active' : ''}`}
                                                        onClick={() => onCrossSectionChange('plane', p)}>
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="control-row">
                                        <div className="control-label-row">
                                            <span className="control-label">Pozycja</span>
                                            <span className="control-value">{crossSection.position.toFixed(2)}</span>
                                        </div>
                                        <input type="range" min={posMin} max={posMax} step={0.01}
                                               value={Math.min(Math.max(crossSection.position, posMin), posMax)}
                                               onChange={e => onCrossSectionChange('position', parseFloat(e.target.value))}
                                               className="control-slider" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
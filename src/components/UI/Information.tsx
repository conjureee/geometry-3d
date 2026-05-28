import { useState } from 'react'
import { BlockMath, InlineMath } from "react-katex"

export function SafeMath({ value }: { value: string }) {
    const cleaned = value
        .replace(/\\\(|\\\)/g, '')
        .replace(/\\\[|\\\]/g, '')
        .trim()

    if (!cleaned) return <span style={{ color: 'rgba(255,255,255,0.55)' }}>—</span>

    try {
        return <InlineMath math={cleaned} />
    } catch {
        return <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{cleaned}</span>
    }
}

export default function ShapeInfoPanel({ shapeData }) {

    const [open, setOpen] = useState(true)

    if (!shapeData) return null

    const { description, properties, formulas, dimensions, curiosities } = shapeData

    return (
        <div className="information-panel">
            <div className="controls-header" onClick={() => setOpen(o => !o)}>
                <span className="controls-title">informacje</span>
                <svg width="12" height="8" viewBox="0 0 14 8" fill="none"
                     style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s' }}>
                    <path d="M1 1L7 7L13 1" stroke="rgba(79,142,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            <div className={`controls-body-wrapper ${open ? "open" : ""}`}>
                <div className="controls-body">

                    {/* OPIS */}
                    <div className="control-row">
                        <span className="control-label">Opis</span>
                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: "1.4" }}>
                            {description}
                        </p>
                    </div>

                    <div className="controls-divider" />

                    {/* PROPERTIES */}
                    <div className="control-row">
                        <span className="control-label">Właściwości</span>
                        <ul style={{ paddingLeft: "16px", margin: 0 }}>
                            {Object.entries(properties).map(([key, value]) => (
                                <li key={key} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                                    <strong style={{ color: "#4f8ef7" }}>{key}</strong>: {value.toString()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="controls-divider" />

                    {/* FORMULAS */}
                    <div className="control-row">
                        <span className="control-label">Wzory</span>
                        <ul style={{ paddingLeft: "16px", margin: 0 }}>
                            {Object.entries(formulas).map(([key, value]) => (
                                <li key={key} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                                    <strong style={{ color: "#4f8ef7" }}>{key}</strong>:
                                    <SafeMath value={value} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="controls-divider" />

                    {/* DIMENSIONS */}
                    <div className="control-row">
                        <span className="control-label">Wymiary</span>
                        <ul style={{ paddingLeft: "16px", margin: 0 }}>
                            {Object.entries(dimensions).map(([key, value]) => (
                                <li key={key} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                                    <strong style={{ color: "#4f8ef7" }}>{key}</strong>: <SafeMath value={value} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="controls-divider" />

                    {/* CURIOSITIES */}
                    <div className="control-row">
                        <span className="control-label">Ciekawostki</span>
                        <ul style={{ paddingLeft: "16px", margin: 0 }}>
                            {curiosities.map((c, i) => (
                                <li key={i} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "6px" }}>{c}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

import { useState } from 'react'
import Controls from './Controls'
import SafeMath from './Information'
import { BlockMath, InlineMath } from "react-katex"

export default function BottomPanel({ activeShape, params, onChange, overlays, onOverlayChange, crossSection, onCrossSectionChange, shapeData }) {
    const [paramsOpen, setParamsOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)

    return (
        <>
            {/* panel INFORMACJE */}
            <div className={`bottom-drawer bottom-drawer-info ${infoOpen ? 'open' : 'closed'}`}
                 style={{ bottom: 48 }}>
                <div className="bottom-handle" onClick={() => setInfoOpen(o => !o)}>
                    <div className="bottom-handle-bar bottom-handle-bar-cyan" />
                    <span className="bottom-handle-label bottom-handle-label-cyan">informacje</span>
                    <div className="bottom-handle-bar bottom-handle-bar-cyan" />
                </div>
                <div className="bottom-scroll">
                    {shapeData && <InfoContent shapeData={shapeData} />}
                </div>
            </div>

            {/* panel PARAMETRY */}
            <div className={`bottom-drawer bottom-drawer-params ${paramsOpen ? 'open' : 'closed'}`}>
                <div className="bottom-handle" onClick={() => setParamsOpen(o => !o)}>
                    <div className="bottom-handle-bar bottom-handle-bar-blue" />
                    <span className="bottom-handle-label bottom-handle-label-blue">parametry</span>
                    <div className="bottom-handle-bar bottom-handle-bar-blue" />
                </div>
                <div className="bottom-scroll">
                    <Controls
                        activeShape={activeShape}
                        params={params}
                        onChange={onChange}
                        overlays={overlays}
                        onOverlayChange={onOverlayChange}
                        crossSection={crossSection}
                        onCrossSectionChange={onCrossSectionChange}
                        embedded={true}
                    />
                </div>
            </div>
        </>
    )
}

function InfoContent({ shapeData }) {
    const { description, properties, formulas, dimensions, curiosities } = shapeData
    return (
        <div className="info-content">
            <p className="info-description">{description}</p>

            <InfoSection title="Właściwości">
                {Object.entries(properties).map(([k, v]) => (
                    <InfoRow key={k} label={k} value={v.toString()} />
                ))}
            </InfoSection>

            <InfoSection title="Wzory">
                {Object.entries(formulas).map(([k, v]) => (
                    <InfoRow key={k} label={k} value={v.replace(/\\\(|\\\)/g, '')} math />
                ))}
            </InfoSection>

            <InfoSection title="Wymiary">
                {Object.entries(dimensions).map(([k, v]) => (
                    <InfoRow key={k} label={k} value={v.replace(/\\\(|\\\)/g, '')} math />
                ))}
            </InfoSection>

            <InfoSection title="Ciekawostki">
                {curiosities.map((c, i) => (
                    <p key={i} className="info-curiosity">• {c}</p>
                ))}
            </InfoSection>
        </div>
    )
}

function InfoSection({ title, children }) {
    return (
        <div className="info-section">
            <span className="info-section-title">{title}</span>
            {children}
            <div className="info-section-divider" />
        </div>
    )
}

function InfoRow({ label, value, math }) {
    const cleaned = value.replace(/\\\(|\\\)/g, '').trim()
    console.log('InfoRow:', label, '|', JSON.stringify(value), '->', JSON.stringify(cleaned))
    return (
        <div className="info-row">
            <span className="info-row-label">{label}:</span>
            {math
                ? <InlineMath math={cleaned} />
                : <span className="info-row-value">{value}</span>
            }
        </div>
    )
}
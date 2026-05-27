import { useState } from 'react'
import Controls from './Controls'
import { BlockMath, InlineMath } from 'react-katex'

export default function BottomPanel({ activeShape, params, onChange, overlays, onOverlayChange, crossSection, onCrossSectionChange, shapeData }) {
    const [paramsOpen, setParamsOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)

    return (
        <>
            {/* panel INFORMACJE */}
            <div style={{
                position: 'fixed', bottom: 48, left: 0, right: 0,
                zIndex: 149,
                background: 'rgba(13,13,28,0.97)',
                borderTop: '1px solid rgba(79,142,247,0.15)',
                borderRadius: '20px 20px 0 0',
                transform: infoOpen ? 'translateY(0)' : 'translateY(calc(100% - 48px))',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                maxHeight: '75vh',
                display: 'flex', flexDirection: 'column',
                backdropFilter: 'blur(12px)',
            }}>
                <div
                    onClick={() => setInfoOpen(o => !o)}
                    style={{
                        height: 48, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', gap: 10,
                    }}
                >
                    <div style={{ width: 36, height: 3, background: 'rgba(100,200,255,0.3)', borderRadius: 2 }} />
                    <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(100,200,255,0.5)' }}>
                        informacje
                    </span>
                    <div style={{ width: 36, height: 3, background: 'rgba(100,200,255,0.3)', borderRadius: 2 }} />
                </div>

                <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 24 }}>
                    {shapeData && <InfoContent shapeData={shapeData} />}
                </div>
            </div>

            {/* panel PARAMETRY */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                zIndex: 150,
                background: 'rgba(13,13,28,0.97)',
                borderTop: '1px solid rgba(79,142,247,0.2)',
                borderRadius: '20px 20px 0 0',
                transform: paramsOpen ? 'translateY(0)' : 'translateY(calc(100% - 48px))',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                maxHeight: '72vh',
                display: 'flex', flexDirection: 'column',
                backdropFilter: 'blur(12px)',
            }}>
                <div
                    onClick={() => setParamsOpen(o => !o)}
                    style={{
                        height: 48, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', gap: 10,
                    }}
                >
                    <div style={{ width: 36, height: 3, background: 'rgba(79,142,247,0.3)', borderRadius: 2 }} />
                    <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(79,142,247,0.5)' }}>
                        parametry
                    </span>
                    <div style={{ width: 36, height: 3, background: 'rgba(79,142,247,0.3)', borderRadius: 2 }} />
                </div>

                <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 24 }}>
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
        <div style={{ padding: '0 20px' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginBottom: 16 }}>
                {description}
            </p>

            <Section title="Właściwości">
                {Object.entries(properties).map(([k, v]) => (
                    <Row key={k} label={k} value={v.toString()} plain />
                ))}
            </Section>

            <Section title="Wzory">
                {Object.entries(formulas).map(([k, v]) => (
                    <Row key={k} label={k} value={v.replace(/\\\(|\\\)/g, '')} math />
                ))}
            </Section>

            <Section title="Wymiary">
                {Object.entries(dimensions).map(([k, v]) => (
                    <Row key={k} label={k} value={v.replace(/\\\(|\\\)/g, '')} math />
                ))}
            </Section>

            <Section title="Ciekawostki">
                {curiosities.map((c, i) => (
                    <p key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 8 }}>
                        • {c}
                    </p>
                ))}
            </Section>
        </div>
    )
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(79,142,247,0.5)', display: 'block', marginBottom: 8 }}>
                {title}
            </span>
            {children}
            <div style={{ height: 1, background: 'rgba(79,142,247,0.08)', margin: '12px 0 0' }} />
        </div>
    )
}

function Row({ label, value, math, plain }) {
    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: '#4f8ef7', fontWeight: 500, flexShrink: 0 }}>{label}:</span>
            {math
                ? <InlineMath math={value} />
                : <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{value}</span>
            }
        </div>
    )
}
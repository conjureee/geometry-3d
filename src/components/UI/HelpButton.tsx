import { useState } from 'react';

export const INSTRUCTIONS = [
    { icon: '🔄', text: 'Lewy przycisk myszy + przeciągnij -> obróć figurę' },
    { icon: '🖐️', text: 'Prawy przycisk myszy + przeciągnij -> przesuń bryłę' },
    { icon: '🖱️', text: 'Scroll -> przybliż / oddal' },
    { icon: '🔝', text: 'Strzałka u góry -> menu do zmiany brył' },
    { icon: '🎬', text: 'Przycisk "▶" na miniaturze bryły w menu na górze -> animacja powstawania' },
    { icon: '💡', text: 'Panel po lewej -> informacje o bryle (m.in. opis, wzory, ciekawostki)' },
    { icon: '🎛️', text: 'Panel po prawej (Parametry) -> parametry i nakładki' },
    { icon: '🔪', text: 'Panel po prawej (Przekroje) -> przekroje brył, możliwe do wyboru różne osie' },
];

export default function HelpButton() {
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState<'desktop'|'touch'>('desktop')

    const desktopInstructions = INSTRUCTIONS
    const touchInstructions = [
        { icon: '👆', text: 'Jeden palec + przeciągnij → obróć figurę' },
        { icon: '🤏', text: 'Dwa palce → przybliż / oddal' },
        { icon: '✌️', text: 'Dwa palce + przeciągnij → przesuń widok' },
        ...INSTRUCTIONS.slice(3),
    ]

    const current = mode === 'desktop' ? desktopInstructions : touchInstructions

    return (
        <>
            <button className={`help-button ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>?</button>

            <div className={`help-panel ${open ? 'open' : ''}`}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                    {(['desktop', 'touch'] as const).map(m => (
                        <button key={m} onClick={() => setMode(m)} style={{
                            flex: 1, padding: '4px 0', borderRadius: 6, border: 'none',
                            background: mode === m ? 'rgba(79,142,247,0.2)' : 'rgba(79,142,247,0.05)',
                            color: mode === m ? 'rgba(79,142,247,0.9)' : 'rgba(255,255,255,0.4)',
                            fontSize: 10, letterSpacing: 1, cursor: 'pointer',
                            borderBottom: mode === m ? '1px solid rgba(79,142,247,0.4)' : '1px solid transparent',
                        }}>
                            {m === 'desktop' ? '🖥 Desktop' : '📱 Dotyk'}
                        </button>
                    ))}
                </div>
                <span className="help-header">instrukcja</span>
                {current.map((item, i) => (
                    <div key={i} className="help-item">
                        <span className="help-icon">{item.icon}</span>
                        <span className="help-text">{item.text}</span>
                    </div>
                ))}
            </div>

            {open && <div className="help-overlay" onClick={() => setOpen(false)} />}
        </>
    )
}
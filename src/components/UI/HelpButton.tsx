import { useState } from 'react';

const INSTRUCTIONS = [
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
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className={`help-button ${open ? 'open' : ''}`}
                onClick={() => setOpen(o => !o)}
            >
                ?
            </button>

            <div className={`help-panel ${open ? 'open' : ''}`}>
                <span className="help-header">instrukcja</span>
                {INSTRUCTIONS.map((item, i) => (
                    <div key={i} className="help-item">
                        <span className="help-icon">{item.icon}</span>
                        <span className="help-text">{item.text}</span>
                    </div>
                ))}
            </div>

            {open && <div className="help-overlay" onClick={() => setOpen(false)} />}
        </>
    );
}
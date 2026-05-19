import { useState } from 'react';

const INSTRUCTIONS = [
    { icon: '🖱️', text: 'Lewy przycisk myszy + przeciągnij — obróć figurę' },
    { icon: '🔍', text: 'Scroll — przybliż / oddal' },
    { icon: '✋', text: 'Prawy przycisk myszy + przeciągnij — przesuń widok' },
    { icon: '▶', text: 'Przycisk play na karcie figury — animacja powstawania' },
    { icon: '☰', text: 'Strzałka u góry — zmień figurę' },
    { icon: '⚙', text: 'Panel po prawej — parametry i nakładki' },
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
const PATHS = {
    tetrahedron: (
        <polygon points="50,8 92,78 8,78" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
    ),
    cube: (
        <>
            <rect x="20" y="30" width="45" height="45" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <polygon points="20,30 35,15 80,15 65,30" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <line x1="65" y1="30" x2="65" y2="75" stroke="currentColor" strokeWidth="5"/>
            <line x1="65" y1="15" x2="80" y2="15" stroke="currentColor" strokeWidth="5"/>
            <line x1="80" y1="15" x2="80" y2="60" stroke="currentColor" strokeWidth="5"/>
            <line x1="80" y1="60" x2="65" y2="75" stroke="currentColor" strokeWidth="5"/>
        </>
    ),
    cuboid: (
        <>
            <rect x="10" y="35" width="55" height="38" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <polygon points="10,35 25,20 80,20 65,35" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <line x1="65" y1="35" x2="65" y2="73" stroke="currentColor" strokeWidth="5"/>
            <line x1="65" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="5"/>
            <line x1="80" y1="20" x2="80" y2="58" stroke="currentColor" strokeWidth="5"/>
            <line x1="80" y1="58" x2="65" y2="73" stroke="currentColor" strokeWidth="5"/>
        </>
    ),
    sphere: (
        <>
            <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="5"/>
            <ellipse cx="50" cy="50" rx="36" ry="13" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="4 3"/>
        </>
    ),
    cone: (
        <>
            <polygon points="50,10 82,78 18,78" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <ellipse cx="50" cy="78" rx="32" ry="10" fill="none" stroke="currentColor" strokeWidth="4"/>
        </>
    ),
    cylinder: (
        <>
            <ellipse cx="50" cy="25" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="5"/>
            <ellipse cx="50" cy="75" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="5"/>
            <line x1="20" y1="25" x2="20" y2="75" stroke="currentColor" strokeWidth="5"/>
            <line x1="80" y1="25" x2="80" y2="75" stroke="currentColor" strokeWidth="5"/>
        </>
    ),
    prism: (
        <>
            <polygon points="50,15 85,70 15,70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <polygon points="50,35 78,80 22,80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeDasharray="4 3"/>
            <line x1="50" y1="15" x2="50" y2="35" stroke="currentColor" strokeWidth="4" strokeDasharray="4 3"/>
            <line x1="85" y1="70" x2="78" y2="80" stroke="currentColor" strokeWidth="4" strokeDasharray="4 3"/>
            <line x1="15" y1="70" x2="22" y2="80" stroke="currentColor" strokeWidth="4" strokeDasharray="4 3"/>
        </>
    ),
    pyramid: (
        <>
            <polygon points="50,10 85,75 15,75" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
            <ellipse cx="50" cy="75" rx="35" ry="10" fill="none" stroke="currentColor" strokeWidth="4"/>
        </>
    ),
}

export default function ShapeIcon({ shapeId, size = 40, color = 'rgba(79,142,247,0.8)' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{ color, display: 'block', flexShrink: 0 }}
        >
            {PATHS[shapeId] ?? <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="5"/>}
        </svg>
    )
}
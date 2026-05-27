import { useState, useEffect } from 'react'

export function useIsMobile() {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])
    return { isMobile: width < 1024, isPhone: width < 768 }
}
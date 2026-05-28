export default function MathRenderer({ value }) {
    if (!value) return <span>—</span>

    let str = value
        .replace(/\\\(|\\\)/g, '')
        .replace(/\\\[|\\\]/g, '')
        .trim()

    const parts = parseMath(str)

    return (
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
            {parts.map((p, i) => <MathPart key={i} part={p} />)}
        </span>
    )
}

function MathPart({ part }) {
    if (part.type === 'text') return <span>{part.value}</span>

    if (part.type === 'pi') return <span>π</span>

    if (part.type === 'sqrt') return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <span style={{ fontSize: '1.1em' }}>√</span>
            <span style={{
                borderTop: '1.5px solid rgba(255,255,255,0.8)',
                paddingTop: 1,
                paddingLeft: 1,
                paddingRight: 2,
            }}>
                {part.inner.map((p, i) => <MathPart key={i} part={p} />)}
            </span>
        </span>
    )

    if (part.type === 'frac') return (
        <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', verticalAlign: 'middle', margin: '0 3px', lineHeight: 1.2 }}>
            <span style={{ borderBottom: '1px solid rgba(255,255,255,0.7)', paddingBottom: 1, paddingLeft: 2, paddingRight: 2 }}>
                {part.num.map((p, i) => <MathPart key={i} part={p} />)}
            </span>
            <span style={{ paddingTop: 1, paddingLeft: 2, paddingRight: 2 }}>
                {part.den.map((p, i) => <MathPart key={i} part={p} />)}
            </span>
        </span>
    )

    if (part.type === 'sup') return (
        <sup style={{ fontSize: '0.7em', verticalAlign: 'super', lineHeight: 0 }}>
            {part.value}
        </sup>
    )

    if (part.type === 'sub') return (
        <sub style={{ fontSize: '0.7em', verticalAlign: 'sub', lineHeight: 0 }}>
            {part.value}
        </sub>
    )

    return <span>{part.value}</span>
}

function parseMath(str) {
    const parts = []
    let i = 0

    while (i < str.length) {
        if (str.startsWith('\\pi', i)) {
            parts.push({ type: 'pi' })
            i += 3
            continue
        }

        if (str.startsWith('\\sqrt', i)) {
            i += 5
            if (str[i] === '{') {
                const { content, end } = extractBraces(str, i)
                parts.push({ type: 'sqrt', inner: parseMath(content) })
                i = end
            } else {
                parts.push({ type: 'text', value: '√' })
            }
            continue
        }

        if (str.startsWith('\\frac', i)) {
            i += 5
            if (str[i] === '{') {
                const num = extractBraces(str, i)
                const den = extractBraces(str, num.end)
                parts.push({ type: 'frac', num: parseMath(num.content), den: parseMath(den.content) })
                i = den.end
            } else {
                parts.push({ type: 'text', value: 'frac' })
            }
            continue
        }

        if (str[i] === '\\') {
            i++
            let cmd = ''
            while (i < str.length && /[a-zA-Z]/.test(str[i])) {
                cmd += str[i++]
            }
            parts.push({ type: 'text', value: cmd })
            continue
        }

        if (str[i] === '^') {
            i++
            if (str[i] === '{') {
                const { content, end } = extractBraces(str, i)
                parts.push({ type: 'sup', value: content })
                i = end
            } else {
                parts.push({ type: 'sup', value: str[i++] })
            }
            continue
        }

        if (str[i] === '_') {
            i++
            if (str[i] === '{') {
                const { content, end } = extractBraces(str, i)
                parts.push({ type: 'sub', value: content })
                i = end
            } else {
                parts.push({ type: 'sub', value: str[i++] })
            }
            continue
        }

        let text = ''
        while (i < str.length && !['\\', '^', '_'].includes(str[i])) {
            text += str[i++]
        }
        if (text) parts.push({ type: 'text', value: text })
    }

    return parts
}

function extractBraces(str, i) {
    let depth = 0
    let start = i + 1
    while (i < str.length) {
        if (str[i] === '{') depth++
        else if (str[i] === '}') {
            depth--
            if (depth === 0) return { content: str.slice(start, i), end: i + 1 }
        }
        i++
    }
    return { content: str.slice(start), end: str.length }
}
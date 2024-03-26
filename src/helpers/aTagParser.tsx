export function tagParser(sentence: string, purgeAnchor: boolean = false) {
    const isFound: boolean = findTag(sentence)

    if (!isFound) {
        return <>{sentence}</>
    }

    const x: string[] = sentence.split('<a')

    const innerText = x[1].split('>')[1]?.split('</a')[0]
    let href = x[1]?.split('>')[0]?.split('href=\'')[1]
    if (href) {
        href = href.slice(0, href.length - 1)
    }

    const outputText: string = x[0]

    return (
        <>
            {
                <>{outputText} <a style={{ fontFamily: 'cursive', color: 'plum' }} href={href}>{innerText}</a></>
            }
        </>
    )
}

function findTag(sentence: string): boolean {
    const tagStart: string = '<a'
    const tagIndex: number = sentence.indexOf(tagStart)
    let result: boolean = true

    if (tagIndex === -1) {
        result = false
    }

    return result
}
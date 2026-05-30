/**
 * Utility to wrap every word of text in `.word-inner` spans
 * so the GSAP split-words reveal animation can work.
 * Also adds the `.ready` class to make the container visible.
 */
export function wrapWords(el: HTMLElement) {
    if (el.classList.contains('ready') || el.querySelector('.word-inner')) {
        return;
    }
    const html = `>${el.innerHTML}<`;
    el.innerHTML = html
        .replace(/>([^<]+)</g, (_, text) => {
            const words = text.split(/(\s+)/);
            const wrapped = words
                .map((w: string) =>
                    w.trim()
                        ? `<span class="word-wrap" style="overflow:hidden;display:inline-block;"><span class="word-inner" style="display:inline-block;transform:translateY(110%);">${w}</span></span>`
                        : w
                )
                .join('');
            return `>${wrapped}<`;
        })
        .slice(1, -1);
    el.classList.add('ready');
}

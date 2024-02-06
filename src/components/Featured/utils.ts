export const getRandomHeadingColor = () => {
    const colors = [
        'text 1x1 font-bold text-[var(--gray-12)]',
        'text 1x1 font-bold text-[var(--mauve-12)]',
        'text 1x1 font-bold text-[var(--slate-12)]',
        'text 1x1 font-bold text-[var(--sage-12)]',
        'text 1x1 font-bold text-[var(--olive-12)]',
        'text 1x1 font-bold text-[var(--sand-12)]',
        'text 1x1 font-bold text-[var(--gold-12)]',
        'text 1x1 font-bold text-[var(--bronze-12)]',
        'text 1x1 font-bold text-[var(--brown-12)]',
        'text 1x1 font-bold text-[var(--yellow-12)]',
        'text 1x1 font-bold text-[var(--amber-12)]',
        'text 1x1 font-bold text-[var(--orange-12)]',
        'text 1x1 font-bold text-[var(--tomato-12)]',
        'text 1x1 font-bold text-[var(--red-12)]',
        'text 1x1 font-bold text-[var(--ruby-12)]',
        'text 1x1 font-bold text-[var(--crimson-12)]',
        'text 1x1 font-bold text-[var(--pink-12)]',
        'text 1x1 font-bold text-[var(--plum-12)]',
        'text 1x1 font-bold text-[var(--blue-12)]',
        'text 1x1 font-bold text-[var(--indigo-12)]',
        'text 1x1 font-bold text-[var(--sky-12)]',
        'text 1x1 font-bold text-[var(--cyan-12)]',
        'text 1x1 font-bold text-[var(--teal-12)]',
        'text 1x1 font-bold text-[var(--lime-12)]',
        'text 1x1 font-bold text-[var(--mint-12)]'
    ]
    return colors[Math.floor(Math.random() * colors.length)] as string
}

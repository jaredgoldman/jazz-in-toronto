export class ArtistNameGenerator {
    private readonly adjectives: string[]
    private readonly nouns: string[]
    private generatedNames: Set<string>

    constructor() {
        this.adjectives = [
            'Electric',
            'Funky',
            'Cosmic',
            'Epic',
            'Lunar',
            'Mystic',
            'Neon',
            'Psychedelic',
            'Sonic',
            'Vibrant',
            'Wild',
            'Astral',
            'Blazing',
            'Dancing',
            'Eternal',
            'Fierce',
            'Glowing'
        ]

        this.nouns = [
            'Cats',
            'Dreamers',
            'Fire',
            'Galaxy',
            'Harmony',
            'Jammers',
            'Legends',
            'Rebels',
            'Soul',
            'Wizards',
            'Zodiac',
            'Aces',
            'Blasters',
            'Crew',
            'Dancers'
        ]

        this.generatedNames = new Set<string>()
    }

    generateArtistName(): string {
        let artistName = ''

        do {
            const randomAdjective = this.getRandomElement(this.adjectives)
            const randomNoun = this.getRandomElement(this.nouns)

            artistName = `${randomAdjective} ${randomNoun}`
        } while (this.generatedNames.has(artistName))

        this.generatedNames.add(artistName)

        return artistName
    }

    private getRandomElement<T>(array: T[]): T {
        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex] as T
    }
}

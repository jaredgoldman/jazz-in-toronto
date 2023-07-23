export class BandNameGenerator {
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

    generateBandName(): string {
        let bandName = ''

        do {
            const randomAdjective = this.getRandomElement(this.adjectives)
            const randomNoun = this.getRandomElement(this.nouns)

            bandName = `${randomAdjective} ${randomNoun}`
        } while (this.generatedNames.has(bandName))

        this.generatedNames.add(bandName)

        return bandName
    }

    private getRandomElement<T>(array: T[]): T {
        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex] as T
    }
}

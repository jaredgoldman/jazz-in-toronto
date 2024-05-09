import { Genre } from '@prisma/client'

export const genreLabels: Record<Genre, string> = {
    [Genre.JAZZ]: 'Jazz',
    [Genre.BLUES]: 'Blues',
    [Genre.COUNTRY]: 'Country',
    [Genre.ELECTRONIC]: 'Electronic',
    [Genre.INDIE]: 'Indie',
    [Genre.POP]: 'Pop',
    [Genre.ROCK]: 'Rock',
    [Genre.SOUL]: 'Soul',
    [Genre.OTHER]: 'Other',
    [Genre.HIPHOP]: 'Hip Hop',
    [Genre.CLASSICAL]: 'Classical',
    [Genre.FUNK]: 'Funk',
    [Genre.RNB]: 'R&B',
}

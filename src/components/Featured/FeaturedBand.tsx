import { type Band } from '@prisma/client'
import Image from 'next/image'

interface Props {
    band: Band
}

export default function FeaturedBand({ band }: Props) {
    return (
        <div>
            <h1>{band.name}</h1>
            {band.photoPath && (
                <Image
                    src={band.photoPath}
                    height={200}
                    width={200}
                    alt="band photo"
                />
            )}
        </div>
    )
}

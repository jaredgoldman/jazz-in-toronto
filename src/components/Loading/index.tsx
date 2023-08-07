import Image from 'next/image'

export default function Loading() {
    return (
        <div className="my-10">
            <Image
                className="animate-spin"
                src="/images/spinner.png"
                width={125}
                height={125}
                alt="loading"
            />
        </div>
    )
}

import Image from 'next/image'

export default function Loading() {
    return (
        <div className="my-10 flex w-full justify-center">
            <Image
                className="animate-spin"
                src="/images/spinner.png"
                width={100}
                height={100}
                alt="loading"
            />
        </div>
    )
}

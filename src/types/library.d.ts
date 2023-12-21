export interface CloudinaryService {
    uploader: {
        upload: (
            file: string,
            options: object
        ) => Promise<{
            secure_url: string
        }>
    }
    config: (options: { secure: boolean }) => void
}

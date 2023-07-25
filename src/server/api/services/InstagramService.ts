export default class InstagramService {
    private accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    public async postToInstagram(fileUrls: string[]): Promise<void> {}
}

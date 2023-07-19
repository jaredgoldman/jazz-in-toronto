export default class CrawlerService {
    private async crawlSite(url: string) {
        // crawl site
        // return html
    }

    private parseHtml(html: string, selectors: string[]) {
        // parse html
        // return parsed data
    }

    public async getEvents(url: string, selectors: string[]) {
        const html = await this.crawlSite(url)
        const events = this.parseHtml(html, selectors)
        return events
    }
}

package com.sleepinggoats.dataloader.scrape

import com.sleepinggoats.dataloader.store.DocumentStorage
import org.slf4j.LoggerFactory
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.stereotype.Service

@Service
@EnableConfigurationProperties(ScraperProperties::class)
class ScrapeService(
    private val keywordEvaluator: ArticleProcessor,
    private val documentStorage: DocumentStorage,
    private val scrapers: List<Scraper>
) {

    private val log = LoggerFactory.getLogger(javaClass)

    fun getSources(): List<DataSource> {
        return scrapers.map { DataSource(it.name, it.description) }
    }

    fun scrape() {
        log.info("Started scraping")
        for (scraper in scrapers) {
            log.info("Scraping ${scraper.name}...")
            try {
                val articles = scraper.scrape()
                for (article in articles) {
                    if (keywordEvaluator.evaluate(article)) {
                        log.info("Found matching document: ${article.title}")
                        val summary = keywordEvaluator.summarize(article)
                        documentStorage.appendToDocument(
                            scraper.name,
                            Article(article.title, article.url, summary, false)
                        )
                    }
                }
            } catch (e: Exception) {
                log.error("Error scraping ${scraper.name}", e)
                continue
            }
        }
        log.info("Finished scraping")
    }
}
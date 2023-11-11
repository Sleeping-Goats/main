package com.sleepinggoats.dataloader.scrape.impl

import com.fasterxml.jackson.databind.ObjectMapper
import com.sleepinggoats.dataloader.scrape.Article
import okhttp3.OkHttpClient
import org.springframework.stereotype.Component

@Component
class FinancialScrapper(
    private val config: Config,
    private val ok: OkHttpClient,
    private val mapper: ObjectMapper
) : NewsScraper(config, ok, mapper) {

    override val name = "financial"
    override val description = "Financial news about stock market developments"

    override fun scrape(): List<Article> {
        return scrapeUrls(
            listOf(
                "https://www.marketwatch.com/",
                "https://www.economist.com/",
                //"https://www.bloomberg.com/economics",
                //"https://www.ft.com/",
                //"https://www.investopedia.com/",
                //"https://www.zerohedge.com/",
                //"https://www.reuters.com/business/",
                //"https://www.business-standard.com/"
            )
        )
    }
}
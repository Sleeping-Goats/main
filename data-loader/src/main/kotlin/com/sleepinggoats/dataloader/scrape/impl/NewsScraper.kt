package com.sleepinggoats.dataloader.scrape.impl

import com.fasterxml.jackson.databind.ObjectMapper
import com.sleepinggoats.dataloader.scrape.Article
import com.sleepinggoats.dataloader.scrape.Scraper
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.http.MediaType
import org.springframework.stereotype.Component

@Component
@EnableConfigurationProperties(NewsScraper.Config::class)
class NewsScraper(
    private val config: Config,
    private val ok: OkHttpClient,
    private val mapper: ObjectMapper
) : Scraper {

    override val name = "news"
    override val description = "News articles from various sources"

    override fun scrape(): List<Article> {
        val body = RequestBody.create("application/json; charset=utf-8".toMediaType(),
            mapper.writeValueAsString(mapOf("urls" to config.newsUrls))
        )
        val request = okhttp3.Request.Builder()
            .url(config.apiUrl)
            .post(body)
            .build()
        val response = ok.newCall(request).execute()
        val json = response.body?.string() ?: throw RuntimeException("No response body")
        val articles = mapper.readValue(json, Array<NewsArticle>::class.java)
        return articles.map { Article(it.title, it.text, it.url) }
    }

    @ConfigurationProperties(prefix = "config.scrapers.news")
    data class Config(val apiUrl: String, val newsUrls: List<String>)

    data class NewsArticle(val title: String, val text: String, val url: String)
}
package com.sleepinggoats.dataloader.scrape.impl

import com.fasterxml.jackson.databind.ObjectMapper
import com.sleepinggoats.dataloader.scrape.Article
import com.sleepinggoats.dataloader.scrape.ArticleProcessor
import com.sleepinggoats.dataloader.scrape.Scraper
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import org.springframework.stereotype.Component

@Component
class PatentsScraper(
    private val articleProcessor: ArticleProcessor,
    private val ok: OkHttpClient,
    private val mapper: ObjectMapper
) : Scraper {

    override val name = "patents"
    override val description = "Data from patent databases"

    override fun scrape(): List<Article> {
        val body = RequestBody.create(
            "application/json; charset=utf-8".toMediaType(),
            mapper.writeValueAsString(mapOf("keywords" to articleProcessor.keywords))
        )
        val request = okhttp3.Request.Builder()
            .url("http://localhost:3500/patents")
            .post(body)
            .build()

        val response = ok.newCall(request).execute()
        val json = response.body?.string() ?: throw RuntimeException("No response body")
        val articles = mapper.readValue(json, Array<Patent>::class.java)
        return articles.map { transformText(it) }
    }

    private fun transformText(patent: Patent): Article {
        val text = """
            |Patent ID: ${patent.patent_id}
            |\n
            |Patent grant date: ${patent.grantDate ?: "N/A"}
            |\n
            |${patent.snippet}
            |\n
        """.trimMargin()

        return Article(patent.title, text, patent.pdf ?: "Unknown", false)
    }

    data class Patent(
        val title: String,
        val snippet: String,
        val grantDate: String?,
        val pdf: String?,
        val patent_id: String
    )
}
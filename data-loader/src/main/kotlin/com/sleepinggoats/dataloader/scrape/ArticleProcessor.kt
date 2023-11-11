package com.sleepinggoats.dataloader.scrape

import com.fasterxml.jackson.databind.ObjectMapper
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import org.springframework.stereotype.Service

@Service
class ArticleProcessor(
    private val ok: OkHttpClient,
    private val props: ScraperProperties,
    private val mapper: ObjectMapper
) {

    var keywords = listOf("metal", "alloy", "steel")

    val systemPrompt = """
        You are an assistant that helps the user to summarize a document.
        The user gives you a document. You then summarize the document and give the summary to the user.
        
        Maximum summary length: 500 characters. Do not exceed this limit.
        Do not include anything other than the summary in the output.
        
        There are keywords in the article. If they are present, you absolutely must include the parts where they are present in the summary.
        Do not include the list of keywords. Just make sure to include the parts where they are present.
        Make sure to focus on the following keywords: 
    """.trimIndent()

    fun evaluate(article: Article): Boolean {
        return keywords.any { article.text.contains(it) }
    }

    fun summarize(article: Article): String {
        val body = mapOf(
            "input" to mapOf(
                "system" to systemPrompt + keywords.joinToString(", "),
                "text" to article.text
            ),
        )
        val llmRequest = okhttp3.Request.Builder()
            .url(props.llmUrl)
            .post(
                okhttp3.RequestBody.create(
                    "application/json; charset=utf-8".toMediaType(),
                    mapper.writeValueAsString(body)
                )
            )
            .build()

        val llmResponse = ok.newCall(llmRequest).execute()
        val llmJson = llmResponse.body?.string() ?: throw RuntimeException("No response body")
        return mapper.readValue(llmJson, SummaryResponse::class.java).output.content
    }

    data class SummaryResponse(val output: Output) {
        data class Output(val content: String)
    }
}
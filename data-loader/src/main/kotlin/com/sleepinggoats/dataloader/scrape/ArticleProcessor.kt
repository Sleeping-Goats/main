package com.sleepinggoats.dataloader.scrape

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Service

@Service
class ArticleProcessor {

    var keywords = listOf("war")

    fun evaluate(article: Article): Boolean {
        return keywords.any { article.text.contains(it) }
    }

    fun summarize(article: Article): String {
        // TODO("call LLM")
        return article.text
    }

    @ConfigurationProperties(prefix = "llm")
    data class SummarizingLLMProperties(val url: String)
}
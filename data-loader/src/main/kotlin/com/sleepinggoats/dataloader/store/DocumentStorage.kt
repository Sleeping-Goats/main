package com.sleepinggoats.dataloader.store

import com.fasterxml.jackson.databind.ObjectMapper
import com.sleepinggoats.dataloader.scrape.Article
import org.redisson.api.RedissonClient
import org.springframework.stereotype.Service

@Service
class DocumentStorage(redisson: RedissonClient, private val mapper: ObjectMapper) {

    private val documentsMap = redisson.getMap<String, String>("documents")

    fun getDocument(key: String): String {
        return documentsMap[key] ?: throw Exception("Document not found")
    }

    fun appendToDocument(key: String, newArticle: Article) {
        val newArticleText = """
            |${newArticle.title}
            |${newArticle.url}
            |${newArticle.text}
            \n
        """.trimMargin()

        val document = documentsMap[key]
        if (document == null) {
            documentsMap[key] = newArticleText
            return
        }
        documentsMap[key] = document + newArticleText
    }
}

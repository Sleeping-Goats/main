package com.sleepinggoats.dataloader.scrape

import com.sleepinggoats.dataloader.store.DocumentStorage
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class DataSourceController(
    private val keywordEvaluator: ArticleProcessor,
    private val scrapeService: ScrapeService,
    private val storage: DocumentStorage
) {

    @GetMapping("/data-sources")
    fun getSources(): List<DataSource> = scrapeService.getSources()

    @GetMapping("/data-sources/keywords")
    fun getKeywords(): List<String> = keywordEvaluator.keywords

    @PostMapping("/data-sources/keywords")
    fun setKeywords(@RequestBody keywords: List<String>) {
        keywordEvaluator.keywords = keywords
    }

    @GetMapping("/data-sources/{name}")
    fun getSource(@PathVariable name: String): String {
        try {
            return storage.getDocument(name)
        } catch (e: Exception) {
            return "No data"
        }
    }

    @DeleteMapping("/data-sources/{name}")
    fun invalidate(@PathVariable name: String) = storage.invalidate(name)
}
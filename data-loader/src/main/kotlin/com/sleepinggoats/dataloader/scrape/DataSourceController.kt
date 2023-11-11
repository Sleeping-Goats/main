package com.sleepinggoats.dataloader.scrape

import com.sleepinggoats.dataloader.store.DocumentStorage
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(
    origins = ["http://localhost:3000"],
    maxAge = 3003,
    methods = [RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE]
)
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
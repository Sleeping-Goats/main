package com.sleepinggoats.dataloader.scrape

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "scraper")
class ScraperProperties(
    val llmUrl: String
)
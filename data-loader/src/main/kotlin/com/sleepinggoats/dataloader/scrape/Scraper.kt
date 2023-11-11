package com.sleepinggoats.dataloader.scrape

interface Scraper {

    fun scrape(): List<Article>

    val name: String
    val description: String
}
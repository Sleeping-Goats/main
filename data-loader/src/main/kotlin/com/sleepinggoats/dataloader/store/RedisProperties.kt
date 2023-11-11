package com.sleepinggoats.dataloader.store

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "redis")
data class RedisProperties(val url: String)

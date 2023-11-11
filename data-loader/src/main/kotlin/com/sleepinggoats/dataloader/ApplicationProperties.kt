package com.sleepinggoats.dataloader

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "config")
data class ApplicationProperties(val zone: String)
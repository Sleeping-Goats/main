package com.sleepinggoats.dataloader.store

import org.redisson.Redisson
import org.redisson.api.RedissonClient
import org.redisson.config.Config
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties(RedisProperties::class)
class RedisConfiguration(private val redisProperties: RedisProperties) {
    @Bean
    fun redisson(): RedissonClient {
        val config = Config()
        config.useSingleServer().address = redisProperties.url
        return Redisson.create(config)
    }
}
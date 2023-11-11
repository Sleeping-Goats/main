package com.sleepinggoats.dataloader

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import okhttp3.OkHttpClient
import org.redisson.Redisson
import org.redisson.api.RedissonClient
import org.redisson.config.Config
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Duration
import java.time.temporal.ChronoUnit

@Configuration
@EnableConfigurationProperties(ApplicationProperties::class)
class Configuration {

    @Bean
    fun okHttp() = OkHttpClient.Builder().readTimeout(Duration.of(3, ChronoUnit.MINUTES)).build()

    @Bean
    fun mapper() = jacksonObjectMapper().findAndRegisterModules()
        .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
}
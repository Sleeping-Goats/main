package com.sleepinggoats.dataloader.update

import com.fasterxml.jackson.databind.ObjectMapper
import com.sleepinggoats.dataloader.ApplicationProperties
import com.sleepinggoats.dataloader.scrape.ScrapeService
import okhttp3.HttpUrl
import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.concurrent.Executors

@Service
class UpdateScheduler(
    private val ok: OkHttpClient,
    private val mapper: ObjectMapper,
    private val scraper: ScrapeService,
    private val properties: ApplicationProperties
) {
    private var nextUpdateTimestamp: UpdateTimestamp = determineNextBestTimestamp()
    private var lastUpdateTimestamp: UpdateTimestamp =
        UpdateTimestamp(0, UpdateTimestamp.ScheduleType.MANUAL)

    private val scheduler = Executors.newSingleThreadScheduledExecutor()

    private val log = LoggerFactory.getLogger(javaClass)

    fun getNextUpdateTimestamp(): UpdateTimestamp {
        return nextUpdateTimestamp
    }

    fun setNextUpdateTimestamp(updateTimestamp: UpdateTimestamp) {

        val currentTimestamp = System.currentTimeMillis()
        var scheduleTimestamp = updateTimestamp.timestamp
        if (scheduleTimestamp < currentTimestamp) {
            scheduleTimestamp = currentTimestamp
        }
        scheduler.schedule(
            { update() },
            scheduleTimestamp - currentTimestamp,
            java.util.concurrent.TimeUnit.MILLISECONDS
        )

        nextUpdateTimestamp = updateTimestamp

        log.info(
            "Next update scheduled for ${
                LocalDateTime.ofEpochSecond(
                    updateTimestamp.timestamp,
                    0,
                    java.time.ZoneOffset.UTC
                )
            }"
        )
    }

    fun getLastUpdateTimestamp(): UpdateTimestamp {
        return lastUpdateTimestamp
    }

    private final fun determineNextBestTimestamp(): UpdateTimestamp {
        val url = HttpUrl.Builder()
            .scheme("https")
            .host("api-access.electricitymaps.com")
            .addPathSegment("2w97h07rvxvuaa1g")
            .addPathSegment("carbon-intensity")
            .addPathSegment("/forecast")
            .addQueryParameter("zone", properties.zone)
            .build()

        val request = Request.Builder()
            .get()
            .url(url)
            .header("auth-token", "dHLqrSnrq6jBh8Cj9OR24eIhRieuxGsO")
            .build()

        val response = ok.newCall(request).execute()

        val responseBody = response.body?.string()
        val forecastData: ForecastResponse =
            mapper.readValue(responseBody, ForecastResponse::class.java)

        val bestForecast = forecastData.forecast.minBy { it.carbonIntensity }
        val bestForecastTimestamp =
            bestForecast.datetime.toEpochSecond(java.time.ZoneOffset.UTC)

        log.info("Next best carbon emission forecast for scraping: ${bestForecast.datetime}")

        return UpdateTimestamp(bestForecastTimestamp, UpdateTimestamp.ScheduleType.AUTO)
    }

    private fun update() {
        lastUpdateTimestamp = nextUpdateTimestamp
        nextUpdateTimestamp = determineNextBestTimestamp()
        scraper.scrape()
    }

    data class ForecastResponse(
        val zone: String,
        val forecast: List<ForecastResponseData>
    )

    data class ForecastResponseData(
        val carbonIntensity: Int,
        val datetime: LocalDateTime
    )
}
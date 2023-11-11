package com.sleepinggoats.dataloader.update

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.Executors

@RestController
class UpdateController(
    private val updateScheduler: UpdateScheduler
) {
    @GetMapping("/update/last")
    fun lastUpdateTimestamp(): UpdateTimestamp {
        return updateScheduler.getLastUpdateTimestamp()
    }

    @GetMapping("/update/next")
    fun getNextUpdateTimestamp(): UpdateTimestamp {
        return updateScheduler.getNextUpdateTimestamp()
    }

    @PostMapping("/update/next")
    fun setNextUpdateTimestamp(@RequestBody updateTimestamp: UpdateTimestamp) {
        updateScheduler.setNextUpdateTimestamp(updateTimestamp)
    }

    @PostMapping("/update/now")
    fun updateNow() {
        updateScheduler.setNextUpdateTimestamp(
            UpdateTimestamp(
                System.currentTimeMillis(),
                UpdateTimestamp.ScheduleType.MANUAL
            )
        )
    }
}
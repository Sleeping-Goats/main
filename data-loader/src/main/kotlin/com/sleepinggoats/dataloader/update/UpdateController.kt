package com.sleepinggoats.dataloader.update

import org.springframework.web.bind.annotation.*
import java.util.concurrent.Executors

@RestController
@CrossOrigin(
    origins = ["http://localhost:3000", "http://94.237.38.133:3000"],
    maxAge = 3003,
    methods = [RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE]
)
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
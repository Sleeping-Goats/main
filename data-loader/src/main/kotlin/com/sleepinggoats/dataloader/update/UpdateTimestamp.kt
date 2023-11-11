package com.sleepinggoats.dataloader.update

data class UpdateTimestamp(val timestamp: Long, val scheduleType: ScheduleType) {
    enum class ScheduleType { MANUAL, AUTO }
}
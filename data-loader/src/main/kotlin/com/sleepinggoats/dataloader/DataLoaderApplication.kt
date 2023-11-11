package com.sleepinggoats.dataloader

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DataLoaderApplication

fun main(args: Array<String>) {
	runApplication<DataLoaderApplication>(*args)
}

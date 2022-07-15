package com.ecommerce.academy.api

import org.mybatis.spring.annotation.MapperScan
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@MapperScan(basePackages=["com.ecommerce.academy.api.repositories"])
class ApiApplication

fun main(args: Array<String>) {
    runApplication<ApiApplication>(*args)
}
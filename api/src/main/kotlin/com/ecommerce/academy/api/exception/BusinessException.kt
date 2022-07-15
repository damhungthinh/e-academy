package com.ecommerce.academy.api.exception

abstract class BusinessException(
    private val form: Map<String, Any> = emptyMap(),
    private val reason: String? = "",

    message: String = "",
    cause: Throwable? = null
): RuntimeException(message, cause) {
    val body get() = mapOf(
        Pair("form", form),
        Pair("id", this.javaClass.simpleName),
        Pair("reason", this.reason)
    )
}
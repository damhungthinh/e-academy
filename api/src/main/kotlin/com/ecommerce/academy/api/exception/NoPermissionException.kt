package com.ecommerce.academy.api.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.LOCKED)
data class LockedException(
    private val resource: String,
    private val msg: String?
): BusinessException(
    message = "$resource has ben locked.",
    reason = msg
)
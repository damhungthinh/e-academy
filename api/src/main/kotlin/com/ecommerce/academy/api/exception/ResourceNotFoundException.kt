package com.ecommerce.academy.api.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.NOT_FOUND)
class ResourceNotFoundException(
    private val resource: String,
    private val msg: String? = "Data was outdated! Please refresh data first, then try again."
): BusinessException(
    message = "$resource not found.",
    reason = msg
)
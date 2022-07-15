package com.ecommerce.academy.api.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.UNAUTHORIZED)
data class AuthException(
    private val msg: String?
) : BusinessException(
    message = "Sign failed. Username or Password was incorrect.",
    reason = msg
)

@ResponseStatus(HttpStatus.FORBIDDEN)
data class NotLoginException(
    private val msg: String?
) : BusinessException(
    message = "Authentication failed. Please login again!",
    reason = msg
)
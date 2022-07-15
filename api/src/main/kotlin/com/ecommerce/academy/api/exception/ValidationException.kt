package com.ecommerce.academy.api.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class ValidationException(
    form: Map<String, Any> = emptyMap(), reason: String?
): BusinessException(form = form, reason = reason) {
    companion object {

        /**
         * Required input value
         */
        fun required() = "This field is required."

        /**
         * Required input value
         */
        fun required(maxLength: Int) = "Please input 1 ~ $maxLength characters."
    }
}
package com.ecommerce.academy.api.utils

import com.ecommerce.academy.api.exception.ValidationException

fun Map<String, Any>.throwIfNotEmpty(reason: String? = null) {
    if (this.isNotEmpty() || reason != null) {
        throw ValidationException(this, reason)
    }
}
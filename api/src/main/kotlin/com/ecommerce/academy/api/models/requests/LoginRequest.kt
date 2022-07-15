package com.ecommerce.academy.api.models.requests

import com.ecommerce.academy.api.exception.ValidationException
import com.ecommerce.academy.api.utils.throwIfNotEmpty

data class LoginRequest constructor (
    val username: String?, val password: String?
): BaseRequest<LoginRequest> {
    /**
     * Validate request value
     */
    override fun validate() = mutableMapOf<String, String>().also {
        if (username.isNullOrBlank() || username.isEmpty()) {
            it[this::username.name] = ValidationException.required(50)
        }
        if (password.isNullOrBlank() || password.isEmpty()) {
            it[this::password.name] = ValidationException.required(50)
        }
    }.throwIfNotEmpty()

    /**
     * Trim and conver values
     */
    override fun toValidRequest()
        = this.copy(username = this.username?.trim(), password = this.password?.trim())
}
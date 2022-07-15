package com.ecommerce.academy.api.models.responses

import com.ecommerce.academy.api.models.entities.User

data class LoginResponse(
    val token: String,
    val user: User
)
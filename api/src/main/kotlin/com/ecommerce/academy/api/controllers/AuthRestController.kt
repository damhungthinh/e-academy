package com.ecommerce.academy.api.controllers

import com.ecommerce.academy.api.models.requests.LoginRequest
import com.ecommerce.academy.api.models.responses.LoginResponse
import com.ecommerce.academy.api.services.AuthServices
import com.ecommerce.academy.api.services.JwtServices
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthRestController {

    @Autowired
    private lateinit var services: AuthServices

    @Autowired
    private lateinit var jwtServices: JwtServices

    @PostMapping("/login")
    fun login(@RequestBody model: LoginRequest): LoginResponse {
        val acceptedRequest = model.toValidRequest()
        acceptedRequest.validate()

        return services.login(login = acceptedRequest)
    }

    @PostMapping("/verify")
    fun verify() = LoginResponse(
        user = jwtServices.find(),
        token = jwtServices.getJwtToken()
    )
}
package com.ecommerce.academy.api.services

import com.ecommerce.academy.api.config.JwtToken
import com.ecommerce.academy.api.exception.AuthException
import com.ecommerce.academy.api.models.requests.LoginRequest
import com.ecommerce.academy.api.models.responses.LoginResponse
import com.ecommerce.academy.api.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthServices {

    @Autowired
    private lateinit var repository: UserRepository

    @Autowired
    private lateinit var passwordEncoder: BCryptPasswordEncoder

    @Autowired
    private lateinit var jwtToken: JwtToken

     fun login(login: LoginRequest): LoginResponse {
        val user = repository.getByUsername(username = login.username!!)
            ?: throw AuthException("Username: ${login.username}")

        val pwdMatched = passwordEncoder.matches(login.password, user.password)

        if (!pwdMatched) {
            throw AuthException("Password incorrect.")
        }

        return LoginResponse(
            user = user,
            token = jwtToken.generateToken(user = user)
        )
    }
}
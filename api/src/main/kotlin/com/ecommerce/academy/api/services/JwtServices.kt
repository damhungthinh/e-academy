package com.ecommerce.academy.api.services

import com.ecommerce.academy.api.config.JwtToken
import com.ecommerce.academy.api.exception.AuthException
import com.ecommerce.academy.api.exception.NotLoginException
import com.ecommerce.academy.api.models.entities.User
import com.ecommerce.academy.api.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.naming.NoPermissionException
import javax.servlet.http.HttpServletRequest

@Service
class JwtServices(
    val request: HttpServletRequest
) {
    @Autowired
    private lateinit var jwtToken: JwtToken
    @Autowired
    private lateinit var repository: UserRepository

    /**
     * Find user by JWT token matched with [requiredRoles]
     * If [requiredRoles] is empty, role check will be skip
     */
    fun find(requiredRoles: Array<Int> = emptyArray()): User {
        val token = getJwtToken()

        val authenticatedUser = jwtToken.extractUser(token)

        val user = repository.getById(authenticatedUser.id, true)
            ?: throw AuthException(msg = "${authenticatedUser.username} not exists" )

        // Check user still active and match with user in database
        val isValid = user.active && jwtToken.isValid(token, user)

        if (!isValid) {
            throw NoPermissionException("Authorization failed. Please sign in again!")
        }

        // Only check roles match if required roles is not empty
        if (requiredRoles.isNotEmpty() && requiredRoles.none { it == user.role }) {
            throw NoPermissionException("You do not have permission to access this feature")
        }

        return authenticatedUser
    }

    /**
     * Get JWT from authorization header
     */
    fun getJwtToken(): String {
        val authorizationToken = request.getHeader("authorization")
        return if (authorizationToken.isNullOrBlank()) {
            // get JWT from cookie if the authorization header not exists token
            val cookie = request.cookies?.find { it.name == COOKIE_NAME } ?: throw NotLoginException("Cookie not exist")
            cookie.value ?: throw NotLoginException("Cookie values not found")
        } else {
            jwtToken.extractToken(authorizationToken)
        }
    }

    companion object {
        private const val COOKIE_NAME = "E-ACADEMY"
    }
}
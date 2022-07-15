package com.ecommerce.academy.api.models.entities

import com.ecommerce.academy.api.annotations.NoArgsConstructor
import com.ecommerce.academy.api.models.enums.Role
import com.fasterxml.jackson.annotation.JsonIgnore
import org.apache.ibatis.annotations.AutomapConstructor

@NoArgsConstructor
data class User @AutomapConstructor constructor(
    val id: Long,
    val username: String,
    @JsonIgnore
    val password: String,
    @JsonIgnore
    val role: Int,
    val active: Boolean
) {
    val roleName
        get() = Role.fromIdentifier(role).toIdentifier()
}
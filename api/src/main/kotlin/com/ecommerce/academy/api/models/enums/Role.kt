package com.ecommerce.academy.api.models.enums

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

/** Role for System  */
enum class Role(
    private val label: String,
    private val id: Int
) {
    ADMIN("Supper Admin", 1),
    STUDENT("Student", 2),
    MENTOR("Mentor", 3);

    /** Values to display in Json*/
    @JsonValue
    fun toIdentifier() = this.label

    /** Get value of role */
    fun toValue() = this.id

    companion object {
        @JsonCreator
        fun fromIdentifier(name: String) = values().single { it.name == name }

        @JsonCreator
        @JvmStatic
        fun fromIdentifier(id: Int) = values().single { it.id == id }
    }
}
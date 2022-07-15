package com.ecommerce.academy.api.repositories

import org.apache.ibatis.annotations.Param

interface CrudRepository<E, ID> {
    /**
     * Find all entity by [active] ignore [active] if it's null
     */
    fun findByActive(
        @Param(value = "active") active: Boolean?
    ): List<E>

    /**
     * Get one entity by [id]
     */
    fun getById(
        @Param(value = "id") id: ID,
        @Param(value = "active") active: Boolean?
    ): E?

    /**
     * Update entity by [entity]
     */
    fun update(entity: E)

    /**
     * Insert entity by [entity]
     */
    fun insert(entity: E)

    /**
     * Delete entity by [entity]
     */
    fun delete(entity: E)

    /**
     * Update entity by [id]
     */
    fun deleteById(@Param(value = "id") id: ID)
}
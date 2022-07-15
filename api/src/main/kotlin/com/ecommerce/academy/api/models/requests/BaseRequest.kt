package com.ecommerce.academy.api.models.requests

interface BaseRequest<R> {

    /**
     * Validate request value
     */
    fun validate()

    /**
     * Trim and conver values
     */
    fun toValidRequest(): R
}
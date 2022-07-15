package com.ecommerce.academy.api.config

import com.ecommerce.academy.api.exception.BusinessException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice(annotations = [RestController::class])
class ExceptionAdvisor: ResponseEntityExceptionHandler() {

    @ExceptionHandler(BusinessException::class)
    fun handleRuntimeException(exception: BusinessException, request: WebRequest) = super.handleExceptionInternal(
        exception,
        exception.body,
        HttpHeaders(),
        exception.javaClass.getAnnotation(ResponseStatus::class.java).value,
        request
    )

    @ExceptionHandler(Exception::class)
    fun handleRuntimeException(exception: Exception, request: WebRequest): ResponseEntity<Any> {
        exception.printStackTrace()
        return super.handleExceptionInternal(
            exception,
            mapOf(
                "id" to "UnknownError",
                "reason" to "Unknown error, please contact your admin."
            ),
            HttpHeaders(),
            HttpStatus.SERVICE_UNAVAILABLE,
            request
        )
    }
}
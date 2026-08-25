package com.flowpilot.flowpilot.scrummaster.exception;

import java.util.Map;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Scoped to the Scrum Master controllers only.
 *
 * The application-wide handler maps every exception to 500, which hides the
 * difference between "you sent something invalid" and "the server broke".
 * Narrowing this to our own package lets these endpoints answer 400 and 404
 * correctly without changing behaviour for anyone else's module.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice(basePackages = "com.flowpilot.flowpilot.scrummaster")
public class ScrumExceptionHandler {

    @ExceptionHandler(ScrumNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(
            ScrumNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", ex.getMessage()));
    }

    @ExceptionHandler(ScrumValidationException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            ScrumValidationException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("success", false, "message", ex.getMessage()));
    }
}

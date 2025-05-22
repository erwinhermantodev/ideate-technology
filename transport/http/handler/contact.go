package handler

import (
	"net/http"

	"github.com/erwinhermantodev/ideate-technology/handler"
	"github.com/erwinhermantodev/ideate-technology/model"
	"github.com/labstack/echo/v4"
)

type ContactHTTPHandler struct {
	contactHandler *handler.ContactHandler
}

// NewContactHTTPHandler creates a new instance of ContactHTTPHandler
func NewContactHTTPHandler(contactHandler *handler.ContactHandler) *ContactHTTPHandler {
	return &ContactHTTPHandler{
		contactHandler: contactHandler,
	}
}

// SubmitContactForm handles the HTTP request for contact form submission
func (h *ContactHTTPHandler) SubmitContactForm(c echo.Context) error {
	// Bind the contact form from the request
	var contactForm model.ContactForm
	if err := c.Bind(&contactForm); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request data",
		})
	}

	// Validate the form
	if err := c.Validate(&contactForm); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Validation failed",
		})
	}

	// Process the contact form
	err := h.contactHandler.SubmitContactForm(c.Request().Context(), &contactForm)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to process contact form",
		})
	}

	// Return success response
	return c.JSON(http.StatusOK, map[string]string{
		"status":  "success",
		"message": "Thank you for your message! We will get back to you soon.",
	})
}

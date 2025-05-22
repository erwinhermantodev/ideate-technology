package handler

import (
	"context"

	"github.com/erwinhermantodev/ideate-technology/model"
	"github.com/erwinhermantodev/ideate-technology/repository"
)

// ContactHandler handles the business logic for contact form operations
type ContactHandler struct {
	contactRepo repository.ContactRepository
}

// NewContactHandler creates a new instance of ContactHandler
func NewContactHandler(contactRepo repository.ContactRepository) *ContactHandler {
	return &ContactHandler{
		contactRepo: contactRepo,
	}
}

// SubmitContactForm handles the submission of a contact form
func (h *ContactHandler) SubmitContactForm(ctx context.Context, form *model.ContactForm) error {
	// Here you would typically add validation, spam checking, etc.

	// Store the contact form
	err := h.contactRepo.Store(ctx, form)
	if err != nil {
		return err
	}

	// In a real application, you might also send an email here
	// or perform other actions

	return nil
}

package repository

import (
	"context"

	"github.com/erwinhermantodev/ideate-technology/model"
)

// ContactRepository defines the interface for contact form operations
type ContactRepository interface {
	Store(ctx context.Context, contact *model.ContactForm) error
	GetAll(ctx context.Context) ([]model.ContactForm, error)
	GetByID(ctx context.Context, id uint) (*model.ContactForm, error)
}

// ServiceRepository defines the interface for service operations
type ServiceRepository interface {
	GetAll(ctx context.Context) ([]model.Service, error)
}

// TestimonialRepository defines the interface for testimonial operations
type TestimonialRepository interface {
	GetAll(ctx context.Context) ([]model.Testimonial, error)
	GetFeatured(ctx context.Context) ([]model.Testimonial, error)
}

// StatRepository defines the interface for stat operations
type StatRepository interface {
	GetAll(ctx context.Context) ([]model.Stat, error)
}

package model

import (
	"time"
)

// ContactForm represents a contact form submission
type ContactForm struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" validate:"required"`
	Email     string    `json:"email" validate:"required,email"`
	Subject   string    `json:"subject" validate:"required"`
	Message   string    `json:"message" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TableName specifies the table name for the ContactForm model
func (ContactForm) TableName() string {
	return "contact_forms"
}

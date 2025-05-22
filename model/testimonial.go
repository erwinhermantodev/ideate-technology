package model

// Testimonial represents a client testimonial
type Testimonial struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Name     string `json:"name"`
	Company  string `json:"company"`
	Role     string `json:"role"`
	Text     string `json:"text"`
	Initial  string `json:"initial"`
	Featured bool   `json:"featured"`
}

// TableName specifies the table name for the Testimonial model
func (Testimonial) TableName() string {
	return "testimonials"
}

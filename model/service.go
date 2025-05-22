package model

// Service represents a service offered by the company
type Service struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Icon        string `json:"icon"`
	Title       string `json:"title"`
	Description string `json:"description"`
	OrderIndex  int    `json:"order_index"`
}

// TableName specifies the table name for the Service model
func (Service) TableName() string {
	return "services"
}

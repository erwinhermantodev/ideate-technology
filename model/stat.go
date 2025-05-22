package model

// Stat represents a company statistic
type Stat struct {
	ID      uint    `json:"id" gorm:"primaryKey"`
	Icon    string  `json:"icon"`
	Number  float64 `json:"number"`
	Label   string  `json:"label"`
	Suffix  string  `json:"suffix"`
	OrderID int     `json:"order_id"`
}

// TableName specifies the table name for the Stat model
func (Stat) TableName() string {
	return "stats"
}

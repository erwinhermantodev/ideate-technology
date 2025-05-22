package memory

import (
	"context"
	"sync"
	"time"

	"github.com/erwinhermantodev/ideate-technology/model"
	"github.com/erwinhermantodev/ideate-technology/repository"
)

// MemoryContactRepository implements the ContactRepository interface with in-memory storage
type MemoryContactRepository struct {
	mu       sync.RWMutex
	contacts map[uint]model.ContactForm
	nextID   uint
}

// NewMemoryContactRepository creates a new instance of MemoryContactRepository
func NewMemoryContactRepository() repository.ContactRepository {
	return &MemoryContactRepository{
		contacts: make(map[uint]model.ContactForm),
		nextID:   1,
	}
}

// Store adds a new contact form
func (m *MemoryContactRepository) Store(ctx context.Context, contact *model.ContactForm) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	contact.ID = m.nextID
	contact.CreatedAt = time.Now()
	contact.UpdatedAt = time.Now()

	m.contacts[contact.ID] = *contact
	m.nextID++

	return nil
}

// GetAll retrieves all contact forms
func (m *MemoryContactRepository) GetAll(ctx context.Context) ([]model.ContactForm, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	contacts := make([]model.ContactForm, 0, len(m.contacts))
	for _, contact := range m.contacts {
		contacts = append(contacts, contact)
	}

	return contacts, nil
}

// GetByID retrieves a contact form by ID
func (m *MemoryContactRepository) GetByID(ctx context.Context, id uint) (*model.ContactForm, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	contact, ok := m.contacts[id]
	if !ok {
		return nil, nil
	}

	return &contact, nil
}

// MemoryServiceRepository implements the ServiceRepository interface with in-memory storage
type MemoryServiceRepository struct {
	services []model.Service
}

// NewMemoryServiceRepository creates a new instance of MemoryServiceRepository
func NewMemoryServiceRepository() repository.ServiceRepository {
	return &MemoryServiceRepository{
		services: []model.Service{
			{
				ID:          1,
				Icon:        "code",
				Title:       "Custom Software Development",
				Description: "Tailored software solutions to meet your specific business needs and challenges.",
				OrderIndex:  1,
			},
			// {
			// 	ID:          2,
			// 	Icon:        "server",
			// 	Title:       "IT Infrastructure Management",
			// 	Description: "Comprehensive management of your IT systems for optimal performance and reliability.",
			// 	OrderIndex:  2,
			// },
			{
				ID:          3,
				Icon:        "cloud",
				Title:       "Cloud Solutions",
				Description: "Seamless migration and management of your business operations to the cloud.",
				OrderIndex:  3,
			},
			{
				ID:          4,
				Icon:        "database",
				Title:       "Data Analytics",
				Description: "Transform your data into actionable insights for informed business decisions.",
				OrderIndex:  4,
			},
			// {
			// 	ID:          5,
			// 	Icon:        "shield",
			// 	Title:       "Cybersecurity",
			// 	Description: "Robust security measures to protect your valuable data and assets.",
			// 	OrderIndex:  5,
			// },
			{
				ID:          6,
				Icon:        "message-square",
				Title:       "IT Consulting",
				Description: "Expert advice on technology strategy and implementation for your business growth.",
				OrderIndex:  6,
			},
		},
	}
}

// GetAll retrieves all services
func (m *MemoryServiceRepository) GetAll(ctx context.Context) ([]model.Service, error) {
	return m.services, nil
}

// MemoryTestimonialRepository implements the TestimonialRepository interface with in-memory storage
type MemoryTestimonialRepository struct {
	testimonials []model.Testimonial
}

// NewMemoryTestimonialRepository creates a new instance of MemoryTestimonialRepository
func NewMemoryTestimonialRepository() repository.TestimonialRepository {
	return &MemoryTestimonialRepository{
		testimonials: []model.Testimonial{
			{
				ID:       1,
				Name:     "PT Pos Finansial Indonesia",
				Company:  "Financial Technology",
				Role:     "Technical Team",
				Text:     "Erwin's leadership in building our Golang API gateway from scratch and implementing microservices with GRPC has significantly improved our system architecture and performance.",
				Initial:  "P",
				Featured: true,
			},
			{
				ID:       2,
				Name:     "Bobobox Technology",
				Company:  "Hospitality Tech",
				Role:     "Development Team",
				Text:     "Working with Erwin on our user management system and property management APIs was exceptional. His expertise in Go, Rails, and containerization with Docker delivered outstanding results.",
				Initial:  "B",
				Featured: true,
			},
			{
				ID:       3,
				Name:     "SICEPAT Ekspres Indonesia",
				Company:  "Logistics & Delivery",
				Role:     "Engineering Team",
				Text:     "Erwin successfully migrated our critical APIs from Node.js to Golang, improving performance and maintaining system reliability. His work on our sort machine APIs was exceptional.",
				Initial:  "S",
				Featured: true,
			},
			{
				ID:       4,
				Name:     "Qasir.id",
				Company:  "POS Solutions",
				Role:     "Product Team",
				Text:     "Erwin's implementation of QRIS payment integration and Elasticsearch for premium features greatly enhanced our product capabilities. His hexagonal architecture approach was particularly valuable.",
				Initial:  "Q",
				Featured: false,
			},
		},
	}
}

// GetAll retrieves all testimonials
func (m *MemoryTestimonialRepository) GetAll(ctx context.Context) ([]model.Testimonial, error) {
	return m.testimonials, nil
}

// GetFeatured retrieves featured testimonials
func (m *MemoryTestimonialRepository) GetFeatured(ctx context.Context) ([]model.Testimonial, error) {
	featured := make([]model.Testimonial, 0)
	for _, t := range m.testimonials {
		if t.Featured {
			featured = append(featured, t)
		}
	}
	return featured, nil
}

// MemoryStatRepository implements the StatRepository interface with in-memory storage
type MemoryStatRepository struct {
	stats []model.Stat
}

// NewMemoryStatRepository creates a new instance of MemoryStatRepository
func NewMemoryStatRepository() repository.StatRepository {
	return &MemoryStatRepository{
		stats: []model.Stat{
			{
				ID:      1,
				Icon:    "briefcase",
				Number:  250,
				Label:   "Projects Completed",
				Suffix:  "+",
				OrderID: 1,
			},
			{
				ID:      2,
				Icon:    "users",
				Number:  120,
				Label:   "Happy Clients",
				Suffix:  "+",
				OrderID: 2,
			},
			{
				ID:      3,
				Icon:    "globe",
				Number:  15,
				Label:   "Countries Served",
				Suffix:  "",
				OrderID: 3,
			},
			{
				ID:      4,
				Icon:    "server",
				Number:  99.9,
				Label:   "Uptime",
				Suffix:  "%",
				OrderID: 4,
			},
		},
	}
}

// GetAll retrieves all stats
func (m *MemoryStatRepository) GetAll(ctx context.Context) ([]model.Stat, error) {
	return m.stats, nil
}

package handler

import (
	"context"
	"time"

	"github.com/erwinhermantodev/ideate-technology/model"
	"github.com/erwinhermantodev/ideate-technology/repository"
)

// PageHandler handles the business logic for page rendering
type PageHandler struct {
	serviceRepo     repository.ServiceRepository
	testimonialRepo repository.TestimonialRepository
	statRepo        repository.StatRepository
}

// NewPageHandler creates a new instance of PageHandler
func NewPageHandler(
	serviceRepo repository.ServiceRepository,
	testimonialRepo repository.TestimonialRepository,
	statRepo repository.StatRepository,
) *PageHandler {
	return &PageHandler{
		serviceRepo:     serviceRepo,
		testimonialRepo: testimonialRepo,
		statRepo:        statRepo,
	}
}

// OwnerInfo represents the company owner information
type OwnerInfo struct {
	Name        string
	Title       string
	Email       string
	LinkedIn    string
	GitHub      string
	Experience  string
	CompanyName string
	Founded     string
	Location    string
}

// CompanyInfo represents the company information
type CompanyInfo struct {
	Name        string
	Tagline     string
	Email       string
	LinkedIn    string
	Phone       string
	Address     string
	Founded     string
	Description string
}

// PageData represents the data structure for the home page
type PageData struct {
	CurrentYear  int
	Services     []model.Service
	Testimonials []model.Testimonial
	Stats        []model.Stat
	Owner        OwnerInfo
	Company      CompanyInfo
}

// GetHomePageData retrieves all data needed for the home page
func (h *PageHandler) GetHomePageData(ctx context.Context) (*PageData, error) {
	services, err := h.serviceRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	testimonials, err := h.testimonialRepo.GetFeatured(ctx)
	if err != nil {
		return nil, err
	}

	stats, err := h.statRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	// Owner information based on the CV
	owner := OwnerInfo{
		Name:        "Erwin Hermanto",
		Title:       "Software Engineer & Technical Leader",
		Email:       "erwinhermantodev@gmail.com",
		LinkedIn:    "https://www.linkedin.com/in/erwinhermantodev/",
		GitHub:      "https://erwinhermantodev.github.io",
		Experience:  "9+ years",
		CompanyName: "Ideate Technology",
		Founded:     "2015",
		Location:    "Indonesia",
	}

	// Company information
	company := CompanyInfo{
		Name:        "Ideate Technology",
		Tagline:     "For the Best Solution",
		Email:       "contact@ideate-tech.id",
		Phone:       "+62 878-8775-9413",
		LinkedIn:    "https://www.linkedin.com/company/102030198",
		Address:     "Jl. Cimuncang No.103/208-c, Bandung, West Java, Indonesia",
		Founded:     "2015",
		Description: "Delivering innovative IT solutions for businesses of all sizes. Led by experienced software engineer with expertise in Golang, microservices, and cloud technologies.",
	}

	pageData := &PageData{
		CurrentYear:  time.Now().Year(),
		Services:     services,
		Testimonials: testimonials,
		Stats:        stats,
		Owner:        owner,
		Company:      company,
	}

	return pageData, nil
}

package main

import (
	"fmt"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"

	"github.com/erwinhermantodev/ideate-technology/handler"
	"github.com/erwinhermantodev/ideate-technology/repository/memory"
	httpHandler "github.com/erwinhermantodev/ideate-technology/transport/http/handler"
	"github.com/erwinhermantodev/ideate-technology/transport/http/routes"
	"github.com/erwinhermantodev/ideate-technology/util"
)

// CustomValidator for Echo
type CustomValidator struct {
	validator *validator.Validate
}

// Validate validates a struct
func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

func main() {
	// Initialize configuration
	config := util.NewConfig()

	// Initialize repositories
	contactRepo := memory.NewMemoryContactRepository()
	serviceRepo := memory.NewMemoryServiceRepository()
	testimonialRepo := memory.NewMemoryTestimonialRepository()
	statRepo := memory.NewMemoryStatRepository()

	// Initialize handlers
	pageHandler := handler.NewPageHandler(serviceRepo, testimonialRepo, statRepo)
	contactHandler := handler.NewContactHandler(contactRepo)

	// Initialize template renderer
	renderer, err := util.NewTemplateRenderer(config.ViewsDir)
	if err != nil {
		log.Fatalf("Failed to initialize template renderer: %v", err)
	}

	// Initialize HTTP handlers
	pageHTTPHandler := httpHandler.NewPageHTTPHandler(pageHandler, renderer)
	contactHTTPHandler := httpHandler.NewContactHTTPHandler(contactHandler)

	// Initialize Echo
	e := echo.New()
	e.Renderer = renderer
	e.Validator = &CustomValidator{validator: validator.New()}

	// Register routes
	routes.RegisterRoutes(e, pageHTTPHandler, contactHTTPHandler)

	// Start server
	fmt.Printf("Server starting on port %s...\n", config.Port)
	if err := e.Start(":" + config.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

package util

import (
	"html/template"
	"io"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v4"
)

// Config holds the application configuration
type Config struct {
	Port     string
	ViewsDir string
}

// NewConfig creates a new configuration instance
func NewConfig() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return &Config{
		Port:     port,
		ViewsDir: "view",
	}
}

// TemplateRenderer is a custom renderer for Echo
type TemplateRenderer struct {
	templates *template.Template
}

// Render renders a template with data
func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

// NewTemplateRenderer creates a new template renderer
func NewTemplateRenderer(viewsDir string) (*TemplateRenderer, error) {
	// Parse layout templates
	layoutFiles, err := filepath.Glob(filepath.Join(viewsDir, "layout", "*.html"))
	if err != nil {
		return nil, err
	}

	// Parse section templates
	sectionFiles, err := filepath.Glob(filepath.Join(viewsDir, "section", "*.html"))
	if err != nil {
		return nil, err
	}

	// Combine all templates
	allFiles := append(layoutFiles, sectionFiles...)

	// Create a template with a name matching the main layout template
	templates := template.New("template_main.html")

	// Parse templates
	templates, err = templates.ParseFiles(allFiles...)
	if err != nil {
		return nil, err
	}

	return &TemplateRenderer{
		templates: templates,
	}, nil
}

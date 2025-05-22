package handler

import (
	"net/http"

	"github.com/erwinhermantodev/ideate-technology/handler"
	"github.com/labstack/echo/v4"
)

// PageHTTPHandler handles HTTP requests for pages
type PageHTTPHandler struct {
	pageHandler *handler.PageHandler
	renderer    echo.Renderer
}

// NewPageHTTPHandler creates a new instance of PageHTTPHandler
func NewPageHTTPHandler(pageHandler *handler.PageHandler, renderer echo.Renderer) *PageHTTPHandler {
	return &PageHTTPHandler{
		pageHandler: pageHandler,
		renderer:    renderer,
	}
}

// GetHomePage handles the HTTP request for the home page
func (h *PageHTTPHandler) GetHomePage(c echo.Context) error {
	// Get page data from handler
	pageData, err := h.pageHandler.GetHomePageData(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to retrieve page data",
		})
	}

	// Render the template
	return c.Render(http.StatusOK, "template_main.html", pageData)
}

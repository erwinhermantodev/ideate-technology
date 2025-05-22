package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	httpHandler "github.com/erwinhermantodev/ideate-technology/transport/http/handler"
)

// RegisterRoutes registers all the routes for the application
func RegisterRoutes(e *echo.Echo, pageHandler *httpHandler.PageHTTPHandler, contactHandler *httpHandler.ContactHTTPHandler) {
	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Static files
	e.Static("/static", "static")

	// Page routes
	e.GET("/", pageHandler.GetHomePage)

	// API routes
	api := e.Group("/api")
	{
		// Contact API
		contact := api.Group("/contact")
		{
			contact.POST("", contactHandler.SubmitContactForm)
		}
	}
}

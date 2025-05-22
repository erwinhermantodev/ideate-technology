# Utility Package

This package contains various utility functions used throughout the application. Each utility is separated into its own file for better organization and maintainability.

## Structure

- **config.go**: Configuration management with environment variable support
- **directory.go**: File system operations for directory creation and initialization
- **css.go**: CSS stylesheet management
- **javascript.go**: JavaScript file management
- **logger.go**: Logging utilities for the application
- **validator.go**: Input validation utilities
- **template_*.go**: HTML template management:
  - template_main.go: Main layout template
  - template_navbar.go: Navigation section template
  - template_hero.go: Hero section template
  - template_services.go: Services section template
  - template_stats.go: Stats section template
  - template_about.go: About section template
  - template_testimonials.go: Testimonials section template
  - template_contact.go: Contact section template
  - template_footer.go: Footer section template

## Usage Examples

### Configuration

```go
// Get application configuration with environment variables and defaults
config := util.GetConfig()

// Check environment
if config.IsProduction() {
    // Production-specific code
}
```

### Logging

```go
// Set up logger with configuration
util.SetupLogger(e, config)

// Use custom logger middleware
e.Use(util.CustomLoggerMiddleware())
```

### Validation

```go
// Validate form data
errors := util.ValidateContactForm(name, email, subject, message)
if errors.HasErrors() {
    // Handle validation errors
}

// Sanitize input
sanitizedInput := util.SanitizeString(userInput)
```

### Directory Management

```go
// Initialize application directories and files
if err := util.InitializeDirectories(); err != nil {
    log.Fatalf("Failed to initialize directories: %v", err)
}
```

## Best Practices

1. Each utility file should focus on a single responsibility
2. Keep utility functions stateless when possible
3. Provide clear error messages and handling
4. Document function behaviors with comments
5. Use consistent naming conventions
6. Add unit tests for utility functions

## Adding New Utilities

To add a new utility:

1. Create a new file in the `util` package with the naming convention `utility_name.go`
2. Implement the utility functions with proper error handling
3. Document the utility with comments
4. Update this README to include the new utility
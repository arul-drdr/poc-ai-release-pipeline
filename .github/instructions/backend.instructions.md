---
applyTo: "**/*.cs"
---

# Backend C# Review Instructions

These rules apply only to C# files in the repository.

## Entity Framework

- Flag N+1 query patterns (queries inside loops, missing `Include()`)
- Read-only queries should use `.AsNoTracking()` to avoid unnecessary change tracking
- Ensure `CancellationToken` is propagated to all EF async calls (`ToListAsync(cancellationToken)`)
- Flag `SaveChanges` calls without error handling or inside loops
- Check for missing database indexes on frequently queried columns

## Dependency Injection

- Services should be registered with appropriate lifetimes:
  - `Scoped` for DbContext and request-scoped services
  - `Singleton` for stateless services and configuration
  - `Transient` for lightweight, stateless utilities
- Flag service locator anti-pattern (`IServiceProvider.GetService` inside business logic)
- Flag `new`-ing up services that should be injected

## Async/Await

- Never use `.Result` or `.Wait()` on async calls (causes deadlocks)
- Always propagate `CancellationToken` through the call chain
- Flag `async void` methods (except event handlers)
- Use `ConfigureAwait(false)` in library code, not in ASP.NET controller code

## API Controllers

- Use `[ApiController]` attribute on all API controllers
- Return `ActionResult<T>` not just `T` for proper content negotiation
- Use proper HTTP status codes (`NotFound()`, `BadRequest()`, `CreatedAtAction()`)
- Include `[ProducesResponseType]` attributes for Swagger documentation
- Flag controllers with business logic (should be in services)

## Middleware

- Check ordering: authentication before authorisation, CORS before routing
- Custom middleware should handle exceptions and not leak stack traces
- Flag middleware that blocks the request pipeline without calling `next()`

## Configuration

- No magic strings for configuration keys; use strongly typed options pattern (`IOptions<T>`)
- Flag direct `IConfiguration` access outside of startup/registration code
- Sensitive config values must come from environment variables or secret stores, not `appsettings.json`

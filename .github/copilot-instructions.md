# Copilot Code Review Instructions

This is a healthcare-adjacent .NET Core/C# application. Apply the following review standards.

## PII Safety

- Flag any code that logs, serialises, or exposes patient data (names, addresses, DOB, SSN, medical record numbers) without masking
- Check log statements, exception messages, and API responses for PII leakage
- Ensure PII fields use redaction or tokenisation before logging
- Flag any patient data written to temporary files or debug output

## Dead Code & Debug Artifacts

- Flag `Console.WriteLine`, `Debug.Print`, and `System.Diagnostics.Debug` calls
- Flag commented-out code blocks (more than 2 lines)
- Flag `TODO`, `HACK`, `FIXME` comments that indicate incomplete work
- Flag unused `using` statements and unreferenced variables

## Nullable Safety

- Flag potential null reference issues on async results, database lookups, and API responses
- Prefer null-conditional (`?.`) and null-coalescing (`??`) operators
- Check that nullable reference types are enabled and respected
- Flag `!` (null-forgiving operator) usage without justification

## Exception Handling

- Every public API endpoint should have structured error handling
- Never catch and swallow exceptions silently (empty catch blocks)
- Include correlation IDs in error logs for traceability
- Use `ILogger` for structured logging, not string concatenation
- Flag `catch (Exception)` without re-throw or specific handling

## API Contract Validation

- DTOs should validate input with `[Required]`, FluentValidation, or manual checks
- Check that API endpoints return appropriate HTTP status codes
- Verify request/response DTOs match endpoint contracts
- Flag endpoints missing `[ProducesResponseType]` attributes

## Security

- No hardcoded connection strings, API keys, or secrets in source code
- Check for proper `[Authorize]` attributes on controllers and endpoints
- Verify CORS is configured restrictively (not `AllowAnyOrigin` in production)
- Flag any direct SQL string construction (SQL injection risk)
- Check for proper input sanitisation on user-facing endpoints

## Observability

- Use structured logging (`ILogger`, Serilog) not string concatenation
- Check for correlation ID propagation across service boundaries
- Ensure health check endpoints exist for critical dependencies
- Flag missing logging on error paths and external service calls

## Code Style

- Follow .NET naming conventions: PascalCase for public members, camelCase for private
- Async methods must end in `Async` suffix
- Use `var` only when the type is obvious from the right side
- Keep methods under 30 lines where possible

# CLAUDE.md - Claude Code Rules

## Project Context

This is a healthcare-adjacent .NET Core/C# application. PII handling and safe defaults are hard requirements. All code must be production-ready and follow security best practices for handling patient data.

## PR Creation Rules

When helping create a PR, always:

1. Ask the developer for the **Jira Task ID** (e.g., PROJ-1234)
2. Ask for the **Work Type**: Bug, Feature, Change Request, or Critical Fix
3. Ask for a **customer-readable release notes description**
4. Format the PR title as: `type(scope): JIRA-ID description`
   - Example: `feat(patient): PROJ-1234 Add address validation`
   - Valid types: feat, fix, chore, docs, refactor, perf, test, ci, build, critical
5. Fill in all required sections of the PR template

## Code Standards

- Never generate code with `Console.WriteLine` or debug artifacts
- Always use `ILogger` for logging (never `Console` or `Debug`)
- Never log PII fields (patient name, DOB, SSN, address, medical record number)
- Use nullable reference types (`?` annotations)
- Async methods must end in `Async` and propagate `CancellationToken`
- Use `.AsNoTracking()` for read-only EF queries
- Never use `.Result` or `.Wait()` on async calls
- Use strongly typed options pattern for configuration, not magic strings

## Commit Message Format

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance task
- `docs:` - Documentation change
- `refactor:` - Code refactoring
- `critical:` - Critical/hotfix

Include the Jira ID in the commit body.

## Testing

- When creating new features, suggest corresponding unit tests
- When fixing bugs, suggest a regression test
- Never leave test code with hardcoded PII data; use anonymised test fixtures

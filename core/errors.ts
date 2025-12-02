/**
 * Standardized application errors.
 */

export class ArcticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArcticError";
  }
}

export class IntegrationError extends ArcticError {
  constructor(integration: string, message: string) {
    super(integration + ": " + message);
    this.name = "IntegrationError";
  }
}

export class MissingDataError extends ArcticError {
  constructor(field: string) {
    super("Missing required data: " + field);
    this.name = "MissingDataError";
  }
}

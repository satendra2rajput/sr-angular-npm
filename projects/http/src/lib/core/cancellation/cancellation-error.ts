export class KudoHttpCancellationError extends Error {
  readonly code = 'CANCELLED';

  constructor(message = 'HTTP request was cancelled.') {
    super(message);

    this.name = 'KudoHttpCancellationError';
  }
}

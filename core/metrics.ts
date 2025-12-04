/**
 * Simple runtime metrics for debugging and analytics.
 */

export const METRICS = {
  almCalls: 0,
  birdeyeCalls: 0,
  tiktokCalls: 0,
  heliusEvents: 0,

  summary() {
    return {
      almCalls: this.almCalls,
      birdeyeCalls: this.birdeyeCalls,
      tiktokCalls: this.tiktokCalls,
      heliusEvents: this.heliusEvents
    };
  }
};

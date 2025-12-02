/**
 * Simple runtime metrics for debugging and analytics.
 */

export const METRICS = {
  slmCalls: 0,
  birdeyeCalls: 0,
  tiktokCalls: 0,
  heliusEvents: 0,

  summary() {
    return {
      slmCalls: this.slmCalls,
      birdeyeCalls: this.birdeyeCalls,
      tiktokCalls: this.tiktokCalls,
      heliusEvents: this.heliusEvents
    };
  }
};

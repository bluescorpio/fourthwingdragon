type AverageBucket = { label: string; min: number; max: number };

export type AnalyticsEventName =
  | "reaction_test_view"
  | "reaction_test_start"
  | "reaction_false_start"
  | "reaction_round_complete"
  | "reaction_test_complete"
  | "reaction_test_retry"
  | "reaction_result_copy"
  | "reaction_result_share"
  | "reaction_history_clear"
  | "reaction_choice_view"
  | "reaction_choice_start"
  | "reaction_choice_complete"
  | "reaction_choice_retry"
  | "reaction_sound_view"
  | "reaction_sound_start"
  | "reaction_sound_complete"
  | "reaction_sound_retry";

type EventPayload = {
  reaction_test_view?: Record<string, never>;
  reaction_test_start?: Record<string, never>;
  reaction_false_start?: Record<string, never>;
  reaction_round_complete?: { round: number };
  reaction_test_complete?: { average_bucket: AverageBucket };
  reaction_test_retry?: Record<string, never>;
  reaction_result_copy?: Record<string, never>;
  reaction_result_share?: Record<string, never>;
  reaction_history_clear?: Record<string, never>;
  reaction_choice_view?: Record<string, never>;
  reaction_choice_start?: Record<string, never>;
  reaction_choice_complete?: { average_bucket: AverageBucket };
  reaction_choice_retry?: Record<string, never>;
  reaction_sound_view?: Record<string, never>;
  reaction_sound_start?: Record<string, never>;
  reaction_sound_complete?: { average_bucket: AverageBucket };
  reaction_sound_retry?: Record<string, never>;
};

const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

export function trackEvent<T extends AnalyticsEventName>(
  name: T,
  payload?: EventPayload[T],
): void {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === "undefined") return;

  try {
    const w = window as Window & {
      va?: (event: "event", payload: { name: string; data?: object }) => void;
    };
    if (typeof w.va === "function") {
      w.va("event", { name, data: payload });
    }
  } catch {
    // Analytics must never interrupt the test.
  }
}

import { getAISummary } from "./client";
import { AISummaryInput } from "./types";

export async function enhanceWithAI(
  input: AISummaryInput
) {
  return await getAISummary(input);
}

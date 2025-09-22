// remove markdown code fences like ```json ... ```

export function extractJson(raw: string) {
  return raw.replace(/```json\s*([\s\S]*?)```/, "$1").trim();
}
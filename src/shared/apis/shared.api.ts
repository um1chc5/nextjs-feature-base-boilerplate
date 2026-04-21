export type SharedApiHealth = {
  ok: boolean;
};

export async function getSharedHealth(): Promise<SharedApiHealth> {
  return { ok: true };
}

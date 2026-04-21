export type ExampleFeatureApiHealth = {
  ok: boolean;
};

export async function getExampleFeatureHealth(): Promise<ExampleFeatureApiHealth> {
  return { ok: true };
}

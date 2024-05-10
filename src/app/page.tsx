'use client'

import { useDynamicConfig } from "@statsig/react-bindings";

export default function Home() {
  const { value } = useDynamicConfig('eyebrow')
  return (
    <div>
      <h1>Testing Statsig SSR (new monorepo)</h1>
      <p>SSR Value: {value.localeKey as string}</p>
    </div>
  );
}

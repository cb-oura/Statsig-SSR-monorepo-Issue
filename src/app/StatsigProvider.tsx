'use client';

import { StatsigClient } from '@statsig/js-client';
import { StatsigProvider as RawStatsigProvider } from '@statsig/react-bindings';
import { type PropsWithChildren, useMemo } from 'react';
import type { StatsigUser } from 'statsig-node';

interface StatsigClientProviderProps extends PropsWithChildren {
  readonly user: StatsigUser;
  readonly values: string;
}

function useBootstrappedClient(
  user: StatsigUser,
  values: string,
): StatsigClient {
  return useMemo(() => {
    if(!process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY) {
      throw new Error('Missing NEXT_PUBLIC_STATSIG_CLIENT_KEY');
    }
    const stableId = user.customIDs?.['stableID'];
    const client = new StatsigClient(process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY, user, {
      environment: { tier: 'staging' },
      ...(stableId && { overrideStableID: stableId }),
    });
    client.dataAdapter.setData(values, user);

    client.initializeSync();
    return client;
  }, [
    user,
    values,
  ]);
}

export default function StatsigProvider({
  user,
  values,
  children,
}: StatsigClientProviderProps): JSX.Element {
  console.log('Statsig Provider:', user, JSON.parse(values));
  const client = useBootstrappedClient(user, values);
  return <RawStatsigProvider client={client}>{children}</RawStatsigProvider>;
}

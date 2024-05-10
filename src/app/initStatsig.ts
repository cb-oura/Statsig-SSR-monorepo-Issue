import Statsig, { type StatsigUser } from 'statsig-node';

export async function initStatsig(user: StatsigUser): Promise<string> {
if(!process.env.STATSIG_SERVER_SECRET) {
  throw new Error('Missing STATSIG_SERVER_SECRET')
}
  await Statsig.initialize(process.env.STATSIG_SERVER_SECRET, {
    localMode: process.env.NODE_ENV === 'test', // don't initialize statsig in test env
  });

  const values = Statsig.getClientInitializeResponse(
    user,
    process.env['NEXT_PUBLIC_STATSIG_CLIENT_KEY']
  );

  console.log('Initializing Statsig with user:', user, values);

  return JSON.stringify(values);
}

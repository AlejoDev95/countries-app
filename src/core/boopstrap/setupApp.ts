export const setupApp = async () => {
  console.log('[Bootstrap] App setup start');
  await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
  console.log('[Bootstrap] App setup complete');
};

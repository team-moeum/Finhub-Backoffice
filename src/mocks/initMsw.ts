export const initMsw = async () => {
  // import.meta.env.MODE === 'development'
  const { worker } = await import('./browser');
  worker.start();
};

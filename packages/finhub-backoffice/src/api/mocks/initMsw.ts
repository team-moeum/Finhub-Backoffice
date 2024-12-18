export const initMsw = async () => {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./browser');
    worker.start();
  }
};

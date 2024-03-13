export const initMsw = async () => {
  if (
    import.meta.env.MODE === 'development' &&
    import.meta.env.MOCKING_ENABLE === 'true'
  ) {
    const { worker } = await import('./browser');
    worker.start();
  }
};

export const apiRequest = (url, options) => (
  fetch(
    `${process.env.API_URL}/${url}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY,
        ...(options.headers || {}),
      }
    }
  )
);

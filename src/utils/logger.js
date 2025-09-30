const isDev = import.meta.env.VITE_NODE_ENV === "development";

const logger = {
  info: (message) => {
    if (isDev) console.log(`[LOG] ${new Date().toISOString()} - `, message);
  },

  error: (message, error) => {
    if (isDev)
      console.error(`[LOG] ${new Date().toISOString()}]`, message, error);
  },

  warn: (message) => {
    if (isDev) console.log(`[WARN] ${new Date().toISOString()} - `, message);
  },
};

export default logger;

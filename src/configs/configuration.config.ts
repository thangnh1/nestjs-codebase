export interface PortConfig {
  port: number;
}

export const portConfig = () => ({
  port: {
    port: parseInt(process.env.PORT, 10),
  },
});

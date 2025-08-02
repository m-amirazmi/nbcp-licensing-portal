export const jwtConstants = {
  get secret() {
    return process.env.JWT_SECRET;
  },
  get expiresIn() {
    return process.env.JWT_EXPIRES_IN || '1d';
  },
};

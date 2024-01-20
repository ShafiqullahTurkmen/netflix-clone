const { Magic } = require('@magic-sdk/admin');
export const magicAdmin = await Magic.init(process.env.MAGIC_SECRET_KEY);
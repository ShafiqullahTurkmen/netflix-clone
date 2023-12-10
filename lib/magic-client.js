
import { Magic } from 'magic-sdk';
const magicPubKey = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY;
export const magic = typeof window !== "undefined" && new Magic(magicPubKey); // ✨


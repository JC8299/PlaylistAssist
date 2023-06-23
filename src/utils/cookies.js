import { getCookies, getCookie, setCookie, removeCookies } from 'cookies-next';

const crypto = require('crypto');
const cookie = require('cookie');
const algorithm = 'aes-256-cbc'; // AES encryption
const key = crypto.createHash('sha256').update(String(process.env.SESSION_KEY)).digest();
const iv = crypto.randomBytes(16);

export function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export const setCustomCookie = async (req, res, session, options, cookieType) => {
    // CookieSerializeOptions
    const defaults = {
        maxAge: 3600 * 1000 * 5,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
    };
    const opts = { ...defaults, ...options };

    try {
        // Encrypting session using SESSION_SECRET in .env
        const signedSession = await encrypt(session);

        const stringValue = 
            typeof signedSession === 'object'
                ? 'j:' + JSON.stringify(signedSession)
                : String(signedSession);

        if ('maxAge' in opts) {
            opts.expires = new Date(Date.now() + opts.maxAge);
            opts.maxAge /= 1000;
        }
        
        // res.setHeader('Set-Cookie', cookie.serialize(cookieType, stringValue, opts));
        setCookie(cookieType, stringValue, {req, res, ...opts});
    } catch (error) {
        console.error('Failed to seal session object', error);
        return;
    }
}
/**
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/account-verification",
    "/reset",
    "/reset-password",
];

export const authRoutes = ["/register", "/login", "/auth-error"];

/**
 * @description : prefix for the auth API routes, should be accessible for authenticated and unauthenticated users
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";

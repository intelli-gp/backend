export type TokenPayload = {
    userId: number;
    userEmail: string;
    isUserTwoFactorAuthenticated?: boolean;
};

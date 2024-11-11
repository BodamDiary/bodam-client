interface LoginUser{
    userId: number;
    kakaoId: string;
    email: string;
    name: string;
}

export const getLoginUser = (): string | null =>
    sessionStorage.getItem("loginUser");

export const setLoginUser = (data: LoginUser): void => {
    const userData = JSON.stringify(data);
    sessionStorage.setItem("loginUser", userData);
};
export const removeLoginUser = (): void =>
    sessionStorage.removeItem("loginUser");

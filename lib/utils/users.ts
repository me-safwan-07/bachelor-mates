import { hashPassword } from "../auth/utils"

export const createUser = async (
    name: string,
    email: string,
    password: string,
): Promise<any> => {
    const hashedPassword = await hashPassword(password);

    try {
        const res = await fetch(`/api/v1/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password: hashedPassword,
            }),
        });
        if (res.status !== 200) {
            const json = await res.json();
            throw Error(json.error);
        }
        return await res.json();
    } catch (error: Error) {
        throw Error(`${error.message}`)
    }
};
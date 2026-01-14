import callAPI from "@/config/api";
import { LoginTypes } from "./data-types/auth";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function setSignUp(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/register`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/login`;

  return callAPI({
    url,
    method: 'POST',
    data: data as any, // callAPI expected FormData but AuthController expects JSON
  });
}

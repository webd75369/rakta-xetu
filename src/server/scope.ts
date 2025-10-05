"use server";
import axios from "axios";

export const checkScope = async (accessToken: string) => {
  try {
    if (!accessToken) throw new Error("access token is not present");
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/tokeninfo",
      { params: { access_token: accessToken } }
    );
    const data = response.data;
    const scopes = data.scopes?.split(" ") ?? [];
    const calendarScope = "https://www.googleapis.com/auth/calendar";
    const hasScope = scopes.include(calendarScope);
    return hasScope;
  } catch (error) {
    console.error(error);
    return {
      message: "failed to check scope",
    };
  }
};

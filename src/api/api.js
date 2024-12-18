const getUrl = (rel) => {
  return "http://localhost:3000" + rel;
};

const fetch2 = async (resource, method, body) => {
  try {
    const response = await fetch(getUrl(resource), {
      method,
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    return {
      ok: response.ok,
      ...data,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.stack,
    };
  }
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
export default {
  auth: {
    signUp: async (firstName, lastName, username, email, password) => await fetch2("/auth/sign-up", "POST", { firstName, lastName, username, email, password }),
    signIn: async (username, password) => await fetch2("/auth/sign-in", "POST", { username, password }),
    isAuth: async () => await fetch2("/auth/check-auth", "GET"),
    signOut: async () => await fetch2("/auth/sign-out", "POST"),
  },

  user: {
    getAllExceptMe: async () => { 
      const result = await fetch2("/user/get-all", "GET");
      return result;
    },

    getProfile: async () => await fetch2("/user", "GET"),
    updateCredential: async (type, value) => await fetch2("/user/update", "POST", { type, value }),
  },

  message: {
    addUser: async (userId) => await fetch2("/message/add-user", "POST", { userId }),
    getAll: async () => await fetch2("/message/get-all", "GET"),
    sendTo: async (sendToUserId, message) => await fetch2("/message/send-to", "POST", { sendToUserId, message }),
  },
};

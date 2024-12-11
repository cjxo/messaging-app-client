const getUrl = (rel) => {
  return "http://localhost:3000" + rel;
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
export default {
  auth: {
    signUp: async (firstName, lastName, username, email, password) => {
      const result = {
        ok: false,
        message: "",
      };

      try {
        const request = await fetch(getUrl("/auth/sign-up"), {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
          }),
        });

        const data = await request.json();

        result.ok = request.ok;
        result.message = data.message;
      } catch (err) {
        result.message = err.stack;
      }

      return result;
    },
    signIn: async (username, password) => {
      const result = {
        ok: false,
        message: "",
      };

      try {
        const response = await fetch(getUrl("/auth/sign-in"), {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();

        result.ok = response.ok;
        result.message = data.message;

      } catch (err) {
        result.message = err.stack;
      }
    
      return result;
    }
  },

  user: {
    changeDetail: async (type, value) => {
    },
  },

  message: {
  },
};

export const userContext = {
  user: {
    username: null,
  },
};

export const SessionContext = React.createContext(userContext.user);

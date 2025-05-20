import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	return (
	  <AuthContext.Provider
	    value={{
	    	user,
	    	setUser,
	    	login: (email, password) => {
	    		// communicate with backend to authenticate user and store token in SecureStore
	    		setUser('John Karlo');
				},
				logout: () => {
					setUser(null);
				}
			}}
		>
			{children}
	  </AuthContext.Provider>
	)
}

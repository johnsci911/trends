import React, { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';

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
	    		SecureStore.setItemAsync('user', 'JohnKarlo');
				},
				logout: () => {
					setUser(null);
					SecureStore.deleteItemAsync('user');
				}
			}}
		>
			{children}
	  </AuthContext.Provider>
	)
}

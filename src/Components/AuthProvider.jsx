import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import auth from '../FireBase/firebase.init';
import axios from 'axios';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cat, setCat] = useState(null);
    const provider = new GoogleAuthProvider();


    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser)
            if (currentUser?.email) {
                const user = { email: currentUser.email }
                axios.post('https://library-management-system-server-delta.vercel.app/jwt', user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                        setLoading(false);
                    })
            }
            else {
                axios.post('https://library-management-system-server-delta.vercel.app/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('logout: ', res.data);
                        setLoading(false);
                    })
            }
        });
        return () => {
            unsubscribe();
        };

    }, []);


    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        handleGoogleLogin,
        signOutUser,
        updateUserProfile,
        cat,
        setCat,
        resetPassword
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthProvider;
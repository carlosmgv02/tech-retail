import React, { ComponentType, PropsWithChildren, ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function withAuth<T extends PropsWithChildren<{}>>(Component: ComponentType<T>) {
  const AuthComponent = (props: T): ReactElement => {
        const navigate = useNavigate();

        useEffect(() => {
            const validateToken = async () => {
                const token = Cookies.get('token');
                if (!token) {
                    navigate('/login', { replace: true });
                    return;
                }
                try {
                    const response = await fetch('http://localhost:3002/auth/validateToken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        navigate('/login', { replace: true });
                    }
                } catch (error) {
                    console.error('Token validation error:', error);
                    navigate('/login', { replace: true });
                }
            };

            validateToken();
        }, [navigate]);

        return <Component {...props} />;
    };

    return AuthComponent;
}

export default withAuth;

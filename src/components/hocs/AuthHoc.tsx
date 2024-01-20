import { ReactNode, useEffect, useState } from 'react';
import { LoadingPage } from '../../pages/LoadingPage';
import { LoginPage, FormProps } from '../../pages/LoginPage';
import { useForm } from 'react-hook-form';
import { authAPI } from '../../api/auth';

export const AuthHoc = ({ children }: { children: ReactNode }) => {
  const defaultValues = {
    username: '',
    password: '',
  };

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: FormProps) => {
    await authAPI.login(data.username, data.password);
    window.location.reload();
  };

  useEffect(() => {
    const handleVerfiedToken = async () => {
      try {
        const response = await authAPI.verifyToken();
        setIsLoggedIn(response);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    handleVerfiedToken();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && !isLoggedIn) {
    return (
      <LoginPage
        errors={errors}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
      />
    );
  }

  return children;
};

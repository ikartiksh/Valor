import AuthForm from '../components/AuthForm.jsx';

function LoginPage({ setAuth }) {
  return <AuthForm type="login" setAuth={setAuth} />;
}

export default LoginPage;
import AuthForm from '../components/AuthForm.jsx';

function SignupPage({ setAuth }) {
  return <AuthForm type="signup" setAuth={setAuth} />;
}

export default SignupPage;
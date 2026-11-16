import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulate Google login (replace with real OAuth later)
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'user@gmail.com', name: 'Google User' })
    );
    navigate('/profile');
  };

  return (
    <div style={styles.container} 
    className='min-h-screen flex justify-center items-center'>
        {/* <div className='w-[50%]'></div> */}
      <div style={styles.card}
      className='flex items-center flex-col'
      >
        {/* Logo / Brand */}
        <div style={styles.logoWrapper}>
          <div style={styles.logo}></div>
        </div>

        {/* Heading */}
        <h1 style={styles.title}>Welcome</h1>
        <p style={styles.subtitle}>Sign in to continue to your account</p>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          style={styles.googleBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
             e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
          }}
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>



        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>Secure authentication</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Terms */}
        <p style={styles.terms}>
          By signing in, you agree to our{' '}
          <a href="#" style={styles.link}>Terms of Service</a> and{' '}
          <a href="#" style={styles.link}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

/* ---------- Inline SVG Icons ---------- */

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '10px' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);


/* ---------- Styles ---------- */

const styles = {
  container: {
    // minHeight: 'calc(100vh)',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    // padding: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '3rem 2.5rem',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  logoWrapper: {
    marginBottom: '1.5rem',
  },
  logo: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a202c',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#718096',
    margin: '0 0 2rem 0',
  },
  googleBtn: {
    width: '100%',
    padding: '0.85rem 1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#2d3748',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    marginBottom: '0.75rem',
  },
  githubBtn: {
    width: '100%',
    padding: '0.85rem 1rem',
    backgroundColor: '#24292e',
    border: '1px solid #24292e',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.55,
    position: 'relative',
  },
  soonBadge: {
    position: 'absolute',
    right: '12px',
    fontSize: '0.65rem',
    fontWeight: '700',
    backgroundColor: '#fbbf24',
    color: '#78350f',
    padding: '2px 8px',
    borderRadius: '999px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '1.75rem 0 1.25rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    padding: '0 0.75rem',
    fontSize: '0.75rem',
    color: '#a0aec0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
  },
  terms: {
    fontSize: '0.75rem',
    color: '#a0aec0',
    lineHeight: '1.5',
    margin: 0,
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Login;
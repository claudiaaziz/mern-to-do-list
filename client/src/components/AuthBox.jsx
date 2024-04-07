import '../styles/authBox.scss';

const AuthBox = ({ register }) => {
  return (
    <div className='auth'>
      <div className='auth__box'>
        <div className='auth__header'>
          <h1>{register ? 'Sign Up' : 'Login'}</h1>
        </div>

        <form>
          {register && (
            <div className='auth__field'>
              <label>Name</label>
              <input type='text' />
            </div>
          )}

          <div className='auth__field'>
            <label>Email</label>
            <input type='text' />
          </div>

          <div className='auth__field'>
            <label>Password</label>
            <input type='password' />
          </div>

          {register && (
            <div className='auth__field'>
              <label>Confirm Password</label>
              <input type='password' />
              {/* <p className="auth__error">Something went wrong.</p> */}
            </div>
          )}

          <div className='auth__footer'>
            <p className='auth__error'>Something went wrong.</p>
            <button className='btn'>{register ? 'Sign Up' : 'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthBox;

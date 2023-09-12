import './App.css';

const App = () => {
  return (
    <>
      <nav className='flex justify-between'>
        <h3>My Blog</h3>
        <ul className='flex gap-10'>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Login/Register</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default App;

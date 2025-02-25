const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Navbar = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/tmdb-auth/request-token`, {
    cache: 'no-store'
  });
  const data = await res.json();
  console.log('data', data);
  const reqToken = data?.request_token;

  return (
    <nav className="flex justify-between">
      <h1>Watchlist</h1>
      <ul className="flex justify-evenly">
        <li>Create</li>
        {reqToken ? (
          <li>
            <a
              href={`https://www.themoviedb.org/authenticate/${reqToken}?redirect_to=${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
            >
              Login
            </a>
          </li>
        ) : (
          <li>Login Unavailable</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

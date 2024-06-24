import { Link } from 'react-router-dom';

export function Home() {
  const neon_text = {
    color: '#FFFFFF',
    textShadow: '0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00'
  };

  const neon_button = {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    textShadow: '0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00',
    border: '2px solid #ff8c00'
  };

  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl" style={neon_text}>ド派手アクション<br />リバシニア</h1>
        <Link to="/reversi">
          <button className="mt-20 text-2xl text-orange-400" style={neon_button}>START</button>
        </Link>
      </div>
    </div>
  );
}

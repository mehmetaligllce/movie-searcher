import './App.css'
import { useState } from 'react'

const App = () => {

  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchPoster(search);
    }
  }

  const fetchPoster = async (search: string) => {
    try {
      setError("");
      setMovieData(null);

      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=b2e8fbc61ae9728f9f897bf26f2aeb5a`);
      const data = await res.json();
      if (data.results.length === 0) {
        setError("Bu isimde bir film bulunamadı! 😥");
        return;
      }

      const movie = data.results[0];
      setMovieData({
        title: movie.title,
        year: movie.release_date ? movie.release_date.split("-")[0] : "Bilinmiyor",
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=Afiş+Yok"
      });

    } catch (err) {
      setError("Bağlantı hatası oluştu!");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '50px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>

      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px', color: '#38bdf8' }}>
        🍿 Film Bulucu
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '40px' }}>Aradığın filmin afişi saniyeler içinde karşında.</p>

      {/* ARAMA ÇUBUĞU */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '500px', margin: '0 auto', marginBottom: '40px' }}>
        <input
          type="text"
          placeholder="Batman, Inception, Matrix..."
          onKeyDown={handleKeyDown}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '15px 20px', borderRadius: '50px', border: 'none', backgroundColor: '#1e293b', color: 'white', fontSize: '1rem', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '15px 30px', borderRadius: '50px', border: 'none', backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: '0.3s' }}
        >
          Ara
        </button>
      </div>

      {error && <p style={{ color: '#fb7185', fontSize: '1.2rem' }}>{error}</p>}

      {movieData && (
        <div style={{ display: 'inline-block', backgroundColor: '#1e293b', borderRadius: '20px', padding: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', maxWidth: '400px' }}>
          <img
            src={movieData.poster}
            width={350}
            alt={movieData.title}
            style={{ borderRadius: '10px', marginBottom: '15px' }}
          />
          <h2 style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>{movieData.title}</h2>
          <span style={{ display: 'inline-block', backgroundColor: '#334155', padding: '5px 15px', borderRadius: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>
            📅  Yayın Yılı: {movieData.year}
          </span>
        </div>
      )}
      <br /><br /><br />
        <p>“Al final, todo valdrá la pena.”</p>

    </div>
  )
}
export default App

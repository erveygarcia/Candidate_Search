import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const users = await searchGithub();
      const usernamesList = users.map((user: any) => user.login);
      setUsernames(usernamesList);
      setCurrentIndex(0);
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const loadCandidate = async () => {
      if (usernames.length > 0 && currentIndex < usernames.length) {
        setLoading(true);
        try {
          const userData = await searchGithubUser(usernames[currentIndex]);
          setCurrentCandidate(userData);
        } catch (error) {
          console.warn('Usuario no encontrado:', usernames[currentIndex]);
          // Automatcally skip
          setCurrentIndex((prev) => prev + 1);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentCandidate(null);
      }
    };
    loadCandidate();
  }, [usernames, currentIndex]);
  const handleAccept = () => {
    console.log('Currente Candidate:', currentCandidate);
    
    if (currentCandidate && currentCandidate.login) {
      try {

      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      saved.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(saved));
      console.log('Guardado', saved);
      
    }catch(error) {
      console.error('Error while saving local storage',error);
    }
  }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (!currentCandidate) return <p>No more candidates available.</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width={100} />
      <h2>
        {currentCandidate.name} <em>({currentCandidate.login})</em>
      </h2>
      <p>Location: {currentCandidate.location || 'N/A'}</p>
      <p>Email: {currentCandidate.email || 'N/A'}</p>
      <p>Company: {currentCandidate.company || 'N/A'}</p>
      <p>Bio: {currentCandidate.bio || 'N/A'}</p>
      <p>
        Profile: <a href={currentCandidate.html_url}>{currentCandidate.html_url}</a>
      </p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAccept}>➕ Accept</button>
        <button onClick={handleReject} style={{ marginLeft: '10px' }}>➖ Reject</button>
      </div>
    </div>
  );
};

export default CandidateSearch;

import {useEffect, useState} from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import{Link} from 'react-router-dom';
import './SavedCandidates.css';


const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState ('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(saved);
  }, []);

  const handleReject = (login: string) => {
    const updated = candidates.filter((c) => c.login !== login);
    setCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  const filteredCandidates = searchTerm
  ? candidates.filter((candidate) => {
      const term = searchTerm.toLowerCase();
      return (
        candidate.name?.toLowerCase().includes(term) ||
        candidate.company?.toLowerCase().includes(term) ||
        candidate.location?.toLowerCase().includes(term)
      );
    })
  : candidates;

  
return (
  <div style={{ padding: '20px'}}>
    <h1>Potential Candidates</h1>
    <Link to="/">🔙 Back to search</Link>

    <div style={{margin: '20px'}}>
      <input
        type="text"
        placeholder='Search by name, company, or location'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
        />
    </div>

    <div className="table-wrapper">
      <table className="responsive-table">
        <thead>
          <tr style={{ backgroundColor: '#111', color: 'white'}}>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.length === 0 && (
            <tr>
              <td colSpan ={7} style={{ padding: '20px', textAlign: 'center'}}>
                No matching Candidates found.
              </td>
            </tr>
          )}
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.login} style={{ backgroundColor: '#222', color: 'white'}}>
              <td>
                <img
                src={candidate.avatar_url}
                alt={candidate.login}
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />

              </td>
              <td>
                <strong>{candidate.name || 'N/A'}</strong><br />
                <em>({candidate.login})</em>
              </td>
              <td>{candidate.location || 'N/A'}</td>
              <td>
                {candidate.email ? (
                  <a href={`mailto:${candidate.email}`} style= {{ color: 'deepskyblue'}}>
                    {candidate.email}
                  </a>
                ) : 'N/A'}
              </td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'N/A'}</td>
              <td>
                <button
                  onClick={() => handleReject(candidate.login)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    fontSize: '18px',
                    cursor: 'pointer'

                  }}
                  >
                    -
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default SavedCandidates;
import { useLocation, useNavigate } from "react-router-dom";
import { SidePanel } from "../components/SidePanel";
import { ThemeToogle } from "../components/ThemeToogle";
import "./Home.css";

const styles = {
  resultsPage: {
    minHeight: '100vh',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    overflowX: 'hidden',
    display: 'flex',
  },

  sidePanel: {
    width: '30%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'hsl(var(--sidebar))',
    zIndex: 10,
    overflow: 'hidden',
    minHeight: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    marginLeft: '30%',
    flex: 1,
    padding: '2rem',
    position: 'relative',
    zIndex: 1,
  },
  section: {
    marginBottom: '2rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '0.5rem',
  },
  scholarshipCards: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  scholarshipCard: {
    background: '#f4f6fb',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
    marginBottom: '1rem',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  },
  scholarshipTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2a3a5e',
  },
  scholarshipDeadline: {
    fontWeight: 500,
    marginBottom: '0.5rem',
    color: '#b23c3c',
  },
  requirements: {
    marginTop: '0.5rem',
  },
  backBtn: {
    marginTop: '2rem',
    padding: '0.75rem 2rem',
    background: '#2a3a5e',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  userInputsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  userInputItem: {
    background: '#e9ecef',
    borderRadius: '0.5rem',
    padding: '0.75rem 1.25rem',
    minWidth: '180px',
    fontSize: '1rem',
  },
  scholarshipLink: {
    color: '#1a5fb4',
    wordBreak: 'break-all',
    overflowWrap: 'anywhere',
    whiteSpace: 'normal',
    textDecoration: 'underline',
    cursor: 'pointer',
    display: 'block',
    margin: '0.5rem 0',
    fontWeight: 500,
    marginTop: '1rem',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
};

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scholarships = location.state?.results || [];
  const userInputs = location.state?.userInputs || {};

  // If userInputs is not passed, try to infer from the first scholarship (if present)
  // or show a message.

  return (
    <div className="results-page" style={styles.resultsPage}>
      {/* Sticky Side Panel */}
      <div className="side-panel" style={styles.sidePanel}>
        <SidePanel />
      </div>
      {/* Main Content */}
      <div className="results-main-content" style={styles.mainContent}>
        <div className="theme-toggle-container">
          <ThemeToogle />
        </div>
        <h1 className="results-title">Scholarship Results</h1>
        {/* User Inputs Section */}
        <section className="user-inputs-section" style={styles.section}>
          <h2>Your Information</h2>
          {userInputs && Object.keys(userInputs).length > 0 ? (
            <div className="user-inputs-list" style={styles.userInputsList}>
              {Object.entries(userInputs)
                .filter(([key, value]) => value !== null && value !== undefined && value !== '' && value !== false)
                .map(([key, value]) => {
                  let displayValue = String(value);
                  
                  // Convert boolean true to "YES"
                  if (value === true) {
                    displayValue = 'Yes';
                  }
                  
                  let label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  if (key === 'no_below_225_major') label = 'No Below 2.25 Major';
                  if (key === 'no_below_250_minor') label = 'No Below 2.50 Minor';
                  
                  return (
                    <div key={key} className="user-input-item" style={styles.userInputItem}>
                      <strong>{label}:</strong> {displayValue}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>No user input data available.</div>
          )}
        </section>
        {/* Scholarships Section */}
        <section className="scholarships-section" style={styles.section}>
          <h2>Matching Scholarships</h2>
          {scholarships.length === 0 ? (
            <div className="no-scholarships">No matching scholarships found.</div>
          ) : (
            <div className="scholarship-cards-container" style={styles.scholarshipCards}>
              {scholarships.map((sch, idx) => {
                const link = sch.link || sch.url || sch.website || '';
                return (
                  <div key={idx} className="scholarship-card" style={styles.scholarshipCard}>
                    <h3 className="scholarship-title" style={styles.scholarshipTitle}>{sch.scholarship_program || 'Scholarship'}</h3>
                    <div className="scholarship-deadline" style={styles.scholarshipDeadline}>
                      <strong>Deadline:</strong> {sch.application_deadline || 'Not specified'}
                    </div>
                    {link && (
                      <div style={{width: '100%', display: 'block'}}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="scholarship-link"
                        >
                          {link}
                        </a>
                      </div>
                    )}
                    <div className="scholarship-requirements" style={styles.requirements}>
                      <h4>Requirements & Details</h4>
                      <ul>
                        {Object.entries(sch)
                          .filter(([key, value]) => key !== 'scholarship_program' && key !== 'application_deadline' && key !== 'scholarship_id' && value !== null && value !== '')
                          .map(([key, value]) => {
                            let label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            if (key === 'no_below_225_major') label = 'No Below 2.25 Major';
                            if (key === 'no_below_250_minor') label = 'No Below 2.50 Minor';
                            if ((key === 'scholarship_link') && value) {
                              return (
                                <li key={key}>
                                  <a
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="scholarship-link"
                                  >
                                    <strong>{label}</strong>{' '}
                                  </a>
                                </li>
                              );
                            }
                            return (
                              <li key={key}>
                                <strong>{label}:</strong> {String(value)}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <button className="back-home-btn" style={styles.backBtn} onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
} 
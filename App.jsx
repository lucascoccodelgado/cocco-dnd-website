import { useState, useEffect } from 'react';

// Homepage Component
function HomePage({ onEnterCampaign }) {
  return (
    <div className="homepage">
      <div className="hero-section">
        <img 
          src="cocco-portrait.png" 
          alt="Cocco the Bard" 
          className="dm-portrait"
        />
        <h1 className="main-title">Welcome to Cocco's D&D Universe</h1>
        <p className="subtitle">
          Your gateway to epic adventures. Track your journey, relive memorable sessions, 
          connect with fellow adventurers, discover NPCs and locations, earn achievements, 
          and explore the worlds we're building together.
        </p>
      </div>

      <div className="campaigns-section">
        <h2 className="section-title">Pick Your Universe</h2>
        <div className="campaign-cards">
          <div 
            className="campaign-card curse-of-strahd"
            onClick={() => onEnterCampaign('cos')}
          >
            <h3>Curse of Strahd</h3>
            <p className="campaign-tagline">Enter the Mists of Barovia</p>
            <div className="card-overlay"></div>
          </div>
          
          <div 
            className="campaign-card waning-wonder"
            onClick={() => onEnterCampaign('tww')}
          >
            <h3>The Waning Wonder</h3>
            <p className="campaign-tagline">Uncover Divine Mysteries in Sefara</p>
            <div className="card-overlay"></div>
          </div>
        </div>
      </div>

      <div className="resources-section">
        <p className="resources-text">
          Playing D&D for the first time? <span className="wip-tag">(WIP)</span>
          <br />
          Check out these resources first
        </p>
      </div>
    </div>
  );
}

// Password Gate Component
function PasswordGate({ campaign, onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const correctPassword = campaign === 'cos' ? 'strahd' : 'wonder';
  const campaignName = campaign === 'cos' ? 'Curse of Strahd' : 'The Waning Wonder';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword) {
      onUnlock();
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className={`password-gate ${campaign}`}>
      <div className="password-box">
        <h2>{campaignName}</h2>
        <p>Enter the password to access this campaign</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={error ? 'error' : ''}
            autoFocus
          />
          {error && <p className="error-message">Incorrect password. Try again.</p>}
          <button type="submit">Enter</button>
        </form>
        <button className="back-button" onClick={() => window.location.reload()}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

// Campaign Dashboard Component
function CampaignDashboard({ campaign, onBack }) {
  const [activeTab, setActiveTab] = useState('recaps');
  const [recaps, setRecaps] = useState([]);
  const [comments, setComments] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [loading, setLoading] = useState(true);

  const campaignName = campaign === 'cos' ? 'Curse of Strahd' : 'The Waning Wonder';
  const storagePrefix = campaign === 'cos' ? 'cos' : 'tww';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load recaps
      const recapsData = await window.storage.get(`${storagePrefix}_recaps`);
      if (recapsData?.value) {
        setRecaps(JSON.parse(recapsData.value));
      }

      // Load comments
      const commentsData = await window.storage.get(`${storagePrefix}_comments`);
      if (commentsData?.value) {
        setComments(JSON.parse(commentsData.value));
      }

      // Load achievements
      const achievementsData = await window.storage.get(`${storagePrefix}_achievements`);
      if (achievementsData?.value) {
        setAchievements(JSON.parse(achievementsData.value));
      }

      // Load NPCs
      const npcsData = await window.storage.get(`${storagePrefix}_npcs`);
      if (npcsData?.value) {
        setNpcs(JSON.parse(npcsData.value));
      }
    } catch (error) {
      console.log('No existing data found, starting fresh');
    }
    setLoading(false);
  };

  const saveRecaps = async (newRecaps) => {
    await window.storage.set(`${storagePrefix}_recaps`, JSON.stringify(newRecaps));
    setRecaps(newRecaps);
  };

  const saveComments = async (newComments) => {
    await window.storage.set(`${storagePrefix}_comments`, JSON.stringify(newComments));
    setComments(newComments);
  };

  const saveAchievements = async (newAchievements) => {
    await window.storage.set(`${storagePrefix}_achievements`, JSON.stringify(newAchievements));
    setAchievements(newAchievements);
  };

  const saveNpcs = async (newNpcs) => {
    await window.storage.set(`${storagePrefix}_npcs`, JSON.stringify(newNpcs));
    setNpcs(newNpcs);
  };

  if (loading) {
    return <div className={`campaign-dashboard ${campaign}`}>Loading...</div>;
  }

  return (
    <div className={`campaign-dashboard ${campaign}`}>
      <header className="campaign-header">
        <button className="back-button" onClick={onBack}>← Back to Home</button>
        <h1>{campaignName}</h1>
      </header>

      <nav className="campaign-nav">
        <button 
          className={activeTab === 'recaps' ? 'active' : ''} 
          onClick={() => setActiveTab('recaps')}
        >
          Session Recaps
        </button>
        <button 
          className={activeTab === 'comments' ? 'active' : ''} 
          onClick={() => setActiveTab('comments')}
        >
          Message Board
        </button>
        <button 
          className={activeTab === 'achievements' ? 'active' : ''} 
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={activeTab === 'npcs' ? 'active' : ''} 
          onClick={() => setActiveTab('npcs')}
        >
          NPCs
        </button>
        <button 
          className={activeTab === 'maps' ? 'active' : ''} 
          onClick={() => setActiveTab('maps')}
        >
          Maps
        </button>
      </nav>

      <main className="campaign-content">
        {activeTab === 'recaps' && (
          <RecapsTab recaps={recaps} onSave={saveRecaps} campaign={campaign} />
        )}
        {activeTab === 'comments' && (
          <CommentsTab comments={comments} onSave={saveComments} campaign={campaign} />
        )}
        {activeTab === 'achievements' && (
          <AchievementsTab achievements={achievements} onSave={saveAchievements} campaign={campaign} />
        )}
        {activeTab === 'npcs' && (
          <NpcsTab npcs={npcs} onSave={saveNpcs} campaign={campaign} />
        )}
        {activeTab === 'maps' && (
          <MapsTab campaign={campaign} />
        )}
      </main>
    </div>
  );
}

// Recaps Tab
function RecapsTab({ recaps, onSave, campaign }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newRecap, setNewRecap] = useState({ session: '', title: '', content: '', date: '' });

  const handleAdd = () => {
    if (newRecap.session && newRecap.title && newRecap.content) {
      const recap = {
        ...newRecap,
        id: Date.now(),
        date: newRecap.date || new Date().toLocaleDateString()
      };
      onSave([recap, ...recaps]);
      setNewRecap({ session: '', title: '', content: '', date: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    onSave(recaps.filter(r => r.id !== id));
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Session Recaps</h2>
        <button className="add-button" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add Recap'}
        </button>
      </div>

      {isAdding && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Session Number (e.g., Session 1)"
            value={newRecap.session}
            onChange={(e) => setNewRecap({...newRecap, session: e.target.value})}
          />
          <input
            type="text"
            placeholder="Session Title"
            value={newRecap.title}
            onChange={(e) => setNewRecap({...newRecap, title: e.target.value})}
          />
          <input
            type="date"
            value={newRecap.date}
            onChange={(e) => setNewRecap({...newRecap, date: e.target.value})}
          />
          <textarea
            placeholder="Write your session recap here..."
            value={newRecap.content}
            onChange={(e) => setNewRecap({...newRecap, content: e.target.value})}
            rows="10"
          />
          <button className="save-button" onClick={handleAdd}>Save Recap</button>
        </div>
      )}

      <div className="recaps-list">
        {recaps.length === 0 ? (
          <p className="empty-state">No recaps yet. Add your first session recap!</p>
        ) : (
          recaps.map(recap => (
            <div key={recap.id} className="recap-card">
              <div className="recap-header">
                <div>
                  <h3>{recap.session}: {recap.title}</h3>
                  <p className="recap-date">{recap.date}</p>
                </div>
                <button className="delete-button" onClick={() => handleDelete(recap.id)}>Delete</button>
              </div>
              <div className="recap-content">{recap.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Comments Tab
function CommentsTab({ comments, onSave, campaign }) {
  const [newComment, setNewComment] = useState({ author: '', message: '' });

  const handleAdd = () => {
    if (newComment.author && newComment.message) {
      const comment = {
        ...newComment,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      };
      onSave([...comments, comment]);
      setNewComment({ author: '', message: '' });
    }
  };

  const handleDelete = (id) => {
    onSave(comments.filter(c => c.id !== id));
  };

  return (
    <div className="tab-content">
      <h2>Message Board</h2>
      
      <div className="add-form comment-form">
        <input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({...newComment, author: e.target.value})}
        />
        <textarea
          placeholder="Write a message..."
          value={newComment.message}
          onChange={(e) => setNewComment({...newComment, message: e.target.value})}
          rows="4"
        />
        <button className="save-button" onClick={handleAdd}>Post Message</button>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="empty-state">No messages yet. Be the first to post!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <strong>{comment.author}</strong>
                <span className="comment-time">{comment.timestamp}</span>
                <button className="delete-button small" onClick={() => handleDelete(comment.id)}>×</button>
              </div>
              <p>{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Achievements Tab
function AchievementsTab({ achievements, onSave, campaign }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', date: '' });

  const handleAdd = () => {
    if (newAchievement.title && newAchievement.description) {
      const achievement = {
        ...newAchievement,
        id: Date.now(),
        date: newAchievement.date || new Date().toLocaleDateString()
      };
      onSave([achievement, ...achievements]);
      setNewAchievement({ title: '', description: '', date: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    onSave(achievements.filter(a => a.id !== id));
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Party Achievements</h2>
        <button className="add-button" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add Achievement'}
        </button>
      </div>

      {isAdding && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Achievement Title"
            value={newAchievement.title}
            onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
          />
          <input
            type="date"
            value={newAchievement.date}
            onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
          />
          <textarea
            placeholder="Achievement description..."
            value={newAchievement.description}
            onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
            rows="4"
          />
          <button className="save-button" onClick={handleAdd}>Save Achievement</button>
        </div>
      )}

      <div className="achievements-grid">
        {achievements.length === 0 ? (
          <p className="empty-state">No achievements yet. Your legendary deeds await!</p>
        ) : (
          achievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <h3>{achievement.title}</h3>
              <p className="achievement-date">{achievement.date}</p>
              <p>{achievement.description}</p>
              <button className="delete-button small" onClick={() => handleDelete(achievement.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// NPCs Tab
function NpcsTab({ npcs, onSave, campaign }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newNpc, setNewNpc] = useState({ name: '', title: '', location: '', description: '', status: 'alive' });

  const handleAdd = () => {
    if (newNpc.name && newNpc.description) {
      const npc = {
        ...newNpc,
        id: Date.now()
      };
      onSave([...npcs, npc]);
      setNewNpc({ name: '', title: '', location: '', description: '', status: 'alive' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    onSave(npcs.filter(n => n.id !== id));
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>NPCs & Characters</h2>
        <button className="add-button" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add NPC'}
        </button>
      </div>

      {isAdding && (
        <div className="add-form">
          <input
            type="text"
            placeholder="NPC Name"
            value={newNpc.name}
            onChange={(e) => setNewNpc({...newNpc, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Title/Role (e.g., Innkeeper, Lord, Merchant)"
            value={newNpc.title}
            onChange={(e) => setNewNpc({...newNpc, title: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location"
            value={newNpc.location}
            onChange={(e) => setNewNpc({...newNpc, location: e.target.value})}
          />
          <select 
            value={newNpc.status}
            onChange={(e) => setNewNpc({...newNpc, status: e.target.value})}
          >
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
            <option value="unknown">Unknown</option>
          </select>
          <textarea
            placeholder="Description, personality, notes..."
            value={newNpc.description}
            onChange={(e) => setNewNpc({...newNpc, description: e.target.value})}
            rows="6"
          />
          <button className="save-button" onClick={handleAdd}>Save NPC</button>
        </div>
      )}

      <div className="npcs-grid">
        {npcs.length === 0 ? (
          <p className="empty-state">No NPCs recorded yet. Meet someone interesting!</p>
        ) : (
          npcs.map(npc => (
            <div key={npc.id} className="npc-card">
              <div className="npc-header">
                <h3>{npc.name}</h3>
                <span className={`status-badge ${npc.status}`}>{npc.status}</span>
              </div>
              {npc.title && <p className="npc-title">{npc.title}</p>}
              {npc.location && <p className="npc-location">📍 {npc.location}</p>}
              <p className="npc-description">{npc.description}</p>
              <button className="delete-button" onClick={() => handleDelete(npc.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Maps Tab
function MapsTab({ campaign }) {
  return (
    <div className="tab-content">
      <h2>Maps & Locations</h2>
      <p className="empty-state">
        Maps coming soon! You can add map images here later.
      </p>
    </div>
  );
}

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleEnterCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setCurrentView('password');
    setIsUnlocked(false);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setCurrentView('dashboard');
  };

  const handleBackHome = () => {
    setCurrentView('home');
    setSelectedCampaign(null);
    setIsUnlocked(false);
  };

  return (
    <div className="app">
      {currentView === 'home' && (
        <HomePage onEnterCampaign={handleEnterCampaign} />
      )}
      {currentView === 'password' && selectedCampaign && (
        <PasswordGate campaign={selectedCampaign} onUnlock={handleUnlock} />
      )}
      {currentView === 'dashboard' && selectedCampaign && (
        <CampaignDashboard campaign={selectedCampaign} onBack={handleBackHome} />
      )}
    </div>
  );
}

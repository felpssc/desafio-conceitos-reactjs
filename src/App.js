import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('/repositories', 
    {
      title: 'Desafio ReactJS',
      owner: 'Felipe'
    });

    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepository(repositories.filter(
      repository => repository.id !== id
    ));
  }

  // async function handleLikeRepository(id) {
  //   await api.post(`/repositories/${id}/like`);
  //   const response = await api.get('/repositories');

  //   setRepository([...response.data]); 
  // }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => {
            return(
              <li key={repository.id}>
                {repository.title} 
                {/* | Likes: {repository.likes}
                <button id="like-button" onClick={() => {handleLikeRepository(repository.id)}}>
                  Curtir
                </button> */}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

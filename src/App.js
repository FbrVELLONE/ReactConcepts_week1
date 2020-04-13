import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

var count = 0;

function App() {
  const [respo, setRespo] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRespo(response.data);
    })
  }, []);

  function handleAddRepository() {
    api.post('/repositories', {
      title: `Meu Repositorio ${count}`,
      url: "https://github.com/FbrVELLONE",
      techs: ["NodeJS", "Java", "C++", "ReactNative", "ReactJS", "CSS3", "HTML5"]
    }).then(response => {
      setRespo([...respo, response.data]);
    })

    count++;
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRespo(respo.filter(respo => respo.id !== id));
    } catch (error) {
      alert('Something wrong happend!');
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respo.map(resp => (
          <li key={resp.id}>
            {resp.title}

            <button onClick={() => handleRemoveRepository(resp.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

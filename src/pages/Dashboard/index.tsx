import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import { Title, Form, Repository, Error } from "./styles";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      "@GithubExplorer/repositories"
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      "@GithubExplorer/repositories",
      JSON.stringify(repositories)
    );
  }, [repositories]);

  async function handleAddRepository(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Digite o autor/nome do repositório.");
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo("");
      setInputError("");
    } catch (err) {
      setInputError("Erro na busca por esse repositório.");
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repository>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>
                {repository.description
                  ? repository.description
                  : "No description, website, or topics provided."}
              </p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repository>
    </>
  );
};

export default Dashboard;

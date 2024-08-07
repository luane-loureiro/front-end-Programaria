import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [minibio, setminibio] = useState('')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [imagem, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://minha-primeira-api-jxtr.onrender.com/mulheres'

  
  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueminibio(event) {
    setImagem(event.target.value)
  }

  function handleInputValuegithub(event) {
    setGithub(event.target.value)
  }

  function handleInputValuelinkedin(event) {
    setLinkedin(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', nome, minibio, imagem, github, linkedin)

    async function sendData() {
      await Axios.post(baseURL, {
        nome: nome,
        minibio: minibio,
        github: github,
        linkedin: linkedin,
        imagem: imagem
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setminibio('')
    setImagem('')
    setGithub('')
    setImagem('')
  }

  return (
    <>
      <Header
        title='Mulheres em Tech Brasil'
        subtitle='Conheça personalidades femininas que estão transformando a tecnologia no Brasil'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.imagem} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.nome}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.minibio}</p>
                  <p className={styles.cardRepoText}>{repo.github}</p>
                  <p className={styles.cardRepoText}>{repo.linkedin}</p>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueNome} 
            placeholder="Digite o nome"
            value={nome}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueImagem} 
            placeholder="Digite o link da imagem"
            value={imagem}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueminibio} 
            placeholder="Digite a minibiografia"
            value={minibio}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValuegithub} 
            placeholder="Digite o link do GitHub"
            value={github}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValuelinkedin} 
            placeholder="Digite o link do Linkedin"
            value={linkedin}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar mensagem</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}

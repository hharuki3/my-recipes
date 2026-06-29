import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🍳 Myレシピ</span>
        <nav className={styles.nav}>
          <button
            className={isActive('/') ? styles.navActive : styles.navItem}
            onClick={() => navigate('/')}
          >
            レシピ
          </button>
          <button
            className={isActive('/meal-plan') ? styles.navActive : styles.navItem}
            onClick={() => navigate('/meal-plan')}
          >
            献立
          </button>
          <button
            className={isActive('/shopping') ? styles.navActive : styles.navItem}
            onClick={() => navigate('/shopping')}
          >
            買い物リスト
          </button>
        </nav>
        <button className={styles.newButton} onClick={() => navigate('/recipes/new')}>
          ＋ 新規
        </button>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

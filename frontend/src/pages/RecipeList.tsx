import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RecipeList.module.css'

type Recipe = {
  id: number
  name: string
  cooked_count: number
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/api/recipes')
      .then(r => r.json())
      .then(data => setRecipes(data))
  }, [])

  if (recipes.length === 0) {
    return <p className={styles.empty}>レシピがまだありません。右上の「＋ 新規」から登録してみましょう。</p>
  }

  return (
    <div className={styles.grid}>
      {recipes.map(recipe => (
        <div
          key={recipe.id}
          className={styles.card}
          onClick={() => navigate(`/recipes/${recipe.id}`)}
        >
          <div className={styles.photo}>🍽️</div>
          <div className={styles.info}>
            <p className={styles.name}>{recipe.name}</p>
            <p className={styles.count}>{recipe.cooked_count}回作った</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeList

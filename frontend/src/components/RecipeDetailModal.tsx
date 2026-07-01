import { useEffect, useState } from 'react'
import styles from './Modal.module.css'
import detailStyles from './RecipeDetailModal.module.css'

type Recipe = {
  id: number
  name: string
  category: string
  image_path: string
  ingredients: string
  instructions: string
  url: string
  shopping_date: string
  memo: string
  cooked_count: number
}

type Tab = 'ingredients' | 'instructions' | 'memo'

type Props = {
  recipeId: number
  onClose: () => void
  onEdit: () => void
}

export default function RecipeDetailModal({ recipeId, onClose, onEdit }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [tab, setTab] = useState<Tab>('ingredients')

  const fetchRecipe = () => {
    fetch(`http://localhost:8000/api/recipes/${recipeId}`)
      .then(r => r.json())
      .then(setRecipe)
  }

  useEffect(() => {
    fetchRecipe()
  }, [recipeId])

  const handleCook = () => {
    fetch(`http://localhost:8000/api/recipes/${recipeId}/cook`, { method: 'POST' })
      .then(r => r.json())
      .then(setRecipe)
  }

  if (!recipe) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{recipe.name}</span>
          <div className={styles.headerActions}>
            <button className={styles.editButton} onClick={onEdit}>編集</button>
            <button className={styles.closeButton} onClick={onClose}>✕</button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.topSection}>
            <div className={detailStyles.imageBox}>
              {recipe.image_path ? (
                <img
                  src={`http://localhost:8000/storage/${recipe.image_path}`}
                  alt={recipe.name}
                />
              ) : (
                <span className={detailStyles.imagePlaceholder}>🍽️</span>
              )}
            </div>

            <div className={detailStyles.info}>
              {recipe.category && (
                <span className={detailStyles.category}>{recipe.category}</span>
              )}
              <p className={detailStyles.cookedCount}>
                {recipe.cooked_count}回作った
              </p>
              <button className={detailStyles.cookButton} onClick={handleCook}>
                🍳 作った！
              </button>
              {recipe.shopping_date && (
                <p className={detailStyles.shoppingDate}>
                  🛒 買い出し予定日：{recipe.shopping_date}
                </p>
              )}
              {recipe.url && (
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noreferrer"
                  className={detailStyles.url}
                >
                  参考レシピを見る →
                </a>
              )}
            </div>
          </div>

          <div className={detailStyles.tabs}>
            {(['ingredients', 'instructions', 'memo'] as Tab[]).map(t => (
              <button
                key={t}
                className={tab === t ? detailStyles.tabActive : detailStyles.tab}
                onClick={() => setTab(t)}
              >
                {t === 'ingredients' ? '材料' : t === 'instructions' ? '作り方' : 'メモ'}
              </button>
            ))}
          </div>

          <div className={detailStyles.tabContent}>
            {tab === 'ingredients' && (
              <pre className={detailStyles.text}>{recipe.ingredients || '未登録'}</pre>
            )}
            {tab === 'instructions' && (
              <pre className={detailStyles.text}>{recipe.instructions || '未登録'}</pre>
            )}
            {tab === 'memo' && (
              <pre className={detailStyles.text}>{recipe.memo || '未登録'}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

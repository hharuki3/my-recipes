import { useEffect, useState } from 'react'
import styles from './RecipeList.module.css'
import RecipeModal from '../components/RecipeModal'
import RecipeDetailModal from '../components/RecipeDetailModal'

type Recipe = {
  id: number
  name: string
  category: string
  image_path: string
  cooked_count: number
}

type ModalType = 'create' | 'detail' | 'edit' | null

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [modalType, setModalType] = useState<ModalType>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const fetchRecipes = () => {
    fetch('http://localhost:8000/api/recipes')
      .then(r => r.json())
      .then(setRecipes)
  }

  useEffect(() => {
    fetchRecipes()
    window.addEventListener('open-create-modal', openCreate)
    return () => window.removeEventListener('open-create-modal', openCreate)
  }, [])

  const openCreate = () => {
    setSelectedId(null)
    setModalType('create')
  }

  const openDetail = (id: number) => {
    setSelectedId(id)
    setModalType('detail')
  }

  const openEdit = (id: number) => {
    setSelectedId(id)
    setModalType('edit')
  }

  const closeModal = () => {
    setModalType(null)
    setSelectedId(null)
  }

  return (
    <>
      <div className={styles.grid}>
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            className={styles.card}
            onClick={() => openDetail(recipe.id)}
          >
            <div className={styles.photo}>
              {recipe.image_path ? (
                <img
                  src={`http://localhost:8000/storage/${recipe.image_path}`}
                  alt={recipe.name}
                />
              ) : (
                '🍽️'
              )}
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{recipe.name}</p>
              <p className={styles.count}>{recipe.cooked_count}回作った</p>
            </div>
          </div>
        ))}

        <div className={styles.addCard} onClick={openCreate}>
          <span className={styles.addIcon}>＋</span>
          <span className={styles.addText}>レシピを追加</span>
        </div>
      </div>

      {modalType === 'create' && (
        <RecipeModal onClose={closeModal} onSaved={fetchRecipes} />
      )}
      {modalType === 'detail' && selectedId && (
        <RecipeDetailModal
          recipeId={selectedId}
          onClose={closeModal}
          onEdit={() => openEdit(selectedId)}
        />
      )}
      {modalType === 'edit' && selectedId && (
        <RecipeModal
          recipeId={selectedId}
          onClose={closeModal}
          onSaved={fetchRecipes}
        />
      )}
    </>
  )
}

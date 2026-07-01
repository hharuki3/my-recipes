import { useEffect, useRef, useState } from 'react'
import styles from './Modal.module.css'

const CATEGORIES = ['肉料理', '魚料理', '野菜料理', '麺類', 'ご飯もの', 'スープ', 'デザート', 'その他']

type Props = {
  recipeId?: number
  onClose: () => void
  onSaved: () => void
}

export default function RecipeModal({ recipeId, onClose, onSaved }: Props) {
  const isEdit = !!recipeId
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [url, setUrl] = useState('')
  const [shoppingDate, setShoppingDate] = useState('')
  const [memo, setMemo] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!isEdit) return
    fetch(`http://localhost:8000/api/recipes/${recipeId}`)
      .then(r => r.json())
      .then(data => {
        setName(data.name ?? '')
        setCategory(data.category ?? '')
        setIngredients(data.ingredients ?? '')
        setInstructions(data.instructions ?? '')
        setUrl(data.url ?? '')
        setShoppingDate(data.shopping_date ?? '')
        setMemo(data.memo ?? '')
        if (data.image_path) {
          setImagePreview(`http://localhost:8000/storage/${data.image_path}`)
        }
      })
  }, [recipeId])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    formData.append('ingredients', ingredients)
    formData.append('instructions', instructions)
    formData.append('url', url)
    formData.append('shopping_date', shoppingDate)
    formData.append('memo', memo)
    if (imageFile) formData.append('image', imageFile)

    const method = isEdit ? 'POST' : 'POST'
    const endpoint = isEdit
      ? `http://localhost:8000/api/recipes/${recipeId}`
      : 'http://localhost:8000/api/recipes'

    if (isEdit) formData.append('_method', 'PUT')

    await fetch(endpoint, { method, body: formData })
    onSaved()
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{isEdit ? 'レシピ編集' : 'レシピ登録'}</span>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.topSection}>
              <div
                className={styles.imageArea}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <>
                    <span className={styles.imageIcon}>📷</span>
                    <span>クリックして画像を選択</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>

              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className={styles.label}>料理名 *</label>
                  <input
                    className={styles.input}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="例：親子丼"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>カテゴリー</label>
                  <select
                    className={styles.select}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="">選択してください</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>参考URL</label>
                  <input
                    className={styles.input}
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>買い出し予定日</label>
                  <input
                    className={styles.input}
                    type="date"
                    value={shoppingDate}
                    onChange={e => setShoppingDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>材料</label>
              <textarea
                className={styles.textarea}
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                placeholder="例：鶏もも肉 200g&#10;卵 2個&#10;玉ねぎ 1/2個"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>作り方</label>
              <textarea
                className={styles.textarea}
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="手順を記入してください"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>メモ</label>
              <textarea
                className={styles.textarea}
                value={memo}
                onChange={e => setMemo(e.target.value)}
                placeholder="家族の反応、アレンジなど"
                style={{ minHeight: '60px' }}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className={styles.submitButton}>
              {isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

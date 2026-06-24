---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Gitコミットを作成する
---

## コンテキスト

- 現在のgitステータス: !`git status`
- 現在のgit diff（ステージ済みおよび未ステージの変更）：!`git diff HEAD`
- 現在のブランチ: !`git branch --show-current`
- 最近のコミット: !`git log --oneline -10`

## 課題

1. diffの内容を分析し、変更の性質と目的を理解する
2. 必要でれば複数のコミットに分割する
3. 変更内容に基づいて、3つのコミットメッセージ候補を作成する
   - 各候補は簡潔かつ明確であり、変更の本質を捉えている必要がある
   - 標準的なコミット形式（feat:, fix:, docs:, refactor: など）を優先すること
4. 3つの候補から最も適切なコミットメッセージを選択し、その選択理由を説明する
5. 必要に応じて `git add` を使用して変更をステージングする
6. 選択したコミットメッセージを使用して `git commit` を実行する

## 制約事項

- コミットにClaudeの共著者フッターを追加してはならない
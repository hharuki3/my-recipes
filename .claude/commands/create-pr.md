---
allowed-tools: Bash(gh:*), Bash(git:*), Read(*)
description: "Push a Pull Request Draft to develop branch (PR Number Optional)"
argument-hint: [PR Number]
---

以下の手順で、`develop` ブランチ向けに新しいPull Request (PR) を作成してください。

1. 直前コミットの内容確認
2. 新規PRの作成
3. 新規PRのブラウザ確認

## 1. 直前コミットの内容確認

現在のブランチにおける直前のコミット内容を確認し、PRのタイトルや本文の参考にしてください。

```bash
git show HEAD
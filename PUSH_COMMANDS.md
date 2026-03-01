# Code Push Karne Ke Liye Commands

Apne terminal mein yeh commands **blog** folder mein run karein:

## Step 1: Sab changes add karein
```bash
cd "c:\Users\Faiz Ansari\Desktop\Blog\blog"
git add -A
```

## Step 2: Commit karein
```bash
git commit -m "Complete dashboard redesign, like/comment/draft fix, blog create improvements"
```

## Step 3: GitHub par push karein
```bash
git push origin main
```

---

### Agar pehli baar push kar rahe hain aur GitHub login maange:
- **Username**: apna GitHub username
- **Password**: GitHub par **Personal Access Token** use karein (password nahi)

Token banane ke liye: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

---

### Shortcut (sab ek saath):
```bash
cd "c:\Users\Faiz Ansari\Desktop\Blog\blog"
git add -A
git commit -m "Complete dashboard redesign, like/comment/draft fix, blog create improvements"
git push origin main
```

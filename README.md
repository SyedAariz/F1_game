## Daily Workflow

### Starting Work

Always make sure you’re up to date before creating a new branch:

```bash
git checkout main
git pull origin main            # get the latest changes
git checkout -b feature/your-task   # create a new branch
```

### After Finishing Your Work

Before committing, make sure your code runs without errors.

```bash
git add .
git commit -m "Describe what you did"
git push origin feature/your-task
```

Then open a **Pull Request** on GitHub to merge your branch into `main`.

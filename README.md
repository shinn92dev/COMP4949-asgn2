# 🧠 Moodiary

Moodiary is a web app that helps users track their **depression score** daily based on surveys and diary entries.  
It provides personalized advice, visualizes score trends, and supports mental health awareness with data-driven insight.

---

## 🌟 Features

-   📝 Submit a daily **survey** or **diary entry**
-   📊 Get a **depression score** between 0 to 100
-   💬 Receive **personalized advice** based on score level
-   📈 View your score history with interactive **charts**
-   🧠 Powered by a trained **XGBoost regression model**

---

## 🛠️ Tech Stack

### Frontend

-   React 18
-   RSBuild
-   Tailwind CSS
-   Shadcn/ui

### Backend

-   FastAPI
-   Python
-   XGBoost (ML model)
-   Pydantic

### Machine Learning

-   Trained on Colab using real-world depression survey data
-   Uses feature selection and regression to predict depression score

---

## 🚀 How to Run the App

### 🔧 Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
make install
make run
```

### 💻 Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

### 📌 Motivation

I created this app after personally struggling with depression during the semester.
I wanted a tool that could reflect my daily mental health and give me guidance.
Moodiary is a personal project built from experience, designed to support others through technology.

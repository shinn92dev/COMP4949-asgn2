<p align="center">
  <img src="frontend/src/assets/logo.png" alt="Moodiary Logo" width="200"/>
</p>

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

In Vancouver and many urban areas, depression is a growing concern — especially among students and young adults.  
I wanted to create a simple, data-driven tool that could support mental health by helping users better understand their emotional patterns.

While this project was inspired in part by my own challenges earlier this year, its primary goal is to help others who may be going through similar struggles — by turning their thoughts into actionable insights.

# GitHub Roaster Backend (Flask)

This is the Flask backend for the GitHub Profile Roaster. It handles GitHub profile analysis and generates AI-powered roasts.

## Setup

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**:
   ```bash
   python app.py
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```
Returns the health status of the backend service.

### Generate Roast
```
POST /api/roast
```

**Request Body:**
```json
{
  "username": "octocat",
  "roast_level": "medium",
  "options": {
    "top_language": true,
    "repo_count": true,
    "followers": false,
    "following": false,
    "commit_frequency": false,
    "repo_descriptions": false
  }
}
```

**Response:**
```json
{
  "roast": "Your roast text here...",
  "username": "octocat",
  "level": "medium",
  "success": true,
  "timestamp": "2024-10-15T12:00:00"
}
```

## Roast Levels

- **mild** 😊 - Constructive feedback with humor
- **medium** 😏 - Sarcastic but fair critique
- **savage** 💀 - Absolutely brutal, no mercy

## GitHub API Integration

The backend uses the GitHub REST API to fetch profile data. You may need to add a GitHub Personal Access Token for higher rate limits:

```python
headers = {
    'Authorization': f'token YOUR_GITHUB_TOKEN'
}
```

## Adding Your ML Model

Replace the mock roast generation in `app.py` with your trained model:

```python
import joblib

# Load your model
model = joblib.load('roast_model.pkl')

# Use it in the roast endpoint
roast_text = model.predict(github_data)
```

## Dependencies

- **Flask** - Web framework
- **flask-cors** - CORS support for Next.js frontend
- **requests** - GitHub API calls

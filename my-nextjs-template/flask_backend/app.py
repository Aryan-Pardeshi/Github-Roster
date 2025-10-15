from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Load your trained roasting model here
# model = joblib.load('roast_model.pkl')

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'GitHub Roaster Backend'
    }), 200

@app.route('/api/roast', methods=['POST'])
def roast():
    """
    GitHub Profile Roasting endpoint
    
    Expected JSON body:
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
    """
    try:
        data = request.json
        
        # Validate input
        if not data or 'username' not in data:
            return jsonify({
                'error': 'Missing username in request body',
                'success': False
            }), 400
        
        username = data['username']
        roast_level = data.get('roast_level', 'medium')
        options = data.get('options', {})
        
        # Fetch GitHub profile data (you'll need to implement this)
        # github_data = fetch_github_profile(username, options)
        
        # For demo purposes, return a mock roast
        # Replace this with your actual ML model prediction
        roasts = {
            'mild': f"Hey @{username}, your GitHub profile is... interesting. Like a participation trophy, but for code. At least you tried! 😊",
            'medium': f"@{username}, I see your commit history is as consistent as my gym attendance. Your repos are like a museum of abandoned dreams. 😏",
            'savage': f"@{username}, your GitHub profile is a masterclass in mediocrity. Your code quality and commit frequency suggest you treat programming like a hobby you picked up last Tuesday. 💀"
        }
        
        roast_text = roasts.get(roast_level, roasts['medium'])
        
        return jsonify({
            'roast': roast_text,
            'username': username,
            'level': roast_level,
            'success': True,
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except ValueError as e:
        return jsonify({
            'error': f'Invalid input data: {str(e)}',
            'success': False
        }), 400
    except Exception as e:
        return jsonify({
            'error': f'Roast generation failed: {str(e)}',
            'success': False
        }), 500

def fetch_github_profile(username, options):
    """
    Fetch GitHub profile data based on selected options
    You'll need to implement this using GitHub API
    """
    github_api_url = f"https://api.github.com/users/{username}"
    
    try:
        response = requests.get(github_api_url)
        response.raise_for_status()
        user_data = response.json()
        
        # Extract relevant data based on options
        profile_data = {}
        
        if options.get('repo_count'):
            profile_data['public_repos'] = user_data.get('public_repos', 0)
        
        if options.get('followers'):
            profile_data['followers'] = user_data.get('followers', 0)
        
        if options.get('following'):
            profile_data['following'] = user_data.get('following', 0)
        
        # Add more data extraction based on other options
        
        return profile_data
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching GitHub data: {e}")
        return {}

if __name__ == '__main__':
    print("� GitHub Roaster Backend starting on http://localhost:5000")
    print("📊 Available endpoints:")
    print("  - GET  /health       - Health check")
    print("  - POST /api/roast    - Generate GitHub roasts")
    app.run(debug=True, host='0.0.0.0', port=5000)

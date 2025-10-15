# import google.generativeai as genai
import json
import os

# Use python-dotenv to load environment variables from a .env file
# Run: pip install python-dotenv
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("Warning: python-dotenv is not installed. Reading variables from environment.")


from github import Github, Auth, RateLimitExceededException, UnknownObjectException

# --- GITHUB SETUP ---
# Securely load the GitHub token from environment variables
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN') or os.getenv('GH_TOKEN')
if not GITHUB_TOKEN:
    raise ValueError("GITHUB_TOKEN not found. Please set it in your environment or a .env file.")

# Use the recommended authentication method to avoid deprecation warnings
g = Github(auth=Auth.Token(GITHUB_TOKEN))


# --- GOOGLE AI (GEMINI) SETUP ---
# Securely load the Google API key from environment variables
# GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY') or os.getenv('GEMINI_API_KEY')
# if not GOOGLE_API_KEY:
#     raise ValueError("Google API key not found. Please set it in your environment or a .env file.")
# genai.configure(api_key=GOOGLE_API_KEY)


## Part 1: GitHub Data Fetching
# -----------------------------

def fetch_fast_github_data(username: str) -> dict | None:
    """Fetches key statistics for a given GitHub user."""
    try:
        user = g.get_user(username)
    except UnknownObjectException:
        print(f"Error: Could not find user '{username}'. Please check the username.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

    profile_data = {
        'username': user.login,
        'bio': user.bio,
        'followers': user.followers,
        'following': user.following,
        'number_of_repos': user.public_repos,
        'repo_names': [],
        'total_stars_on_original_repos': 0,
    }

    try:
        for repo in user.get_repos():
            profile_data['repo_names'].append(repo.name)
            if not repo.fork:
                profile_data['total_stars_on_original_repos'] += repo.stargazers_count
    except RateLimitExceededException:
        print("\nERROR: GitHub API rate limit exceeded. Please wait a while before trying again.")
        return None

    return profile_data


## Part 2: Data Analysis and AI Roasting
# ---------------------------------------

def analyze_data_for_roast(data: dict) -> list[str]:
    """Analyzes user data to generate a list of interesting facts for the AI."""
    if not data:
        return []

    facts = []
    total_stars = data.get('total_stars_on_original_repos', 0)
    num_repos = data.get('number_of_repos', 0)
    avg_stars = total_stars / num_repos if num_repos > 0 else 0

    facts.append(f"Username is '{data['username']}'.")
    facts.append(f"They have {num_repos} public repos with a total of {total_stars} stars, averaging {avg_stars:.1f} stars per repo.")
    facts.append(f"They have {data.get('followers', 0)} followers and are following {data.get('following', 0)} people.")
    
    if data.get('bio'):
        facts.append(f"Their bio says: \"{data['bio']}\".")
    
    # IMPROVEMENT: Check for uncreative repository names
    uncreative_names = [name for name in data['repo_names'] if name.lower() in ['test', 'practice', 'project', 'bot', 'api', 'my-website']]
    if uncreative_names:
        facts.append(f"They have repos with very generic names like: {', '.join(uncreative_names[:3])}.")
        
    return facts


# def generate_roast_with_gemini(facts: list[str]) -> str:
#     """Uses the Google AI API (Gemini) to generate a roast based on facts."""
#     if not facts:
#         return "This profile is so bland, there's nothing to even roast."

#     model = genai.GenerativeModel('models/gemini-flash-lite-latest')
    
#     # IMPROVEMENT: A much better prompt that defines a persona for the AI
#     fact_sheet = "\n- ".join(facts)
#     prompt = f"""
# Your persona is RoastBot, a witty and sarcastic AI comedian. Your job is to deliver a short, sharp, and funny roast of a GitHub user based on the following facts. Be a little edgy but not genuinely mean. Keep it to a single paragraph.

# Here's the fact sheet for your next target:
# - {fact_sheet}

# RoastBot's take:
# """

#     try:
#         response = model.generate_content(prompt)
#         return response.text.strip()
#     except Exception as e:
#         return f"The AI is taking a break... Error: {e}"


# --- Main Workflow ---
if __name__ == "__main__":
    try:
        username_to_roast = input("Enter a GitHub username to roast: ")
        
        print(f"\n Analyzing {username_to_roast}'s profile...")
        github_data = fetch_fast_github_data(username_to_roast)
        
        if github_data:
            # Optional: Print the fetched data for debugging
            # print("\n--- Fetched GitHub Data ---\n")
            # print(json.dumps(github_data, indent=2))

            analysis_facts = analyze_data_for_roast(github_data)
            
            print("🎙️ RoastBot is warming up the mic...")
            
            final_roast = generate_roast_with_gemini(analysis_facts)
            
            print("\n--- 🔥 RoastBot Delivers 🔥 ---\n")
            print(final_roast)

    except (ValueError, KeyboardInterrupt) as e:

        print(f"\nExiting program. {e}")

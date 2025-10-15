from github import Github, RateLimitExceededException
import json
import os
from dotenv import load_dotenv
# load_dotenv will silently do nothing if there's no .env file
load_dotenv()




# Read the token from the environment. Typical key: GITHUB_TOKENs
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN') or os.environ.get('GH_TOKEN')
if not GITHUB_TOKEN:
    raise RuntimeError(
        "GITHUB_TOKEN not found. Please set GITHUB_TOKEN in your environment "
        "or add a .env file with a line like: GITHUB_TOKEN=ghp_yourtoken"
    )

g = Github(GITHUB_TOKEN)

def fetch_fast_github_data(username):
    """
    Fetches a specific set of statistics for a given GitHub user without counting commits.
    """
    try:
        user = g.get_user(username)
    except Exception as e:
        print(f"Error: Could not find or access user '{username}'.")
        return None

    # --- Initialize data structure (without commits) ---
    profile_data = {
        'username': user.login,
        'followers': user.followers,
        'following': user.following,
        'number_of_repos': user.public_repos,
        'repo_names': [],
        'total_stars_on_original_repos': 0
    }

    print(f"Fetching data for {username}...")

    try:
        repos = user.get_repos()
        for repo in repos:
            # Add every repo name to the list
            profile_data['repo_names'].append(repo.name)

            # Calculate stars only for original (non-forked) repos
            if not repo.fork:
                profile_data['total_stars_on_original_repos'] += repo.stargazers_count

    except RateLimitExceededException:
        print("\nERROR: GitHub API rate limit exceeded.")
        print("Please wait a while or use a different Personal Access Token.")
        return None
    except Exception as e:
        print(f"An error occurred while fetching repositories: {e}")
        return profile_data

    print("Successfully fetched all data.")
    return profile_data


if __name__ == "__main__":
    github_username = input("Enter a GitHub username: ")
    data = fetch_fast_github_data(github_username)
    if data is not None:
        # Use json.dumps for a clean, readable print of the data
        print("\n--- User Data ---")
        print(json.dumps(data, indent=4))
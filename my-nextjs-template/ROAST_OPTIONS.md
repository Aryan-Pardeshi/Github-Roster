# GitHub Roaster - Analysis Options

## Roast Levels

The roaster now has 3 levels instead of 4:

1. **😊 Mild** - Constructive feedback with humor
2. **😏 Medium** - Sarcastic but fair critique  
3. **💀 Savage** - Absolutely brutal, no mercy

## Profile Analysis Options

Users can select which aspects of their GitHub profile to analyze:

### ✅ **Top Language** (Default: ON)
- Analyzes the most used programming language
- Roasts language choice, consistency, or over-reliance on one language
- Example: "JavaScript again? How original."

### ✅ **Repository Count** (Default: ON)
- Looks at total number of repositories
- Can roast too few (inactive), too many (unfocused), or abandoned repos
- Example: "147 repos and 146 of them haven't been touched in years."

### **Followers** (Default: OFF)
- Analyzes follower count
- Roasts low follower count or follower/following ratio
- Example: "3 followers and 2 of them are bots."

### **Following** (Default: OFF)
- Looks at who the user follows
- Can roast following too many or following/follower imbalance
- Example: "Following 500 people but only 5 follow you back. Ouch."

### **Commit Frequency** (Default: OFF)
- Analyzes commit patterns over time
- Roasts inconsistent commits, long gaps, or spam commits
- Example: "Your commit history looks like a heart monitor flatlining."

### **Repo Descriptions** (Default: OFF)
- Analyzes quality and creativity of repository descriptions
- Roasts generic descriptions, typos, or lack of descriptions
- Example: "Half your repos just say 'test'. Very descriptive."

## Additional Options to Consider

Here are more GitHub profile metrics that could be added:

### Account Activity
- **Account Age** - How long the account has been active
- **Contribution Streak** - Longest streak of consecutive days with commits
- **Green Square Patterns** - Heatmap analysis (e.g., only active during hackathons)

### Repository Quality
- **Stars Received** - Total stars across all repos
- **Forks** - How many times repos have been forked
- **Open Issues** - Number of unresolved issues
- **README Quality** - Analyze README files (length, formatting, completeness)
- **License Usage** - Whether repos have proper licenses

### Code Quality
- **Repository Names** - Creativity/professionalism of repo naming
- **Branch Count** - Too many branches, unused branches
- **Latest Activity** - Time since last commit/contribution
- **Commit Messages** - Quality of commit message writing

### Social Metrics
- **Starred Repos** - What the user has starred (interests)
- **Organizations** - Membership in GitHub organizations
- **Pull Request Activity** - PRs opened, merged, or rejected
- **Issue Comments** - Participation in discussions

### Profile Completeness
- **Bio/Description** - Quality of profile bio
- **Profile Picture** - Whether they have a custom avatar or default
- **Pinned Repos** - Quality of pinned repositories
- **Profile README** - If they have a fancy profile README

## Backend Integration

When connecting to your ML model/backend, send this data structure:

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

The backend should:
1. Fetch GitHub API data for the username
2. Extract metrics based on selected options
3. Feed data to ML model with roast level
4. Return generated roast text

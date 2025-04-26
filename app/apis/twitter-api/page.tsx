import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function TwitterApiPage() {
  const api = {
    id: "twitter-api",
    name: "Twitter API (X)",
    description: "Access tweets, users, and social data from the Twitter/X platform",
    category: "Social Media",
    difficulty: "Intermediate",
    baseUrl: "https://api.twitter.com/2",
    authType: "OAuth 1.0a / OAuth 2.0 / Bearer Token",
    endpoints: [
      {
        name: "Get Tweet",
        path: "/tweets/{id}",
        method: "GET",
        description: "Returns a variety of information about a single Tweet specified by the requested ID",
        parameters: [
          {
            name: "id",
            type: "string",
            required: true,
            description: "The unique identifier of the Tweet",
          },
          {
            name: "expansions",
            type: "string",
            required: false,
            description: "Comma-separated list of fields to expand (e.g., author_id,attachments.media_keys)",
          },
          {
            name: "tweet.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Tweet fields to include (e.g., created_at,public_metrics)",
          },
          {
            name: "user.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of User fields to include (e.g., name,username,profile_image_url)",
          },
          {
            name: "media.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Media fields to include (e.g., preview_image_url,type)",
          },
        ],
      },
      {
        name: "Get User",
        path: "/users/{id}",
        method: "GET",
        description: "Returns information about a user specified by the requested ID",
        parameters: [
          {
            name: "id",
            type: "string",
            required: true,
            description: "The unique identifier of the User",
          },
          {
            name: "expansions",
            type: "string",
            required: false,
            description: "Comma-separated list of fields to expand (e.g., pinned_tweet_id)",
          },
          {
            name: "user.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of User fields to include (e.g., created_at,description,public_metrics)",
          },
          {
            name: "tweet.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Tweet fields to include (e.g., created_at,text)",
          },
        ],
      },
      {
        name: "Search Recent Tweets",
        path: "/tweets/search/recent",
        method: "GET",
        description: "Search for Tweets published in the last 7 days",
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "One query for matching Tweets (512 characters max)",
          },
          {
            name: "max_results",
            type: "integer",
            required: false,
            description: "The maximum number of results to return (10-100, default: 10)",
          },
          {
            name: "expansions",
            type: "string",
            required: false,
            description: "Comma-separated list of fields to expand",
          },
          {
            name: "tweet.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Tweet fields to include",
          },
          {
            name: "user.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of User fields to include",
          },
          {
            name: "media.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Media fields to include",
          },
          {
            name: "place.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Place fields to include",
          },
          {
            name: "poll.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Poll fields to include",
          },
        ],
      },
      {
        name: "Get User Timeline",
        path: "/users/{id}/tweets",
        method: "GET",
        description: "Returns Tweets composed by a single user, specified by the requested user ID",
        parameters: [
          {
            name: "id",
            type: "string",
            required: true,
            description: "The unique identifier of the User",
          },
          {
            name: "max_results",
            type: "integer",
            required: false,
            description: "The maximum number of results to return (5-100, default: 10)",
          },
          {
            name: "exclude",
            type: "string",
            required: false,
            description: "Comma-separated list of the types of Tweets to exclude (e.g., retweets,replies)",
          },
          {
            name: "expansions",
            type: "string",
            required: false,
            description: "Comma-separated list of fields to expand",
          },
          {
            name: "tweet.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of Tweet fields to include",
          },
          {
            name: "user.fields",
            type: "string",
            required: false,
            description: "Comma-separated list of User fields to include",
          },
        ],
      },
      {
        name: "Create Tweet",
        path: "/tweets",
        method: "POST",
        description: "Creates a Tweet on behalf of an authenticated user",
        parameters: [
          {
            name: "text",
            type: "string",
            required: true,
            description: "The text of the Tweet (max 280 characters)",
          },
          {
            name: "reply",
            type: "object",
            required: false,
            description: "Object containing information for a reply Tweet",
          },
          {
            name: "quote_tweet_id",
            type: "string",
            required: false,
            description: "Link to the Tweet being quoted",
          },
          {
            name: "poll",
            type: "object",
            required: false,
            description: "Object containing poll options",
          },
          {
            name: "media",
            type: "object",
            required: false,
            description: "Object containing media information",
          },
        ],
      },
    ],
  }

  // Sample code snippets
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Twitter API Demo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Twitter Explorer</h1>
    </header>
    
    <div class="search-section">
      <h2>Search Tweets</h2>
      <div class="search-container">
        <input type="text" id="search-input" placeholder="Enter search query...">
        <button id="search-btn" class="btn primary-btn">Search</button>
      </div>
      <div class="search-options">
        <label>
          <input type="checkbox" id="include-images" checked>
          Include images
        </label>
        <label>
          <input type="checkbox" id="include-metrics" checked>
          Include metrics
        </label>
        <label>
          <input type="number" id="max-results" min="10" max="100" value="20">
          Max results
        </label>
      </div>
    </div>
    
    <div class="user-lookup-section">
      <h2>User Lookup</h2>
      <div class="search-container">
        <input type="text" id="username-input" placeholder="Enter username (without @)">
        <button id="user-lookup-btn" class="btn primary-btn">Look Up</button>
      </div>
    </div>
    
    <div id="results-container" class="results-container">
      <!-- Results will be displayed here -->
    </div>
    
    <div id="user-profile" class="user-profile">
      <!-- User profile will be displayed here -->
    </div>
    
    <div id="user-tweets" class="tweets-container">
      <!-- User tweets will be displayed here -->
    </div>
  </div>
  
  <script src="twitter-api.js"></script>
</body>
</html>`

  const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #14171a;
  background-color: #f5f8fa;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 30px;
  text-align: center;
}

h1 {
  color: #1da1f2;
  font-size: 2.5rem;
}

h2 {
  margin-bottom: 15px;
  color: #14171a;
  font-size: 1.5rem;
}

.search-section, .user-lookup-section {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input[type="text"] {
  flex: 1;
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 30px;
  font-size: 16px;
}

input[type="text"]:focus {
  outline: none;
  border-color: #1da1f2;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-btn {
  background-color: #1da1f2;
  color: white;
}

.primary-btn:hover {
  background-color: #1a91da;
}

.search-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.search-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #657786;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
}

.results-container, .user-profile, .tweets-container {
  margin-bottom: 30px;
}

.tweet-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tweet-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: bold;
  color: #14171a;
}

.user-handle {
  color: #657786;
  font-size: 14px;
}

.tweet-date {
  color: #657786;
  font-size: 14px;
}

.tweet-text {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.4;
}

.tweet-media {
  margin-bottom: 15px;
}

.tweet-media img {
  max-width: 100%;
  border-radius: 15px;
  border: 1px solid #e1e8ed;
}

.tweet-metrics {
  display: flex;
  gap: 20px;
  color: #657786;
  font-size: 14px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 5px;
}

.user-profile-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
}

.profile-header {
  display: flex;
  flex-direction: column;
}

.profile-banner {
  width: 100%;
  height: 150px;
  background-color: #1da1f2;
  border-radius: 15px 15px 0 0;
  margin-bottom: -40px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  margin-left: 20px;
}

.profile-details {
  padding: 50px 20px 20px;
}

.profile-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.profile-username {
  color: #657786;
  margin-bottom: 15px;
}

.profile-bio {
  margin-bottom: 15px;
  line-height: 1.4;
}

.profile-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.stat {
  display: flex;
  gap: 5px;
}

.stat-value {
  font-weight: bold;
}

.stat-label {
  color: #657786;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #657786;
}

.error {
  background-color: #fdd;
  color: #c33;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .search-container {
    flex-direction: column;
  }
  
  .user-profile-card {
    flex-direction: column;
  }
  
  .search-options {
    flex-direction: column;
    gap: 10px;
  }
}`

  const javascriptCode = `// Replace with your actual bearer token
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN';
const API_BASE_URL = 'https://api.twitter.com/2';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const includeImages = document.getElementById('include-images');
const includeMetrics = document.getElementById('include-metrics');
const maxResults = document.getElementById('max-results');
const usernameInput = document.getElementById('username-input');
const userLookupBtn = document.getElementById('user-lookup-btn');
const resultsContainer = document.getElementById('results-container');
const userProfile = document.getElementById('user-profile');
const userTweets = document.getElementById('user-tweets');

// Event Listeners
searchBtn.addEventListener('click', searchTweets);
userLookupBtn.addEventListener('click', lookupUser);

// Search for tweets
async function searchTweets() {
  const query = searchInput.value.trim();
  
  if (!query) {
    showError('Please enter a search query');
    return;
  }
  
  // Show loading state
  resultsContainer.innerHTML = '<div class="loading">Searching for tweets...</div>';
  userProfile.innerHTML = '';
  userTweets.innerHTML = '';
  
  try {
    // Build query parameters
    const params = new URLSearchParams({
      query: query,
      max_results: maxResults.value,
      tweet.fields: 'created_at,public_metrics,entities',
      user.fields: 'profile_image_url,username,name,verified'
    });
    
    // Add expansions
    let expansions = ['author_id'];
    if (includeImages.checked) {
      expansions.push('attachments.media_keys');
      params.append('media.fields', 'url,preview_image_url,type');
    }
    params.append('expansions', expansions.join(','));
    
    // Make API request
    const response = await fetch(\`\${API_BASE_URL}/tweets/search/recent?\${params.toString()}\`, {
      headers: {
        'Authorization': \`Bearer \${BEARER_TOKEN}\`
      }
    });
    
    if (!response.ok) {
      throw new Error(\`API request failed with status \${response.status}\`);
    }
    
    const data = await response.json();
    displaySearchResults(data);
  } catch (error) {
    console.error('Error searching tweets:', error);
    showError('Failed to search tweets. Please try again later.');
  }
}

// Look up a user by username
async function lookupUser() {
  const username = usernameInput.value.trim();
  
  if (!username) {
    showError('Please enter a username');
    return;
  }
  
  // Show loading state
  userProfile.innerHTML = '<div class="loading">Looking up user...</div>';
  resultsContainer.innerHTML = '';
  userTweets.innerHTML = '';
  
  try {
    // First, find the user ID by username
    const userResponse = await fetch(\`\${API_BASE_URL}/users/by/username/\${username}?user.fields=description,profile_image_url,public_metrics,verified,created_at\`, {
      headers: {
        'Authorization': \`Bearer \${BEARER_TOKEN}\`
      }
    });
    
    if (!userResponse.ok) {
      throw new Error(\`API request failed with status \${userResponse.status}\`);
    }
    
    const userData = await userResponse.json();
    
    if (!userData.data) {
      throw new Error('User not found');
    }
    
    // Display user profile
    displayUserProfile(userData.data);
    
    // Get user's tweets
    const userId = userData.data.id;
    const tweetsResponse = await fetch(
      \`\${API_BASE_URL}/users/\${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics&expansions=attachments.media_keys&media.fields=url,preview_image_url,type\`,
      {
        headers: {
          'Authorization': \`Bearer \${BEARER_TOKEN}\`
        }
      }
    );
    
    if (!tweetsResponse.ok) {
      throw new Error(\`API request failed with status \${tweetsResponse.status}\`);
    }
    
    const tweetsData = await tweetsResponse.json();
    displayUserTweets(tweetsData, userData.data);
  } catch (error) {
    console.error('Error looking up user:', error);
    showError(\`Failed to look up user: \${error.message}\`);
  }
}

// Display search results
function displaySearchResults(data) {
  if (!data.data || data.data.length === 0) {
    resultsContainer.innerHTML = '<div class="loading">No tweets found matching your search.</div>';
    return;
  }
  
  resultsContainer.innerHTML = \`<h2>Search Results (\${data.meta.result_count} tweets)</h2>\`;
  
  // Create a map of users for easy lookup
  const users = {};
  if (data.includes && data.includes.users) {
    data.includes.users.forEach(user => {
      users[user.id] = user;
    });
  }
  
  // Create a map of media for easy lookup
  const media = {};
  if (data.includes && data.includes.media) {
    data.includes.media.forEach(item => {
      media[item.media_key] = item;
    });
  }
  
  // Display each tweet
  data.data.forEach(tweet => {
    const user = users[tweet.author_id] || { name: 'Unknown', username: 'unknown', profile_image_url: 'default-avatar.png' };
    
    const tweetElement = document.createElement('div');
    tweetElement.className = 'tweet-card';
    
    // Format date
    const tweetDate = new Date(tweet.created_at);
    const formattedDate = tweetDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Start building tweet HTML
    let tweetHTML = \`
      <div class="tweet-header">
        <img src="\${user.profile_image_url}" alt="\${user.name}" class="profile-image">
        <div class="user-info">
          <div class="user-name">\${user.name} \${user.verified ? '✓' : ''}</div>
          <div class="user-handle">@\${user.username}</div>
        </div>
        <div class="tweet-date">\${formattedDate}</div>
      </div>
      <div class="tweet-text">\${formatTweetText(tweet)}</div>
    \`;
    
    // Add media if available
    if (tweet.attachments && tweet.attachments.media_keys && includeImages.checked) {
      const mediaItems = tweet.attachments.media_keys
        .map(key => media[key])
        .filter(item => item);
      
      if (mediaItems.length > 0) {
        tweetHTML += '<div class="tweet-media">';
        
        mediaItems.forEach(item => {
          if (item.type === 'photo' && item.url) {
            tweetHTML += \`<img src="\${item.url}" alt="Tweet media">\`;
          } else if (item.type === 'video' && item.preview_image_url) {
            tweetHTML += \`<img src="\${item.preview_image_url}" alt="Video thumbnail">\`;
          }
        });
        
        tweetHTML += '</div>';
      }
    }
    
    // Add metrics if enabled
    if (includeMetrics.checked && tweet.public_metrics) {
      tweetHTML += \`
        <div class="tweet-metrics">
          <div class="metric">
            <span class="metric-icon">🔄</span>
            <span class="metric-value">\${tweet.public_metrics.retweet_count}</span>
          </div>
          <div class="metric">
            <span class="metric-icon">💬</span>
            <span class="metric-value">\${tweet.public_metrics.reply_count}</span>
          </div>
          <div class="metric">
            <span class="metric-icon">❤️</span>
            <span class="metric-value">\${tweet.public_metrics.like_count}</span>
          </div>
        </div>
      \`;
    }
    
    tweetElement.innerHTML = tweetHTML;
    resultsContainer.appendChild(tweetElement);
  });
}

// Display user profile
function displayUserProfile(user) {
  // Format date
  const joinDate = new Date(user.created_at);
  const formattedJoinDate = joinDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
  
  userProfile.innerHTML = \`
    <h2>User Profile</h2>
    <div class="user-profile-card">
      <img src="\${user.profile_image_url}" alt="\${user.name}" class="profile-image">
      <div class="profile-info">
        <div class="  alt="\${user.name}" class="profile-image">
      <div class="profile-info">
        <div class="user-name">\${user.name} \${user.verified ? '✓' : ''}</div>
        <div class="user-handle">@\${user.username}</div>
        <div class="profile-bio">\${user.description || 'No bio available'}</div>
        <div class="profile-stats">
          <div class="stat">
            <span class="stat-value">\${formatNumber(user.public_metrics.following_count)}</span>
            <span class="stat-label">Following</span>
          </div>
          <div class="stat">
            <span class="stat-value">\${formatNumber(user.public_metrics.followers_count)}</span>
            <span class="stat-label">Followers</span>
          </div>
          <div class="stat">
            <span class="stat-value">\${formatNumber(user.public_metrics.tweet_count)}</span>
            <span class="stat-label">Tweets</span>
          </div>
        </div>
        <div class="join-date">Joined \${formattedJoinDate}</div>
      </div>
    </div>
  \`;
}

// Display user tweets
function displayUserTweets(data, user) {
  if (!data.data || data.data.length === 0) {
    userTweets.innerHTML = '<h2>User Tweets</h2><div class="loading">No tweets found for this user.</div>';
    return;
  }
  
  userTweets.innerHTML = '<h2>User Tweets</h2>';
  
  // Create a map of media for easy lookup
  const media = {};
  if (data.includes && data.includes.media) {
    data.includes.media.forEach(item => {
      media[item.media_key] = item;
    });
  }
  
  // Display each tweet
  data.data.forEach(tweet => {
    const tweetElement = document.createElement('div');
    tweetElement.className = 'tweet-card';
    
    // Format date
    const tweetDate = new Date(tweet.created_at);
    const formattedDate = tweetDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Start building tweet HTML
    let tweetHTML = \`
      <div class="tweet-header">
        <img src="\${user.profile_image_url}" alt="\${user.name}" class="profile-image">
        <div class="user-info">
          <div class="user-name">\${user.name} \${user.verified ? '✓' : ''}</div>
          <div class="user-handle">@\${user.username}</div>
        </div>
        <div class="tweet-date">\${formattedDate}</div>
      </div>
      <div class="tweet-text">\${formatTweetText(tweet)}</div>
    \`;
    
    // Add media if available
    if (tweet.attachments && tweet.attachments.media_keys) {
      const mediaItems = tweet.attachments.media_keys
        .map(key => media[key])
        .filter(item => item);
      
      if (mediaItems.length > 0) {
        tweetHTML += '<div class="tweet-media">';
        
        mediaItems.forEach(item => {
          if (item.type === 'photo' && item.url) {
            tweetHTML += \`<img src="\${item.url}" alt="Tweet media">\`;
          } else if (item.type === 'video' && item.preview_image_url) {
            tweetHTML += \`<img src="\${item.preview_image_url}" alt="Video thumbnail">\`;
          }
        });
        
        tweetHTML += '</div>';
      }
    }
    
    // Add metrics
    if (tweet.public_metrics) {
      tweetHTML += \`
        <div class="tweet-metrics">
          <div class="metric">
            <span class="metric-icon">🔄</span>
            <span class="metric-value">\${tweet.public_metrics.retweet_count}</span>
          </div>
          <div class="metric">
            <span class="metric-icon">💬</span>
            <span class="metric-value">\${tweet.public_metrics.reply_count}</span>
          </div>
          <div class="metric">
            <span class="metric-icon">❤️</span>
            <span class="metric-value">\${tweet.public_metrics.like_count}</span>
          </div>
        </div>
      \`;
    }
    
    tweetElement.innerHTML = tweetHTML;
    userTweets.appendChild(tweetElement);
  });
}

// Format tweet text (handle entities like mentions, hashtags, URLs)
function formatTweetText(tweet) {
  let text = tweet.text;
  
  // If no entities, return plain text
  if (!tweet.entities) {
    return text;
  }
  
  // Process URLs
  if (tweet.entities.urls) {
    tweet.entities.urls.forEach(url => {
      text = text.replace(
        url.url,
        \`<a href="\${url.expanded_url}" target="_blank" rel="noopener noreferrer">\${url.display_url}</a>\`
      );
    });
  }
  
  // Process mentions
  if (tweet.entities.mentions) {
    tweet.entities.mentions.forEach(mention => {
      text = text.replace(
        \`@\${mention.username}\`,
        \`<a href="https://twitter.com/\${mention.username}" target="_blank" rel="noopener noreferrer">@\${mention.username}</a>\`
      );
    });
  }
  
  // Process hashtags
  if (tweet.entities.hashtags) {
    tweet.entities.hashtags.forEach(hashtag => {
      text = text.replace(
        \`#\${hashtag.tag}\`,
        \`<a href="https://twitter.com/hashtag/\${hashtag.tag}" target="_blank" rel="noopener noreferrer">#\${hashtag.tag}</a>\`
      );
    });
  }
  
  return text;
}

// Format large numbers (e.g., 1500 -> 1.5K)
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Show error message
function showError(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = message;
  
  // Insert at the top of the results container
  if (resultsContainer.firstChild) {
    resultsContainer.insertBefore(errorElement, resultsContainer.firstChild);
  } else {
    resultsContainer.appendChild(errorElement);
  }
  
  // Remove after 5 seconds
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}`

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apis" aria-label="Back to API catalog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{api.name}</h1>
          <Badge>{api.category}</Badge>
          <Badge variant="outline">{api.difficulty}</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground">
                The Twitter API (now X API) provides developers with programmatic access to Twitter data. You can use it
                to search for tweets, retrieve user profiles, post tweets, analyze trends, and more. The API is
                essential for building applications that integrate with the Twitter platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Integration Guide</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Apply for API Access</h3>
                  <p className="mb-4">
                    To use the Twitter API, you need to apply for access through the Twitter Developer Portal.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Go to the{" "}
                      <a
                        href="https://developer.twitter.com/en/portal/dashboard"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter Developer Portal
                      </a>
                    </li>
                    <li>Sign in with your Twitter account</li>
                    <li>Apply for a developer account by describing your use case</li>
                    <li>Once approved, create a project and an app within that project</li>
                    <li>Generate the necessary API keys and tokens</li>
                  </ol>
                  <Alert className="mt-4">
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                      Twitter has different access tiers with varying rate limits and capabilities. The Basic tier is
                      free but has limitations, while the Enterprise tier offers more extensive access.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Authentication</h3>
                  <p className="mb-4">Twitter API v2 supports several authentication methods:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>OAuth 2.0 Authorization Code with PKCE</strong>: For user-context requests (acting on
                      behalf of a user)
                    </li>
                    <li>
                      <strong>OAuth 1.0a</strong>: Legacy authentication still supported for user-context requests
                    </li>
                    <li>
                      <strong>App-only Bearer Token</strong>: For app-context requests (not on behalf of a user)
                    </li>
                  </ul>
                  <p className="mt-4">
                    For this example, we'll use the App-only Bearer Token authentication, which is simpler for read-only
                    operations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your Twitter API integration:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>twitter-api.js - JavaScript for API integration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Implement the Code</h3>
                  <p className="mb-4">Copy the following code into your project files:</p>

                  <Tabs defaultValue="html">
                    <TabsList aria-label="Code examples">
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="js">JavaScript</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="html">
                      <CodeBlock code={htmlCode} language="html" />
                    </TabsContent>
                    <TabsContent value="js">
                      <CodeBlock code={javascriptCode} language="javascript" />
                    </TabsContent>
                    <TabsContent value="css">
                      <CodeBlock code={cssCode} language="css" />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 5: Replace the Bearer Token</h3>
                  <p className="mb-4">
                    Replace <code className="bg-muted px-1 py-0.5 rounded">YOUR_BEARER_TOKEN</code> in the JavaScript
                    file with your actual Bearer Token from the Twitter Developer Portal.
                  </p>
                  <Alert>
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription>
                      In a production environment, you should never expose your Bearer Token in client-side code. Use a
                      server-side solution to make API requests and proxy them to the client.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 6: Test Your Implementation</h3>
                  <p className="mb-4">
                    Open your HTML file in a browser to test your Twitter API integration. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search for tweets using keywords</li>
                    <li>Look up user profiles by username</li>
                    <li>View a user's recent tweets</li>
                    <li>See tweet metrics and media</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bless Network CLI Integration Section */}
          
            <div>
              <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Common Errors</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>401 Unauthorized</strong>: Invalid or expired credentials
                    </li>
                    <li>
                      <strong>403 Forbidden</strong>: Valid credentials but insufficient permissions
                    </li>
                    <li>
                      <strong>404 Not Found</strong>: The requested resource doesn't exist
                    </li>
                    <li>
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                    <li>
                      <strong>503 Service Unavailable</strong>: Twitter is temporarily unavailable
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>
                    Twitter API has rate limits that vary by endpoint and access level. The API returns rate limit
                    information in response headers:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <code>x-rate-limit-limit</code>: The rate limit ceiling for that endpoint
                    </li>
                    <li>
                      <code>x-rate-limit-remaining</code>: The number of requests left for the time window
                    </li>
                    <li>
                      <code>x-rate-limit-reset</code>: The time at which the rate limit resets, in epoch seconds
                    </li>
                  </ul>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Monitor these headers and implement exponential backoff for retries when you encounter rate
                      limiting. Also, consider caching responses for frequently accessed data to reduce the number of
                      API calls.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Error Response Format</h3>
                  <p>When an error occurs, the Twitter API returns a JSON response with error details:</p>
                  <CodeBlock
                    language="json"
                    code={`{
  "errors": [
    {
      "title": "Invalid Request",
      "detail": "One or more parameters to your request was invalid.",
      "type": "https://api.twitter.com/2/problems/invalid-request",
      "parameter": "query",
      "value": ""
    }
  ]
}`}
                  />
                  <p className="mt-4">
                    Your error handling should check for this structure and extract meaningful information to display to
                    users or log for debugging.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">API Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Base URL</dt>
                    <dd className="flex items-center gap-1">
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">{api.baseUrl}</code>
                      <Button variant="ghost" size="icon" className="h-4 w-4" aria-label="Copy base URL">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Authentication</dt>
                    <dd>{api.authType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Documentation</dt>
                    <dd>
                      <a
                        href="https://developer.twitter.com/en/docs/twitter-api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Twitter API Documentation"
                      >
                        Official Docs <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Endpoints</h3>
                <ul className="space-y-4">
                  {api.endpoints.map((endpoint, index) => (
                    <li key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{endpoint.method}</Badge>
                        <code className="text-sm font-semibold">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      {endpoint.parameters.length > 0 && (
                        <details className="text-sm">
                          <summary className="font-medium cursor-pointer">Parameters</summary>
                          <ul className="mt-2 space-y-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <li key={paramIndex} className="grid grid-cols-[1fr,2fr] gap-2">
                                <div>
                                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{param.name}</code>
                                  {param.required && <span className="text-red-500 ml-1">*</span>}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  <span className="text-foreground">{param.type}</span> - {param.description}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border p-4 bg-muted/30">
                <h3 className="text-lg font-semibold mb-2">Bless Network Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://docs.bless.network/build-on-bless/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Bless Network CLI Documentation
                    </a>
                  </li>
                 
                  <li>
                    <a
                      href="https://discord.gg/yXUWUzQU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Join Bless Network Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

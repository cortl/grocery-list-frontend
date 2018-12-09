[![CircleCI](https://circleci.com/gh/cortl/grocery-list-frontend.svg?style=svg)](https://circleci.com/gh/cortl/grocery-list-frontend)
[![codecov](https://codecov.io/gh/cortl/grocery-list-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/cortl/grocery-list-frontend)

# 🍎 Grocery List  🍞 

Running demo at [groceries.cortlan.co](https://groceries.cortlan.co)

## Developing Your Own Grocery List
1. [Configuring Firebase](#configuring-firebase)
2. [Setting up your local environment](#setting-up-your-local-environment)

### Configuring Firebase
- [Spin up a new project](https://console.firebase.google.com)
- Go to Authentication page and get ApiKey, SenderId, etc. and copy them into a .env file in the cloned project directory

```dotenv
# Running Prod
REACT_APP_API_KEY="<your-api-key-here>"
REACT_APP_AUTH_DOMAIN="<your-app-domain>"
REACT_APP_DATABASE_URL="<your-data-base-url>"
REACT_APP_PROJECT_ID="<your-project-id>"
REACT_APP_STORAGE_BUCKET="<your-storage-bucket-url>"
REACT_APP_MESSAGING_SENDER_ID="<your-sender-id>"

# Running Local
REACT_APP_API_KEY_DEV="<your-api-key-here>"
REACT_APP_AUTH_DOMAIN_DEV="<your-app-domain>"
REACT_APP_DATABASE_URL_DEV="<your-data-base-url>"
REACT_APP_PROJECT_ID_DEV="<your-project-id>"
REACT_APP_STORAGE_BUCKET_DEV="<your-storage-bucket-url>"
REACT_APP_MESSAGING_SENDER_ID_DEV="<your-sender-id>"
```

- On the Firebase console authentication page, turn on Google Sign on method
- On the Firebase console Database page, turn on Firestore

### Setting up your local environment
- `npm install`
- `npm start`

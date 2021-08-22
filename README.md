## Api Flow
- [x] User signs up 
- Need to double check this, but I believe this initially returns auth code, then use auth code for access token
- For `ShopprApi` only, i.e. authentication for our app.
- [x] User logs in &#8594; Api grants access token
- [x] User authorizes use of their kroger account &#8594; Kroger Api returns authorization code
- [x] User(api for now) requests Kroger access-token with Kroger authorization code &#8594; returns access/refresh token (will be used for all kroger calls) 
- [ ] api populates kroger_details table with kroger tokens
- [ ] search products

----
We will need to follow a similar process for steps 3-6 for pretty much any service we want to connect with. The next step is to determine how we actually want this app to function. Are we going to congregate the data into one table for the user to search? Or do complex table joins for each individual service, or just search them live?

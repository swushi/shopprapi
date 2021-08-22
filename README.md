## Api Flow
- [x] User signs up 
- [ ] User Selects A Preferred Store - (obviously only focusing on kroger right now though)
- Need to double check this, but I believe this initially returns auth code, then use auth code for access token
- For `ShopprApi` only, i.e. authentication for our app.
- [x] User logs in &#8594; Api grants access token
- [x] User authorizes use of their kroger account &#8594; Kroger Api returns authorization code
- [x] User(api for now) requests Kroger access-token with Kroger authorization code &#8594; returns access/refresh token (will be used for all kroger calls) 
- [ ] api populates kroger_details table with kroger tokens
- [ ] search products - from 

----
We will need to follow a similar process for steps 3-6 for pretty much any service we want to connect with. The next step is to determine how we actually want this app to function. Are we going to congregate the data into one table for the user to search? Or do complex table joins for each individual service, or just search them live?

Not sure if its more aids but i feel like three repos may be good here:

1. Proxy DB Functions repo for populating from apis at different stores
2. Main user api repoo for requests from app to db
3. Mobile app repo

## Need For Proxy DB:

Unless you are partnered, kroger has api limits on every endpoint and im assuming this is the case at the other stores as well. A few thousand users is small for a mobile app these days. We would hit the rate limit after that many users just searches like 2 items each. Need to just run a proxy db that checks items and prices periodically and stores them for us, basically our own cache. We can have a seperate table for each store since we are not allowed to compare prices anymore to keep things clean and search times/volumes down.

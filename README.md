## Endpoints :

# POST /api/token

Usage :
Get the current token associated to an email adress or renew it if the previous one is deprecated. Depreciation happens 24 hours the token is generated.

Body :
{
    "email": "email@example.xyz"
}

Returns :
{
  "token": "{token}",
  "timeUntilDepreciationInMilliseconds": 86263575,
  "remainingWordCount": 79987
}

# POST /api/justify

Usage :
Justify a text input based on the type of justification and the maximum character count of each line. If undefined or invalid, default values are applied where available.

Headers : 
    Authorization : {token}

Body :
{
  "text":"Example text",
  "justification": "justify-right",
  "charactersPerLine": 30
}

characterPerLine is 80 by default, minimum is 1 and overrides the value sent.
justification is justify-left by default, other values are justify-right and justify-center.

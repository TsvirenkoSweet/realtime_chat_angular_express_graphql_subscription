# Realtime chat running on graphql subscriptions

#Backend
<ul>
List of commands:
<li>npm i yarn -g (if not installed)</li>
<li>yarn</li>
<li>yarn build</li>
<li>yarn dev</li>
</ul>
<ul>
After:
<li>Check that server is ready</li>
<li>Go to sandbox (https://studio.apollographql.com/) to test API</li>
<li>Run the following: 
<code>
subscription {
  messageSent {
    id
    name
    message
  }
}
</code>
</li>
<li>Now you can see "Listening..." below</li>
<li>Run 'create a new chat'</li>
<li>Subscriptions successfully running</li>
</ul>
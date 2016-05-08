# Presentation

[Link to demo](http://masteryi.net/) incase you missed it


If your looking for how to get this project running yourself, please visit the [readme](https://github.com/konk353535/masteryi#running-locally)

## Features

Masteryi is divided into 4 main pages. Each route utilises data aggregated from a dedicated scanning method, which over 2 weeks has scanned 150 million different user ids, and found over 15 million champions with level 5 mastery.

### [Home](http://masteryi.net/)

Shows the top 3 players by champion mastery across Europe, North America and Oceania.

Displays a search container where users can enter there own name and region to see how there top champion mastery compares to those around the globe.

<small>(Note: You require at least one champion with level 5 champion mastery to be indexed)</small>

### [Leaderboard](http://masteryi.net/leaderboard)

Displays the players with the highest champion mastery per champion.

### [Champion leaderboard](http://masteryi.net/championleaderboard?champion_id=19)

Displays the top 100 players for a specific champion.

### [User Search](http://masteryi.net/search?name=Patt&region=OCE)

Displays a table of results specific to the summoner searched, displays stats such as the users rank for their champion, the total players with mastery level 5 for that champion and their rank across all champions.


## Technical Challenges

### Rankings on large postgres tables ( >10M rows )

Initally this was a simple problem, i googled around and experimented to find a high performance ranking query. This worked initally as the number of rows was small ( < 1M ), but as the size of the table grew performance reduced dramatically. Queries for specific users stats we're taking over 30 seconds to return, which was not acceptable. 

At this point i realised that if the rank was already set on the row the query time would be almost non existant. So i built a cron job which runs once a day, and writes to every row in the database. This puts extreme load on the server as it has to write rankings to over 10M rows but means that users can get close to real time ranking queries.


<b>TL;DR</b> It's fairly difficult to do any kind of query on very large tables. I started by determining rank at query time, but it became to expensive and eventually made a cron which once a day set the rank for all rows in the table. Reduced query time but increases load on server when writing to over 10M rows.


### Scanning all users on a fixed time line ( 2 weeks )

I started the project by creating a flexible worker, which could take on a region and a start and end id. The first problem with this approach was that if a scan failed to complete, or a bug was encountered i had no easy way to determine what id the scan was up too. 

So i changed the scanner slightly, when the scanner started up it would fetch all rows from a scans table, and for each row in the table start a worker. As the worker fetched id's it would update the table. So over time i could easily stop and start the scanner with little extra effort. 

Finally i realised that the scanning was too slow, i had only 2 weeks to scan all the data and calculated that only half of that would be done at current projections. To attempt to increase scan speed I refactored my code to a) Bulk fetch summoners by id ( 40 at a time ) and b) Prune out summoners with less than summoner level 10, as i could assume that players with low summoner level could not have champion mastery 5.

Unfortunetly the performance increases from the above we're not enough. I attempted to find the bottleneck but cpu, network and disk speed we're all running fine. Increase the concurrency of workers on a single region would massivly increase time outs for all requests. Because of the limited time left in the developer challenger i decided to finish my remaining issues before attempting to speed up scan time again. 

<b>TL;DR</b> I failed, scanning over 300M possible users id's in 2 weeks is hard, started off by simply fetching a single user id and checking for 404, eventually used the batch features of the api so that i could request 40 users at once, also pruned users further by only making another api call for users with at least a summoner level of 10. Check scan status [here](http://masteryi.net/scans).


### Handling scope creep with a deadline and minimal time to develop

As mentioned above, due to technical challenges you cannot spend too much time on any piece of functionality. Even if it is critical to the project as a whole. As you run out of time you must leave things at not quite perfect to make time for known bugs that have to be worked on before time runs out.

<b>TL;DR</b> Ruthlessly cut features and fixes, used a list to prioritise the absolute most critical tasks.


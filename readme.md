
# Space Invaderz

## SEI62 Project 1 Overview

This grid-based Vanilla JavaScript game was my first project while attending General Assembly's Software Engineering Immersive course, and is my first attempt at programming an arcade game.

### PROJECT DURATION: 
- Solo, 7 days.

### Stack: 
- HTML, CSS, JavaScript.

### Run the deployed app:
**LINK:** Play Space Invaders [here](https://jt-black.github.io/space-invaderz/).

## The Brief
Our brief was to create a grid-based game using only JavaScript, CSS, and HTML, and effect the game movement using css classes.

For the Space Invaders brief specifically, the requirements stated that:

- The player should be able to clear at least one wave of aliens.
- The player's score should be displayed at the end of the game.

## Day 1 - Starting Out

I spent the first day and a half planning, whiteboarding and psuedo-coding. I wanted to have a good idea of what was needed, break it down into smaller, more approachable tasks. I made the wireframe with Excalidraw.

![Whiteboard](./img/spaceinvaderz-jtb.png)

## Day 2 - Collecting and Preparing Assests, Building the Grid and Player

I finished off my whiteboard as much as I had the patience to do, thought about all the cool things I wanted to do, decided which ones I would actually do first and what would be "stretch goals". I hopped on Google, found assets for the sprites that looked authentic, found the original sounds from the 1980 arcade version, and decided upon the pixel font that would be used for the displays. Additionally, I found a site that had artwork overlays from numerous versions on different platforms over the years, and was lucky to find the original big yellow and orange logo. I made the logo transparent, resized the sprites, and converted the audio files so that they played at the correct rate. 

With all the assets in hand I started coding the game. I built the grid, added the player, and added the invader fleet. The displays and logo were popped in and I called it a night.

## Day 3 - Styling the Game

I knew that I would be busy adding extra feaaures and debugging at the end so I got the styling out of the way. I was going for an authentic retro feel, and so made it minimal and kept it old school. During the styling I temporarily displayed the array position numbers for each grid and displayed borders on all the cells, to help with programming later on. The numbering was invaluable when I built the movement logic the following day. The grid display helped with deciding and styling the invader placement. I felt happy because my CSS was relatively straight forward and worked as planned without any hitches. 

## Day 4 - Building the Collision and Movement Logic

I got to work building the movement for the player, the player shots, and the invader fleet. I got them all moving correctly and added the player shots. Things looked like they were kinda working when I noticed the console was stuck on an angry red infinite loop. I'd forgotten to define the boundaries for the missed shots that left the array, so got that sorted and my console was happily blank again. At this point, I'd cobbled together a function to move the invading fleet and everything appeared well - for the moment. Directly following the movement function call, the invaders starting going in random places and directions, followed by the angry red infinite loop on the browser console again. I defined the bottom collision boundaries, console looks happy - no more red, but the invaders were still bugging out, and I was left scratching my head..


## Day 5 - Bugs and Re-Structuring 
The next morning, I had a think and decided to rewrite everything to do with the invaders array and the positions of the invaders on the grid. I had initially made them objects and given them the properties 'position' and 'type' , storing the location of each invader and its associated ship-type within itself.  In hindsight, I probably could have kept it this way, but I was worried about my movement function and so I stripped back the array of objects to a more simple integer array, and finished the movement function again. I checked it with one invader, then a fleet, movement looks great, but as soon as a player shot hits one, they just bugged out again.  At that point I busied myself with getting the score and level displays linked up and made a toggle button to pause the gameplay. I was stumped and then someone pointed out most kindly that I was attempting to reference the wrong object. One pair of deleted brackets later the invaders were marching like redcoats . I made a zigzag sprite and put in the bomb function. Eventually I settled on running the bomb function on the same clock as the invader movement. 

## Day 6 - Adding the Stretch Goals and More Bugs
Added cool CSS background stars. Added a flying saucer attack across the top. Added sounds. Added bugs. The CSS background sometimes loads halfway down and then creeps up to fill the screen slowly. Also, sometimes the whole page only loads halfway on some browsers.

## Wins 
The whole project was a great learning experience. Getting the invaders to move all together was the trickiest part that I got working correctly. Adding some sounds in also took the game to another level.

## Bugs
As mentioned above, near the end of the deadline some bugs developed that I unfortunately didn't have the time to sort out. The CSS background sometimes loads halfway down and then creeps up to fill the screen slowly. Also, sometimes the whole page only loads halfway on some browsers.

## Challenges
Unfortunately, some of the nested looping conditions for playing new levels and correctly starting and stopping the game weren't finished, it would have been nice to solve these issues as well.

## Future Features
Adding sounds for the saucer and marching soundtrack, new levels that speed up as the player progresses in the game, and more lives for the player.




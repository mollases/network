Elevator design problem

hub keeps track of new button presses
    tracks trigger requests to reset elevator home floor
    asks elevators, queue length, current floor, and direction
    figures out if any elevator is going in that direction and hasnt passed the trigger floor
        tell first elevator that has least floors in queue to go to trigger floor

every elevator 
    has 2 ordered sets (in each direction we are headed)
    knows what floor its on
    direction (up, down, no-dir)
    knows the max and min floors
    home floor (go here after 20 minutes)
    state (on, home, off / maint)


Street lights for a 4 way intersection in any period of time
optimize for less crashes, time / throughput
1 right, 1 straight and 1 left lane, cross walk, bicycle lanes

triggers:
    weight pad for car lanes (one for each lane)
    bike pad
    button for pedestrians

lights:
    left turn
        green, yellow, red
    straight
        green, yellow, red
    right turn
        green, yellow, red (arrow)
        green, yellow, red (bike)
    ped light
        stop, flashing stop, walk

intersection hub
    basic rules:
        anything trips timer

when timer is tripped
    check last time weight pad was tripped in cross intersection
    bike lanes always get checked
        if (x*speed limit) seconds, then turn cross intersection lights yellow, then red

now we know no one is moving
    if left weight pad was tripped
        bikes -> red, straight -> red, right -> red, left -> green, ped -> stop
    bikes -> green, straight -> green, ped -> walk, left -> red, right -> red
    bikes -> red, straight -> green, right -> green, left -> red, ped -> stop

default light is straight for major direction, maybe weight pad timer is different for opposing directions

radio signals can trip sensors to turn proper lights green
